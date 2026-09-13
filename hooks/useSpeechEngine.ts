'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { clearChunkHighlights, highlightChunk, usableVoices } from '@/lib/readAloud'
import {
  SOURCE_LANGUAGE,
  detectPageLanguage,
  observePageLanguage,
  pickVoiceForLanguage,
  primarySubtag,
  voiceMatchesLanguage,
} from '@/lib/speechLanguage'

export type SpeechStatus = 'idle' | 'playing' | 'paused'

/** A line to read, and where it sits on the page if it came from there. */
export interface SpeechChunk {
  index: number
  text: string
  element?: HTMLElement
}

/** What a caller hands to `speak`; the engine numbers the lines itself. */
export type SpeechSource = Array<{ text: string; element?: HTMLElement }>

/** 'auto' follows whatever the page is showing; anything else pins a language. */
export type LanguageChoice = string

type Session = { generation: number; paused: boolean; stopped: boolean }

/** A breath between lines, so verses don't run together. */
const GAP_BETWEEN_CHUNKS = 280

/** Chrome drops an utterance queued in the same tick as cancel(). */
const AFTER_CANCEL = 60

function readStored(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode: the setting just won't persist */
  }
}

function readNumber(key: string, min: number, max: number, fallback: number): number {
  const stored = readStored(key)
  // Number(null) is 0, which is a legal volume — so an unset key has to be
  // caught before the range check or every reader starts out silent.
  if (stored === null || stored.trim() === '') return fallback
  const raw = Number(stored)
  return Number.isFinite(raw) && raw >= min && raw <= max ? raw : fallback
}

/**
 * One speech engine, shared by the page reader and the guided tour.
 *
 * Callers supply the lines; everything else — transport, highlighting, which
 * voice, which language — is settled here so the two readers cannot drift
 * apart in behaviour the way two copies of this logic did.
 *
 * The language is worked out from the text being spoken rather than from the
 * app's own source strings, so a page a reader has put through Google
 * Translate is read in the language they are looking at.
 */
export function useSpeechEngine(storageKey: string) {
  const [supported, setSupported] = useState(false)
  const [status, setStatus] = useState<SpeechStatus>('idle')
  const [chunks, setChunks] = useState<SpeechChunk[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  const [rate, setRateState] = useState(1)
  const [pitch, setPitchState] = useState(1)
  const [volume, setVolumeState] = useState(1)

  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const [voiceURI, setVoiceURIState] = useState('')
  const [languageChoice, setLanguageChoiceState] = useState<LanguageChoice>('auto')
  const [pageLanguage, setPageLanguage] = useState(SOURCE_LANGUAGE)

  const chunksRef = useRef<SpeechChunk[]>([])
  const indexRef = useRef(0)
  const voicesRef = useRef<SpeechSynthesisVoice[]>([])
  const sessionRef = useRef<Session>({ generation: 0, paused: false, stopped: true })
  const settingsRef = useRef({ rate, pitch, volume, voiceURI })
  const languageChoiceRef = useRef(languageChoice)
  /** The language of the session in progress, fixed when it started. */
  const activeLanguageRef = useRef(SOURCE_LANGUAGE)

  useEffect(() => {
    settingsRef.current = { rate, pitch, volume, voiceURI }
  }, [rate, pitch, volume, voiceURI])

  useEffect(() => {
    languageChoiceRef.current = languageChoice
  }, [languageChoice])

  /** What we should be reading in: the reader's choice, else the page's. */
  const targetLanguage = languageChoice === 'auto' ? pageLanguage : languageChoice

  // Keyed on the primary subtag so the voice saved while reading "nl-NL" is
  // still found when the page is next detected as plain "nl".
  const voiceKey = useCallback(
    (language: string) => `${storageKey}-voice:${primarySubtag(language)}`,
    [storageKey],
  )

  /* --- setup ------------------------------------------------------------ */

  const loadVoices = useCallback(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    const list = usableVoices(window.speechSynthesis.getVoices())
    voicesRef.current = list
    setVoices(list)
  }, [])

  const stop = useCallback(() => {
    sessionRef.current.generation += 1
    sessionRef.current.stopped = true
    sessionRef.current.paused = false
    window.speechSynthesis?.cancel()
    clearChunkHighlights()
    setStatus('idle')
    setCurrentIndex(0)
    indexRef.current = 0
    chunksRef.current = []
    setChunks([])
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.speechSynthesis) {
      setSupported(false)
      return
    }

    setSupported(true)
    setRateState(readNumber(`${storageKey}-rate`, 0.5, 2, 1))
    setPitchState(readNumber(`${storageKey}-pitch`, 0.5, 1.5, 1))
    setVolumeState(readNumber(`${storageKey}-volume`, 0, 1, 1))
    setLanguageChoiceState(readStored(`${storageKey}-language`) ?? 'auto')
    setPageLanguage(detectPageLanguage())

    loadVoices()
    window.speechSynthesis.addEventListener?.('voiceschanged', loadVoices)
    const unobserve = observePageLanguage(setPageLanguage)

    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', loadVoices)
      unobserve()
      window.speechSynthesis.cancel()
    }
  }, [loadVoices, storageKey])

  /**
   * Each language keeps its own chosen voice, so switching the page to Dutch
   * and back does not lose the English voice that was picked for it.
   */
  useEffect(() => {
    if (!voices.length) return
    const saved = readStored(voiceKey(targetLanguage)) ?? undefined
    const next = pickVoiceForLanguage(voices, targetLanguage, saved)
    setVoiceURIState(next?.voiceURI ?? '')
  }, [voices, targetLanguage, voiceKey])

  /* --- speaking --------------------------------------------------------- */

  const resolveVoice = useCallback(
    (language: string): SpeechSynthesisVoice | undefined => {
      const list = voicesRef.current
      if (!list.length) return undefined

      // A voice picked by hand wins, but only for the language it can read.
      const chosen = settingsRef.current.voiceURI
      if (chosen) {
        const match = list.find((v) => v.voiceURI === chosen)
        if (match && voiceMatchesLanguage(match, language)) return match
      }

      const saved = readStored(voiceKey(language)) ?? undefined
      return pickVoiceForLanguage(list, language, saved)
    },
    [voiceKey],
  )

  const speakChunk = useCallback(
    (index: number) => {
      const session = sessionRef.current
      if (session.stopped) return

      const list = chunksRef.current
      if (!list.length || index >= list.length) {
        stop()
        return
      }

      const generation = session.generation
      const chunk = list[index]
      indexRef.current = index
      setCurrentIndex(index)
      if (chunk.element) highlightChunk(chunk.element)

      const { rate: r, pitch: p, volume: v } = settingsRef.current
      const language = activeLanguageRef.current

      const utterance = new SpeechSynthesisUtterance(chunk.text)
      utterance.rate = r
      utterance.pitch = p
      utterance.volume = v

      const voice = resolveVoice(language)
      if (voice) utterance.voice = voice
      // Set regardless: with no installed voice for the language this is the
      // only hint the engine gets, and some of them honour it.
      utterance.lang = voice?.lang ?? language

      utterance.onend = () => {
        const current = sessionRef.current
        if (current.generation !== generation || current.stopped || current.paused) {
          return
        }
        window.setTimeout(() => {
          const after = sessionRef.current
          if (after.generation !== generation || after.stopped || after.paused) return
          speakChunk(index + 1)
        }, GAP_BETWEEN_CHUNKS)
      }

      utterance.onerror = (event) => {
        const current = sessionRef.current
        if (current.generation !== generation || current.stopped) return
        if (event.error === 'interrupted' || event.error === 'canceled') return
        if (index < list.length - 1) speakChunk(index + 1)
        else stop()
      }

      window.speechSynthesis.speak(utterance)
      setStatus(session.paused ? 'paused' : 'playing')
    },
    [resolveVoice, stop],
  )

  /** Replace whatever is being said with these lines. */
  const speak = useCallback(
    (source: SpeechSource): boolean => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return false

      const list: SpeechChunk[] = source
        .map((s) => ({ ...s, text: s.text.trim() }))
        .filter((s) => s.text.length > 0)
        .map((s, index) => ({ index, ...s }))

      if (!list.length) return false

      // Judge the language from the words about to be read, not from the page
      // around them: this is the text a translator will have rewritten.
      const sample = list
        .map((c) => c.text)
        .join(' ')
        .slice(0, 4000)
      const detected = detectPageLanguage(sample)
      setPageLanguage(detected)
      activeLanguageRef.current =
        languageChoiceRef.current === 'auto' ? detected : languageChoiceRef.current

      sessionRef.current.generation += 1
      sessionRef.current.stopped = false
      sessionRef.current.paused = false
      window.speechSynthesis.cancel()
      clearChunkHighlights()

      chunksRef.current = list
      setChunks(list)
      indexRef.current = 0
      setCurrentIndex(0)

      window.setTimeout(() => speakChunk(0), AFTER_CANCEL)
      return true
    },
    [speakChunk],
  )

  const pause = useCallback(() => {
    if (!window.speechSynthesis.speaking || window.speechSynthesis.paused) return
    sessionRef.current.paused = true
    window.speechSynthesis.pause()
    setStatus('paused')
  }, [])

  const resume = useCallback(() => {
    if (!sessionRef.current.paused) return
    sessionRef.current.paused = false
    if (window.speechSynthesis.paused) window.speechSynthesis.resume()
    setStatus('playing')
  }, [])

  const skip = useCallback(
    (delta: number) => {
      const next = indexRef.current + delta
      if (next < 0 || next >= chunksRef.current.length) return

      sessionRef.current.generation += 1
      sessionRef.current.paused = false
      sessionRef.current.stopped = false
      window.speechSynthesis.cancel()
      window.setTimeout(() => speakChunk(next), 80)
    },
    [speakChunk],
  )

  /* --- settings --------------------------------------------------------- */

  const setRate = useCallback(
    (value: number) => {
      setRateState(value)
      writeStored(`${storageKey}-rate`, String(value))
    },
    [storageKey],
  )

  const setPitch = useCallback(
    (value: number) => {
      setPitchState(value)
      writeStored(`${storageKey}-pitch`, String(value))
    },
    [storageKey],
  )

  const setVolume = useCallback(
    (value: number) => {
      setVolumeState(value)
      writeStored(`${storageKey}-volume`, String(value))
    },
    [storageKey],
  )

  const setVoiceURI = useCallback(
    (uri: string) => {
      setVoiceURIState(uri)
      if (!uri) return
      const voice = voicesRef.current.find((v) => v.voiceURI === uri)
      // Filed under the language it speaks, not the one on screen, so picking
      // a Dutch voice while reading Dutch is remembered as the Dutch choice.
      writeStored(voiceKey(voice ? voice.lang : targetLanguage), uri)
      if (voice) activeLanguageRef.current = voice.lang
    },
    [voiceKey, targetLanguage],
  )

  const setLanguageChoice = useCallback(
    (choice: LanguageChoice) => {
      setLanguageChoiceState(choice)
      writeStored(`${storageKey}-language`, choice)
    },
    [storageKey],
  )

  /* --- derived ---------------------------------------------------------- */

  const isActive = status === 'playing' || status === 'paused'
  const progress = chunks.length > 0 ? ((currentIndex + 1) / chunks.length) * 100 : 0

  /** No installed voice can read what is on screen; the UI should say so. */
  const voiceMissing = useMemo(
    () => voices.length > 0 && !voices.some((v) => voiceMatchesLanguage(v, targetLanguage)),
    [voices, targetLanguage],
  )

  return {
    supported,
    status,
    isActive,
    chunks,
    currentIndex,
    progress,
    rate,
    setRate,
    pitch,
    setPitch,
    volume,
    setVolume,
    voices,
    voiceURI,
    setVoiceURI,
    languageChoice,
    setLanguageChoice,
    pageLanguage,
    targetLanguage,
    voiceMissing,
    speak,
    stop,
    pause,
    resume,
    skip,
  }
}
