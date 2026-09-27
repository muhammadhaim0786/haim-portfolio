"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { work } from "@/content/resume";
import { Note } from "./Note";
import { SectionHeading } from "./Primitives";

type Item = (typeof work)[number];
const N = work.length;

/** Keyframes that fade a panel in over its own slice of the scroll and out at the end. */
function frames(i: number) {
  const s0 = i / N;
  const s1 = (i + 1) / N;
  const e = 0.035;
  const pts: number[] = [];
  const vals: number[] = [];
  if (i === 0) {
    pts.push(0);
    vals.push(1);
  } else {
    pts.push(s0 - e, s0 + e);
    vals.push(0, 1);
  }
  if (i === N - 1) {
    pts.push(1);
    vals.push(1);
  } else {
    pts.push(s1 - e, s1 + e);
    vals.push(1, 0);
  }
  return { pts, vals, s0, len: s1 - s0 };
}

function Panel({ item, i, p }: { item: Item; i: number; p: MotionValue<number> }) {
  const { pts, vals, s0, len } = frames(i);
  const opacity = useTransform(p, pts, vals);
  const y = useTransform(
    p,
    pts,
    vals.map((v) => (1 - v) * 24),
  );
  const strike = useTransform(p, [s0 + len * 0.12, s0 + len * 0.45], [0, 100]);
  const strikeSize = useTransform(strike, (v) => `${v}% 2.5px`);
  const after = useTransform(p, [s0 + len * 0.45, s0 + len * 0.65], [0, 1]);
  const afterY = useTransform(after, [0, 1], [18, 0]);
  const pointer = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.article
      style={{ opacity, y, pointerEvents: pointer }}
      className="sheet absolute inset-0 flex flex-col justify-center p-10 xl:p-14"
    >
      <p className="font-mono text-[12.5px] text-[var(--ink-3)]">
        {item.client} / {item.year} / {item.kind}
      </p>
      <h3 className="display mt-4 max-w-[16ch] text-[clamp(2.2rem,3.8vw,3.4rem)] text-[var(--ink)]">
        {item.title}
      </h3>
      <p className="mt-9 text-[clamp(1.1rem,1.6vw,1.35rem)] leading-snug text-[var(--ink-3)]">
        <span className="sr-only">Before: </span>
        <motion.span
          style={{ backgroundSize: strikeSize }}
          className="bg-[linear-gradient(var(--red),var(--red))] bg-[position:0_58%] bg-no-repeat"
        >
          {item.before}
        </motion.span>
      </p>
      <motion.div style={{ opacity: after, y: afterY }} className="mt-5">
        <p className="text-[clamp(1.15rem,1.7vw,1.45rem)] leading-snug text-[var(--ink)]">
          <span className="sr-only">After: </span>
          {item.after}
        </p>
        <Note className="mt-4">{item.outcome.map((o) => `${o.k}: ${o.v}`).join("  /  ")}</Note>
      </motion.div>
    </motion.article>
  );
}

function IndexRow({ item, i, p }: { item: Item; i: number; p: MotionValue<number> }) {
  const { pts, vals } = frames(i);
  // Inactive rows fall back to --ink-3 (which passes AA) instead of fading
  // out, so every row stays readable while the active one stands out.
  const a = useTransform(p, pts, vals.map((v) => v * 100));
  const title = useTransform(a, (v) => `color-mix(in srgb, var(--ink) ${v}%, var(--ink-3))`);
  const num = useTransform(a, (v) => `color-mix(in srgb, var(--red) ${v}%, var(--ink-3))`);
  return (
    <li className="flex items-baseline gap-3 py-2">
      <motion.span style={{ color: num }} className="font-mono text-[12px]">
        {String(i + 1).padStart(2, "0")}
      </motion.span>
      <motion.span style={{ color: title }} className="title text-[17px]">
        {item.title}
      </motion.span>
    </li>
  );
}

/**
 * Desktop, motion-allowed version of Selected work. The section pins to the
 * viewport and each project gets one slice of the scroll: it arrives, the
 * reviewer strikes the "before", then the "after" is written in. The same
 * content renders as a plain list on mobile and under reduced motion.
 */
export function WorkPinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative" style={{ height: `${N * 90 + 100}vh` }}>
      <div className="sticky top-16 flex h-[calc(100dvh-4rem)] items-center">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-12 items-center gap-12 px-8">
          <div className="col-span-4">
            <SectionHeading>Selected work</SectionHeading>
            <div className="relative mt-10 pl-5">
              <span aria-hidden className="absolute inset-y-2 left-0 w-px bg-[var(--rule-strong)]" />
              <motion.span
                aria-hidden
                style={{ scaleY: bar }}
                className="absolute inset-y-2 left-0 w-[2px] origin-top bg-[var(--red)]"
              />
              <ol>
                {work.map((item, i) => (
                  <IndexRow key={item.title} item={item} i={i} p={scrollYProgress} />
                ))}
              </ol>
            </div>
            <Link href="/work" className="btn btn-line mt-10">
              Read the case studies
              <ArrowRightIcon size={14} weight="bold" />
            </Link>
          </div>
          <div className="relative col-span-8 h-[min(62vh,540px)]">
            {work.map((item, i) => (
              <Panel key={item.title} item={item} i={i} p={scrollYProgress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
