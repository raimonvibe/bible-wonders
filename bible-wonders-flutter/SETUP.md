# Wonders and Hope — the Flutter app

A mobile reading of the same catalog the website serves: the Bible on one
screen, the 178 wonders on another, and one swipe between a wonder's card and
the chapter it happened in.

This directory holds Dart source and generated assets only. The native project
folders are not checked in — see **First run** below.

## Where the content comes from

Nothing in here is the source of truth. Both assets are generated from the
Next.js project one directory up, so a card is still only ever written once, in
`../lib/wonders/`, and still only ships if `npm run validate:wonders` passes.

```bash
# from the repo root, not this directory
npm run flutter:assets
```

That runs two scripts:

| Script | Output | What it does |
| --- | --- | --- |
| `../scripts/build-bible-db.js` | `assets/bible.db` (7.5 MB) | Splits the WEB chapter blobs on their `[n]` markers into 31,105 verse rows and builds an FTS5 index over them. |
| `../scripts/export-wonders.js` | `assets/wonders.json` (284 KB) | Runs the validator, then exports the compiled TypeScript catalog. Refuses to export a theme or era the Dart enums don't know. |

Re-run `npm run flutter:assets` after editing any card. If the database schema
changes, bump `_assetVersion` in `lib/data/bible_database.dart` — that is what
forces the copied-out copy on the device to be replaced.

The two generated files are gitignored. They are reproducible in seconds and
`bible.db` is large enough to be unpleasant in git history.

## First run

```bash
flutter create --project-name bible_wonders --org com.raimonvibe --platforms=android,ios .
```

`pubspec.yaml` already exists, so Flutter treats this as an existing project and
only fills in `android/` and `ios/`. It will not touch `lib/`.

Then:

```bash
npm run flutter:assets --prefix ..
flutter pub get
flutter run
```

Requires Flutter 3.27 or newer (Dart 3.6+) — the source uses `Color.withValues`,
which landed in that release.

## The one architectural rule

The app has a Bible tab and a Wonders tab, but a wonder's passage **opens
inside the Wonders tab**, never by switching to the Bible tab.

`lib/router.dart` uses `StatefulShellRoute.indexedStack`, so each tab keeps its
own navigator stack. `WonderDetailScreen` is a two-page `PageView` — the card,
then the passage — which is the phone translation of the website's 50/50 dock.
Following a card into Exodus 14 therefore costs you neither your place in the
catalog nor whatever chapter the Bible tab was left on.

Both pages render the same `PassageView`; the only difference between reading a
chapter and being sent to one is whether a highlight range was passed. If you
ever find yourself writing a second reader, something has gone wrong.

## Layout of the source

```
lib/
  main.dart              resolves prefs, catalog and database before first frame
  app.dart               MaterialApp.router, animated palette switch
  router.dart            the four tabs and their stacks
  providers.dart         Riverpod: repositories, theme, path state
  models/                Wonder, PassageRef, Book/Chapter/Verse
  data/
    bible_database.dart  copies assets/bible.db out of the bundle once
    bible_repository.dart  every scripture query, including FTS search
    wonders_repository.dart  the catalog, and the reading-path lookups
    reading_paths.dart   the four paths and the sort modes
    prefs.dart           resume state, on the website's localStorage keys
  features/
    shell/               the bottom nav
    wonders/             home, card body, and the card ⇄ passage detail
    bible/               books, chapters, reader, and the shared PassageView
    tour/                the guided tour (scaffold — see below)
    share/               render a card to PNG and hand it to the share sheet
    settings/
  theme/                 the pine and ocean palettes, and the two ThemeDatas
```

## Sharing a card

`features/share/` renders a fixed 1080×1350 widget off-screen and captures it at
3× to a PNG. It is not a screenshot of the on-screen card.

The content rule is hard: **only the verbatim quote and its reference go on the
image.** Those are public-domain WEB text and validator-checked. The
`whatHappened` and `hopeMeaning` prose is ours, and putting it in the same frame
as a scripture reference invites someone to read it as the Bible saying it.

## What is still scaffold

- **The tour** (`features/tour/`) walks the ranked shortlist, not the curated
  fourteen in `../lib/miraclesTour.ts`. Export that alongside the catalog and
  read it here.
- **Read aloud.** `flutter_tts` and `audio_service` are in `pubspec.yaml` and
  nothing uses them yet. This wants its own controller, shared by the tour and
  the reader, so the Tour / Passage / Both scope switcher the website has can be
  ported whole.
- **Search result highlighting.** `BibleRepository.search` returns FTS5
  `snippet()` output with matches wrapped in `{}`; the result list currently
  strips the braces instead of rendering the spans bold.
- **Bookmarks, highlights and notes.** These need a second, writable database —
  `bible.db` is opened read-only on purpose.
- **No tests yet.** The first one worth writing is a golden test over
  `ShareCard`, because it is the only widget whose exact output is the product.
