import {
  containsEveryTerm,
  normalizeSearchText,
  searchTerms,
} from '@/lib/searchText'

export interface Chapter {
  id: string
  number: string
  reference: string
  content: string
}

export interface Book {
  id: string
  name: string
  abbreviation: string
  chapters: Chapter[]
}

export interface BibleData {
  bibleName: string
  bibleId: string
  books: Book[]
}

export type Testament = 'old' | 'new'
export type MatchMode = 'smart' | 'phrase' | 'all' | 'any'

export interface SearchOptions {
  query: string
  testament: 'all' | Testament
  bookId: string | null
  matchMode: MatchMode
  caseSensitive: boolean
}

export interface SearchResult {
  bookId: string
  bookName: string
  testament: Testament
  chapterId: string
  chapterNumber: string
  reference: string
  verseNumber: number
  text: string
}

const NT_BOOK_IDS = new Set([
  'MAT', 'MRK', 'LUK', 'JHN', 'ACT', 'ROM', '1CO', '2CO', 'GAL', 'EPH',
  'PHP', 'COL', '1TH', '2TH', '1TI', '2TI', 'TIT', 'PHM', 'HEB', 'JAS',
  '1PE', '2PE', '1JN', '2JN', '3JN', 'JUD', 'REV',
])

export const MAX_SEARCH_RESULTS = 150

export function getTestament(bookId: string): Testament {
  return NT_BOOK_IDS.has(bookId) ? 'new' : 'old'
}

/** Extra names people actually type. Ids and full names are added from the data. */
const BOOK_ALIASES: Record<string, string[]> = {
  GEN: ['gen', 'gn', 'ge'],
  EXO: ['ex', 'exo', 'exod'],
  LEV: ['lev', 'le', 'lv'],
  NUM: ['num', 'nu', 'nm'],
  DEU: ['deut', 'dt', 'deu'],
  JOS: ['josh', 'jos'],
  JDG: ['judg', 'jdg', 'jdgs', 'judges'],
  RUT: ['ru', 'rut'],
  '1SA': ['1 sam', '1sa', '1sm', '1 samuel'],
  '2SA': ['2 sam', '2sa', '2sm', '2 samuel'],
  '1KI': ['1 kgs', '1ki', '1 kings'],
  '2KI': ['2 kgs', '2ki', '2 kings'],
  '1CH': ['1 chr', '1ch', '1 chronicles'],
  '2CH': ['2 chr', '2ch', '2 chronicles'],
  EZR: ['ezr'],
  NEH: ['neh', 'ne'],
  EST: ['est', 'es'],
  JOB: ['job'],
  PSA: ['ps', 'psa', 'psalm', 'psalms'],
  PRO: ['prov', 'pr', 'prv'],
  ECC: ['eccl', 'ecc'],
  SNG: ['song', 'sos', 'canticle', 'song of songs', 'song of solomon'],
  ISA: ['isa', 'is'],
  JER: ['jer', 'je'],
  LAM: ['lam', 'la'],
  EZK: ['ezek', 'eze', 'ezk'],
  DAN: ['dan', 'da', 'dn'],
  HOS: ['hos', 'ho'],
  JOL: ['joel', 'joe'],
  AMO: ['amos', 'am'],
  OBA: ['obad', 'ob'],
  JON: ['jonah', 'jnh'],
  MIC: ['mic', 'mi'],
  NAM: ['nah'],
  HAB: ['hab'],
  ZEP: ['zeph', 'zep'],
  HAG: ['hag'],
  ZEC: ['zech', 'zec'],
  MAL: ['mal'],
  MAT: ['matt', 'mt', 'mat', 'matthew'],
  MRK: ['mk', 'mr', 'mrk', 'mark'],
  LUK: ['lk', 'lu', 'luk', 'luke'],
  JHN: ['jn', 'joh', 'jhn', 'john'],
  ACT: ['acts', 'ac'],
  ROM: ['rom', 'ro', 'rm'],
  '1CO': ['1 cor', '1co', '1 corinthians'],
  '2CO': ['2 cor', '2co', '2 corinthians'],
  GAL: ['gal', 'ga'],
  EPH: ['eph'],
  PHP: ['phil', 'php'],
  COL: ['col'],
  '1TH': ['1 thess', '1th', '1 thessalonians'],
  '2TH': ['2 thess', '2th', '2 thessalonians'],
  '1TI': ['1 tim', '1ti', '1 timothy'],
  '2TI': ['2 tim', '2ti', '2 timothy'],
  TIT: ['tit'],
  PHM: ['phlm', 'phm', 'philemon'],
  HEB: ['heb'],
  JAS: ['jas', 'jm', 'james'],
  '1PE': ['1 pet', '1pe', '1pt', '1 peter'],
  '2PE': ['2 pet', '2pe', '2pt', '2 peter'],
  '1JN': ['1 jn', '1jo', '1jn', '1 john'],
  '2JN': ['2 jn', '2jo', '2jn', '2 john'],
  '3JN': ['3 jn', '3jo', '3jn', '3 john'],
  JUD: ['jude'],
  REV: ['rev', 're', 'revelation'],
}

interface BookAlias {
  key: string
  book: Book
}

function bookAliases(books: Book[]): BookAlias[] {
  const entries: BookAlias[] = []
  for (const book of books) {
    const keys = new Set<string>([
      normalizeSearchText(book.name),
      normalizeSearchText(book.id),
      normalizeSearchText(book.abbreviation),
      ...(BOOK_ALIASES[book.id] ?? []),
    ])
    for (const key of keys) {
      if (key) entries.push({ key, book })
    }
  }
  return entries.sort((a, b) => b.key.length - a.key.length)
}

interface ParsedReference {
  book: Book
  chapter: Chapter
  verseFrom: number | null
  verseTo: number | null
}

function parseReference(query: string, books: Book[]): ParsedReference | null {
  const normalised = normalizeSearchText(query)
  if (!normalised) return null

  for (const { key, book } of bookAliases(books)) {
    if (normalised !== key && !normalised.startsWith(`${key} `)) continue
    const rest = normalised.slice(key.length).trim()
    if (!rest) return null

    const parts = rest.split(' ')
    if (parts.length > 3 || !parts.every((part) => /^\d+$/.test(part))) continue

    const chapter = book.chapters.find((entry) => entry.number === parts[0])
    if (!chapter) return null

    const verseFrom = parts[1] ? Number(parts[1]) : null
    const verseTo = parts[2] ? Number(parts[2]) : verseFrom
    return { book, chapter, verseFrom, verseTo }
  }

  return null
}

function parseVerses(content: string): Array<{ verseNumber: number; text: string }> {
  const verses: Array<{ verseNumber: number; text: string }> = []
  const pattern = /\[(\d+)\]([\s\S]*?)(?=\[\d+\]|$)/g
  let match: RegExpExecArray | null

  while ((match = pattern.exec(content)) !== null) {
    const text = match[2].trim()
    if (!text) continue
    verses.push({
      verseNumber: Number.parseInt(match[1], 10),
      text,
    })
  }

  if (verses.length === 0 && content.trim()) {
    verses.push({ verseNumber: 1, text: content.trim() })
  }

  return verses
}

function toResult(
  book: Book,
  chapter: Chapter,
  verse: { verseNumber: number; text: string },
): SearchResult {
  return {
    bookId: book.id,
    bookName: book.name,
    testament: getTestament(book.id),
    chapterId: chapter.id,
    chapterNumber: chapter.number,
    reference: `${book.name} ${chapter.number}:${verse.verseNumber}`,
    verseNumber: verse.verseNumber,
    text: verse.text,
  }
}

function haystackFor(text: string, caseSensitive: boolean): string {
  return caseSensitive ? text.trim().replace(/\s+/g, ' ') : normalizeSearchText(text)
}

function rankVerse(
  haystack: string,
  phrase: string,
  terms: string[],
  matchMode: MatchMode,
): number | null {
  const hasPhrase = phrase ? haystack.includes(phrase) : false
  const hasAll = containsEveryTerm(haystack, terms)
  const hasAny = terms.some((term) => containsEveryTerm(haystack, [term]))

  if (matchMode === 'phrase') return hasPhrase ? 1 : null
  if (matchMode === 'all') return hasAll ? (hasPhrase ? 1 : 2) : null
  if (matchMode === 'any') {
    if (hasPhrase) return 1
    if (hasAll) return 2
    if (hasAny) return 3
    return null
  }

  if (hasPhrase) return 1
  if (hasAll) return 2
  return null
}

function referenceResults(parsed: ParsedReference): SearchResult[] {
  const verses = parseVerses(parsed.chapter.content)
  if (parsed.verseFrom == null) {
    const first = verses[0]
    return first ? [toResult(parsed.book, parsed.chapter, first)] : []
  }

  return verses
    .filter(
      (verse) =>
        verse.verseNumber >= parsed.verseFrom! &&
        verse.verseNumber <= (parsed.verseTo ?? parsed.verseFrom!),
    )
    .map((verse) => toResult(parsed.book, parsed.chapter, verse))
}

export function searchBible(bibleData: BibleData, options: SearchOptions): SearchResult[] {
  const terms = searchTerms(options.query)
  if (terms.length === 0) return []

  const phrase = terms.join(' ')
  const parsed = options.caseSensitive ? null : parseReference(options.query, bibleData.books)
  const seen = new Set<string>()
  const buckets: SearchResult[][] = [[], [], [], []]

  const take = (result: SearchResult, rank: number) => {
    const key = `${result.chapterId}:${result.verseNumber}`
    if (seen.has(key)) return
    seen.add(key)
    buckets[rank].push(result)
  }

  if (parsed) {
    const testament = getTestament(parsed.book.id)
    const inTestament =
      options.testament === 'all' || options.testament === testament
    const inBook = !options.bookId || options.bookId === parsed.book.id
    if (inTestament && inBook) {
      for (const result of referenceResults(parsed)) take(result, 0)
    }
  }

  for (const book of bibleData.books) {
    const testament = getTestament(book.id)
    if (options.testament !== 'all' && options.testament !== testament) continue
    if (options.bookId && options.bookId !== book.id) continue

    for (const chapter of book.chapters) {
      for (const verse of parseVerses(chapter.content)) {
        const haystack = haystackFor(verse.text, options.caseSensitive)
        const rank = rankVerse(haystack, phrase, terms, options.matchMode)
        if (rank == null) continue
        take(toResult(book, chapter, verse), rank)
      }
    }
  }

  return buckets.flat().slice(0, MAX_SEARCH_RESULTS)
}

export function highlightMatch(text: string, query: string, caseSensitive: boolean): string {
  const terms = searchTerms(query)
  if (terms.length === 0) return text

  const flags = caseSensitive ? 'g' : 'gi'
  const escaped = terms.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escaped.join('|')})`, flags)
  return text.replace(regex, '<mark class="search-highlight">$1</mark>')
}

export function bookMatchesQuery(book: { name: string; id: string; abbreviation: string }, query: string): boolean {
  const terms = searchTerms(query)
  if (terms.length === 0) return true
  const haystack = normalizeSearchText(`${book.name} ${book.id} ${book.abbreviation}`)
  return containsEveryTerm(haystack, terms) || haystack.includes(terms.join(' '))
}
