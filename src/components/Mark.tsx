"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Reviewer's pen marks, drawn over real text with an SVG stroke whose
 * pathLength animates from 0 to 1. The text underneath stays plain, selectable
 * and readable by screen readers; the mark is aria-hidden decoration.
 *
 * The paths are deliberately a little uneven so they read as hand drawn.
 */

type Kind = "circle" | "underline" | "strike" | "scribble";

const shapes: Record<Kind, { viewBox: string; d: string; box: string; width: number }> = {
  circle: {
    viewBox: "0 0 200 70",
    d: "M122 7 C64 1 9 12 6 36 C3 61 72 69 120 64 C171 59 197 47 194 29 C191 11 146 2 92 9",
    box: "-left-[9%] -right-[9%] -top-[20%] -bottom-[14%]",
    width: 2.6,
  },
  underline: {
    viewBox: "0 0 200 20",
    d: "M3 13 C42 7 82 16 122 10 S182 8 197 12",
    box: "left-0 right-0 -bottom-[0.16em] h-[0.34em]",
    width: 3,
  },
  scribble: {
    viewBox: "0 0 200 24",
    d: "M3 9 C50 5 110 11 197 7 M8 17 C60 13 120 19 190 15",
    box: "left-0 right-0 -bottom-[0.26em] h-[0.42em]",
    width: 2.4,
  },
  strike: {
    viewBox: "0 0 200 20",
    d: "M2 12 C52 8 122 14 198 8",
    box: "left-[-3%] right-[-3%] top-[46%] h-[0.3em] -translate-y-1/2",
    width: 2.6,
  },
};

export function Mark({
  children,
  kind = "underline",
  delay = 0,
  onView = false,
  className = "",
}: {
  children: ReactNode;
  kind?: Kind;
  /** Seconds before the pen starts. */
  delay?: number;
  /** Draw when scrolled into view instead of on load. */
  onView?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const s = shapes[kind];
  const drawn = { pathLength: 1, opacity: 1 };
  const trigger = onView ? { whileInView: drawn, viewport: { once: true, amount: 0.8 } } : { animate: drawn };

  return (
    <span className={`relative inline-block whitespace-nowrap ${className}`}>
      <span className="relative z-[1]">{children}</span>
      <span aria-hidden className={`pointer-events-none absolute z-[2] ${s.box}`}>
        <svg
          aria-hidden
          viewBox={s.viewBox}
          preserveAspectRatio="none"
          className="block h-full w-full overflow-visible"
          fill="none"
        >
          <motion.path
            d={s.d}
            stroke="var(--red)"
            strokeWidth={s.width}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduce ? false : { pathLength: 0, opacity: 0 }}
            {...trigger}
            transition={{
              pathLength: { duration: kind === "circle" ? 0.9 : 0.6, delay, ease: [0.65, 0, 0.35, 1] },
              opacity: { duration: 0.01, delay },
            }}
          />
        </svg>
      </span>
    </span>
  );
}

/** Hand-drawn check, used by the capabilities checklist. */
export function Check({ delay = 0, size = 26 }: { delay?: number; size?: number }) {
  const reduce = useReducedMotion();
  return (
    <svg aria-hidden viewBox="0 0 40 40" width={size} height={size} fill="none" className="shrink-0">
      <rect x="3" y="5" width="32" height="32" rx="4" stroke="var(--rule-strong)" strokeWidth="1.5" />
      <motion.path
        d="M9 21 L17 30 L37 3"
        stroke="var(--red)"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, amount: 1 }}
        transition={{ duration: 0.45, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
