"use client";

import { useCallback, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { method } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/**
 * Horizontal scroll-snap row with explicit controls. A trackpad or touch can
 * pan this natively, but a mouse wheel cannot, so the arrows are the only way
 * a large share of desktop visitors reach the last card. Motivation: feedback
 * and reachability, not decoration.
 */
export function Method() {
  const track = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 4);
  }, []);

  const page = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector("article");
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  }, []);

  const arrow =
    "grid size-10 place-items-center rounded-[var(--r)] border border-[var(--line-strong)] text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg)] active:translate-y-px disabled:cursor-not-allowed disabled:border-[var(--line)] disabled:text-[var(--fg-dim)] disabled:hover:bg-transparent";

  return (
    <section className="overflow-hidden border-y border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-32">
      <Shell className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading id="method">How I work</SectionHeading>
        <div className="flex gap-2">
          <button
            type="button"
            className={arrow}
            onClick={() => page(-1)}
            disabled={atStart}
            aria-label="Previous"
            aria-controls="method-track"
          >
            <CaretLeftIcon size={16} weight="bold" />
          </button>
          <button
            type="button"
            className={arrow}
            onClick={() => page(1)}
            disabled={atEnd}
            aria-label="Next"
            aria-controls="method-track"
          >
            <CaretRightIcon size={16} weight="bold" />
          </button>
        </div>
      </Shell>

      <Reveal>
        <div
          id="method-track"
          ref={track}
          onScroll={sync}
          tabIndex={0}
          role="group"
          aria-label="How I work, scrollable"
          className="snap-row mt-11 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:px-8 [&>*]:snap-start"
        >
          {/* Keeps the first card aligned to the page gutter on wide screens. */}
          <div
            aria-hidden
            className="hidden shrink-0 xl:block"
            style={{ width: "max(0px, calc((100vw - 1240px) / 2))" }}
          />
          {method.map((m) => (
            <article
              key={m.title}
              className="flex w-[82vw] shrink-0 flex-col rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg)] p-7 sm:w-[420px] sm:p-8"
            >
              <h3 className="max-w-[22ch] text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[var(--fg)]">
                {m.title}
              </h3>
              <p className="mt-4 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{m.body}</p>
            </article>
          ))}
          <div aria-hidden className="w-1 shrink-0 sm:w-4" />
        </div>
      </Reveal>
    </section>
  );
}
