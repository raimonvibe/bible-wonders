/**
 * Which language the page is *showing* — which is not the language it was
 * written in.
 *
 * Google Translate, Chrome's built-in translation and the translating
 * extensions all rewrite text nodes in place and tell the page nothing. A
 * reader that speaks its own source strings, or picks a voice from them, then
 * carries on in English over Dutch words on screen. Everything here answers
 * one question: what is the text we are about to read actually written in?
 *
 * Three signals, in descending order of trust:
 *
 *  1. `<html lang>` together with the marker classes the Google widget adds.
 *     Exact when present, and present for most translators.
 *  2. The script the text is written in. Decisive on its own — Greek letters
 *     are Greek.
 *  3. Function-word frequency, for the Latin-script languages that share an
 *     alphabet. A guess, but a good one over a paragraph.
 *
 * A reader who disagrees with all three can pin the language by hand; see
 * LanguageChoice in hooks/useSpeechEngine.
 */

/** The language this app's own copy is written in. */
export const SOURCE_LANGUAGE = 'en'

/** "nl_NL" → "nl-NL" */
export function normaliseTag(tag: string): string {
  return tag.replace(/_/g, '-').trim()
}

/** "nl-NL" → "nl" */
export function primarySubtag(tag: string): string {
  return normaliseTag(tag).split('-')[0].toLowerCase()
}

/* --- 2. script ---------------------------------------------------------- */

/**
 * Ordered: kana settles Japanese before the shared Han block is reached, and
 * Hangul before it too, since Korean text can carry hanja.
 */
const SCRIPTS: Array<[string, RegExp]> = [
  ['ja', /[\u3040-\u30ff]/],
  ['ko', /[\uac00-\ud7af\u1100-\u11ff]/],
  ['zh', /[\u4e00-\u9fff\u3400-\u4dbf]/],
  ['th', /[\u0e00-\u0e7f]/],
  ['he', /[\u0590-\u05ff]/],
  ['ar', /[\u0600-\u06ff\u0750-\u077f]/],
  ['hi', /[\u0900-\u097f]/],
  ['bn', /[\u0980-\u09ff]/],
  ['pa', /[\u0a00-\u0a7f]/],
  ['gu', /[\u0a80-\u0aff]/],
  ['ta', /[\u0b80-\u0bff]/],
  ['te', /[\u0c00-\u0c7f]/],
  ['kn', /[\u0c80-\u0cff]/],
  ['ml', /[\u0d00-\u0d7f]/],
  ['si', /[\u0d80-\u0dff]/],
  ['my', /[\u1000-\u109f]/],
  ['km', /[\u1780-\u17ff]/],
  ['ka', /[\u10a0-\u10ff]/],
  ['hy', /[\u0530-\u058f]/],
  ['el', /[\u0370-\u03ff\u1f00-\u1fff]/],
]

/** The Cyrillic languages are told apart by the letters they alone use. */
function cyrillicLanguage(text: string): string {
  if (/[іїєґ]/i.test(text)) return 'uk'
  if (/[ђћџ]/i.test(text)) return 'sr'
  if (/[ѓќѕ]/i.test(text)) return 'mk'
  // Bulgarian leans on ъ and has none of the Russian vowels.
  if (/ъ/i.test(text) && !/[ыэё]/i.test(text)) return 'bg'
  return 'ru'
}

/** How much of the sample sits in a given script, ignoring spaces and digits. */
function scriptShare(text: string, pattern: RegExp): number {
  const letters = text.replace(/[\s\d\p{P}\p{S}]/gu, '')
  if (!letters.length) return 0
  const global = new RegExp(pattern.source, 'gu')
  return (letters.match(global)?.length ?? 0) / letters.length
}

/* --- 3. function words -------------------------------------------------- */

/**
 * The commonest words of each Latin-script language we can reasonably expect
 * a translator to produce. Only function words: they survive any subject
 * matter, which a scripture-specific vocabulary would not.
 */
const FUNCTION_WORDS: Record<string, string[]> = {
  en: ['the', 'and', 'of', 'to', 'in', 'that', 'is', 'was', 'for', 'with', 'as', 'but', 'not', 'they', 'his', 'her', 'have', 'this', 'from', 'which', 'are', 'had', 'were', 'what'],
  nl: ['de', 'het', 'een', 'en', 'van', 'is', 'dat', 'die', 'niet', 'met', 'voor', 'op', 'te', 'zijn', 'was', 'aan', 'ook', 'maar', 'om', 'door', 'werd', 'hij', 'wat', 'naar', 'uit', 'over', 'hun', 'heeft', 'worden', 'zich'],
  de: ['der', 'die', 'das', 'und', 'ist', 'nicht', 'den', 'dem', 'ein', 'eine', 'mit', 'für', 'auf', 'sich', 'von', 'zu', 'war', 'auch', 'aber', 'wird', 'sie', 'im', 'dass', 'als', 'nach', 'durch', 'wurde', 'haben'],
  fr: ['le', 'la', 'les', 'et', 'est', 'une', 'un', 'des', 'du', 'que', 'qui', 'pas', 'pour', 'dans', 'sur', 'ce', 'il', 'elle', 'avec', 'sont', 'mais', 'plus', 'comme', 'être', 'avait', 'nous', 'vous', 'leur'],
  es: ['el', 'la', 'los', 'las', 'y', 'es', 'un', 'una', 'de', 'que', 'no', 'en', 'por', 'para', 'con', 'su', 'se', 'lo', 'como', 'más', 'pero', 'sus', 'al', 'del', 'ha', 'son', 'fue', 'esta'],
  pt: ['os', 'as', 'e', 'é', 'um', 'uma', 'de', 'que', 'não', 'em', 'por', 'para', 'com', 'seu', 'sua', 'se', 'como', 'mais', 'mas', 'ao', 'do', 'da', 'foi', 'são', 'este', 'ele', 'dos'],
  it: ['il', 'lo', 'la', 'gli', 'le', 'e', 'è', 'un', 'una', 'di', 'che', 'non', 'in', 'per', 'con', 'su', 'si', 'come', 'più', 'ma', 'del', 'della', 'sono', 'era', 'questo', 'nel'],
  sv: ['och', 'att', 'det', 'som', 'en', 'på', 'är', 'av', 'för', 'med', 'den', 'till', 'inte', 'om', 'har', 'de', 'ett', 'men', 'var', 'han', 'hon', 'från', 'när', 'så', 'kan', 'sitt'],
  da: ['og', 'at', 'det', 'som', 'en', 'på', 'er', 'af', 'for', 'med', 'den', 'til', 'ikke', 'om', 'har', 'de', 'et', 'men', 'var', 'han', 'hun', 'fra', 'når', 'så', 'kan', 'sit'],
  nb: ['og', 'at', 'det', 'som', 'en', 'på', 'er', 'av', 'for', 'med', 'den', 'til', 'ikke', 'om', 'har', 'de', 'et', 'men', 'var', 'han', 'hun', 'fra', 'når', 'så', 'kan', 'sitt'],
  fi: ['ja', 'on', 'ei', 'että', 'se', 'oli', 'hän', 'ne', 'kuin', 'mutta', 'niin', 'kun', 'jos', 'myös', 'vain', 'joka', 'ovat', 'olla', 'sen', 'tämä', 'ovat'],
  pl: ['i', 'w', 'na', 'nie', 'że', 'się', 'z', 'do', 'to', 'jest', 'o', 'jak', 'ale', 'po', 'za', 'przez', 'tego', 'który', 'była', 'było', 'są', 'dla', 'przy'],
  cs: ['a', 'v', 'na', 'se', 'je', 'že', 's', 'do', 'to', 'z', 'o', 'ale', 'jak', 'po', 'za', 'který', 'byl', 'byla', 'jsou', 'pro', 'při', 'nebo'],
  sk: ['a', 'v', 'na', 'sa', 'je', 'že', 's', 'do', 'to', 'z', 'o', 'ale', 'ako', 'po', 'za', 'ktorý', 'bol', 'bola', 'sú', 'pre', 'pri', 'alebo'],
  hr: ['i', 'u', 'na', 'se', 'je', 'da', 's', 'do', 'to', 'iz', 'o', 'ali', 'kao', 'po', 'za', 'koji', 'bio', 'bila', 'su', 'od', 'pri', 'ili'],
  tr: ['ve', 'bir', 'bu', 'da', 'de', 'için', 'ile', 'olarak', 'olan', 'çok', 'daha', 'kadar', 'sonra', 'gibi', 'ama', 'ne', 'her', 'en', 'o'],
  id: ['dan', 'yang', 'di', 'itu', 'dengan', 'untuk', 'tidak', 'dari', 'pada', 'ini', 'akan', 'dalam', 'adalah', 'ada', 'mereka', 'oleh', 'juga', 'karena'],
  ms: ['dan', 'yang', 'di', 'itu', 'dengan', 'untuk', 'tidak', 'dari', 'pada', 'ini', 'akan', 'dalam', 'adalah', 'ada', 'mereka', 'oleh', 'juga', 'kerana'],
  vi: ['và', 'của', 'là', 'có', 'được', 'trong', 'cho', 'không', 'những', 'một', 'người', 'với', 'đã', 'khi', 'này', 'các', 'để'],
  ro: ['și', 'de', 'la', 'în', 'cu', 'care', 'este', 'un', 'o', 'pe', 'nu', 'să', 'din', 'pentru', 'ca', 'dar', 'au', 'mai', 'lui'],
  hu: ['az', 'és', 'hogy', 'nem', 'is', 'egy', 'de', 'meg', 'van', 'ez', 'csak', 'mint', 'már', 'még', 'volt', 'el', 'ki', 'be'],
  tl: ['ang', 'ng', 'sa', 'na', 'at', 'ay', 'mga', 'hindi', 'ito', 'siya', 'para', 'may', 'niya', 'kay', 'ako'],
  sw: ['na', 'ya', 'wa', 'kwa', 'ni', 'katika', 'za', 'la', 'kuwa', 'yake', 'hiyo', 'lakini', 'wale', 'huo'],
}

/**
 * Letters that only a few languages use. Function words alone confuse the
 * close pairs — Danish against Norwegian, Czech against Slovak — and these
 * break the tie without overriding a clear word-frequency win.
 */
const DIACRITIC_HINTS: Array<[string, RegExp]> = [
  ['pl', /[łąęźżćńś]/i],
  ['tr', /[ğşıİ]/],
  ['cs', /[řůěč]/i],
  ['sk', /[ĺľŕäô]/i],
  ['hu', /[őű]/i],
  ['ro', /[ășțăî]/i],
  ['vi', /[ạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i],
  ['de', /ß/],
  ['da', /[øå]/i],
  ['nb', /[øå]/i],
  ['sv', /[åäö]/i],
  ['fi', /[äö]/i],
  ['es', /[ñ¿¡]/i],
  ['pt', /[ãõç]/i],
  ['fr', /[çœèêôû]/i],
  ['hr', /[čćžšđ]/i],
]

/** Below this the sample is as likely noise as language; say so rather than guess. */
const MIN_CONFIDENCE = 0.05

function scoreFunctionWords(text: string): { lang: string; score: number } | null {
  const tokens = text
    .toLowerCase()
    .split(/[^\p{L}']+/u)
    .filter((t) => t.length > 0)

  if (tokens.length < 8) return null

  let best: { lang: string; score: number } | null = null

  for (const [lang, words] of Object.entries(FUNCTION_WORDS)) {
    const set = new Set(words)
    const hits = tokens.reduce((n, t) => (set.has(t) ? n + 1 : n), 0)
    let score = hits / tokens.length

    const hint = DIACRITIC_HINTS.find(([l]) => l === lang)
    if (hint && hint[1].test(text)) score += 0.02

    if (!best || score > best.score) best = { lang, score }
  }

  return best && best.score >= MIN_CONFIDENCE ? best : null
}

/** Best guess at the language of a passage of text, or null if it can't tell. */
export function detectTextLanguage(text: string): string | null {
  const sample = text.slice(0, 4000)
  if (sample.trim().length < 12) return null

  if (scriptShare(sample, /[\u0400-\u04ff]/) > 0.3) return cyrillicLanguage(sample)

  for (const [lang, pattern] of SCRIPTS) {
    if (scriptShare(sample, pattern) > 0.15) return lang
  }

  return scoreFunctionWords(sample)?.lang ?? null
}

/* --- 1. the document's own claim ---------------------------------------- */

/**
 * The Google widget leaves `translated-ltr`/`translated-rtl` on <html>, and
 * both it and Chrome's own translator rewrite the lang attribute. Either is
 * enough to stop trusting our source language.
 */
function documentClaim(): string | null {
  if (typeof document === 'undefined') return null
  const root = document.documentElement
  const tag = normaliseTag(root.getAttribute('lang') ?? '')
  if (!tag) return null

  const marked = /\btranslated-(ltr|rtl)\b/.test(root.className)
  const moved = primarySubtag(tag) !== SOURCE_LANGUAGE

  return marked || moved ? tag : null
}

/** A slice of what is actually on screen, for the sniffers to work from. */
function visibleSample(): string {
  if (typeof document === 'undefined') return ''
  const root = document.getElementById('main-content') ?? document.body
  return (root.innerText ?? '').slice(0, 4000)
}

/**
 * The language the page is currently displaying.
 *
 * Pass the text you are about to speak when you have it — judging the words
 * themselves beats judging the page around them.
 */
export function detectPageLanguage(sample?: string): string {
  const claimed = documentClaim()
  if (claimed) return claimed

  const text = sample && sample.trim().length >= 12 ? sample : visibleSample()
  return detectTextLanguage(text) ?? SOURCE_LANGUAGE
}

/** Re-runs `onChange` when a translator swaps the page under us. */
export function observePageLanguage(onChange: (lang: string) => void): () => void {
  if (typeof document === 'undefined') return () => {}

  const root = document.documentElement
  const signature = () =>
    `${root.getAttribute('lang') ?? ''}|${/\btranslated-(ltr|rtl)\b/.test(root.className)}`

  let lastSignature = signature()
  let lastLanguage = ''

  const emit = () => {
    const next = detectPageLanguage()
    if (next === lastLanguage) return
    lastLanguage = next
    onChange(next)
  }

  // The theme writes to <html> too, so compare what a translator would have
  // changed rather than re-reading the page on every appearance toggle.
  const observer = new MutationObserver(() => {
    const next = signature()
    if (next === lastSignature) return
    lastSignature = next
    emit()
  })
  observer.observe(root, { attributes: true, attributeFilter: ['lang', 'class'] })

  // Translation is asynchronous, and not every browser moves the lang
  // attribute when it finishes, so read the text itself a few times too.
  const timers = [1200, 3000, 6000].map((ms) => window.setTimeout(emit, ms))

  return () => {
    observer.disconnect()
    timers.forEach(window.clearTimeout)
  }
}

/* --- voices ------------------------------------------------------------- */

export function voiceMatchesLanguage(
  voice: SpeechSynthesisVoice,
  tag: string,
): boolean {
  return primarySubtag(voice.lang) === primarySubtag(tag)
}

/**
 * The best installed voice for a language: an exact region match first, then
 * any region of the same language, then nothing. Callers decide what to do
 * when a device has no voice for what is on screen — there is no sensible
 * substitute, and reading Dutch in an English voice is the bug, not the
 * fallback.
 */
export function pickVoiceForLanguage(
  voices: SpeechSynthesisVoice[],
  tag: string,
  preferredURI?: string,
): SpeechSynthesisVoice | undefined {
  const sameLanguage = voices.filter((v) => voiceMatchesLanguage(v, tag))
  if (!sameLanguage.length) return undefined

  if (preferredURI) {
    const saved = sameLanguage.find((v) => v.voiceURI === preferredURI)
    if (saved) return saved
  }

  const wanted = normaliseTag(tag).toLowerCase()
  const exact = sameLanguage.filter(
    (v) => normaliseTag(v.lang).toLowerCase() === wanted,
  )
  return (exact.length ? exact : sameLanguage)[0]
}

/** Every language the device can actually speak, best-labelled first. */
export function languagesWithVoices(
  voices: SpeechSynthesisVoice[],
): string[] {
  const tags = new Set(voices.map((v) => primarySubtag(v.lang)))
  return [...tags].sort()
}
