import { credentials } from "@/content/resume";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Dense inline strip. No cards, no hairline per row. */
export function Credentials() {
  return (
    <section aria-label="Education, certifications, and tools" className="py-20 md:py-24">
      <Shell>
        <Reveal>
          <div className="grid gap-10 md:grid-cols-3 md:gap-8">
            <div>
              <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">Education</p>
              <p className="mt-3 text-[15px] font-medium leading-snug text-[var(--fg)]">
                {credentials.education.degree}
              </p>
              <p className="mt-1.5 max-w-[34ch] text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                {credentials.education.school}, {credentials.education.year}
              </p>
            </div>

            <div>
              <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">Certifications</p>
              <ul className="mt-3 grid gap-2.5">
                {credentials.certifications.map((c) => (
                  <li key={c.name} className="text-[14px] leading-snug text-[var(--fg)]">
                    {c.name}
                    <span className="ml-2 text-[13px] text-[var(--fg-dim)]">{c.issuer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">Working tools</p>
              <p className="mt-3 max-w-[32ch] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                {credentials.tools.join(", ")}
              </p>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
