import type { ReactNode } from "react";
import { Shell } from "./Primitives";

/**
 * Inner-page header. Deliberately not a second hero: no CTAs, no asset, no
 * eyebrow. It states what the page is and gets out of the way.
 */
export function PageHeader({
  title,
  lede,
  aside,
}: {
  title: string;
  lede: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(58% 90% at 82% 0%, var(--accent-wash), transparent 68%)",
        }}
      />
      <Shell className="relative pb-16 pt-16 md:pb-20 md:pt-24">
        <h1 className="max-w-[18ch] text-[clamp(2.1rem,5vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.035em] text-[var(--fg)]">
          {title}
        </h1>
        <p className="mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
          {lede}
        </p>
        {aside ? <div className="mt-9">{aside}</div> : null}
      </Shell>
      <div id="top-sentinel" className="absolute left-0 top-2 h-px w-px" aria-hidden />
    </section>
  );
}
