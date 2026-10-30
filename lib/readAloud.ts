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

/** A list row the narrator reads as one line, e.g. a wonder in the catalog. */
const ITEM_SELECTOR = '[data-narrate-item]'

const BROWSE_SELECTOR = `h1, h2, h3, h4, p, ${ITEM_SELECTOR}`

/**
 * One list row as a spoken line: its marked parts joined with a pause, so a
 * title and its reference don't run together ("Parting of the Red Sea.
 * Exodus 14:21–31"). Read from the DOM for the same reason as extractText.
 */
function extractItemText(item: HTMLElement): string {
  const parts = Array.from(item.querySelectorAll<HTMLElement>('[data-narrate-part]'))
    .map((part) => extractText(part))
    .filter(Boolean)
  return parts.length ? parts.join('. ') : extractText(item)
}

/**
 * What the Wonders panel reads when no card is open: the headings and copy on
 * screen, and each list row as one line. Rows are buttons, which the other
 * readers skip as chrome — here they are the content.
 */
export function getBrowseChunks(root: HTMLElement): ReadChunk[] {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>(BROWSE_SELECTOR))
    .filter((el) => {
      const blocked = el.closest<HTMLElement>('[data-read-aloud-ignore]')
      if (blocked && root.contains(blocked)) return false
      if (el.matches(ITEM_SELECTOR)) return true
      // Text inside a row is spoken with the row.
      if (el.closest(ITEM_SELECTOR)) return false
      return !el.closest('button')
    })
    .sort(compareDocumentOrder)

  const chunks: ReadChunk[] = []
  for (const element of candidates) {
    const text = element.matches(ITEM_SELECTOR)
      ? extractItemText(element)
      : extractText(element)
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

/**
 * Apple marks a voice's quality in its identifier, not always in its name:
 * "com.apple.voice.premium.en-US.Zoe", "com.apple.voice.compact.en-US.Samantha".
 * Every voice on an iPhone is local, so this is the only signal there is.
 */
function appleVoiceTier(voice: SpeechSynthesisVoice): 'premium' | 'enhanced' | 'compact' | null {
  const uri = (voice.voiceURI ?? '').toLowerCase()
  if (uri.includes('.premium.')) return 'premium'
  if (uri.includes('.enhanced.')) return 'enhanced'
  if (uri.includes('.compact.')) return 'compact'
  return null
}

function voiceQualityScore(voice: SpeechSynthesisVoice): number {
  let score = 0
  if (!voice.localService) score += 10
  if (/natural|premium|enhanced|neural|online|cloud/i.test(voice.name)) score += 5
  const tier = appleVoiceTier(voice)
  if (tier === 'premium') score += 7
  else if (tier === 'enhanced') score += 5
  else if (tier === 'compact') score -= 1
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
  'badnews',
  'bahh',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'deranged',
  'fred',
  'goodnews',
  'hysterical',
  'jester',
  'junior',
  'kathy',
  'organ',
  'pipeorgan',
  'princess',
  'ralph',
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

/**
 * Letters only, so "Good News", "GoodNews" and "good-news" are one key — the
 * name and the voiceURI spell multi-word voices differently.
 */
function voiceKey(value: string): string {
  return value.toLowerCase().replace(/[^\p{L}]/gu, '')
}

/** "Grandma (Deutsch (Deutschland))" → "grandma"; "Microsoft David - English" → "microsoftdavid" */
function baseVoiceName(name: string): string {
  return voiceKey(name.split('(')[0].split(' - ')[0])
}

/**
 * "com.apple.speech.synthesis.voice.GoodNews" → "goodnews".
 *
 * Safari on iPhone, iPad and Mac can show a voice's name in the device's own
 * language, so the name alone lets a translated "Bubbles" through. The
 * voiceURI keeps Apple's English identifier whatever the device language.
 */
function voiceURIName(uri: string): string {
  return voiceKey((uri ?? '').split('.').pop() ?? '')
}

export function isNoveltyVoice(voice: SpeechSynthesisVoice): boolean {
  if (/eloquence/i.test(voice.name) || /eloquence/i.test(voice.voiceURI ?? '')) return true
  return (
    NOVELTY_VOICE_NAMES.has(baseVoiceName(voice.name)) ||
    NOVELTY_VOICE_NAMES.has(voiceURIName(voice.voiceURI))
  )
}

/**
 * Every genuine voice on the device, best first, across all languages.
 *
 * Never falls back to the novelty voices: with nothing else on offer the list
 * is empty, no voice is set on the utterance, and the system's own default
 * voice reads instead.
 */
export function usableVoices(
  voices: SpeechSynthesisVoice[],
): SpeechSynthesisVoice[] {
  return sortVoices(voices.filter((v) => !isNoveltyVoice(v)))
}

/**
 * A voice as the picker shows it: its name, plus a quality note where there is
 * one worth knowing — "Ava · Premium" rather than "Ava (en-US, Local)". The
 * picker's group heading already names the language and region.
 */
export function formatVoiceLabel(voice: SpeechSynthesisVoice): string {
  const name = voice.name.replace(/\s*\((enhanced|premium)\)\s*$/i, '').trim()
  const tier = appleVoiceTier(voice)
  if (tier === 'premium' || /\(premium\)/i.test(voice.name)) return `${name} · Premium`
  if (tier === 'enhanced' || /\(enhanced\)/i.test(voice.name)) return `${name} · Enhanced`
  if (!voice.localService) return `${name} · Online`
  return name
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

