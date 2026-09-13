'use client'

import { useCallback, useEffect, useState } from 'react'
import { useSpeechEngine, type SpeechSource } from '@/hooks/useSpeechEngine'

const ENABLED_KEY = 'tour-speech-on'
const MODE_KEY = 'tour-speech-mode'

/**
 * What narration reads. `tour` is the default: the guide's own words only, so
 * turning speech on never surprises you with a chapter of scripture.
 */
export type SpeechMode = 'tour' | 'passage' | 'both'

const MODES: SpeechMode[] = ['tour', 'passage', 'both']

/** Marks the stop event the tour fires at the page reader, so it can ignore it. */
export const TOUR_SPEECH_SOURCE = 'guided-tour'

function readFlag(key: string, fallback: boolean): boolean {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : raw === 'true'
  } catch {
    return fallback
  }
}

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
 * The same engine the page reader uses, so the two behave identically — the
 * tour adds only what is its own: a master on/off, and whether to read the
 * card, the passage behind it, or both.
 */
export function useTourNarration() {
  const engine = useSpeechEngine('tour-speech')
  const [enabled, setEnabledState] = useState(false)
  const [mode, setModeState] = useState<SpeechMode>('tour')

  const { stop, speak: engineSpeak } = engine

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    setEnabledState(readFlag(ENABLED_KEY, false))
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
      writeStored(ENABLED_KEY, String(next))
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
