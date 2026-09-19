import { work } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

const [feature, ...rest] = work;

function TechRow({ tech }: { tech: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-2 gap-y-2">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-[var(--r)] border border-[var(--line)] px-2 py-1 font-mono text-[11px] text-[var(--fg-dim)]"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Three items, three cells. One feature cell, two supporting cells. */
export function Work() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-32">
      <Shell>
        <SectionHeading id="work">Selected work</SectionHeading>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <Reveal as="article" className="md:col-span-2">
            <div
              className="relative h-full overflow-hidden rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg)] p-7 sm:p-10"
              style={{
                backgroundImage:
                  "radial-gradient(90% 120% at 100% 0%, var(--accent-wash), transparent 62%)",
              }}
            >
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">
                    {feature.client} / {feature.year}
                  </p>
                  <h3 className="mt-3 max-w-[18ch] text-[clamp(1.5rem,3vw,2.15rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--fg)]">
                    {feature.title}
                  </h3>
                  <p className="mt-5 max-w-[58ch] text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                    {feature.body}
                  </p>
                  <div className="mt-7">
                    <TechRow tech={feature.tech} />
                  </div>
                </div>

                <dl className="grid content-start gap-5 border-t border-[var(--line)] pt-7 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                  {feature.outcome.map((o) => (
                    <div key={o.k}>
                      <dt className="text-[12.5px] text-[var(--fg-dim)]">{o.k}</dt>
                      <dd className="mt-1 font-mono text-[15px] tracking-[-0.01em] text-[var(--fg)]">
                        {o.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>

          {rest.map((item, i) => (
            <Reveal as="article" key={item.title} delay={0.06 * (i + 1)}>
              <div
                className="flex h-full flex-col rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg)] p-7 sm:p-8"
                style={
                  i === 0
                    ? {
                        backgroundImage:
                          "repeating-linear-gradient(135deg, var(--line) 0 1px, transparent 1px 11px)",
                        backgroundSize: "auto",
                      }
                    : undefined
                }
              >
                <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">
                  {item.client} / {item.year}
                </p>
                <h3 className="mt-3 text-[1.3rem] font-medium leading-tight tracking-[-0.025em] text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-[46ch] flex-1 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  {item.body}
                </p>
                {item.outcome.map((o) => (
                  <p key={o.k} className="mt-6 font-mono text-[13px] text-[var(--accent)]">
                    {o.k}: {o.v}
                  </p>
                ))}
                <div className="mt-6">
                  <TechRow tech={item.tech} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
