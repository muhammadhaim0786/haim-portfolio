import { work } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";
import { SpotlightCard } from "./SpotlightCard";

const [feature, ...rest] = work;

function TechRow({ tech }: { tech: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** Three items, three cells. One feature cell, two supporting cells. */
export function Work() {
  return (
    <section className="py-24 md:py-32">
      <Shell>
        <SectionHeading id="work">
          Case <span className="stroke-text">studies</span>
        </SectionHeading>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          <Reveal as="article" className="md:col-span-2">
            <SpotlightCard
              className="card h-full overflow-hidden p-7 sm:p-11"
              style={{
                backgroundImage:
                  "radial-gradient(90% 120% at 100% 0%, rgb(198 243 94 / 0.14), transparent 62%)",
              }}
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-7">
                  <p className="font-mono text-[12px] text-[var(--fg-dim)]">
                    {feature.client} / {feature.year} / {feature.kind}
                  </p>
                  <h3 className="display-soft mt-4 max-w-[16ch] text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--fg)]">
                    {feature.title}
                  </h3>
                  <p className="mt-6 max-w-[58ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
                    {feature.body}
                  </p>
                  <div className="mt-8">
                    <TechRow tech={feature.tech} />
                  </div>
                </div>

                <dl className="grid content-start gap-7 border-t border-[var(--line)] pt-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                  {feature.outcome.map((o) => (
                    <div key={o.k}>
                      <dt className="text-[13px] text-[var(--fg-dim)]">{o.k}</dt>
                      <dd className="display-soft mt-2 text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.05] text-[var(--accent)]">
                        {o.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </SpotlightCard>
          </Reveal>

          {rest.map((item, i) => (
            <Reveal as="article" key={item.title} delay={0.06 * (i + 1)}>
              <SpotlightCard
                className="card flex h-full flex-col p-7 sm:p-9"
                style={
                  i === 0
                    ? {
                        backgroundImage:
                          "repeating-linear-gradient(135deg, rgb(236 244 220 / 0.05) 0 1px, transparent 1px 12px)",
                      }
                    : { background: "var(--surface-2)" }
                }
              >
                <p className="font-mono text-[12px] text-[var(--fg-dim)]">
                  {item.client} / {item.year} / {item.kind}
                </p>
                <h3 className="display-soft mt-4 text-[1.7rem] leading-[1.05] text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-5 max-w-[46ch] flex-1 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                  {item.body}
                </p>
                {item.outcome.map((o) => (
                  <div key={o.k} className="mt-7">
                    <p className="text-[13px] text-[var(--fg-dim)]">{o.k}</p>
                    <p className="display-soft mt-2 text-[1.8rem] text-[var(--accent)]">{o.v}</p>
                  </div>
                ))}
                <div className="mt-7">
                  <TechRow tech={item.tech} />
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
