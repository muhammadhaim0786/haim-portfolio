import { method } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/** Horizontal scroll-snap row. Distinct layout family from every other section. */
export function Method() {
  return (
    <section
      id="method"
      className="scroll-mt-20 overflow-hidden border-y border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-32"
    >
      <Shell>
        <SectionHeading>How I work</SectionHeading>
      </Shell>

      <Reveal>
        <div className="snap-row mt-11 flex snap-x gap-4 overflow-x-auto px-5 pb-2 sm:px-8 [&>*]:snap-start">
          {/* Spacer keeps the first card aligned to the page gutter on wide screens. */}
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
