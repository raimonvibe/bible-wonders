'use client'

import { Droplet, Leaf } from 'lucide-react'
import { useTheme } from '@/components/ThemeProvider'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        theme === 'pine'
          ? 'Switch to the blue New Testament theme'
          : 'Switch to the green Old Testament theme'
      }
      title={theme === 'pine' ? 'Green theme' : 'Blue theme'}
      className="btn-surface p-2.5 rounded-xl duration-200 hover:scale-105 shadow-md"
    >
      {theme === 'pine' ? (
        <Leaf className="w-5 h-5" aria-hidden="true" />
      ) : (
        <Droplet className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}
