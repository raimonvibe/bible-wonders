/**
 * The master catalog: every wonder, in Bible order, plus the lookups the
 * reading paths need.
 *
 * `node scripts/validate-wonders.js` checks every reference in here against the
 * WEB text the app ships, and enforces unique ids and ranks.
 */

import { normalizeSearchText, searchTerms } from '@/lib/searchText'
import { OLD_TESTAMENT_WONDERS } from './oldTestament'
import { NEW_TESTAMENT_WONDERS } from './newTestament'
import {
  collectionContains,
  ERA_ORDER,
  isAuthored,
  type Collection,
  type Era,
  type Theme,
  type Wonder,
} from './types'

/** Bible order — this is the default reading order. */
export const WONDERS: Wonder[] = [
  ...OLD_TESTAMENT_WONDERS,
  ...NEW_TESTAMENT_WONDERS,
]

export const WONDER_COUNT = WONDERS.length

const BY_ID = new Map(WONDERS.map((w) => [w.id, w]))

export function wonderById(id: string): Wonder | undefined {
  return BY_ID.get(id)
}

/** Wonders whose card prose has been written (Phase 7 fills the rest). */
export function authoredWonders(): Wonder[] {
  return WONDERS.filter(isAuthored)
}

/**
 * The other accounts of the same event, in Bible order — what a card's
 * "Also in Matthew · Luke" links point at. Empty when nothing parallels it.
 */
export function parallelsOf(wonder: Wonder): Wonder[] {
  if (!wonder.parallelGroupId) return []
  return WONDERS.filter(
    (w) => w.parallelGroupId === wonder.parallelGroupId && w.id !== wonder.id,
  )
}

/**
 * Best-known first. Ranked wonders lead in curator order; everything unranked
 * follows in Bible order, so the full catalog is always completely covered.
 */
export function byFamiliarity(wonders: Wonder[] = WONDERS): Wonder[] {
  const ranked = wonders
    .filter((w) => w.familiarityRank != null)
    .sort((a, b) => a.familiarityRank! - b.familiarityRank!)
  const rest = wonders.filter((w) => w.familiarityRank == null)
  return [...ranked, ...rest]
}

/** The curated on-ramp: the best-known wonders, in curator order. */
export function startHere(limit = 25): Wonder[] {
  return WONDERS.filter((w) => w.familiarityRank != null)
    .sort((a, b) => a.familiarityRank! - b.familiarityRank!)
    .slice(0, limit)
}

export function byTheme(theme: Theme): Wonder[] {
  return WONDERS.filter((w) => w.theme === theme)
}

/**
 * Every wonder in a collection, in Bible order.
 *
 * Unlike `byTheme` these overlap the kinds: the 72 wonders of Jesus are all
 * still counted under Healings, Raisings and the rest.
 */
export function byCollection(collection: Collection): Wonder[] {
  return WONDERS.filter((w) => collectionContains(collection, w))
}

export function byEra(era: Era): Wonder[] {
  return WONDERS.filter((w) => w.era === era)
}

/** Every era that actually has wonders, in reading order. */
export function populatedEras(): Era[] {
  return ERA_ORDER.filter((era) => WONDERS.some((w) => w.era === era))
}

/**
 * A wonder read aloud, in the order the card presents it.
 *
 * Card prose is optional on a catalog row, so anything a not-yet-written
 * wonder is missing is skipped rather than narrated as "undefined".
 */
export function narrationForWonder(w: Wonder): string[] {
  return [
    w.location ? `${w.title}. ${w.location}.` : `${w.title}.`,
    `Reading ${w.passage.label}.`,
    w.distinctive ? `What ${w.passage.bookName} notices.` : '',
    w.distinctive ?? '',
    w.quote ? `${w.quote} ${w.quoteRef ?? ''}.` : '',
    w.whatHappened ?? '',
    w.hopeMeaning ?? '',
    w.reflectionQuestion ? 'Something to consider.' : '',
    w.reflectionQuestion ?? '',
  ].filter(Boolean)
}

/**
 * Ranked search over the catalog, best match first.
 *
 * Three tiers, because each simpler design is wrong on its own. Names only —
 * title, reference, place — misses every query for a person: no card is
 * titled "Jesus", so searching for Him returned nothing at all. Prose
 * included flat makes "sea" return every card that mentions one in passing,
 * ahead of the sea crossings themselves. And scattered terms alone make
 * "Exodus 14" match Exodus 7:14 just as well as Exodus 14, because
 * normalising a reference leaves its numbers as loose words.
 *
 * So: the query as a phrase in the name, then all its terms in the name,
 * then all its terms anywhere on the card. Bible order is preserved inside
 * each tier. Multi-word queries are AND, which is what makes "jesus
 * leprosy" narrow rather than widen.
 */
export function searchWonders(query: string): Wonder[] {
  const terms = searchTerms(query)
  if (terms.length === 0) return []
  const phrase = terms.join(' ')

  const exact: Wonder[] = []
  const named: Wonder[] = []
  const prose: Wonder[] = []

  for (const wonder of WONDERS) {
    const name = nameText(wonder)
    if (name.includes(phrase)) {
      exact.push(wonder)
    } else if (terms.every((term) => name.includes(term))) {
      named.push(wonder)
    } else if (terms.every((term) => proseText(wonder).includes(term))) {
      prose.push(wonder)
    }
  }

  return [...exact, ...named, ...prose]
}

export function wonderMatchCount(query: string): number {
  return searchWonders(query).length
}

const nameCache = new Map<string, string>()
const proseCache = new Map<string, string>()

function nameText(wonder: Wonder): string {
  const cached = nameCache.get(wonder.id)
  if (cached) return cached
  const value = normalizeSearchText(
    [wonder.title, wonder.passage.label, wonder.passage.bookName, wonder.location ?? ''].join(
      ' ',
    ),
  )
  nameCache.set(wonder.id, value)
  return value
}

function proseText(wonder: Wonder): string {
  const cached = proseCache.get(wonder.id)
  if (cached) return cached
  const value = normalizeSearchText(
    [
      nameText(wonder),
      wonder.quote ?? '',
      wonder.quoteRef ?? '',
      wonder.whatHappened ?? '',
      wonder.hopeMeaning ?? '',
      wonder.reflectionQuestion ?? '',
      wonder.distinctive ?? '',
      ...(wonder.details ?? []),
    ].join(' '),
  )
  proseCache.set(wonder.id, value)
  return value
}
