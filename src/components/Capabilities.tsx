import { capabilities } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";
import { SpotlightCard } from "./SpotlightCard";

/**
 * Bento, 6 columns by 3 rows, tiled exactly: 4+2, 2+2 (tall cell continues),
 * 4. Five items, five cells, no empty tiles. Collapses to one column < md.
 */
const placement = [
  "md:col-span-4 md:row-start-1 md:col-start-1",
  "md:col-span-2 md:row-span-3 md:row-start-1 md:col-start-5",
  "md:col-span-2 md:row-start-2 md:col-start-1",
  "md:col-span-2 md:row-start-2 md:col-start-3",
  "md:col-span-4 md:row-start-3 md:col-start-1",
];

const surfaces = [
  { backgroundImage: "radial-gradient(90% 140% at 0% 0%, rgb(198 243 94 / 0.14), transparent 60%)" },
  {
    backgroundImage:
      "radial-gradient(rgb(236 244 220 / 0.12) 1px, transparent 1px), radial-gradient(80% 60% at 50% 100%, rgb(128 160 44 / 0.25), transparent 70%)",
    backgroundSize: "16px 16px, auto",
  },
  undefined,
  { background: "var(--surface-2)" },
  { backgroundImage: "radial-gradient(70% 140% at 100% 100%, rgb(198 243 94 / 0.10), transparent 60%)" },
];

export function Capabilities() {
  return (
    <section className="py-24 md:py-32">
      <Shell>
        <SectionHeading id="capabilities">What I bring</SectionHeading>
        <p className="mt-6 max-w-[54ch] text-[16px] leading-relaxed text-[var(--fg-muted)]">
          Coverage is chosen by which layer owns the behavior, so suites stay fast and failures stay
          diagnostic.
        </p>

        <div className="mt-14 grid gap-4 md:grid-cols-6 md:grid-rows-3">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.area} delay={i * 0.05} className={placement[i]}>
              <SpotlightCard className="card flex h-full flex-col p-7 sm:p-8" style={surfaces[i]}>
                <p className="font-mono text-[12px] text-[var(--fg-dim)]">{cap.area}</p>
                <p className="display mt-4 text-[clamp(1.9rem,3.4vw,2.9rem)] text-[var(--fg)]">
                  {cap.lead}
                </p>
                <p className="mt-4 max-w-[42ch] text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                  {cap.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {cap.items.map((item) => (
                    <li key={item} className="chip">
                      {item}
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
