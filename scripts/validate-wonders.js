#!/usr/bin/env node
/**
 * Checks the wonder catalog against the World English Bible text this app
 * actually ships, so no card can cite a passage that isn't there.
 *
 * For every wonder it verifies:
 *   1. the book id exists,
 *   2. the chapter exists in that book,
 *   3. the verse range exists in that chapter (and from <= to),
 *   4. a distinctive word from the title appears in the referenced verses —
 *      this is what catches a reference pointing at the *wrong* chapter, which
 *      checks 1–3 would happily pass.
 *
 * It also checks ids are unique, familiarityRank has no duplicates, and every
 * parallelGroupId is shared by at least two accounts.
 *
 * Run: node scripts/validate-wonders.js
 */

const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')

/* --- compile the catalog with the project's own tsc ----------------------- */

function loadCatalog() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wonders-'))
  const tsconfigPath = path.join(outDir, 'tsconfig.json')

  fs.writeFileSync(
    tsconfigPath,
    JSON.stringify({
      extends: path.join(ROOT, 'tsconfig.json'),
      compilerOptions: {
        noEmit: false,
        emitDeclarationOnly: false,
        outDir,
        rootDir: ROOT,
        module: 'commonjs',
        moduleResolution: 'node',
        incremental: false,
        jsx: 'react-jsx',
        paths: { '@/*': [path.join(ROOT, '*')] },
      },
      include: [path.join(ROOT, 'lib/wonders/**/*.ts'), path.join(ROOT, 'lib/passages.ts')],
    }),
  )

  execFileSync(path.join(ROOT, 'node_modules/.bin/tsc'), ['-p', tsconfigPath], {
    stdio: 'inherit',
  })

  // tsc emits the "@/..." specifiers untouched, so teach require() the alias.
  const Module = require('node:module')
  const resolve = Module._resolveFilename
  Module._resolveFilename = function (request, ...rest) {
    if (request.startsWith('@/')) {
      return resolve.call(this, path.join(outDir, request.slice(2)), ...rest)
    }
    return resolve.call(this, request, ...rest)
  }

  return require(path.join(outDir, 'lib/wonders/catalog.js'))
}

/* --- index the shipped scripture ----------------------------------------- */

function loadBible() {
  const books = new Map()
  for (const file of ['old-testament-data.json', 'new-testament-data.json']) {
    const data = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'data', file), 'utf8'),
    )
    for (const book of data.books) {
      const chapters = new Map()
      for (const chapter of book.chapters) {
        // Split the chapter into verses on the "[n]" markers the data uses.
        const verses = new Map()
        const parts = chapter.content.split(/\[(\d+)\]/)
        for (let i = 1; i < parts.length; i += 2) {
          verses.set(Number(parts[i]), parts[i + 1] || '')
        }
        chapters.set(String(chapter.number), verses)
      }
      books.set(book.id, { name: book.name, chapters })
    }
  }
  return books
}

const STOPWORDS = new Set([
  'the', 'a', 'an', 'of', 'and', 'in', 'at', 'on', 'to', 'from', 'for', 'with',
  'his', 'her', 'their', 'its', 'is', 'are', 'was', 'were', 'be', 'by', 'into',
  'out', 'up', 'down', 'who', 'that', 'this', 'these', 'those', 'made', 'make',
  'first', 'second', 'third', 'two', 'three', 'ten', 'man', 'men', 'woman',
  'son', 'sons', 'daughter', 'king', 'lord', 'god', 'jesus', 'before', 'after',
  'again', 'over', 'under', 'through', 'against',
])

/** Apostrophes and plurals differ between a title and the text it labels. */
function normalise(s) {
  return s.toLowerCase().replace(/['’]/g, '')
}

function keywordsOf(title) {
  return normalise(title)
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .map((w) => w.replace(/^-+|-+$/g, ''))
    // Drop the possessive/plural tail so "Nebuchadnezzar's" matches
    // "Nebuchadnezzar" and "Walls" matches "wall".
    .map((w) => w.replace(/s$/, ''))
    .filter((w) => w.length > 3 && !STOPWORDS.has(w))
}

/**
 * Reviewed by hand and confirmed correct: these titles name the event the way
 * readers do ("The Transfiguration", "Parting of the Red Sea"), using words the
 * WEB text itself never uses. Listing them keeps the report empty when nothing
 * is wrong, so a genuinely mis-cited new entry still stands out.
 */
const REVIEWED_TITLES = new Set([
  'red-sea',
  'manna',
  'widows-oil',
  'aramean-army-blinded',
  'transfiguration-mat',
  'transfiguration-mrk',
  'transfiguration-luk',
  'peters-mother-in-law-mrk',
  'jairus-daughter-mrk',
  'jairus-daughter-luk',
  'severed-ear-luk',
  'resurrection-jhn',
  'pauls-handkerchiefs',
])

/**
 * "Exodus 14:22" / "1 Kings 17:16" / "Daniel 3:25-27" -> the verses it names.
 * Returns null if the reference cannot be resolved at all.
 */
function resolveQuoteRef(refText, bible, byName) {
  const m = /^(.+?)\s+(\d+):(\d+)(?:[\u2013\u2014-](\d+))?$/.exec(refText.trim())
  if (!m) return null
  const [, bookName, chapter, from, to] = m
  const bookId = byName.get(bookName)
  if (!bookId) return null
  const verses = bible.get(bookId).chapters.get(chapter)
  if (!verses) return null
  let text = ''
  for (let v = Number(from); v <= Number(to ?? from); v++) {
    text += ' ' + (verses.get(v) || '')
  }
  return text
}

/** Curly vs straight quotes and collapsed whitespace must not cause a miss. */
function forCompare(s) {
  return s
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

/* --- run ------------------------------------------------------------------ */

const { WONDERS } = loadCatalog()
const bible = loadBible()
const bookIdByName = new Map(
  [...bible.entries()].map(([id, b]) => [b.name, id]),
)

const errors = []
const unmatched = []
const seenIds = new Map()
const ranks = new Map()
const groups = new Map()

for (const w of WONDERS) {
  const where = `${w.id} (${w.passage.label})`

  if (seenIds.has(w.id)) errors.push(`duplicate id: ${w.id}`)
  seenIds.set(w.id, true)

  if (w.familiarityRank != null) {
    if (ranks.has(w.familiarityRank)) {
      errors.push(
        `duplicate familiarityRank ${w.familiarityRank}: ${w.id} and ${ranks.get(w.familiarityRank)}`,
      )
    }
    ranks.set(w.familiarityRank, w.id)
  }

  const authored = Boolean(
    w.whatHappened && w.hopeMeaning && w.reflectionQuestion,
  )

  if (w.parallelGroupId) {
    if (!groups.has(w.parallelGroupId)) groups.set(w.parallelGroupId, [])
    groups.get(w.parallelGroupId).push(w.id)

    // Locked rule (a): a written account of a shared event has to say what
    // *this* writer stresses. Without it there is no reason to keep the
    // accounts as separate cards at all.
    if (authored && !w.distinctive) {
      errors.push(
        `${where}: written parallel account (group "${w.parallelGroupId}") has no "distinctive"`,
      )
    }
  }

  // A written card should be written all the way.
  if (authored) {
    for (const field of ['quote', 'quoteRef', 'details']) {
      if (!w[field] || (Array.isArray(w[field]) && !w[field].length)) {
        errors.push(`${where}: written card is missing "${field}"`)
      }
    }
  }

  const book = bible.get(w.passage.bookId)
  if (!book) {
    errors.push(`${where}: no such book id "${w.passage.bookId}"`)
    continue
  }
  if (book.name !== w.passage.bookName) {
    errors.push(
      `${where}: bookName "${w.passage.bookName}" != data name "${book.name}"`,
    )
  }

  const verses = book.chapters.get(w.passage.chapterNumber)
  if (!verses) {
    errors.push(
      `${where}: ${book.name} has no chapter ${w.passage.chapterNumber}`,
    )
    continue
  }

  const [from, to] = w.passage.verses
  const maxVerse = Math.max(...verses.keys())
  if (from < 1 || from > to) {
    errors.push(`${where}: bad verse range ${from}-${to}`)
    continue
  }
  if (to > maxVerse) {
    errors.push(
      `${where}: verse ${to} beyond end of ${book.name} ${w.passage.chapterNumber} (max ${maxVerse})`,
    )
    continue
  }

  // A pull quote must be the WEB text, verbatim, from the verses it cites.
  if (w.quote) {
    if (!w.quoteRef) {
      errors.push(`${where}: has a quote but no quoteRef`)
    } else {
      const cited = resolveQuoteRef(w.quoteRef, bible, bookIdByName)
      if (cited === null) {
        errors.push(`${where}: quoteRef "${w.quoteRef}" does not resolve`)
      } else if (!forCompare(cited).includes(forCompare(w.quote))) {
        errors.push(
          `${where}: quote is not verbatim in ${w.quoteRef}\n      wanted: ${forCompare(w.quote).slice(0, 90)}…\n      found:  ${forCompare(cited).slice(0, 90)}…`,
        )
      }
    }
  }

  // Does the passage actually look like the event the title claims?
  let text = ''
  for (let v = from; v <= to; v++) text += ' ' + (verses.get(v) || '')
  const haystack = normalise(text)
  const words = keywordsOf(w.title)
  if (
    words.length &&
    !REVIEWED_TITLES.has(w.id) &&
    !words.some((k) => haystack.includes(k))
  ) {
    let chapterText = ''
    for (const v of verses.values()) chapterText += ' ' + v
    const inChapter = words.some((k) => normalise(chapterText).includes(k))
    unmatched.push(
      `${where} "${w.title}" — no title word ${JSON.stringify(words)} in the cited verses${inChapter ? ' (but present elsewhere in the chapter)' : ' OR anywhere in the chapter'}`,
    )
  }
}

for (const [group, ids] of groups) {
  if (ids.length < 2) {
    errors.push(`parallelGroupId "${group}" has only one account: ${ids[0]}`)
  }
}

console.log(`\nWonders in catalog: ${WONDERS.length}`)
console.log(`  Old Testament: ${WONDERS.filter((w) => w.testament === 'old').length}`)
console.log(`  New Testament: ${WONDERS.filter((w) => w.testament === 'new').length}`)
console.log(`  Parallel groups: ${groups.size}`)
console.log(`  Ranked for Start Here / best-known: ${ranks.size}`)
const written = WONDERS.filter(
  (w) => w.whatHappened && w.hopeMeaning && w.reflectionQuestion,
).length
console.log(
  `  Cards written: ${written} / ${WONDERS.length} (Phase 7 fills the rest)`,
)
const byEra = new Map()
for (const w of WONDERS) {
  const e = byEra.get(w.era) ?? { total: 0, done: 0 }
  e.total += 1
  if (w.whatHappened && w.hopeMeaning && w.reflectionQuestion) e.done += 1
  byEra.set(w.era, e)
}
console.log('\n  Cards by era:')
for (const [era, e] of byEra) {
  const flag = e.done === e.total ? 'done' : ''
  console.log(`    ${era.padEnd(10)} ${String(e.done).padStart(3)} / ${String(e.total).padEnd(3)} ${flag}`)
}

if (unmatched.length) {
  console.log(`\n${unmatched.length} reference(s) to review by hand:`)
  for (const u of unmatched) console.log(`  ? ${u}`)
}

if (errors.length) {
  console.error(`\n${errors.length} ERROR(S):`)
  for (const e of errors) console.error(`  ✗ ${e}`)
  process.exit(1)
}

console.log(`\nAll ${WONDERS.length} references resolve against the shipped WEB text.`)
