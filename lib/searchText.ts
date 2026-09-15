/**
 * Shared normalisation for every search box in the app.
 *
 * The WEB text uses curly apostrophes; the cards often use straight ones.
 * Fold those, then flatten everything else to spaces so "Exodus 14:21–31"
 * and "exodus 14" can be compared as the same kind of string.
 */

export function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

export function searchTerms(query: string): string[] {
  return normalizeSearchText(query).split(' ').filter(Boolean)
}

/** Whole-token match, so "14" does not hit "214" or "Exodus 7:14". */
export function containsEveryTerm(haystack: string, terms: string[]): boolean {
  const padded = ` ${haystack} `
  return terms.every((term) => padded.includes(` ${term} `))
}
