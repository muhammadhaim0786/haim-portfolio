import { method } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/**
 * Working principles as a two-by-two sheet of rules. The first sentence of
 * each is the rule; the body is the reason.
 */
export function Method() {
  return (
    <section className="border-t border-[var(--rule)] bg-[var(--paper-2)] py-24 md:py-32">
      <Shell>
        <SectionHeading id="method">How I work</SectionHeading>
        <div className="mt-14 grid gap-px overflow-hidden rounded-[var(--r)] border border-[var(--rule)] bg-[var(--rule)] md:grid-cols-2">
          {method.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.05} className="bg-[var(--sheet)] p-7 sm:p-10">
              <span aria-hidden className="display block text-[3.4rem] leading-none text-[var(--red)]">
                &para;
              </span>
              <h3 className="title mt-4 max-w-[22ch] text-[1.5rem] text-[var(--ink)]">{m.title}</h3>
              <p className="mt-4 max-w-[52ch] text-[15.5px] leading-relaxed text-[var(--ink-2)]">{m.body}</p>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
