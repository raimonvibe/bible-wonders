'use client'

import {
  BookOpen,
  Castle,
  CloudRain,
  DoorOpen,
  Eye,
  Fish,
  Flame,
  Footprints,
  Heart,
  HeartPulse,
  MapPin,
  MessageCircleQuestionMark,
  PawPrint,
  Quote,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Utensils,
  Waves,
  Wheat,
  Wine,
} from 'lucide-react'
import { TESTAMENT_ACCENTS } from '@/lib/miraclesTour'
import type { PassageRef } from '@/lib/passages'
import { parallelsOf } from '@/lib/wonders/catalog'
import { isAuthored, type Wonder } from '@/lib/wonders/types'

type IconType = React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>

const WONDER_ICONS: Record<string, IconType> = {
  'red-sea': Waves,
  manna: Wheat,
  jericho: Castle,
  'elijah-fire': Flame,
  'fiery-furnace': ShieldCheck,
  'lions-den': PawPrint,
  jonah: Fish,
  cana: Wine,
  'calming-storm-mrk': CloudRain,
  'feeding-5000-jhn': Utensils,
  'walking-on-water-mat': Footprints,
  lazarus: HeartPulse,
  'bleeding-woman-mrk': Heart,
  'peters-rescue': DoorOpen,
}

/** 178 catalog rows outnumber the hand-picked icons, so fall back rather than
 *  render `undefined` as a component. */
export function iconFor(id: string): IconType {
  return WONDER_ICONS[id] ?? Sparkles
}

interface Props {
  wonder: Wonder
  /** Open a passage in the reader (spotlighting its verses). */
  onOpenPassage: (passage: PassageRef) => void
  /** The tour moves focus here on each step so screen readers follow along. */
  headingRef?: React.Ref<HTMLHeadingElement>
}

/**
 * One wonder, rendered the same way wherever it appears — inside the guided
 * tour and inside the catalog browser. Wonders without card prose yet (most of
 * the catalog until Phase 7) still show their title, reference and parallels,
 * and still open the passage; they just say so plainly.
 */
export default function WonderCardBody({
  wonder,
  onOpenPassage,
  headingRef,
}: Props) {
  const accent = TESTAMENT_ACCENTS[wonder.testament]
  const parallels = parallelsOf(wonder)
  const Icon = iconFor(wonder.id)
  const authored = isAuthored(wonder)

  return (
    <div className="space-y-3.5">
      <div className="flex items-start gap-3">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ring-2 ${accent.badge}`}
          aria-hidden
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-xl font-bold text-pine-50 outline-none dark:text-ocean-50"
          >
            {wonder.title}
          </h2>
          {wonder.location && (
            <p className="flex items-center gap-1 font-sans text-xs leading-snug text-pine-300 dark:text-ocean-400">
              <MapPin className="h-3 w-3 shrink-0" aria-hidden />
              {wonder.location}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <button
          type="button"
          onClick={() => onOpenPassage(wonder.passage)}
          title={`Open ${wonder.passage.label}`}
          className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-sans text-[11px] font-medium transition-opacity hover:opacity-80 ${accent.chip}`}
        >
          <BookOpen className="h-3 w-3" aria-hidden />
          {wonder.passage.label}
        </button>
      </div>

      {/* The same event as another writer tells it. Opens that account in the
          reader; whatever you were doing keeps its place. */}
      {parallels.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-sans text-[11px] text-pine-300 dark:text-ocean-400">
            Also in
          </span>
          {parallels.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onOpenPassage(p.passage)}
              title={`Open ${p.passage.label}`}
              className="inline-flex items-center gap-1 rounded-full border border-pine-600 bg-pine-900/70 px-2.5 py-1 font-sans text-[11px] text-pine-100 transition-colors hover:border-pine-400 hover:bg-pine-800 dark:border-ocean-700 dark:bg-ocean-900/50 dark:text-ocean-200 dark:hover:border-ocean-500"
            >
              {p.passage.bookName}
            </button>
          ))}
        </div>
      )}

      {/* Why this account is kept separate from its siblings: what this
          writer stresses that the others don't. */}
      {wonder.distinctive && (
        <div className="rounded-xl border border-pine-600/70 bg-pine-800/50 p-3 dark:border-ocean-700/70 dark:bg-ocean-900/40">
          <p className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-pine-200 dark:text-ocean-300">
            <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden />
            What {wonder.passage.bookName} notices
          </p>
          <p className="font-serif text-[13px] leading-relaxed text-pine-100 dark:text-ocean-200">
            {wonder.distinctive}
          </p>
        </div>
      )}

      {authored ? (
        <>
          <blockquote className={`border-l-4 pl-3 ${accent.rule}`}>
            <Quote
              className="mb-1 h-3.5 w-3.5 text-pine-300 dark:text-ocean-300"
              aria-hidden
            />
            <p className="font-serif text-[15px] italic leading-relaxed text-pine-50 dark:text-ocean-100">
              {wonder.quote}
            </p>
            <cite className="mt-1.5 block font-sans text-[11px] not-italic text-pine-300 dark:text-ocean-400">
              {wonder.quoteRef}
            </cite>
          </blockquote>

          {wonder.details && wonder.details.length > 0 && (
            <div>
              <p className="mb-1.5 font-sans text-xs font-semibold uppercase tracking-wide text-pine-200 dark:text-ocean-300">
                Notice
              </p>
              <ul className="space-y-1.5">
                {wonder.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2 font-serif text-[13px] leading-relaxed text-pine-100 dark:text-ocean-200"
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${accent.dot}`}
                      aria-hidden
                    />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="rounded-xl bg-pine-800/70 p-3 font-serif text-[13px] leading-relaxed text-pine-100 dark:bg-ocean-900/50 dark:text-ocean-200">
            {wonder.whatHappened}
          </p>

          <p className="rounded-xl bg-pine-800/70 p-3 font-serif text-[13px] leading-relaxed text-pine-100 dark:bg-ocean-900/50 dark:text-ocean-200">
            {wonder.hopeMeaning}
          </p>
        </>
      ) : (
        <div className="rounded-xl border border-dashed border-pine-600 bg-pine-800/40 p-3 dark:border-ocean-700 dark:bg-ocean-900/40">
          <p className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-pine-300 dark:text-ocean-400">
            <ScrollText className="h-3.5 w-3.5" aria-hidden />
            Passage only
          </p>
          <p className="mt-1 font-serif text-[13px] leading-relaxed text-pine-100 dark:text-ocean-200">
            This wonder is in the catalog and opens in the reader, but its
            written card hasn&rsquo;t been added yet.
          </p>
        </div>
      )}

      {wonder.alsoSee && wonder.alsoSee.length > 0 && (
        <div>
          <p className="mb-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-pine-300 dark:text-ocean-400">
            Also read
          </p>
          <div className="flex flex-wrap gap-1.5">
            {wonder.alsoSee.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => onOpenPassage(p)}
                className="inline-flex items-center gap-1 rounded-full border border-pine-600 bg-pine-900/70 px-2.5 py-1 font-sans text-[11px] text-pine-100 transition-colors hover:border-pine-400 hover:bg-pine-800 dark:border-ocean-700 dark:bg-ocean-900/50 dark:text-ocean-200 dark:hover:border-ocean-500"
              >
                <BookOpen className="h-3 w-3" aria-hidden />
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {authored && (
        <div className="rounded-xl border border-accent/30 bg-accent/10 p-3">
          <p className="mb-1 flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-accent">
            <MessageCircleQuestionMark className="h-3.5 w-3.5" aria-hidden />
            Something to consider
          </p>
          <p className="font-serif text-[13px] italic leading-relaxed text-pine-50 dark:text-ocean-100">
            {wonder.reflectionQuestion}
          </p>
        </div>
      )}
    </div>
  )
}
