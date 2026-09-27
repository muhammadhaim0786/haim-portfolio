"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { work } from "@/content/resume";
import { SectionHeading, Shell } from "./Primitives";

type Item = (typeof work)[number];

const tints = [
  "radial-gradient(90% 120% at 100% 0%, rgb(198 243 94 / 0.16), transparent 60%)",
  "radial-gradient(90% 120% at 0% 100%, rgb(128 160 44 / 0.22), transparent 60%)",
  "radial-gradient(80% 110% at 50% 0%, rgb(198 243 94 / 0.10), transparent 62%)",
];

function StackCard({
  item,
  i,
  total,
  progress,
  reduce,
}: {
  item: Item;
  i: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean | null;
}) {
  // Each card shrinks and dims as the following cards slide over it.
  const start = i / total;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (total - 1 - i) * 0.05]);
  const brightness = useTransform(progress, [start, 1], [1, reduce ? 1 : 1 - (total - 1 - i) * 0.22]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <div className="md:sticky" style={{ top: `calc(6.5rem + ${i * 1.4}rem)` }}>
      <motion.article
        style={{ scale, filter, backgroundImage: tints[i % tints.length] }}
        className="card origin-top overflow-hidden p-7 shadow-[0_-24px_60px_-30px_rgb(0_0_0_/_0.9)] sm:p-10 md:min-h-[420px]"
      >
        <div className="grid h-full gap-10 md:grid-cols-12">
          <div className="flex flex-col md:col-span-7">
            <p className="font-mono text-[12px] text-[var(--fg-dim)]">
              {item.client} / {item.year} / {item.kind}
            </p>
            <h3 className="display-soft mt-4 max-w-[16ch] text-[clamp(1.8rem,3.6vw,3rem)] text-[var(--fg)]">
              {item.title}
            </h3>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
              {item.body}
            </p>
            <ul className="mt-auto flex flex-wrap gap-2 pt-8">
              {item.tech.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid content-end gap-6 md:col-span-5 md:border-l md:border-[var(--line)] md:pl-10">
            {item.outcome.map((o) => (
              <div key={o.k}>
                <dt className="text-[13px] text-[var(--fg-dim)]">{o.k}</dt>
                <dd className="display-soft mt-2 text-[clamp(1.4rem,2.3vw,2rem)] leading-[1.05] text-[var(--accent)]">
                  {o.v}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.article>
    </div>
  );
}

/** Sticky card stack on the home page. Full detail lives on /work. */
export function WorkTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section className="py-24 md:py-36">
      <Shell>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading>
            Selected <span className="stroke-text">work</span>
          </SectionHeading>
          <Link href="/work" className="btn btn-ghost">
            Read the case studies
            <ArrowRightIcon size={14} weight="bold" />
          </Link>
        </div>

        <div ref={ref} className="relative mt-14 grid gap-8 pb-4">
          {work.map((item, i) => (
            <StackCard
              key={item.title}
              item={item}
              i={i}
              total={work.length}
              progress={scrollYProgress}
              reduce={reduce}
            />
          ))}
        </div>
      </Shell>
    </section>
  );
}
