#!/usr/bin/env node
/**
 * Exports the wonder catalog as a JSON asset for the Flutter app.
 *
 * The TypeScript catalog in lib/wonders/ stays the single source of truth: the
 * cards are written there, `validate-wonders.js` is what proves their quotes
 * are verbatim, and this script only ever reads. Nothing is hand-copied into
 * Dart.
 *
 * Run `npm run validate:wonders` first — this script refuses to export a
 * catalog it cannot vouch for unless --skip-validate is passed.
 *
 * Run: node scripts/export-wonders.js [--skip-validate]
 */

const { execFileSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'bible-wonders-flutter/assets/wonders.json')

/**
 * The theme and era ids the Dart enums in
 * bible-wonders-flutter/lib/models/wonder.dart know how to parse. If the TS
 * catalog grows a value that isn't here, the export fails rather than shipping
 * a JSON the app will choke on at runtime.
 */
const KNOWN_THEMES = [
  'healing', 'raising', 'nature', 'provision', 'rescue', 'judgment', 'sign',
]
const KNOWN_ERAS = [
  'torah', 'conquest', 'kingdoms', 'prophets', 'exile',
  'matthew', 'mark', 'luke', 'john', 'acts',
]

/* --- compile the catalog with the project's own tsc ----------------------- */

function loadCatalog() {
  const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wonders-export-'))
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
      include: [
        path.join(ROOT, 'lib/wonders/**/*.ts'),
        path.join(ROOT, 'lib/passages.ts'),
      ],
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

  return {
    catalog: require(path.join(outDir, 'lib/wonders/catalog.js')),
    types: require(path.join(outDir, 'lib/wonders/types.js')),
  }
}

/* --- shaping -------------------------------------------------------------- */

/** Drops undefined keys so the JSON stays free of nulls Dart has to ignore. */
function compact(obj) {
  const out = {}
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null) continue
    if (Array.isArray(value) && value.length === 0) continue
    out[key] = value
  }
  return out
}

function passageJson(p) {
  return {
    bookId: p.bookId,
    bookName: p.bookName,
    chapterNumber: p.chapterNumber,
    verses: p.verses,
    label: p.label,
  }
}

function wonderJson(w) {
  return compact({
    id: w.id,
    title: w.title,
    testament: w.testament,
    passage: passageJson(w.passage),
    theme: w.theme,
    era: w.era,
    parallelGroupId: w.parallelGroupId,
    familiarityRank: w.familiarityRank,
    location: w.location,
    quote: w.quote,
    quoteRef: w.quoteRef,
    details: w.details,
    whatHappened: w.whatHappened,
    hopeMeaning: w.hopeMeaning,
    reflectionQuestion: w.reflectionQuestion,
    distinctive: w.distinctive,
    alsoSee: w.alsoSee ? w.alsoSee.map(passageJson) : undefined,
    /* Precomputed so the app never has to ask "is this card finished?" */
    authored: Boolean(w.whatHappened && w.hopeMeaning && w.reflectionQuestion),
  })
}

/* --- main ----------------------------------------------------------------- */

function main() {
  const skipValidate = process.argv.includes('--skip-validate')

  if (!skipValidate) {
    console.log('Validating the catalog first…\n')
    execFileSync(process.execPath, [path.join(__dirname, 'validate-wonders.js')], {
      stdio: 'inherit',
    })
    console.log('')
  }

  const { catalog, types } = loadCatalog()
  const wonders = catalog.WONDERS

  /* Guard the Dart enums. */
  const themes = new Set(wonders.map((w) => w.theme))
  const eras = new Set(wonders.map((w) => w.era))
  const unknownTheme = [...themes].find((t) => !KNOWN_THEMES.includes(t))
  const unknownEra = [...eras].find((e) => !KNOWN_ERAS.includes(e))
  if (unknownTheme) {
    throw new Error(
      `theme "${unknownTheme}" is not in KNOWN_THEMES.\n` +
        'Add it to WonderTheme in bible-wonders-flutter/lib/models/wonder.dart, ' +
        'then to KNOWN_THEMES in this script.',
    )
  }
  if (unknownEra) {
    throw new Error(
      `era "${unknownEra}" is not in KNOWN_ERAS.\n` +
        'Add it to WonderEra in bible-wonders-flutter/lib/models/wonder.dart, ' +
        'then to KNOWN_ERAS in this script.',
    )
  }

  const payload = {
    /* Bumped by hand when the JSON shape changes in a way Dart must follow. */
    schemaVersion: 1,
    source: 'lib/wonders/ (World English Bible, public domain)',
    count: wonders.length,
    authoredCount: wonders.filter((w) => wonderJson(w).authored).length,
    themeLabels: types.THEME_LABELS,
    eraLabels: types.ERA_LABELS,
    eraOrder: types.ERA_ORDER,
    wonders: wonders.map(wonderJson),
  }

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2) + '\n')

  const kb = (fs.statSync(OUT).size / 1024).toFixed(0)
  console.log(
    `Exported ${payload.count} wonders (${payload.authoredCount} authored) ` +
      `to ${path.relative(ROOT, OUT)} — ${kb} KB`,
  )
}

main()
