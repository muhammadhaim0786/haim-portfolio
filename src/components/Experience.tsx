import { roles } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

const DETAILED = 3; // recent roles carry detail; earlier roles stay as a compact record

/** Sticky rail plus one column of entries. One hairline above each entry. */
export function Experience() {
  const detailed = roles.slice(0, DETAILED);
  const earlier = roles.slice(DETAILED);

  return (
    <section id="experience" className="scroll-mt-20 py-24 md:py-32">
      <Shell>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading>Where I have worked</SectionHeading>
              <p className="mt-5 max-w-[32ch] text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                Five roles across healthcare, enterprise, government, gaming, and ERP delivery.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <ol>
              {detailed.map((role, i) => (
                <Reveal as="li" key={role.company} delay={i * 0.04}>
                  <article className="border-t border-[var(--line)] py-10 first:border-t-0 first:pt-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <h3 className="text-[1.35rem] font-medium tracking-[-0.025em] text-[var(--fg)]">
                        {role.company}
                        {role.current ? (
                          <span className="ml-2.5 align-middle font-mono text-[10.5px] font-normal text-[var(--accent)]">
                            NOW
                          </span>
                        ) : null}
                      </h3>
                      <span className="font-mono text-[12px] text-[var(--fg-dim)]">
                        {role.period}
                      </span>
                    </div>

                    <p className="mt-1 text-[13.5px] text-[var(--fg-muted)]">
                      {role.title}, {role.place}
                    </p>

                    <p className="mt-5 max-w-[60ch] text-[15px] leading-relaxed text-[var(--fg)]">
                      {role.summary}
                    </p>

                    <ul className="mt-6 grid gap-3.5 border-l border-[var(--line)] pl-5">
                      {role.points.map((p) => (
                        <li
                          key={p}
                          className="max-w-[66ch] text-[14px] leading-relaxed text-[var(--fg-muted)]"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>

                    <ul className="mt-6 flex flex-wrap gap-2">
                      {role.stack.map((s) => (
                        <li
                          key={s}
                          className="rounded-[var(--r)] border border-[var(--line)] px-2 py-1 font-mono text-[11px] text-[var(--fg-dim)]"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ol>

            <Reveal>
              <div className="mt-10 rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg-2)] p-6 sm:p-7">
                <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">Earlier</p>
                <ol className="mt-4 grid gap-5">
                  {earlier.map((role) => (
                    <li key={role.company} className="grid gap-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-0.5">
                        <p className="text-[15px] font-medium text-[var(--fg)]">
                          {role.company}
                          <span className="ml-2 text-[13.5px] font-normal text-[var(--fg-muted)]">
                            {role.title}
                          </span>
                        </p>
                        <span className="font-mono text-[11.5px] text-[var(--fg-dim)]">
                          {role.period}
                        </span>
                      </div>
                      <p className="max-w-[62ch] text-[13.5px] leading-relaxed text-[var(--fg-muted)]">
                        {role.summary}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Shell>
    </section>
  );
}
