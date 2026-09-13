'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  getReadableChunks,
  getSelectionChunk,
  updateSelectionCache,
} from '@/lib/readAloud'
import { useSpeechEngine, type SpeechSource } from '@/hooks/useSpeechEngine'

export type ReadAloudStatus = 'idle' | 'playing' | 'paused'

export type ReadMode = 'page' | 'selection'

/**
 * The page reader behind the Listen button.
 *
 * Only decides *what* to read — the whole of #main-content, or the reader's
 * own selection. Transport, voices and language live in useSpeechEngine,
 * shared with the guided tour.
 */
export function useReadAloud() {
  const engine = useSpeechEngine('read-aloud')
  const [mode, setMode] = useState<ReadMode>('page')

  const { supported, status, speak, stop, pause, resume } = engine

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onStop = () => stop()
    window.addEventListener('read-aloud-stop', onStop)
    document.addEventListener('selectionchange', updateSelectionCache)
    return () => {
      window.removeEventListener('read-aloud-stop', onStop)
      document.removeEventListener('selectionchange', updateSelectionCache)
    }
  }, [stop])

  const start = useCallback(
    (readMode: ReadMode = 'page'): boolean => {
      const root = document.getElementById('main-content')
      if (!supported || !root) return false

      let source: SpeechSource

      if (readMode === 'selection') {
        const selected = getSelectionChunk()
        if (!selected) return false
        source = [{ text: selected.text, element: selected.element }]
      } else {
        source = getReadableChunks(root).map((chunk) => ({
          text: chunk.text,
          element: chunk.element,
        }))
      }

      if (!source.length) return false

      setMode(readMode)
      // Lets the guided tour's narration stand down rather than talk over us.
      window.dispatchEvent(new CustomEvent('read-aloud-started'))
      return speak(source)
    },
    [supported, speak],
  )

  const togglePlayPause = useCallback(() => {
    if (status === 'playing') pause()
    else if (status === 'paused') resume()
    else start(mode)
  }, [status, pause, resume, start, mode])

  return { ...engine, mode, start, togglePlayPause }
}
