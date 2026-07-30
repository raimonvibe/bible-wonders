/**
 * The shape of a single wonder in the master catalog.
 *
 * Phase 5 builds the index: every wonder exists as a row with its passage and
 * its tags. The card prose (`quote`, `whatHappened`, `hopeMeaning`, …) is
 * filled in batches during Phase 7, so those fields are optional and
 * `isAuthored()` is what the UI uses to tell a finished card from a stub.
 */

import type { PassageRef } from '@/lib/passages'

export type TestamentId = 'old' | 'new'

/** Coarse grouping for the "By theme" reading path. */
export type Theme =
  | 'healing'
  | 'raising'
  | 'nature'
  | 'provision'
  | 'rescue'
  | 'judgment'
  | 'sign'

/**
 * Coarse grouping for the "By book / era" reading path. Old Testament eras are
 * spans; the New Testament is split by book, because the same event told by
 * Matthew and by Luke are two separate wonders here.
 */
export type Era =
  | 'torah'
  | 'conquest'
  | 'kingdoms'
  | 'prophets'
  | 'exile'
  | 'matthew'
  | 'mark'
  | 'luke'
  | 'john'
  | 'acts'

export interface Wonder {
  /** Stable kebab-case id; for parallels, suffixed with the book (`-mat`). */
  id: string
  title: string
  testament: TestamentId
  passage: PassageRef
  theme: Theme
  era: Era

  /**
   * Accounts of the same event share this id, so each card can offer
   * "Also in Matthew · Luke" links. Absent when an event is told only once.
   */
  parallelGroupId?: string

  /**
   * Curator-defined, lower = better known. Drives the best-known sort and the
   * Start Here shortlist. Absent means "not ranked yet".
   */
  familiarityRank?: number

  /** e.g. "The shore of the Red Sea, at the edge of Egypt". */
  location?: string

  /* --- card content: authored in Phase 7 --------------------------------- */

  /** Verbatim WEB quotation used as the pull quote. */
  quote?: string
  quoteRef?: string
  /** Short, plain-language, notable details of the scene. */
  details?: string[]
  whatHappened?: string
  hopeMeaning?: string
  reflectionQuestion?: string
  /**
   * For Gospel parallels: what *this* account stresses that the others do not.
   * Rule (a) from PLAN.md.
   */
  distinctive?: string
  /** Extra places to read, offered as secondary links. */
  alsoSee?: PassageRef[]
}

/** A wonder whose card has been written, as opposed to an index-only stub. */
export function isAuthored(w: Wonder): boolean {
  return Boolean(w.whatHappened && w.hopeMeaning && w.reflectionQuestion)
}

export const THEME_LABELS: Record<Theme, string> = {
  healing: 'Healings',
  raising: 'Raisings',
  nature: 'Nature signs',
  provision: 'Provision',
  rescue: 'Rescue',
  judgment: 'Judgment',
  sign: 'Signs and appearances',
}

export const ERA_LABELS: Record<Era, string> = {
  torah: 'Torah',
  conquest: 'Conquest and Judges',
  kingdoms: 'Kingdoms',
  prophets: 'Prophets',
  exile: 'Exile',
  matthew: 'Matthew',
  mark: 'Mark',
  luke: 'Luke',
  john: 'John',
  acts: 'Acts and the early church',
}

/** Reading order for the era filter. */
export const ERA_ORDER: Era[] = [
  'torah',
  'conquest',
  'kingdoms',
  'prophets',
  'exile',
  'matthew',
  'mark',
  'luke',
  'john',
  'acts',
]
