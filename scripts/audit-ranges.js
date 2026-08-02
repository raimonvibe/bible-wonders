#!/usr/bin/env node
/**
 * Are the wonders' verse ranges the right ones?
 *
 * validate-wonders.js is the correctness gate: it proves every reference
 * resolves and every pull quote appears verbatim inside the verses its
 * reference names. That is a claim about the *words*, and it is the one worth
 * failing a build over.
 *
 * It cannot say the *range* is right. A quote can be quoted perfectly from a
 * range that starts three verses after the story does, or runs twenty verses
 * past its ending into the next one, and validate-wonders will pass it — the
 * quote is still in there. The range is what the reader actually sees
 * highlighted when a card sends them into a chapter, so it is worth its own
 * check.
 *
 * This is that check. It is a report, not a gate: it exits 0 unless something
 * is structurally broken, because the interesting findings are judgement calls
 * a person has to read.
 *
 *   node scripts/audit-ranges.js
 *   node scripts/audit-ranges.js --all     # list every wonder, not just flags
 *
 * Run it after editing any card's reference. It reads the compiled catalog at
 * bible-wonders-flutter/assets/wonders.json, so run `npm run flutter:wonders`
 * first if the cards have changed since the last export.
 */

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(
  root,
  'bible-wonders-flutter',
  'assets',
  'wonders.json',
);

/* --- the shipped text ----------------------------------------------------- */

function loadChapters() {
  const chapters = new Map();
  for (const file of ['old-testament-data.json', 'new-testament-data.json']) {
    const raw = JSON.parse(
      fs.readFileSync(path.join(root, 'data', file), 'utf8'),
    );
    for (const book of raw.books) {
      for (const chapter of book.chapters) {
        chapters.set(chapter.id, chapter.content);
      }
    }
  }
  return chapters;
}

/** Split a chapter blob on its `[n]` markers, the way build-bible-db.js does. */
function versesOf(blob) {
  const marks = [];
  const re = /\[(\d+)\]\s*/g;
  let m;
  while ((m = re.exec(blob)) !== null) {
    marks.push({ number: Number(m[1]), at: m.index, end: re.lastIndex });
  }
  return marks.map((mark, i) => ({
    number: mark.number,
    text: blob
      .slice(mark.end, i + 1 < marks.length ? marks[i + 1].at : blob.length)
      .trim(),
  }));
}

/** The WEB uses curly quotes throughout; fold them before comparing. */
const normalise = (s) =>
  s
    .toLowerCase()
    .replace(/[‘’']/g, "'")
    .replace(/[“”"]/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

/* --- the checks ----------------------------------------------------------- */

/**
 * Words in a title that ought to leave a trace in the passage.
 *
 * Crude by design — it is looking for a reference pointing at the wrong chapter
 * entirely, not for a thesaurus match. Expect false positives: "The
 * Transfiguration" names an event the text describes without ever using the
 * word, and no passage says "Peter's mother-in-law" in those words.
 */
const IGNORED_TITLE_WORDS = new Set([
  'the', 'of', 'a', 'an', 'and', 'at', 'in', 'on', 'to', 'is', 'for', 'from',
  'with', 'by', 'his', 'her', 'their', 'its', 'jesus', 'god', 'lord', 'who',
]);

/** A range this long is usually two stories that were not separated. */
const LONG_RANGE = 25;

function audit(wonder, chapters) {
  const chapterId = `${wonder.passage.bookId}.${wonder.passage.chapterNumber}`;
  const blob = chapters.get(chapterId);
  const [first, last] = wonder.passage.verses;

  if (typeof blob !== 'string') {
    return { fatal: true, flags: [`NO-SUCH-CHAPTER(${chapterId})`], verses: 0 };
  }

  const all = versesOf(blob);
  const inRange = all.filter((v) => v.number >= first && v.number <= last);
  const chapterMax = Math.max(...all.map((v) => v.number));

  const flags = [];
  let fatal = false;

  // Structural: these are bugs, not opinions.
  if (first > last) {
    flags.push(`REVERSED(${first}>${last})`);
    fatal = true;
  }
  if (inRange.length === 0) {
    flags.push('EMPTY-RANGE');
    fatal = true;
  }
  if (last > chapterMax) {
    flags.push(`PAST-END(${last}>${chapterMax})`);
    fatal = true;
  }

  // Judgement: worth a person's eye, not a build failure.
  if (last - first + 1 >= LONG_RANGE) {
    flags.push(`VERY-LONG(${last - first + 1})`);
  }

  if (wonder.quote && inRange.length >= 8) {
    const needle = normalise(wonder.quote).slice(0, 45);
    const at = inRange.findIndex((v) => normalise(v.text).includes(needle));
    if (at === inRange.length - 1) {
      flags.push(`QUOTE-ONLY-IN-LAST-VERSE(of ${inRange.length})`);
    }
  }

  const words = normalise(wonder.title)
    .split(' ')
    .filter((w) => w.length > 3 && !IGNORED_TITLE_WORDS.has(w));
  if (words.length > 0 && inRange.length > 0) {
    const body = normalise(inRange.map((v) => v.text).join(' '));
    const hit = words.some((w) => body.includes(w.replace(/s$/, '')));
    if (!hit) flags.push(`TITLE-WORDS-ABSENT(${words.join(',')})`);
  }

  return { fatal, flags, verses: inRange.length };
}

/* --- report --------------------------------------------------------------- */

function main() {
  const showAll = process.argv.includes('--all');

  if (!fs.existsSync(catalogPath)) {
    console.error(
      `No compiled catalog at ${path.relative(root, catalogPath)}.\n` +
        'Run `npm run flutter:wonders` first.',
    );
    process.exit(1);
  }

  const { wonders } = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
  const chapters = loadChapters();

  const flagged = [];
  const fatals = [];
  const lengths = [];

  for (const wonder of wonders) {
    const result = audit(wonder, chapters);
    lengths.push(wonder.passage.verses[1] - wonder.passage.verses[0] + 1);

    const entry = {
      title: wonder.title,
      id: wonder.id,
      label: wonder.passage.label,
      ...result,
    };
    if (result.fatal) fatals.push(entry);
    if (result.flags.length > 0) flagged.push(entry);

    if (showAll && result.flags.length === 0) {
      console.log(`  ok  ${wonder.passage.label} — ${wonder.title}`);
    }
  }

  if (flagged.length > 0) console.log('');
  for (const entry of flagged) {
    console.log(`${entry.fatal ? 'BROKEN' : 'look'}  ${entry.flags.join('  ')}`);
    console.log(
      `        ${entry.title} — ${entry.label} (${entry.verses} verses) [${entry.id}]`,
    );
  }

  lengths.sort((a, b) => a - b);
  const at = (p) => lengths[Math.floor(lengths.length * p)];

  console.log(`
Checked ${wonders.length} wonders against the shipped WEB text.
  Structurally broken: ${fatals.length}
  Worth a look:        ${flagged.length - fatals.length}
  Range length:        min ${lengths[0]}, median ${at(0.5)}, p90 ${at(0.9)}, max ${lengths[lengths.length - 1]}
`);

  if (fatals.length === 0) {
    console.log('No range is empty, reversed, or runs past the end of its chapter.');
  }

  // The soft flags are judgement calls and must not fail anything; a broken
  // range is a real defect and should.
  process.exit(fatals.length > 0 ? 1 : 0);
}

main();
