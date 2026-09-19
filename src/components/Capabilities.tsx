import { capabilities } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/**
 * Bento, 6 columns by 3 rows, tiled exactly: 4+2, 2+2 (tall cell continues),
 * 6. Five items, five cells, no empty tiles.
 */
const placement = [
  "md:col-span-4 md:row-start-1 md:col-start-1",
  "md:col-span-2 md:row-span-2 md:row-start-1 md:col-start-5",
  "md:col-span-2 md:row-start-2 md:col-start-1",
  "md:col-span-2 md:row-start-2 md:col-start-3",
  "md:col-span-4 md:row-start-3 md:col-start-1",
];

const surfaces = [
  { backgroundImage: "radial-gradient(80% 140% at 8% 0%, var(--accent-wash), transparent 60%)" },
  {
    backgroundImage: "radial-gradient(var(--line-strong) 1px, transparent 1px)",
    backgroundSize: "14px 14px",
  },
  undefined,
  undefined,
  { background: "var(--surface)" },
];

export function Capabilities() {
  return (
    <section id="capabilities" className="scroll-mt-20 py-24 md:py-32">
      <Shell>
        <SectionHeading>What I bring</SectionHeading>
        <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
          Coverage is chosen by which layer owns the behavior, so suites stay fast and failures
          stay diagnostic.
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-3">
          {capabilities.map((cap, i) => (
            <Reveal
              key={cap.area}
              delay={i * 0.05}
              className={`${placement[i]} rounded-[var(--r)] border border-[var(--line)]`}
            >
              <div
                className="flex h-full flex-col rounded-[var(--r)] p-6 sm:p-7"
                style={surfaces[i]}
              >
                <p className="font-mono text-[11.5px] text-[var(--fg-dim)]">{cap.area}</p>
                <p className="mt-3 text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-none tracking-[-0.03em] text-[var(--fg)]">
                  {cap.lead}
                </p>
                <p className="mt-4 max-w-[42ch] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                  {cap.body}
                </p>
                <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-7">
                  {cap.items.map((item) => (
                    <li key={item} className="font-mono text-[11.5px] text-[var(--fg-dim)]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
