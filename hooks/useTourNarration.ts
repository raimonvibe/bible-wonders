'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSpeechEngine, type SpeechSource } from '@/hooks/useSpeechEngine'

const MODE_KEY = 'tour-speech-mode'

/**
 * What narration reads. `tour` is the default: the guide's own words only, so
 * turning speech on never surprises you with a chapter of scripture.
 */
export type SpeechMode = 'tour' | 'passage' | 'both'

const MODES: SpeechMode[] = ['tour', 'passage', 'both']

/** Marks the stop event the tour fires at the page reader, so it can ignore it. */
export const TOUR_SPEECH_SOURCE = 'guided-tour'

function writeStored(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* private mode: the setting just won't persist */
  }
}

/**
 * Narration for the guided tour and the wonder cards.
 *
 * The same engine the page reader uses, on the same settings, so a voice,
 * language or speed chosen in either is the one both read with. The tour adds
 * only what is its own: whether the reader is listening — which carries on to
 * the next card or step as they move — and whether to read the card, the
 * passage behind it, or both.
 *
 * Listening is not remembered between visits: a page that starts talking the
 * moment it opens is a surprise, and iPhones refuse it anyway.
 */
export function useTourNarration() {
  const engine = useSpeechEngine('read-aloud')
  const [enabled, setEnabledState] = useState(false)
  const [mode, setModeState] = useState<SpeechMode>('tour')

  const { stop, speak: engineSpeak } = engine

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    try {
      const saved = localStorage.getItem(MODE_KEY) as SpeechMode | null
      if (saved && MODES.includes(saved)) setModeState(saved)
    } catch {
      /* keep the default */
    }

    // Yield if the page-level Listen toolbar takes over.
    const onOtherReaderStarted = () => {
      setEnabledState(false)
      stop()
    }
    window.addEventListener('read-aloud-started', onOtherReaderStarted)
    return () =>
      window.removeEventListener('read-aloud-started', onOtherReaderStarted)
  }, [stop])

  const speak = useCallback(
    (source: SpeechSource) => {
      // Silence the page reader, tagged so it doesn't bounce back at us.
      window.dispatchEvent(
        new CustomEvent('read-aloud-stop', {
          detail: { source: TOUR_SPEECH_SOURCE },
        }),
      )
      return engineSpeak(source)
    },
    [engineSpeak],
  )

  const setEnabled = useCallback(
    (next: boolean) => {
      setEnabledState(next)
      if (!next) stop()
    },
    [stop],
  )

  const setMode = useCallback((value: SpeechMode) => {
    setModeState(value)
    writeStored(MODE_KEY, value)
  }, [])

  return {
    ...engine,
    speak,
    enabled,
    setEnabled,
    mode,
    setMode,
    speaking: engine.status === 'playing',
  }
}
