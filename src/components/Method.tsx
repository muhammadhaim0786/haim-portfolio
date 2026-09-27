"use client";

import { useCallback, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import { method } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/**
 * Horizontal scroll-snap row with explicit controls. A trackpad or touch can
 * pan this natively, but a mouse wheel cannot, so the arrows are how most
 * desktop visitors reach the last card.
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
    "icon-btn disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 disabled:hover:border-[var(--line-strong)] disabled:hover:text-[var(--fg)]";

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
          className="snap-row mt-12 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:px-8 [&>*]:snap-start"
        >
          <div
            aria-hidden
            className="hidden shrink-0 xl:block"
            style={{ width: "max(0px, calc((100vw - 1320px) / 2))" }}
          />
          {method.map((m, i) => (
            <article
              key={m.title}
              className="card group relative flex w-[84vw] shrink-0 flex-col overflow-hidden p-7 transition-colors duration-300 hover:border-[var(--line-strong)] sm:w-[440px] sm:p-9"
            >
              <span
                aria-hidden
                className="display stroke-text pointer-events-none absolute -right-3 -top-4 text-[7rem] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
              >
                {i + 1}
              </span>
              <h3 className="display-soft relative max-w-[18ch] pr-14 text-[1.45rem] leading-[1.1] text-[var(--fg)]">
                {m.title}
              </h3>
              <p className="relative mt-5 text-[15px] leading-relaxed text-[var(--fg-muted)]">{m.body}</p>
            </article>
          ))}
          <div aria-hidden className="w-1 shrink-0 sm:w-4" />
        </div>
      </Reveal>
    </section>
  );
}
