/**
 * The reading paths from PLAN.md's ordering menu (A–F), and the small amount
 * of state that survives a reload.
 *
 *   A  start-here  curated ~25, then a handoff to the full catalog
 *   B  theme       healings, nature signs, provision, …
 *   C  era         Torah, Kingdoms, Matthew, Acts, …
 *   D  catalog     every wonder, sorted best-known
 *   E  (the sort toggle + search, available inside every list)
 *   F  (the first-visit overview, which chooses between the above)
 */

import { byFamiliarity, startHere, WONDERS } from './catalog'
import {
  ERA_LABELS,
  ERA_ORDER,
  THEME_LABELS,
  type Era,
  type Theme,
  type Wonder,
} from './types'

export type PathId = 'start-here' | 'theme' | 'era' | 'catalog'

export type SortMode = 'bible' | 'best-known'

export interface PathState {
  path: PathId
  sort: SortMode
  /** Active filter when path is 'theme' or 'era'; null means "show the picker". */
  theme: Theme | null
  era: Era | null
  query: string
}

export const DEFAULT_PATH_STATE: PathState = {
  path: 'start-here',
  sort: 'bible',
  theme: null,
  era: null,
  query: '',
}

export const PATH_LABELS: Record<PathId, string> = {
  'start-here': 'Start here',
  theme: 'By theme',
  era: 'By book or era',
  catalog: 'Full catalog',
}

export const PATH_BLURBS: Record<PathId, string> = {
  'start-here':
    'The best-known wonders, in a short path you can actually finish.',
  theme: 'Healings, rescues, provision — read one kind at a time.',
  era: 'Walk a stretch of the story: the Torah, the kingdoms, one Gospel.',
  catalog: 'Every wonder in the catalog, sorted however you like.',
}

const PATH_KEY = 'wonders-path'
const SORT_KEY = 'wonders-sort'
const SEEN_OVERVIEW_KEY = 'wonders-seen-overview'
const LAST_WONDER_KEY = 'wonders-last-read'
const TOUR_STEP_KEY = 'wonders-tour-step'

const PATHS: PathId[] = ['start-here', 'theme', 'era', 'catalog']
const SORTS: SortMode[] = ['bible', 'best-known']

export function loadPathState(): PathState {
  const state = { ...DEFAULT_PATH_STATE }
  try {
    const path = localStorage.getItem(PATH_KEY) as PathId | null
    if (path && PATHS.includes(path)) state.path = path
    const sort = localStorage.getItem(SORT_KEY) as SortMode | null
    if (sort && SORTS.includes(sort)) state.sort = sort
  } catch {
    /* private mode: the picker just starts from its defaults */
  }
  return state
}

/** Only the path and sort persist — a filter or a search box should not. */
export function savePathState(state: PathState): void {
  try {
    localStorage.setItem(PATH_KEY, state.path)
    localStorage.setItem(SORT_KEY, state.sort)
  } catch {
    /* ignore */
  }
}

/**
 * PLAN.md: "show beginner overview every first visit". Deliberately keyed
 * separately from the tour's own seen-flag, so meeting the tour does not
 * count as having met the reading paths.
 */
export function hasSeenOverview(): boolean {
  try {
    return localStorage.getItem(SEEN_OVERVIEW_KEY) === 'true'
  } catch {
    return false
  }
}

export function markOverviewSeen(): void {
  try {
    localStorage.setItem(SEEN_OVERVIEW_KEY, 'true')
  } catch {
    /* ignore */
  }
}

/* --- resume ---------------------------------------------------------------
 * Two independent positions, because they are two different ways of reading:
 * the last wonder opened from a list, and how far the guided tour got. Neither
 * is restored automatically — both are offered, so reopening the panel never
 * yanks you somewhere you did not ask to go.
 * ------------------------------------------------------------------------- */

export function rememberLastWonder(id: string): void {
  try {
    localStorage.setItem(LAST_WONDER_KEY, id)
  } catch {
    /* ignore */
  }
}

export function lastWonderId(): string | null {
  try {
    return localStorage.getItem(LAST_WONDER_KEY)
  } catch {
    return null
  }
}

export function rememberTourStep(step: number): void {
  try {
    if (step > 0) localStorage.setItem(TOUR_STEP_KEY, String(step))
    else localStorage.removeItem(TOUR_STEP_KEY)
  } catch {
    /* ignore */
  }
}

export function savedTourStep(): number {
  try {
    const raw = Number(localStorage.getItem(TOUR_STEP_KEY))
    return Number.isInteger(raw) && raw > 0 ? raw : 0
  } catch {
    return 0
  }
}

export function clearTourStep(): void {
  try {
    localStorage.removeItem(TOUR_STEP_KEY)
  } catch {
    /* ignore */
  }
}

/** The wonders a given path and filter should list, in the chosen order. */
export function wondersFor(state: PathState): Wonder[] {
  let list: Wonder[]

  switch (state.path) {
    case 'start-here':
      // Curator order is the whole point of this path, so it ignores the sort.
      return startHere()
    case 'theme':
      list = state.theme ? WONDERS.filter((w) => w.theme === state.theme) : []
      break
    case 'era':
      list = state.era ? WONDERS.filter((w) => w.era === state.era) : []
      break
    case 'catalog':
      list = WONDERS
      break
  }

  const q = state.query.trim().toLowerCase()
  if (q) {
    list = list.filter(
      (w) =>
        w.title.toLowerCase().includes(q) ||
        w.passage.label.toLowerCase().includes(q) ||
        (w.location ?? '').toLowerCase().includes(q),
    )
  }

  return state.sort === 'best-known' ? byFamiliarity(list) : list
}

/** Theme filters that actually have wonders behind them, with counts. */
export function themeOptions(): Array<{ id: Theme; label: string; count: number }> {
  return (Object.keys(THEME_LABELS) as Theme[])
    .map((id) => ({
      id,
      label: THEME_LABELS[id],
      count: WONDERS.filter((w) => w.theme === id).length,
    }))
    .filter((t) => t.count > 0)
}

/** Eras in reading order, not object-key order. */
export function eraOptions(): Array<{ id: Era; label: string; count: number }> {
  return ERA_ORDER
    .map((id) => ({
      id,
      label: ERA_LABELS[id],
      count: WONDERS.filter((w) => w.era === id).length,
    }))
    .filter((e) => e.count > 0)
}
