'use client'

import { useMemo, useState } from 'react'
import { Book, ScrollText, Search } from 'lucide-react'
import { bookMatchesQuery } from '@/lib/bibleSearch'

interface BookSelectorProps {
  books: Array<{ id: string; name: string; abbreviation: string; chapters: any[] }>
  selectedBookId: string | null
  onSelectBook: (bookId: string) => void
}

export default function BookSelector({ books, selectedBookId, onSelectBook }: BookSelectorProps) {
  const [query, setQuery] = useState('')
  const ntBookIds = ['MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
                     'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS',
                     '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV']

  const visibleBooks = useMemo(
    () => books.filter((book) => bookMatchesQuery(book, query)),
    [books, query],
  )
  const oldTestamentBooks = visibleBooks.filter(book => !ntBookIds.some(id => book.id.includes(id)))
  const newTestamentBooks = visibleBooks.filter(book => ntBookIds.some(id => book.id.includes(id)))

  const renderBookGrid = (booksList: typeof books) => (
    <div className="grid-books">
      {booksList.map((book) => (
        <button
          key={book.id}
          onClick={() => onSelectBook(book.id)}
          aria-label={`${book.name}, ${book.chapters.length} chapter${book.chapters.length !== 1 ? 's' : ''}`}
          aria-pressed={selectedBookId === book.id}
          className={`
            p-3 md:p-4 rounded-xl transition-all duration-200
            text-left hover:scale-105 hover:shadow-lg
            ${
              selectedBookId === book.id
                ? 'bg-selection-gradient text-white shadow-lg scale-105'
                : 'btn-surface hover:shadow-md'
            }
          `}
        >
          <div className="font-display font-semibold text-sm md:text-base mb-1">
            {book.name}
          </div>
          <div
            className={`text-xs ${
              selectedBookId === book.id
                ? 'text-pine-50 dark:text-ocean-100'
                : 'text-pine-300 dark:text-ocean-400'
            }`}
            aria-hidden="true"
          >
            {book.chapters.length} chapter{book.chapters.length !== 1 ? 's' : ''}
          </div>
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-8">
      <div className="relative" data-read-aloud-ignore>
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-pine-300 dark:text-ocean-300" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Find a book… John, Psalms, 1 Kings"
          aria-label="Find a book by name"
          className="w-full rounded-xl border border-pine-600 bg-pine-900/60 py-3 pl-10 pr-4 font-sans text-sm text-pine-50 placeholder:text-pine-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 dark:border-ocean-600 dark:bg-ocean-900/60 dark:text-ocean-100 dark:placeholder:text-ocean-400"
          autoComplete="off"
        />
      </div>

      {query.trim() && visibleBooks.length === 0 && (
        <p className="rounded-xl border border-dashed border-pine-600 p-4 font-sans text-sm text-pine-200 dark:border-ocean-700 dark:text-ocean-300">
          No book matches “{query}”. Try John, Psalms, or 1 Kings.
        </p>
      )}

      {oldTestamentBooks.length > 0 && (
      <section data-read-aloud-block className="card-surface p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-pine-600 dark:border-ocean-700">
          <div className="flex items-center gap-3">
            <ScrollText className="w-7 h-7 md:w-8 md:h-8 text-amber-700 dark:text-amber-500" aria-hidden="true" />
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-pine-100 dark:text-ocean-50">
                Old Testament
              </h2>
              <p className="text-sm text-pine-300 dark:text-ocean-400 font-sans mt-1">
                {oldTestamentBooks.length} books • {oldTestamentBooks.reduce((sum, book) => sum + book.chapters.length, 0)} chapters
              </p>
            </div>
          </div>
        </div>

        <nav data-read-aloud-ignore aria-label="Old Testament book selection">
          {renderBookGrid(oldTestamentBooks)}
        </nav>
      </section>
      )}

      {newTestamentBooks.length > 0 && (
      <section data-read-aloud-block className="card-surface p-4 md:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-pine-600 dark:border-ocean-700">
          <div className="flex items-center gap-3">
            <Book className="w-7 h-7 md:w-8 md:h-8 text-blue-700 dark:text-blue-400" aria-hidden="true" />
            <div>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-pine-100 dark:text-ocean-50">
                New Testament
              </h2>
              <p className="text-sm text-pine-300 dark:text-ocean-400 font-sans mt-1">
                {newTestamentBooks.length} books • {newTestamentBooks.reduce((sum, book) => sum + book.chapters.length, 0)} chapters
              </p>
            </div>
          </div>
        </div>

        <nav data-read-aloud-ignore aria-label="New Testament book selection">
          {renderBookGrid(newTestamentBooks)}
        </nav>
      </section>
      )}
    </div>
  )
}
