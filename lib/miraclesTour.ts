/**
 * Data for the guided tour: "Wonders and Hope".
 *
 * Fourteen miracles — seven from the Old Testament, seven from the New —
 * chosen for being widely known and for showing the same thing from many
 * angles: power meeting a situation that had already run out of options.
 * Every reference and quotation was checked against the World English Bible
 * text shipped in data/old-testament-data.json and data/new-testament-data.json,
 * so the pull quotes match what the reader shows.
 *
 * Structure: a welcome card, two sections each with an intro, a run of item
 * cards, and a closing synthesis, then an outro. The unit is a single miracle,
 * so each card carries a plain-language explanation and closes with a question
 * connecting it to the reader's own life — the throughline is hope.
 */

import { chapterIdOf, ref, type PassageRef } from './passages'
import { wonderById } from './wonders/catalog'
import type { TestamentId, Wonder } from './wonders/types'

export type { TestamentId }

/**
 * The tour walks a hand-picked run of catalog wonders. It owns the *order* and
 * the section framing; the wonders themselves — passage, tags and card prose —
 * live in lib/wonders, so there is exactly one place a wonder is described.
 */
export type Miracle = Wonder

function tourWonder(id: string): Miracle {
  const wonder = wonderById(id)
  if (!wonder) {
    throw new Error(
      `Tour step "${id}" has no entry in the wonder catalog (lib/wonders).`,
    )
  }
  return wonder
}

export interface TestamentSection {
  id: TestamentId
  /** e.g. "Old Testament Wonders" */
  title: string
  /** e.g. "Seven signs among the people of Israel" */
  subtitle: string
  /** Opening card for the section. */
  intro: string
  miracles: Miracle[]
  /** Closing card for the section: the pattern underneath, and what it asks of us. */
  synthesis: {
    heading: string
    /** What these miracles have in common. */
    patterns: string[]
    /** The hope-themed closing thought. */
    reflection: string
    passage: PassageRef
    quote: string
  }
}

export const TESTAMENT_SECTIONS: TestamentSection[] = [
  {
    id: 'old',
    title: 'Old Testament Wonders',
    subtitle: 'Seven signs among the people of Israel',
    intro:
      'Long before Jesus, the story of Israel is already full of the same message: help shows up exactly when hope runs out. These seven wonders — a sea, a desert, a wall, a fire, a furnace, a den of lions, and a fish — each say it a different way: no situation is too sealed shut.',
    miracles: [
      tourWonder('red-sea'),
      tourWonder('manna'),
      tourWonder('jericho'),
      tourWonder('elijah-fire'),
      tourWonder('fiery-furnace'),
      tourWonder('lions-den'),
      tourWonder('jonah'),
    ],
    synthesis: {
      heading: 'The pattern behind these seven wonders',
      patterns: [
        "Every one of them happens at the exact point where human effort has run out — not before.",
        "God's people are almost always asked to do one very ordinary thing first: stretch out a hand, march in silence, keep praying, gather what falls.",
        'None of these are private. Someone else always sees, and the story gets told for centuries.',
        'Hope, across the Old Testament, rarely means being kept away from danger. It means God arriving in the middle of it.',
      ],
      reflection:
        "Seven very different kinds of trouble — an army closing in, an empty stomach, a fortified wall, a fight nobody else would join, a furnace built to kill, a den of lions, three days inside a fish — and every single time, the miracle lands at the last possible moment, never a moment before it was needed. That timing isn't an accident. It's the whole point: help rarely arrives early, but it does arrive.",
      passage: ref('PSA', 'Psalms', '46', 1, 3),
      quote: 'God is our refuge and strength, a very present help in trouble.',
    },
  },

  {
    id: 'new',
    title: 'New Testament Wonders',
    subtitle: 'Seven signs through Jesus and the early church',
    intro:
      "In the Gospels and the book of Acts, the wonders get closer and more personal — a wedding about to be quietly ruined, a storm you're actually sitting in, a friend who has actually died. These seven moments show the same hope from nearer up: God present not just for a whole nation, but for one ordinary person, in one particular impossible moment.",
    miracles: [
      tourWonder('cana'),
      tourWonder('calming-storm-mrk'),
      tourWonder('feeding-5000-jhn'),
      tourWonder('walking-on-water-mat'),
      tourWonder('lazarus'),
      tourWonder('bleeding-woman-mrk'),
      tourWonder('peters-rescue'),
    ],
    synthesis: {
      heading: 'What changes, and what doesn\'t',
      patterns: [
        'The setting keeps shrinking: from a whole nation escaping an empire, down to one wedding, one boat, one hillside, one sickbed, one prison cell.',
        'Faith is almost always described as small right before it\'s rewarded — "if I just touch his clothes," "you of little faith."',
        'Jesus, and later his followers, are physically present in the worst moment — not arriving to explain it afterward.',
        'Every single rescue becomes something someone else needed to hear about — a crowd, a sister, a church, and now, you, reading it.',
      ],
      reflection:
        'The same hand that once split a sea now reaches into a wedding, a fishing boat, a hungry crowd, a house in mourning, a locked cell. The scale changed — from a nation to a person — but the pattern didn\'t. Whatever feels too small or too far gone to matter to anyone else has not turned out to be too small to matter here.',
      passage: ref('HEB', 'Hebrews', '13', 8, 8),
      quote: 'Jesus Christ is the same yesterday, today, and forever.',
    },
  },
]

/** The welcome card shown before the first section. */
export const MIRACLE_INTRO = {
  title: 'Wonders and Hope',
  subtitle: 'Fourteen moments when the impossible gave way',
  body: [
    'From a sea that refused to close over fleeing families, to a friend called back out of a tomb four days gone — the Bible is full of moments that should have ended in disaster, and didn\'t.',
    'This tour walks through fourteen of them: seven from the Old Testament, seven from the New. At each stop, the reader behind this panel opens the passage, so you can read the actual words for yourself.',
    'After each one, there\'s a short question. Not a quiz — just an invitation to notice where your own life might be asking for the same kind of hope.',
  ],
  duration: 'About 12–15 minutes · leave whenever you like',
}

/** The closing card shown after the last section. */
export const MIRACLE_OUTRO = {
  title: 'Hope has a history',
  body: [
    'Fourteen times, in fourteen very different kinds of trouble, hope showed up exactly when it was needed, and not one moment sooner.',
    'None of these stories erase the hard part. The sea was still terrifying to stand in front of. The tomb still smelled of death. The storm was still real while it lasted. The hope in each one isn\'t that the hard thing never happened — it\'s that the hard thing didn\'t get the final word.',
    'If you\'re in the middle of something that feels impossible right now, that\'s the exact place every person in this tour started too.',
  ],
  passage: ref('ROM', 'Romans', '15', 13, 13),
  quote:
    'Now may the God of hope fill you with all joy and peace in believing, that you may abound in hope in the power of the Holy Spirit.',
  furtherReading: [
    ref('LAM', 'Lamentations', '3', 22, 23),
    ref('PSA', 'Psalms', '121', 1, 2),
    ref('ISA', 'Isaiah', '41', 10, 10),
  ],
}

/* ---------------------------------------------------------------------------
 * Step sequence — the flat list of cards the tour walks through, in order.
 * ------------------------------------------------------------------------- */

export type MiracleTourStep =
  | { kind: 'welcome' }
  | { kind: 'section-intro'; sectionIndex: number }
  | { kind: 'miracle'; sectionIndex: number; miracleIndex: number }
  | { kind: 'section-synthesis'; sectionIndex: number }
  | { kind: 'outro' }

export const MIRACLE_STEPS: MiracleTourStep[] = [
  { kind: 'welcome' },
  ...TESTAMENT_SECTIONS.flatMap((section, sectionIndex) => [
    { kind: 'section-intro' as const, sectionIndex },
    ...section.miracles.map((_, miracleIndex) => ({
      kind: 'miracle' as const,
      sectionIndex,
      miracleIndex,
    })),
    { kind: 'section-synthesis' as const, sectionIndex },
  ]),
  { kind: 'outro' },
]

/** Index of the first step of a given section, used by "skip this section". */
export function firstStepOfSection(sectionIndex: number): number {
  return MIRACLE_STEPS.findIndex(
    (s) => s.kind === 'section-intro' && s.sectionIndex === sectionIndex,
  )
}

/** The section a step belongs to, or null for the welcome and closing cards. */
export function sectionIndexOfStep(step: MiracleTourStep): number | null {
  return step.kind === 'welcome' || step.kind === 'outro'
    ? null
    : step.sectionIndex
}

/** The passage a step should open in the reader, if any. */
export function passageOfMiracleStep(step: MiracleTourStep): PassageRef | null {
  switch (step.kind) {
    case 'miracle':
      return TESTAMENT_SECTIONS[step.sectionIndex].miracles[step.miracleIndex]
        .passage
    case 'section-synthesis':
      return TESTAMENT_SECTIONS[step.sectionIndex].synthesis.passage
    case 'outro':
      return MIRACLE_OUTRO.passage
    default:
      return null
  }
}

/** Re-export so components only need one place to build reader targets. */
export { chapterIdOf }

/* ---------------------------------------------------------------------------
 * Narration
 * ------------------------------------------------------------------------- */

export function narrationForMiracleStep(step: MiracleTourStep): string[] {
  switch (step.kind) {
    case 'welcome':
      return [MIRACLE_INTRO.title, MIRACLE_INTRO.subtitle, ...MIRACLE_INTRO.body]

    case 'section-intro': {
      const section = TESTAMENT_SECTIONS[step.sectionIndex]
      return [
        `Section ${step.sectionIndex + 1} of ${TESTAMENT_SECTIONS.length}. ${section.title}, ${section.subtitle}.`,
        section.intro,
      ]
    }

    case 'miracle': {
      const miracle =
        TESTAMENT_SECTIONS[step.sectionIndex].miracles[step.miracleIndex]
      // Card prose is optional on a catalog row, so read past anything a
      // not-yet-written wonder is missing rather than narrating "undefined".
      return [
        miracle.location
          ? `${miracle.title}. ${miracle.location}.`
          : `${miracle.title}.`,
        `Reading ${miracle.passage.label}.`,
        miracle.quote ? `${miracle.quote} ${miracle.quoteRef ?? ''}.` : '',
        miracle.whatHappened ?? '',
        miracle.hopeMeaning ?? '',
        miracle.reflectionQuestion ? 'Something to consider.' : '',
        miracle.reflectionQuestion ?? '',
      ].filter(Boolean)
    }

    case 'section-synthesis': {
      const { synthesis } = TESTAMENT_SECTIONS[step.sectionIndex]
      return [
        synthesis.heading,
        ...synthesis.patterns,
        synthesis.reflection,
        `${synthesis.quote} ${synthesis.passage.label}.`,
      ]
    }

    case 'outro':
      return [
        MIRACLE_OUTRO.title,
        ...MIRACLE_OUTRO.body,
        `${MIRACLE_OUTRO.quote} ${MIRACLE_OUTRO.passage.label}.`,
      ]
  }
}

/* ---------------------------------------------------------------------------
 * Accent colours — one per testament rather than one per item, since every
 * miracle in a section is a variation on the same hope rather than a
 * distinct viewpoint. Full class strings so Tailwind's scanner can see them.
 * ------------------------------------------------------------------------- */

export interface TestamentAccent {
  badge: string
  rule: string
  chip: string
  dot: string
}

// Old Testament reads green, New Testament blue. Both themes are dark, so a
// single translucent-fill/light-text treatment works without a `dark:` variant;
// the accents stay a step brighter than the page so they still separate from
// the green (pine) and blue (ocean) grounds they sit on.
export const TESTAMENT_ACCENTS: Record<TestamentId, TestamentAccent> = {
  old: {
    badge: 'bg-emerald-950/60 text-emerald-100 ring-emerald-400/40',
    rule: 'border-emerald-400/60',
    chip: 'bg-emerald-950/50 text-emerald-100',
    dot: 'bg-emerald-400',
  },
  new: {
    badge: 'bg-sky-950/60 text-sky-100 ring-sky-400/40',
    rule: 'border-sky-400/60',
    chip: 'bg-sky-950/50 text-sky-100',
    dot: 'bg-sky-400',
  },
}
