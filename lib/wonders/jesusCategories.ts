/**
 * Sub-categories for the Wonders of Jesus collection.
 *
 * `Theme` is deliberately coarse and files every exorcism under either rescue
 * or healing. Inside the Gospels, readers expect to tell a healing of the body
 * from a deliverance from evil spirits, so this is a finer, Gospel-only
 * grouping. Parallel accounts of one event always land in the same category:
 * the map is keyed by `parallelGroupId`, falling back to the wonder id.
 */

import type { Wonder } from './types'

export type JesusCategory =
  | 'healing'
  | 'deliverance'
  | 'raising'
  | 'nature'
  | 'provision'
  | 'glory'

export const JESUS_CATEGORY_LABELS: Record<JesusCategory, string> = {
  healing: 'Healing the sick',
  deliverance: 'Freeing from evil spirits',
  raising: 'Raising the dead',
  nature: 'Power over nature',
  provision: 'Provision and abundance',
  glory: 'Glory and the resurrection',
}

export const JESUS_CATEGORY_ORDER: JesusCategory[] = [
  'healing',
  'deliverance',
  'raising',
  'nature',
  'provision',
  'glory',
]

const BY_KEY: Record<string, JesusCategory> = {
  // healing
  'leper-cleansed': 'healing',
  'centurions-servant': 'healing',
  'peters-mother-in-law': 'healing',
  paralytic: 'healing',
  'bleeding-woman': 'healing',
  'two-blind-men-mat': 'healing',
  'withered-hand': 'healing',
  'blind-at-jericho': 'healing',
  'deaf-and-mute-mrk': 'healing',
  'blind-at-bethsaida-mrk': 'healing',
  'crippled-woman-luk': 'healing',
  'man-with-dropsy-luk': 'healing',
  'ten-lepers-luk': 'healing',
  'severed-ear-luk': 'healing',
  'nobleman-son-jhn': 'healing',
  'bethesda-jhn': 'healing',
  'man-born-blind-jhn': 'healing',
  // deliverance
  'demoniac-in-synagogue': 'deliverance',
  'gerasene-demoniac': 'deliverance',
  'mute-demoniac-mat': 'deliverance',
  'blind-mute-demoniac-mat': 'deliverance',
  'boy-with-demon': 'deliverance',
  'canaanite-daughter': 'deliverance',
  // raising
  'jairus-daughter': 'raising',
  'widows-son-at-nain-luk': 'raising',
  lazarus: 'raising',
  // nature
  'calming-storm': 'nature',
  'walking-on-water': 'nature',
  // provision
  'feeding-5000': 'provision',
  'feeding-4000': 'provision',
  'coin-in-the-fish-mat': 'provision',
  'catch-of-fish-luk': 'provision',
  'catch-of-153-jhn': 'provision',
  cana: 'provision',
  // glory
  transfiguration: 'glory',
  'fig-tree': 'glory',
  resurrection: 'glory',
}

/** The Jesus sub-category of a Gospel wonder, or null for everything else. */
export function jesusCategoryOf(wonder: Wonder): JesusCategory | null {
  return BY_KEY[wonder.parallelGroupId ?? wonder.id] ?? BY_KEY[wonder.id] ?? null
}
