#!/usr/bin/env node
/**
 * Builds the SQLite database the Flutter app ships with, from the same
 * World English Bible JSON the website serves.
 *
 * Why a database and not the JSON: the two data files are 4.4 MB together, and
 * chapter text arrives as one blob with "[n]" verse markers embedded. Parsing
 * that on a phone at startup is a visible stall, and every verse-range
 * highlight would mean re-splitting the string. Splitting once, here, gives the
 * app verse-level rows, and an FTS5 index gives it offline search for free.
 *
 * Needs the sqlite3 CLI (with FTS5, which is standard in modern builds).
 *
 * Run: node scripts/build-bible-db.js
 */

const { execFileSync, spawnSync } = require('node:child_process')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')

const ROOT = path.resolve(__dirname, '..')
const OUT = path.join(ROOT, 'bible-wonders-flutter/assets/bible.db')

const SOURCES = [
  { file: 'old-testament-data.json', testament: 'old' },
  { file: 'new-testament-data.json', testament: 'new' },
]

const SCHEMA = `
PRAGMA journal_mode = OFF;
PRAGMA synchronous = OFF;

CREATE TABLE books (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  abbreviation TEXT NOT NULL,
  testament    TEXT NOT NULL CHECK (testament IN ('old', 'new')),
  sort_order   INTEGER NOT NULL,
  chapter_count INTEGER NOT NULL
);

CREATE TABLE chapters (
  id          TEXT PRIMARY KEY,
  book_id     TEXT NOT NULL REFERENCES books(id),
  number      TEXT NOT NULL,
  reference   TEXT NOT NULL,
  sort_order  INTEGER NOT NULL,
  verse_count INTEGER NOT NULL
);
CREATE INDEX idx_chapters_book ON chapters(book_id, sort_order);

CREATE TABLE verses (
  id         INTEGER PRIMARY KEY,
  chapter_id TEXT NOT NULL REFERENCES chapters(id),
  book_id    TEXT NOT NULL REFERENCES books(id),
  number     INTEGER NOT NULL,
  text       TEXT NOT NULL
);
CREATE INDEX idx_verses_chapter ON verses(chapter_id, number);

-- External-content index: the text lives in \`verses\`, FTS only holds the
-- inverted index, which keeps the shipped file roughly a third smaller.
CREATE VIRTUAL TABLE verses_fts USING fts5(
  text,
  content = 'verses',
  content_rowid = 'id',
  tokenize = 'porter unicode61'
);
`

const FINALISE = `
INSERT INTO verses_fts(verses_fts) VALUES('rebuild');
INSERT INTO verses_fts(verses_fts) VALUES('optimize');
VACUUM;
`

/** SQL string literal — the WEB text is full of apostrophes. */
function q(value) {
  return `'${String(value).replace(/'/g, "''")}'`
}

/**
 * The data stores a chapter as one string with "[1] … [2] …" markers. Split on
 * them so each verse becomes its own row.
 *
 * Note the leading whitespace the data carries before each marker: trimming is
 * what makes a verse's first character the first character of its sentence,
 * which is what verse-level rendering and quote matching both assume.
 */
function versesOf(content) {
  const verses = []
  const parts = content.split(/\[(\d+)\]/)
  for (let i = 1; i < parts.length; i += 2) {
    const number = Number(parts[i])
    const text = (parts[i + 1] || '').replace(/\s+/g, ' ').trim()
    if (text) verses.push({ number, text })
  }
  return verses
}

function main() {
  if (spawnSync('sqlite3', ['--version']).error) {
    throw new Error('sqlite3 CLI not found on PATH — install it and re-run.')
  }

  const sql = [SCHEMA]
  let bookOrder = 0
  let verseId = 0
  let totals = { books: 0, chapters: 0, verses: 0 }

  for (const { file, testament } of SOURCES) {
    const data = JSON.parse(
      fs.readFileSync(path.join(ROOT, 'data', file), 'utf8'),
    )

    for (const book of data.books) {
      bookOrder += 1
      sql.push(
        `INSERT INTO books VALUES (${q(book.id)}, ${q(book.name)}, ` +
          `${q(book.abbreviation || book.name)}, ${q(testament)}, ` +
          `${bookOrder}, ${book.chapters.length});`,
      )
      totals.books += 1

      book.chapters.forEach((chapter, index) => {
        const verses = versesOf(chapter.content)
        sql.push(
          `INSERT INTO chapters VALUES (${q(chapter.id)}, ${q(book.id)}, ` +
            `${q(chapter.number)}, ${q(chapter.reference)}, ${index + 1}, ` +
            `${verses.length});`,
        )
        totals.chapters += 1

        for (const verse of verses) {
          verseId += 1
          sql.push(
            `INSERT INTO verses VALUES (${verseId}, ${q(chapter.id)}, ` +
              `${q(book.id)}, ${verse.number}, ${q(verse.text)});`,
          )
        }
        totals.verses += verses.length
      })
    }
  }

  sql.push(FINALISE)

  fs.mkdirSync(path.dirname(OUT), { recursive: true })
  fs.rmSync(OUT, { force: true })

  // The statements run to several MB; hand sqlite3 a file rather than argv.
  const dump = path.join(os.tmpdir(), `bible-db-${process.pid}.sql`)
  fs.writeFileSync(dump, sql.join('\n'))
  try {
    execFileSync('sqlite3', [OUT], {
      input: fs.readFileSync(dump),
      stdio: ['pipe', 'inherit', 'inherit'],
      maxBuffer: 1024 * 1024 * 512,
    })
  } finally {
    fs.rmSync(dump, { force: true })
  }

  const mb = (fs.statSync(OUT).size / 1024 / 1024).toFixed(1)
  console.log(
    `Built ${path.relative(ROOT, OUT)} — ${totals.books} books, ` +
      `${totals.chapters} chapters, ${totals.verses} verses (${mb} MB)`,
  )
}

main()
