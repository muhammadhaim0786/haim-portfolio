import type { ReactNode } from "react";
import { Mark } from "./Mark";
import { Shell } from "./Primitives";

/**
 * Inner-page header. States what the page is; one phrase gets the reviewer's
 * underline so every page carries the same hand.
 */
export function PageHeader({
  title,
  marked,
  lede,
  aside,
}: {
  title: string;
  marked?: string;
  lede: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden border-b border-[var(--rule)]">
      <div aria-hidden className="ruled absolute inset-0 -z-10 opacity-60" />
      <Shell className="pb-16 pt-16 md:pb-24 md:pt-24">
        <h1 className="display max-w-[16ch] text-[clamp(2.6rem,6.4vw,5.6rem)] text-[var(--ink)]">
          {title}
          {marked ? (
            <>
              {" "}
              <Mark kind="underline" delay={0.4}>
                {marked}
              </Mark>
            </>
          ) : null}
        </h1>
        <p className="mt-8 max-w-[56ch] text-[17px] leading-relaxed text-[var(--ink-2)]">{lede}</p>
        {aside ? <div className="mt-9">{aside}</div> : null}
      </Shell>
    </section>
  );
}
