import type { ReactNode } from "react";
import { Shell } from "./Primitives";

/**
 * Inner-page header. States what the page is in display type and gets out
 * of the way. Top padding clears the floating nav.
 */
export function PageHeader({
  title,
  accent,
  lede,
  aside,
}: {
  title: string;
  accent?: string;
  lede: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--line)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "radial-gradient(55% 80% at 80% 0%, var(--glow), transparent 70%)" }}
      />
      <Shell className="pb-16 pt-36 md:pb-24 md:pt-44">
        <h1 className="display glow-text max-w-[14ch] text-[clamp(2.8rem,8vw,7rem)] text-[var(--fg)]">
          {title}
          {accent ? <span className="text-[var(--accent)]"> {accent}</span> : null}
        </h1>
        <p className="mt-8 max-w-[56ch] text-[16.5px] leading-relaxed text-[var(--fg-muted)]">{lede}</p>
        {aside ? <div className="mt-9">{aside}</div> : null}
      </Shell>
      <div id="top-sentinel" className="absolute left-0 top-2 h-px w-px" aria-hidden />
    </section>
  );
}
