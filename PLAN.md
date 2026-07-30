# Wonders and Hope — Project Plan & Checklist

Use this file if the chat/tokens run out: finish unchecked items in order.
Last updated: 2026-07-30

---

## Product summary

- **App name:** Wonders and Hope
- **Base:** Clone and expand [raimonvibe/bible-old-and-new-testament](https://github.com/raimonvibe/bible-old-and-new-testament)
- **Scope:** Divine miracles involving humans (miracles only; borderline included)
- **Tone:** Modest, respectful of Christianity and Scripture; hope/reflection style
- **Bible text:** World English Bible (WEB), English source; browser translate OK for UI + tour + quotes
- **Remove:** Five Voices tour entirely
- **Keep / improve:** Speech / read-aloud with a clear user toggle when the tour is open

---

## Feedback: why “Start Here” is not all ~190+

**You still get all wonders.** The full catalog (Bible order, best-known order, theme, book/era) is the place for **all ~200–260** entries. Nothing is held back from users who want everything.

**“Start Here” is a different job.** It is an on-ramp for first-time / overwhelmed users: a finishable path with the most familiar miracles, then a clear handoff (“Continue in full catalog”).

| If Start Here = all 190+ | Result |
|---|---|
| Same as full catalog | Menu option becomes redundant with D/E |
| No short win | Beginners face a marathon on day one |
| “Start” loses meaning | Name promises a beginning, delivers the entire library |

**Recommendation (locked unless you override):**

- **Start Here** = curated **~25** best-known wonders (short path + “continue in full catalog”)
- **Full catalog** = **all** wonders, available immediately via Bible order, best-known sort, theme, and book/era
- **Content goal** = author **every** wonder for the app (not a permanent 25-wonder product). Build UX first; fill cards in batches until `COUNT` is complete — users who pick full-catalog modes see everything that exists as it lands, ending at the full set

So: **all at once in the product catalog**, not **all stuffed into the Start Here button**.

---

## Locked decisions

### Layout & theme

- [ ] Desktop: true **50/50** split — Bible left, guided tour right
- [ ] Left and right panes **scroll independently**
- [ ] Mobile: Bible full-width + **bottom-sheet** tour (keep/adapt current behavior)
- [ ] Tour closed: Bible **full-width**, same dark theme
- [ ] Tour closed: floating **“Open Wonders and Hope”** button
- [x] Whole app: **dark** green/blue linear gradients (from eleven-up palette)
- [x] **OT = green** (`#1d4d3a` → `#163d2f`); **NT = blue** (`#0a3d6b` → `#062a4a`)
- [x] Theme toggle switches **green ↔ blue** (both dark; no light mode)

### Content rules

- [ ] Miracles only: divine miracles involving humans
- [ ] Not primary catalog: vision-only scenes, quiet providence stories
- [ ] **Plagues of Egypt = 1 grouped** wonder
- [ ] Gospel parallels = **separate wonders** (one per Gospel account)
- [ ] Parallel story text = **(a)** stress what is **distinctive** in that Gospel’s viewpoint
- [ ] On parallel cards: show **“Also in Matthew · Luke”** (etc.) jump links
- [ ] Borderline included (burning bush, Transfiguration, Pentecost, handwriting on the wall, etc.)
- [ ] Fig tree (fruitless) included
- [ ] Card shape: quote (WEB-matched) · what happened · hope meaning · reflection question
- [ ] Default reading order: **Bible / canonical order**
- [ ] **Familiarity / best-known order:** defined in data by curator (dev)

### Ordering / categorization menu (all options)

Users choose how to organize readings. Ship **all** of these in one menu:

| ID | Option | Behavior |
|----|--------|----------|
| A | Start Here | Curated **~25** best-known; handoff to full catalog when done |
| B | By theme | Healings, nature signs, provision, rescue, raisings, borderline/signs, etc. |
| C | By book / era | Torah, Kingdoms, Prophets, Matthew, Mark, Luke, John, Acts, … |
| D | Best-known (full catalog) | **All** wonders, sorted by familiarity |
| E | Sort toggle | Same set: **Bible order** ↔ **Best-known order** (+ search) |
| F | Beginner mode entry | First visit overview → Start Here / By theme / Full catalog (Bible order) |

- [ ] Implement menu exposing A–E (F = first-visit flow into those choices)
- [ ] First visit: show beginner overview every first visit
- [ ] Persist last path/sort in localStorage where sensible
- [ ] Full catalog modes always include **every** authored wonder (target: complete set)

### Speech / a11y / translate

- [ ] Keep screen-reader-friendly structure and speech mode
- [ ] **Default when a wonder opens: Tour only**
- [ ] Modes available: **Tour · Passage · Both**
- [ ] Switcher UI: **icons-only** with clear **aria-labels** (and tooltips on hover/focus if helpful)
- [ ] Switching must stay obvious and one-tap/click; do not bury controls
- [ ] Tour + reader text as real DOM text (browser Google Translate works)
- [ ] Do not put `translate="no"` on wonder story content
- [ ] Document `lang` stays English source; browser handles translation

### Repo

- [ ] Clone upstream into this workspace; keep `origin` → Bible repo for pulls
- [ ] Treat this as a new product; add user’s own remote later when ready
- [ ] Do not force-push or rewrite upstream history
- [ ] Keep this `PLAN.md` at **repo root**

---

## Count estimate (with locked rules)

With Gospel parallels counted separately + borderline included + plagues grouped:

**Target: ~200–260 wonders** — exact number after master index → update `COUNT: ___` below.

`COUNT: 178` — 87 Old Testament, 91 New Testament (see Phase 5 notes)

---

## Recommended build order

### Phase 0 — Continuity

- [x] Write / maintain this `PLAN.md`
- [x] Lock Start Here vs full-catalog distinction (see feedback section)
- [x] Lock Start Here = ~25 on-ramp (not full library)
- [x] Lock speech default = Tour only + easy switching
- [x] Lock speech UI = icons-only + aria-labels; modes Tour / Passage / Both
- [x] Lock familiarity order = curator-defined in data
- [x] Lock parallel “Also in …” links = yes
- [x] All previously open questions resolved
- [x] User says go → start Phase 1

### Phase 1 — Scaffold

- [x] Clone `raimonvibe/bible-old-and-new-testament` into this workspace
- [x] Preserve `PLAN.md` at root through clone (copy back if clone overwrites folder)
- [x] `npm install` / run dev; confirm Bible reader works
- [x] Note upstream tour files: `lib/miraclesTour.ts`, `components/GuidedTour.tsx`, speech hooks
- [x] **Env note:** use **Node ≥ 20.9** (nvm `20.20.2` works). System Node 18 is too old for Next 16. `tsc --noEmit` passes. `next dev` (Turbopack) starts. `next build` currently **bus errors** in this environment (SWC) — revisit in polish if still broken.

### Phase 2 — Theme + shell

- [x] Apply dark green/blue theme to **whole app** (replace beige system)
- [x] OT green / NT blue accents
- [x] Full-width Bible when tour closed (already true upstream; verified intact)
- [x] Floating **“Open Wonders and Hope”** button (renamed in Phase 3, once the
      two-tour picker was gone)

**Theme decision (locked 2026-07-30):** the light/dark toggle became a
**green ↔ blue** toggle. Both themes are dark; there is no light mode.

**How the two themes are wired:**

- Palettes are `pine` (OT green) and `ocean` (NT blue) in `tailwind.config.js`,
  replacing `beige` / `brown`. Normal Tailwind polarity: `50` lightest → `900`
  darkest.
- `darkMode: ['selector', 'html.theme-ocean']`, so **`dark:` now means "blue
  theme"**. Base classes are green, `dark:` variants are blue. Keep writing
  pairs like `text-pine-100 dark:text-ocean-100`.
- `ThemeProvider` stores `pine` | `ocean` under localStorage key
  `wonders-theme`; the inline script in `app/layout.tsx` applies the class
  before first paint.
- Testament accents (`TESTAMENT_ACCENTS` in `lib/miraclesTour.ts`) are
  `emerald` (OT) and `sky` (NT) — deliberately a step brighter than the page so
  they separate from both grounds. Single set, no `dark:` variant needed.
- `--accent` `#f4a261` is the theme-neutral highlight (search hits, read-aloud,
  verse spotlight) so "you are here" never reads as a testament colour.

(The Five Voices accents that were still light-fill are gone with that tour.)

### Phase 3 — Half/half layout

- [x] Desktop 50/50 Bible | tour; independent scroll
- [x] Mobile bottom-sheet tour; usable controls
- [x] Remove Five Voices tour (catalog, steps, UI entry points)

**How the two layouts are wired:**

- One breakpoint, `SPLIT_MIN_WIDTH = 960`, in `components/GuidedTour.tsx`,
  mirrored by the `960px` / `959px` media queries in `app/globals.css`.
  **Move both together.** 960 is chosen so the left pane still clears the
  ~420px reading column the old side-dock guaranteed.
- **≥ 960 — split.** The open panel's wrapper gets `.tour-dock`, which makes it
  a full-height `width: 50%` fixed pane on the right. `#main-content` carries
  `.tour-safe-inset` and is padded by `--reader-safe-right`. Percent, not `vw`,
  on **both** sides: `vw` counts a classic scrollbar and the layout viewport
  does not, which pulled the halves ~15px out of true.
- **< 960 — bottom sheet.** Unchanged from before: the panel anchors
  bottom-right and `--reader-safe-bottom` keeps the spotlit verses in the strip
  above it.
- `.tour-dock` is only on the *open panel's* anchor, so the launcher and the
  minimized pill keep their bottom-right corner at every width.
- Fixed page controls (search + theme) use `.tour-safe-right` to stay left of
  the dock, and carry their own backdrop since they float over the text.
- **Book/chapter grids use container queries**, not viewport breakpoints — see
  `.reader-container` / `.grid-books` / `.grid-chapters` in `globals.css`.
  Column counts match the old viewport breakpoints exactly, but they now key
  off the pane, so a docked tour doesn't leave five book columns crammed into
  half the window.

**Structure after the removal:** `lib/guidedTour.ts` and `lib/tourCatalog.ts`
are deleted. The shared `PassageRef` / `ref()` / `chapterIdOf()` helpers they
held moved to `lib/passages.ts`. `GuidedTour.tsx` went 1783 → ~1160 lines: no
tour-selection state, no picker screen, and the launcher opens Wonders and Hope
directly. "Back" is disabled on step 1 rather than returning to a picker.

### Phase 4 — Speech + translate

- [x] Default speech target: **Tour only**
- [x] Icons-only switcher for **Tour / Passage / Both**
- [x] Verify narration still works with new layout
- [x] Audit DOM for browser-translate friendliness

**How narration is wired:**

- `useTourNarration` exposes `enabled` (on/off) and `mode: 'tour' | 'passage' |
  'both'`. The old `includePassage` boolean is gone — it could express Tour and
  Both but **not Passage-only**, which the locked design requires.
- Mode defaults to `'tour'` and only writes to localStorage
  (`tour-speech-mode`) once the user actually picks something. `enabled` still
  defaults **off**: the default is about what gets read once you turn speech on,
  not about speaking unprompted.
- **One builder, `segmentsForStep()`, decides what is read.** Both the
  arrive-at-a-step narration and the voice sheet's *Replay step* call it, so
  they cannot drift. (Replay previously built its own list and silently ignored
  the passage setting.)
- Steps with no passage behind them (welcome, section intros, closing) fall back
  to the tour text in Passage-only mode, so those cards are never silent.
- The switcher sits on **its own row in the panel header**, not in the voice
  sheet — the locked design says switching must stay one click and not be
  buried.

**Translate audit — findings:**

- `<html lang="en">` stays English source; no `translate="no"` and no
  `.notranslate` anywhere in the app (verified at runtime, not just by grep).
- Tour and reader copy are real DOM text nodes (23 nodes in the panel, 107 in
  the reader on a sampled step). The two `dangerouslySetInnerHTML` sites
  (verse markup, search highlighting) still produce ordinary text nodes.
- **`aria-label` is not translated** by page translators, though `title` and
  text nodes are. So the icons-only switcher carries its label in a
  `<span class="sr-only">` plus `title`, not `aria-label` — still icons-only on
  screen, but translatable *and* announced by screen readers.
- Remaining icon buttons (minimize, close, speaker, step dots) still use
  `aria-label` and so stay English under translation. Not urgent — they are
  chrome, not content — but the `sr-only` pattern above is the fix if we want
  it in Phase 8.

**Environment note:** this dev browser reports zero installed TTS voices, so the
voice sheet renders its "no voices yet" empty state and the *Replay step* button
never mounts. Replay could not be exercised by clicking here; what was verified
is that it now calls the same `segmentsForStep()` builder (single call site),
and that builder was tested directly across all three modes.

### Phase 5 — Catalog architecture

- [x] Define wonder type + tags (theme, book/era, testament, parallelGroupId, familiarityRank)
- [x] Build **master index** (all miracles; parallels as separate rows; plagues = 1)
- [x] Record exact wonder count: **`COUNT: 178`**
- [x] Wire passage open + verse highlight from each wonder
- [x] Wire parallel “Also in …” links via `parallelGroupId`

**The count came in under the 200–260 estimate — 178.** The estimate assumed
more Gospel parallels than actually exist (19 shared events, not ~40) and
counted some vision-only scenes the locked rules exclude. 178 is the real number
under the rules as written; widening scope later (e.g. admitting visions, or
splitting the plagues) is the lever if a bigger catalog is wanted.

- Old Testament: 87 · New Testament: 91
- Parallel groups: 19 · Ranked for Start Here: 25

**Where it lives:**

- `lib/wonders/types.ts` — the `Wonder` type. Identity and tags are required;
  card prose is optional, because Phase 7 fills it in batches. `isAuthored()`
  is how the UI tells a finished card from an index stub.
- `lib/wonders/oldTestament.ts` / `newTestament.ts` — the index, in Bible order.
- `lib/wonders/catalog.ts` — `WONDERS` plus the lookups the reading paths need:
  `parallelsOf`, `byFamiliarity`, `startHere`, `byTheme`, `byEra`,
  `searchWonders`.
- `lib/passages.ts` — `PassageRef` / `ref()` / `chapterIdOf()`.

**One source of truth:** the tour no longer repeats a wonder's title, location
or passage. `lib/miraclesTour.ts` now holds only prose (`MiracleCard`) and joins
it to the catalog row by id via `card()`, which throws if an id has no catalog
entry. So the tour and the catalog cannot disagree about where a wonder happens.

**Every reference is machine-checked** — `npm run validate:wonders` compiles the
catalog with the project's own tsc and checks each entry against the WEB text in
`data/*.json`: the book, the chapter, the verse range, **and** that a
distinctive word from the title actually appears in the cited verses. That last
check is the one that catches a reference pointing at the wrong chapter, which
the first three would happily pass. It also enforces unique ids, unique
familiarity ranks, and that no `parallelGroupId` is left with a single account.

Titles that name an event the way readers do — "The Transfiguration", "Parting
of the Red Sea", "He Is Risen" — use words the WEB text never uses, so they
would flag forever. Those 13 were read by hand, confirmed correct, and listed in
`REVIEWED_TITLES` in the script, which keeps the report empty when nothing is
wrong. Two titles were genuinely wrong against the text and were fixed: the
WEB says *nobleman*, not "official" (John 4:46), and Luke never names Malchus
(that is John 18:10), so that id is now `severed-ear-luk`.

**Not done here:** the reading-path *menu* (Start Here, by theme, by era,
sort toggle, search) is Phase 6 — the catalog exposes the lookups it will need,
but nothing renders them yet. Only the 14 authored cards have prose; the other
164 are index rows until Phase 7.

### Phase 6 — Ordering menu (A–F)

- [x] Start Here curated list (25) + handoff to full catalog
- [x] Theme filters
- [x] Book / era filters
- [x] Best-known full-catalog sort (curator ranks in data)
- [x] Bible order ↔ best-known toggle + search
- [x] First-visit beginner overview → path picker

**Decision (2026-07-30): the browser lists all 178, not just the written ones.**
Unwritten wonders are badged *passage only* and still open the right chapter
with its verses highlighted, so the theme and era filters are useful now and
cards upgrade in place as Phase 7 lands. (The alternative — showing only
written cards — would have shipped a complete menu over 14 items spread across
7 themes and 10 eras.)

**Where it lives:**

- `lib/wonders/paths.ts` — the path model (`start-here` / `theme` / `era` /
  `catalog`), the sort mode, search, and `wondersFor(state)` which is the single
  place a list is derived. Also the localStorage helpers.
- `components/CatalogBrowser.tsx` — the path tabs, theme/era pickers, sort
  toggle, search, list, and the Start Here handoff.
- `components/WonderCardBody.tsx` — **one** card renderer, used by both the
  guided tour and the browser, including the *passage only* state.
- The beginner overview lives in `GuidedTour.tsx`, which now switches between
  three faces: `overview` → `browse` → `tour`.

**Panel behaviour:** the launcher opens the reading paths, not the tour — the
tour is one path among them. Tour-only chrome (narration controls, section
pills, progress bar, footer nav, arrow-key navigation) is gated behind the tour
view, so browsing can't silently advance a hidden tour. A back arrow returns
from the tour to the paths.

**What persists:** the last path and sort only. A theme/era filter and a search
query reset when you switch paths, which is what "pick up where I left off"
should mean. `wonders-seen-overview` is deliberately a *separate* key from the
tour's own seen-flag, so meeting the tour doesn't count as having met the paths.

**Start Here ignores the sort toggle** — it is a curated order, so offering to
re-sort it would undo the only thing it does. It ends with a handoff to the full
catalog rather than just stopping.

**A bug this phase surfaced and fixed:** the card prose lived in
`lib/miraclesTour.ts` while the browser lists catalog rows, so `isAuthored()`
was false for everything and all 178 — including the Red Sea — rendered as
*passage only*. The prose has moved into the catalog rows where Phase 7 expects
it, and the tour is now just an ordered list of catalog ids
(`tourWonder('red-sea')`). Narration reads past missing prose rather than
narrating `undefined`, so a tour step could point at a stub without breaking.

`npm run validate:wonders` now also reports how many cards are written
(**14 / 178**), which is the Phase 7 progress bar.

### Phase 7 — Content fill (batches until complete)

- [x] Batch OT Torah / Exodus (incl. grouped Plagues) — 33/33
- [x] Batch OT Historical (Joshua–Kings, Elijah/Elisha, etc.) — 47/47
- [x] Batch OT Prophets / Daniel / Jonah / borderline OT — 7/7
- [x] Batch Matthew miracle accounts — 22/22
- [x] Batch Mark miracle accounts — 20/20
- [x] Batch Luke miracle accounts — 21/21
- [x] Batch John miracle accounts / signs — 9/9
- [x] Batch Acts + early church — 19/19
- [x] Borderline NT (Transfiguration, Pentecost, fig tree) — included in the batches
- [x] Assign `familiarityRank` for best-known modes + Start Here (25)
- [x] Final pass: parallel links, quote accuracy — enforced by the validator
- [x] Confirm `COUNT` matches master index — **178 / 178 written**

**How the cards were written, and why it is checkable:**

- `node scripts/show-passage.js "Exodus 14:21-31"` prints the shipped WEB text.
  Quotes are copied from that output, never written from memory.
- Card prose goes in a JSON batch under `batches/`, and
  `node scripts/add-cards.js batches/<file>.json` merges it into the catalog.
  It refuses to overwrite existing prose without `--force`. The batches are
  kept as the record of what was written.
- `npm run validate:wonders` is the gate. It requires every `quote` to appear
  **verbatim** in the verses its `quoteRef` names, every written card to have
  quote/quoteRef/details, and every written parallel account to carry a
  `distinctive`.

**The verbatim check caught 20 misquotes across the phase.** Almost all were
the same mistake: trimming a quote to a nice-sounding fragment and
re-punctuating it — starting at "While he was angry" where the text reads
"…and while he was angry", or ending on a full stop where the verse continues
with a comma. Two were worse: a quote for Luke 7:8 written from *Matthew's*
wording without reading Luke's own text, and a `quoteRef` typo pointing at
John 21:21 instead of John 6:21 with correct text attached. None of these are
findable by re-reading the prose; all of them were caught mechanically.

**Two quirks of the shipped WEB data, worth knowing before editing cards:**

1. The first word of every verse is capitalised, so a quote spanning a verse
   boundary picks up a stray capital mid-sentence. Quote one complete verse,
   or widen the `quoteRef` to the full range (e.g. `Acts 5:19-20`).
2. Curly quotation marks and apostrophes are used throughout. The validator
   normalises them, so either form matches.

**Tone.** The judgment accounts — the flood, Sodom, Lot's wife, Korah, Nadab
and Abihu, Uzzah, the quail, Ananias and Sapphira, Herod — are written soberly
rather than given a forced hopeful reading. Where the text offers no comfort,
the card says so. Uzzah's card preserves David's anger without correcting it.
That was a deliberate choice; it can be softened, but it should be softened on
purpose.

### Phase 8 — Polish

- [x] Progress / resume position
- [x] Empty states, errors, reduced-motion
- [x] Mobile QA + desktop QA
- [x] Update README for Wonders and Hope
- [x] Check off remaining items

**Errors.** A failed `/api/bible-data` load was only written to the console, so
the reader showed a loading pulse forever with no way out. It now checks
`res.ok`, surfaces a real error naming the book and the status, and offers
Try again. Verified end to end by making the route return 500, watching the
error render, restoring the route and confirming the retry recovers.

**Reduced motion.** Tailwind's `animate-*` utilities are not motion-aware, so
`animate-ping`, `animate-pulse`, `listen-wave-active` and
`animate-listen-panel-in` kept moving for someone who had asked for stillness —
as did `html { scroll-behavior: smooth }`, which is the largest movement in the
app since the tour scrolls the reader to each passage. All are now covered.

**Resume.** Two independent positions are remembered: the last wonder opened
(`wonders-last-read`) and how far the tour got (`wonders-tour-step`). Both are
*offered* on the panel, never restored automatically — reopening should not
drag you somewhere you did not ask to go. Finishing the tour clears its
position; closing it part-way deliberately does not.

**QA.** Walked at 375, 768 and 1280 in both themes: no horizontal overflow at
any width, the split is exactly 50/50 (632.5 / 632.5 at 1280), the bottom sheet
holds below 960, all 20 tour steps run, and the full catalog lists 178 with
zero stubs. Clean console on a fresh load.

---

## Status

All phases complete. `COUNT: 178`, all 178 cards written.

Before shipping, two things are worth a human eye:

1. **Tone of the judgment cards** (see the Phase 7 note). Roughly a dozen cards
   — the flood, Sodom, Lot's wife, Korah, Nadab and Abihu, Uzzah, the quail,
   Ananias and Sapphira, Herod — are deliberately sober rather than hopeful.
   That is a real editorial choice on a product whose stated tone is hope.
2. **`next build` was reported broken in this environment** (SWC bus error,
   Phase 1 note). `next dev` and `tsc --noEmit` are clean, but a production
   build has not been run since.

---

## Card template (do not dilute)

Each wonder card should include:

1. Title + location + testament
2. Passage ref (opens left pane; highlights verses)
3. WEB pull quote + quoteRef
4. Short details (optional bullets)
5. What happened (plain language)
6. Hope meaning
7. Reflection question
8. For Gospel parallels: **distinctive viewpoint** of that book
9. **Also in …** links to sibling Gospel (or other) accounts
10. Tags: theme + book/era + `parallelGroupId` + `familiarityRank`

---

## Theme tokens (eleven-up)

```text
--felt: #1d4d3a
--felt-dark: #163d2f
--felt-blue: #0a3d6b
--felt-blue-dark: #062a4a
--bg: #0f0f1a
radial wash: #243b55 → #0f0f1a
green border: #2a6b52
blue border: #1a5a9e
accent (sparing): #f4a261
```

Gradients: `linear-gradient(160deg, felt → felt-dark)` and blue equivalents.

---

## Open questions

None blocking. Say **go** to start Phase 1.

---

## Resume snippet (paste into a new chat if needed)

```text
Continue Wonders and Hope from PLAN.md in this workspace.
Respect all locked decisions. Do the next unchecked checklist items in order.
Do not re-litigate closed questions unless PLAN.md still has them open.
```
