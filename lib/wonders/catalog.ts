/**
 * The master catalog: every wonder, in Bible order, plus the lookups the
 * reading paths need.
 *
 * `node scripts/validate-wonders.js` checks every reference in here against the
 * WEB text the app ships, and enforces unique ids and ranks.
 */

import { OLD_TESTAMENT_WONDERS } from './oldTestament'
import { NEW_TESTAMENT_WONDERS } from './newTestament'
import { ERA_ORDER, isAuthored, type Era, type Theme, type Wonder } from './types'

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

export function searchWonders(query: string): Wonder[] {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return WONDERS.filter(
    (w) =>
      w.title.toLowerCase().includes(q) ||
      w.passage.label.toLowerCase().includes(q) ||
      (w.location ?? '').toLowerCase().includes(q),
  )
}
