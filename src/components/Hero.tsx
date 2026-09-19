"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRightIcon, LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { figures, person } from "@/content/resume";
import { Shell } from "./Primitives";

/**
 * Asymmetric split hero. Left carries the claim, right carries the person and
 * the evidence in one bordered panel. Entry motion is a single staggered rise:
 * it establishes reading order, then stops. Nothing here loops.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section id="top" className="relative overflow-hidden">
      {/* Accent wash, behind content, never on a scrolling container. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] opacity-70"
        style={{
          background: "radial-gradient(70% 55% at 78% 18%, var(--accent-wash), transparent 70%)",
        }}
      />

      <Shell className="relative flex min-h-[calc(100dvh-4rem)] flex-col justify-center pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <motion.h1
              {...rise(0)}
              className="max-w-[16ch] text-[clamp(2.3rem,6.2vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.035em] text-[var(--fg)]"
            >
              I find the defects your{" "}
              <span className="text-[var(--accent)]">UI layer</span> hides.
            </motion.h1>

            <motion.p
              {...rise(1)}
              className="mt-7 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)] sm:text-base"
            >
              {person.subline}
            </motion.p>

            <motion.div {...rise(2)} className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-5 text-[14px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
              >
                Get in touch
                <ArrowUpRightIcon size={14} weight="bold" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-5 text-[14px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-2)] active:translate-y-px"
              >
                <LinkedinLogoIcon size={15} weight="regular" />
                LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.div
            {...rise(3)}
            className="overflow-hidden rounded-[var(--r)] border border-[var(--line)] lg:col-span-5"
          >
            <div className="flex items-center gap-4 border-b border-[var(--line)] p-5 sm:p-6">
              <Image
                src="/haim.jpg"
                alt={`${person.name}, ${person.role}`}
                width={400}
                height={400}
                priority
                sizes="80px"
                className="size-16 shrink-0 rounded-[var(--r)] object-cover sm:size-20"
              />
              <div className="min-w-0">
                <p className="truncate text-[16px] font-medium tracking-[-0.015em] text-[var(--fg)]">
                  {person.name}
                </p>
                <p className="mt-1 text-[13px] text-[var(--fg-muted)]">{person.role}</p>
                <p className="mt-0.5 font-mono text-[11.5px] text-[var(--fg-dim)]">
                  {person.location}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-2 gap-px bg-[var(--line)]">
              {figures.map((f) => (
                <div key={f.label} className="bg-[var(--bg)] p-5 sm:p-6">
                  <dd className="font-mono text-[clamp(1.45rem,3vw,1.9rem)] leading-none tracking-[-0.04em] text-[var(--fg)]">
                    {f.value}
                  </dd>
                  <dd className="mt-1.5 font-mono text-[11px] tracking-[0.02em] text-[var(--accent)]">
                    {f.unit}
                  </dd>
                  <dt className="mt-2.5 text-[12.5px] leading-snug text-[var(--fg-dim)]">
                    {f.label}
                  </dt>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </Shell>
      <div id="top-sentinel" className="absolute left-0 top-2 h-px w-px" aria-hidden />
    </section>
  );
}
