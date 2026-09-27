import { work } from "@/content/resume";
import { Note } from "./Note";
import { Reveal } from "./Reveal";
import { Strike } from "./Strike";
import { Shell } from "./Primitives";

/**
 * Full case studies. Each one reads as a review: the state before (struck),
 * the work, and the outcome figures in the margin column.
 */
export function Work() {
  return (
    <section className="py-20 md:py-28">
      <Shell>
        <ol className="grid gap-6">
          {work.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.04}>
              <article className="sheet grid gap-10 p-7 sm:p-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-8">
                  <p className="font-mono text-[12px] text-[var(--ink-3)]">
                    {item.client} / {item.year} / {item.kind}
                  </p>
                  <h2 className="display mt-4 max-w-[18ch] text-[clamp(1.9rem,3.6vw,3rem)] text-[var(--ink)]">
                    {item.title}
                  </h2>
                  <p className="mt-6 text-[clamp(1.05rem,1.5vw,1.2rem)] leading-snug text-[var(--ink-3)]">
                    <span className="sr-only">Before: </span>
                    <Strike>{item.before}</Strike>
                  </p>
                  <p className="mt-5 max-w-[62ch] text-[16px] leading-relaxed text-[var(--ink-2)]">
                    {item.body}
                  </p>
                  <ul className="mt-7 flex flex-wrap gap-x-4 gap-y-1.5">
                    {item.tech.map((t) => (
                      <li key={t} className="font-mono text-[12.5px] text-[var(--ink-3)]">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid content-start gap-6 border-t border-[var(--rule)] pt-8 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
                  <dl className="grid gap-6">
                    {item.outcome.map((o) => (
                      <div key={o.k}>
                        <dt className="text-[13px] text-[var(--ink-3)]">{o.k}</dt>
                        <dd className="title mt-1.5 text-[clamp(1.35rem,2vw,1.7rem)] text-[var(--ink)]">
                          {o.v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <Note>{item.after}</Note>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Shell>
    </section>
  );
}
