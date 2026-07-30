'use client'

import { createContext, useContext, useEffect, useState } from 'react'

/**
 * Both themes are dark. `pine` is the Old Testament green, `ocean` the New
 * Testament blue; the toggle swaps the whole app between them.
 */
type Theme = 'pine' | 'ocean'

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

const STORAGE_KEY = 'wonders-theme'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('pine')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'pine' || stored === 'ocean') setTheme(stored)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    root.classList.toggle('theme-ocean', theme === 'ocean')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme, mounted])

  const toggleTheme = () => setTheme((t) => (t === 'pine' ? 'ocean' : 'pine'))

  // The context is provided during SSR too. Skipping it used to make
  // useTheme() throw on the server, which aborted server rendering of the whole
  // page and left crawlers with an empty document. `theme` starts as 'pine' on
  // both server and client, so the first render matches and the stored theme is
  // applied by the effect above; the inline script in the layout has already
  // set the `theme-ocean` class, so there is no flash.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
