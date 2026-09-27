import { credentials } from "@/content/resume";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Dense inline strip. No cards, no hairline per row. */
export function Credentials() {
  return (
    <section aria-label="Education, certifications, and tools" className="py-20 md:py-24">
      <Shell>
        <Reveal>
          <div className="sheet grid gap-10 p-7 sm:p-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="font-mono text-[11.5px] text-[var(--ink-3)]">Education</p>
              <p className="title mt-3 text-[1.25rem] leading-snug text-[var(--ink)]">
                {credentials.education.degree}
              </p>
              <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-relaxed text-[var(--ink-2)]">
                {credentials.education.school}, {credentials.education.year}
              </p>
            </div>

            <div>
              <p className="font-mono text-[11.5px] text-[var(--ink-3)]">Certifications</p>
              <ul className="mt-3 grid gap-2.5">
                {credentials.certifications.map((c) => (
                  <li key={c.name} className="text-[14px] leading-snug text-[var(--ink)]">
                    {c.name}
                    <span className="ml-2 text-[13px] text-[var(--ink-3)]">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11.5px] text-[var(--ink-3)]">Working tools</p>
              <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-[var(--ink-2)]">
                {credentials.tools.join(", ")}
              </p>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
