import { SOURCE_LANGUAGE, normaliseTag, primarySubtag } from '@/lib/speechLanguage'

export type ReadChunk = {
  index: number
  text: string
  element: HTMLElement
}

const BLOCK_SELECTOR =
  '[data-read-aloud-block], article, section.card-surface'

const READABLE_SELECTOR =
  'h1, h2, h3, h4, p, li, blockquote'

const IGNORE_ANCESTOR =
  '[data-read-aloud-ignore], nav, footer, header, button'

function isIgnored(el: HTMLElement): boolean {
  if (el.closest(IGNORE_ANCESTOR)) return true
  const anchor = el.closest('a')
  if (anchor && !anchor.matches(BLOCK_SELECTOR) && !anchor.hasAttribute('data-read-aloud-block')) {
    return true
  }
  return false
}

/**
 * As isIgnored, but only honours markers inside `root`.
 *
 * The guided tour's panel carries data-read-aloud-ignore so the page reader
 * leaves it alone; when the tour reads its own card that marker is the thing
 * being read, not a reason to skip it.
 */
function isIgnoredWithin(el: HTMLElement, root: HTMLElement): boolean {
  const blocked = el.closest<HTMLElement>(IGNORE_ANCESTOR)
  if (blocked && root.contains(blocked)) return true
  const anchor = el.closest<HTMLElement>('a')
  if (anchor && root.contains(anchor) && !anchor.matches(BLOCK_SELECTOR)) return true
  return false
}

/**
 * The words a reader would see in this element.
 *
 * Read from the rendered DOM rather than from our own source strings, so that
 * whatever has rewritten the page — Google Translate, Chrome, an extension —
 * is what gets spoken. Screen-reader-only text goes: translators rewrite it
 * too, and it is chrome rather than content.
 */
export function extractText(element: HTMLElement): string {
  const clone = element.cloneNode(true) as HTMLElement
  clone
    .querySelectorAll(
      "[data-read-aloud-ignore], button, svg, [aria-hidden='true'], .verse-num, .sr-only",
    )
    .forEach((node) => node.remove())
  return clone.innerText.replace(/\s+/g, ' ').trim()
}

function compareDocumentOrder(a: HTMLElement, b: HTMLElement): number {
  const position = a.compareDocumentPosition(b)
  if (position & Node.DOCUMENT_POSITION_FOLLOWING) return -1
  if (position & Node.DOCUMENT_POSITION_PRECEDING) return 1
  return 0
}

/** Split scripture articles into verse chunks when present */
function expandBlockToChunks(block: HTMLElement): Omit<ReadChunk, 'index'>[] {
  const verses = Array.from(block.querySelectorAll<HTMLElement>('.verse')).filter(
    (el) => !isIgnored(el),
  )

  if (verses.length > 1) {
    return verses
      .map((element) => ({ text: extractText(element), element }))
      .filter((chunk) => chunk.text.length > 0)
  }

  const text = extractText(block)
  return text ? [{ text, element: block }] : []
}

/** One utterance per card/section; scripture articles read verse-by-verse */
export function getReadableChunks(root: HTMLElement): ReadChunk[] {
  const blocks = Array.from(root.querySelectorAll<HTMLElement>(BLOCK_SELECTOR))
    .filter((el) => !isIgnored(el))
    .filter((el, _, arr) =>
      arr.every((other) => other === el || !other.contains(el)),
    )
    .sort(compareDocumentOrder)

  const claimed = new Set<HTMLElement>()
  const chunks: ReadChunk[] = []

  for (const block of blocks) {
    const blockChunks = expandBlockToChunks(block)
    if (!blockChunks.length) continue

    for (const chunk of blockChunks) {
      chunks.push({ index: chunks.length, ...chunk })
    }

    claimed.add(block)
    block.querySelectorAll<HTMLElement>(READABLE_SELECTOR).forEach((el) => {
      claimed.add(el)
    })
    block.querySelectorAll<HTMLElement>('.verse').forEach((el) => {
      claimed.add(el)
    })
  }

  const standalone = Array.from(
    root.querySelectorAll<HTMLElement>(READABLE_SELECTOR),
  )
    .filter((el) => {
      if (isIgnored(el)) return false
      if (claimed.has(el)) return false
      if (el.closest(BLOCK_SELECTOR)) return false
      return extractText(el).length > 0
    })
    .sort(compareDocumentOrder)

  for (const el of standalone) {
    const text = extractText(el)
    if (!text) continue
    chunks.push({ index: chunks.length, text, element: el })
  }

  return chunks
}

const NARRATION_SELECTOR =
  'h1, h2, h3, h4, h5, p, li, blockquote, cite, figcaption, dd, dt'

/**
 * Every readable line inside one container, in document order.
 *
 * Used where the text to speak is a panel rather than a page — the guided
 * tour's wonder card. Only the innermost match of each nesting is kept, so a
 * blockquote and the paragraph inside it are one line rather than two.
 */
export function getNarrationChunks(root: HTMLElement): ReadChunk[] {
  const candidates = Array.from(
    root.querySelectorAll<HTMLElement>(NARRATION_SELECTOR),
  )
    .filter((el) => !isIgnoredWithin(el, root))
    .filter((el, _, all) => all.every((other) => other === el || !el.contains(other)))
    .sort(compareDocumentOrder)

  const chunks: ReadChunk[] = []
  for (const element of candidates) {
    const text = extractText(element)
    if (text) chunks.push({ index: chunks.length, text, element })
  }
  return chunks
}

type CachedSelection = {
  text: string
  element: HTMLElement
}

/** Last non-empty selection inside #main-content (survives toolbar clicks). */
let selectionCache: CachedSelection | null = null

function elementFromNode(node: Node | null | undefined): HTMLElement {
  if (!node) return document.body
  if (node.nodeType === Node.ELEMENT_NODE) {
    const el = node as HTMLElement
    return (
      el.closest<HTMLElement>(`${BLOCK_SELECTOR}, ${READABLE_SELECTOR}, .verse`) ??
      el
    )
  }
  const parent = node.parentElement
  return (
    parent?.closest<HTMLElement>(`${BLOCK_SELECTOR}, ${READABLE_SELECTOR}, .verse`) ??
    parent ??
    document.body
  )
}

function selectionInMain(selection: Selection, root: HTMLElement): boolean {
  if (!selection.rangeCount) return false
  return root.contains(selection.getRangeAt(0).commonAncestorContainer)
}

function chunkFromSelection(selection: Selection): ReadChunk | null {
  const text = selection.toString().replace(/\s+/g, ' ').trim()
  if (!text) return null
  const element = elementFromNode(selection.focusNode ?? selection.anchorNode)
  return { index: 0, text, element }
}

/** Call on selectionchange so toolbar clicks can still read the last highlight. */
export function updateSelectionCache(): void {
  const root = document.getElementById('main-content')
  const selection = window.getSelection()
  if (!root || !selection || selection.isCollapsed || !selection.rangeCount) return
  if (!selectionInMain(selection, root)) return

  const chunk = chunkFromSelection(selection)
  if (!chunk) return

  selectionCache = { text: chunk.text, element: chunk.element }
}

export function getSelectionChunk(): ReadChunk | null {
  const root = document.getElementById('main-content')
  const selection = window.getSelection()

  if (root && selection && !selection.isCollapsed && selection.rangeCount) {
    if (selectionInMain(selection, root)) {
      const live = chunkFromSelection(selection)
      if (live) {
        selectionCache = { text: live.text, element: live.element }
        return live
      }
    }
  }

  if (selectionCache) {
    return { index: 0, text: selectionCache.text, element: selectionCache.element }
  }

  return null
}

/**
 * Document-wide by default: a tour reading in "both" mode alternates between
 * its own panel and the reader behind it, and those are not in one subtree.
 */
export function clearChunkHighlights(root: ParentNode = document) {
  root.querySelectorAll('[data-read-chunk-active]').forEach((el) => {
    el.removeAttribute('data-read-chunk-active')
    el.classList.remove('read-aloud-active')
  })
}

export function highlightChunk(element: HTMLElement) {
  clearChunkHighlights()
  element.setAttribute('data-read-chunk-active', 'true')
  element.classList.add('read-aloud-active')
  element.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

function voiceQualityScore(voice: SpeechSynthesisVoice): number {
  let score = 0
  if (!voice.localService) score += 10
  if (/natural|premium|enhanced|neural|online|cloud/i.test(voice.name)) score += 5
  if (/google|microsoft|amazon|apple/i.test(voice.name)) score += 2
  if (voice.default) score += 1
  return score
}

export function sortVoices(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice[] {
  return [...voices].sort((a, b) => {
    const diff = voiceQualityScore(b) - voiceQualityScore(a)
    if (diff !== 0) return diff
    return a.name.localeCompare(b.name)
  })
}

/**
 * Joke and character voices the operating system ships alongside real ones.
 * Apple's "Novelty" set (Bubbles, Zarvox, Bad News…) all report as en-US, so
 * filtering by language does not remove them — they have to be named. The
 * second block is the Eloquence-era character set added in recent macOS/iOS,
 * which exists in many languages and is equally wrong for scripture.
 */
const NOVELTY_VOICE_NAMES = new Set([
  'albert',
  'bad news',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'deranged',
  'fred',
  'good news',
  'hysterical',
  'jester',
  'organ',
  'pipe organ',
  'superstar',
  'trinoids',
  'whisper',
  'wobble',
  'zarvox',
  // character voices
  'eddy',
  'flo',
  'grandma',
  'grandpa',
  'reed',
  'rocko',
  'sandy',
  'shelley',
])

/** "Grandma (Deutsch (Deutschland))" → "grandma"; "Microsoft David - English" → "microsoft david" */
function baseVoiceName(name: string): string {
  return name.split('(')[0].split(' - ')[0].trim().toLowerCase()
}

export function isNoveltyVoice(voice: SpeechSynthesisVoice): boolean {
  if (/eloquence/i.test(voice.name)) return true
  return NOVELTY_VOICE_NAMES.has(baseVoiceName(voice.name))
}

/**
 * Every genuine voice on the device, best first, across all languages.
 * Falls back to the raw list if a device somehow offers nothing else, so the
 * reader never ends up with an empty picker.
 */
export function usableVoices(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice[] {
  const genuine = voices.filter((v) => !isNoveltyVoice(v))
  return sortVoices(genuine.length > 0 ? genuine : voices)
}

export function formatVoiceLabel(voice: SpeechSynthesisVoice): string {
  const lang = voice.lang.replace('_', '-')
  const tag = voice.localService ? 'Local' : 'Network'
  return `${voice.name} (${lang}, ${tag})`
}

/** "nl-NL" → "Dutch (Netherlands)", falling back to the raw tag. */
export function describeLanguage(tag: string): string {
  const normalised = tag.replace('_', '-')
  try {
    const [language, region] = normalised.split('-')
    const languageNames = new Intl.DisplayNames(['en'], { type: 'language' })
    const name = languageNames.of(language) ?? language
    if (!region) return name
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' })
    return `${name} (${regionNames.of(region.toUpperCase()) ?? region})`
  } catch {
    return normalised
  }
}

/**
 * Voices grouped by spoken language, for the pickers in the reader and the
 * guided tour. Pair with usableVoices so novelty voices never reach the list.
 *
 * `leading` floats one language to the top — pass whatever the page is
 * currently showing, so the voices that can actually read it are the ones in
 * reach rather than buried under whichever language sorts first.
 */
export function groupVoicesByLanguage(
  voices: SpeechSynthesisVoice[],
  leading: string = SOURCE_LANGUAGE,
): { label: string; voices: SpeechSynthesisVoice[] }[] {
  const byLanguage = new Map<string, SpeechSynthesisVoice[]>()

  for (const voice of voices) {
    const tag = normaliseTag(voice.lang)
    const list = byLanguage.get(tag) ?? []
    list.push(voice)
    byLanguage.set(tag, list)
  }

  const lead = primarySubtag(leading)

  return [...byLanguage.entries()]
    .map(([tag, list]) => ({
      tag,
      label: describeLanguage(tag),
      voices: sortVoices(list),
    }))
    .sort((a, b) => {
      const aLead = primarySubtag(a.tag) === lead
      const bLead = primarySubtag(b.tag) === lead
      if (aLead !== bLead) return aLead ? -1 : 1
      return a.label.localeCompare(b.label)
    })
    .map(({ label, voices: list }) => ({ label, voices: list }))
}

