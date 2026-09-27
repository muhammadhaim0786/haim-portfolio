import { capabilities } from "@/content/resume";
import { Check } from "./Mark";
import { Note } from "./Note";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/**
 * Capabilities as a review checklist. Heading sticks on the left, each item
 * gets its box ticked by hand as it scrolls into view.
 */
export function Capabilities() {
  return (
    <section className="py-24 md:py-32">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading id="capabilities">What I bring</SectionHeading>
              <p className="mt-6 max-w-[36ch] text-[16px] leading-relaxed text-[var(--ink-2)]">
                Coverage is chosen by which layer owns the behavior, so suites stay fast and failures stay
                diagnostic.
              </p>
              <Note className="mt-6">Every box below is something I do weekly, not a keyword.</Note>
            </div>
          </div>

          <ul className="lg:col-span-8">
            {capabilities.map((cap, i) => (
              <Reveal
                as="li"
                key={cap.area}
                delay={i * 0.04}
                className="grid grid-cols-[auto_1fr] gap-x-5 border-t border-[var(--rule)] py-8 first:border-t-0 first:pt-0 sm:gap-x-7"
              >
                <Check delay={0.1} size={30} />
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h3 className="title text-[clamp(1.5rem,2.4vw,1.9rem)] text-[var(--ink)]">{cap.lead}</h3>
                    <span className="font-mono text-[12px] text-[var(--ink-3)]">{cap.area}</span>
                  </div>
                  <p className="mt-3 max-w-[56ch] text-[15.5px] leading-relaxed text-[var(--ink-2)]">
                    {cap.body}
                  </p>
                  <p className="mt-4 font-mono text-[12.5px] leading-relaxed text-[var(--ink-3)]">
                    {cap.items.join(", ")}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Shell>
    </section>
  );
}
