#!/usr/bin/env node
/**
 * Add card prose to wonders in the catalog, from a JSON batch file.
 *
 *   node scripts/add-cards.js batches/kingdoms.json
 *
 * The batch is `{ "<wonder-id>": { quote, quoteRef, details[], whatHappened,
 * hopeMeaning, reflectionQuestion, distinctive? }, ... }`.
 *
 * Writing card prose is a long job done in batches, so it is worth having one
 * command that does it rather than a fresh ad-hoc script each time: the edit is
 * repeatable, reviewable, and available to whoever writes the remaining cards.
 *
 * Refuses to overwrite prose that is already there — pass --force to replace.
 * Always run `node scripts/validate-wonders.js` afterwards; that is what proves
 * the quotes are verbatim.
 */

const fs = require('node:fs')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const SOURCES = [
  path.join(ROOT, 'lib/wonders/oldTestament.ts'),
  path.join(ROOT, 'lib/wonders/newTestament.ts'),
]

const args = process.argv.slice(2)
const force = args.includes('--force')
const batchPath = args.find((a) => !a.startsWith('--'))

if (!batchPath) {
  console.error('usage: node scripts/add-cards.js <batch.json> [--force]')
  process.exit(1)
}

const batch = JSON.parse(fs.readFileSync(batchPath, 'utf8'))

/** A JS string literal that avoids escaping wherever it can. */
function lit(value) {
  if (value.includes("'") && !value.includes('"')) return `"${value}"`
  if (value.includes("'") && value.includes('"')) {
    return `'${value.replace(/'/g, "\\'")}'`
  }
  return `'${value}'`
}

function render(card) {
  const lines = []
  lines.push(`    quote:\n      ${lit(card.quote)},`)
  lines.push(`    quoteRef: ${lit(card.quoteRef)},`)
  lines.push('    details: [')
  for (const d of card.details) lines.push(`      ${lit(d)},`)
  lines.push('    ],')
  lines.push(`    whatHappened:\n      ${lit(card.whatHappened)},`)
  lines.push(`    hopeMeaning:\n      ${lit(card.hopeMeaning)},`)
  lines.push(`    reflectionQuestion:\n      ${lit(card.reflectionQuestion)},`)
  if (card.distinctive) {
    lines.push(`    distinctive:\n      ${lit(card.distinctive)},`)
  }
  return lines.join('\n')
}

/**
 * Locate one wonder's object literal by id.
 *
 * `end` is where prose gets inserted — after the identity fields, just before
 * the closing brace — so every entry reads id/title/passage/tags first and
 * prose second, the way the hand-written ones do.
 */
function findEntry(src, id) {
  const re = new RegExp(
    `(\\n  \\{\\n(?:.*?\\n)*?    id: '${id.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')}',\\n)((?:.*?\\n)*?)(  \\},\\n)`,
  )
  const m = re.exec(src)
  if (!m) return null
  const bodyStart = m.index + m[1].length
  return { head: bodyStart, end: bodyStart + m[2].length, body: m[2] }
}

let added = 0
const missing = []
const skipped = []

for (const file of SOURCES) {
  let src = fs.readFileSync(file, 'utf8')
  let touched = false

  for (const [id, card] of Object.entries(batch)) {
    const found = findEntry(src, id)
    if (!found) continue

    if (/\n    whatHappened:/.test(found.body) && !force) {
      skipped.push(id)
      continue
    }

    for (const field of [
      'quote',
      'quoteRef',
      'details',
      'whatHappened',
      'hopeMeaning',
      'reflectionQuestion',
    ]) {
      if (card[field] == null) {
        console.error(`✗ ${id}: missing "${field}"`)
        process.exit(1)
      }
    }

    // Drop any existing prose so --force is a replace, not a duplicate.
    let body = found.body
    if (force) {
      body = body.replace(
        /    (?:quote|quoteRef|details|whatHappened|hopeMeaning|reflectionQuestion|distinctive):[\s\S]*?(?=\n    [a-zA-Z]+:|$)/g,
        '',
      )
    }

    src = src.slice(0, found.head) + body + render(card) + '\n' + src.slice(found.end)
    touched = true
    added += 1
  }

  if (touched) fs.writeFileSync(file, src)
}

for (const id of Object.keys(batch)) {
  const inAny = SOURCES.some((f) => findEntry(fs.readFileSync(f, 'utf8'), id))
  if (!inAny) missing.push(id)
}

console.log(`Added prose to ${added} wonder(s) from ${path.basename(batchPath)}`)
if (skipped.length) {
  console.log(`Skipped ${skipped.length} that already had prose: ${skipped.join(', ')}`)
  console.log('(pass --force to replace)')
}
if (missing.length) {
  console.error(`✗ Not found in the catalog: ${missing.join(', ')}`)
  process.exit(1)
}
console.log('Now run: node scripts/validate-wonders.js')
