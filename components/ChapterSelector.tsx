'use client'

import { useMemo, useState } from 'react'
import { BookOpen, ChevronLeft, Search } from 'lucide-react'

interface Chapter {
  id: string
  number: string
  reference: string
}

interface ChapterSelectorProps {
  bookName: string
  chapters: Chapter[]
  selectedChapterId: string | null
  onSelectChapter: (chapterId: string) => void
  onBack: () => void
}

export default function ChapterSelector({
  bookName,
  chapters,
  selectedChapterId,
  onSelectChapter,
  onBack,
}: ChapterSelectorProps) {
  const [query, setQuery] = useState('')
  const visible = useMemo(() => {
    const needle = query.trim()
    if (!needle) return chapters
    return chapters.filter((chapter) => chapter.number.startsWith(needle))
  }, [chapters, query])

  return (
    <section data-read-aloud-block className="card-surface p-4 md:p-6 lg:p-8">
      <button
        data-read-aloud-ignore
        onClick={onBack}
        className="flex items-center gap-2 text-pine-200 hover:text-pine-50 dark:text-ocean-300 dark:hover:text-ocean-50 mb-6 transition-colors group"
        aria-label="Go back to book selection"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
        <span className="font-sans text-sm md:text-base">Back to Books</span>
      </button>

      <div className="flex items-center gap-3 mb-6">
        <BookOpen className="w-6 h-6 md:w-7 md:h-7 text-pine-200 dark:text-ocean-300" aria-hidden="true" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-pine-100 dark:text-ocean-50">
          {bookName}
        </h2>
      </div>

      {chapters.length > 24 && (
        <div className="relative mb-6" data-read-aloud-ignore>
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-300 dark:text-ocean-300" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Jump to a chapter…"
            aria-label={`Find a chapter in ${bookName}`}
            inputMode="numeric"
            className="w-full rounded-xl border border-pine-600 bg-pine-900/60 py-3 pl-10 pr-4 font-sans text-sm text-pine-50 placeholder:text-pine-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-ocean-600 dark:bg-ocean-900/60 dark:text-ocean-100 dark:placeholder:text-ocean-400"
            autoComplete="off"
          />
        </div>
      )}

      <nav data-read-aloud-ignore aria-label={`Chapter selection for ${bookName}`}>
        {visible.length === 0 ? (
          <p className="rounded-xl border border-dashed border-pine-600 p-4 font-sans text-sm text-pine-200 dark:border-ocean-700 dark:text-ocean-300">
            No chapter starts with “{query}”.
          </p>
        ) : (
          <div className="grid-chapters">
            {visible.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => onSelectChapter(chapter.id)}
                aria-label={`Chapter ${chapter.number}`}
                aria-pressed={selectedChapterId === chapter.id}
                className={`
                  aspect-square rounded-xl transition-all duration-200
                  flex items-center justify-center font-display font-semibold text-base md:text-lg
                  hover:scale-110 hover:shadow-lg
                  ${
                    selectedChapterId === chapter.id
                      ? 'bg-selection-gradient text-white shadow-lg scale-110'
                      : 'btn-surface hover:shadow-md'
                  }
                `}
              >
                {chapter.number}
              </button>
            ))}
          </div>
        )}
      </nav>
    </section>
  )
}

