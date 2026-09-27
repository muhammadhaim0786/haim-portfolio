"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { figures } from "@/content/resume";
import { Shell } from "./Primitives";

/** Counts up once when it enters view. Prefix/suffix are kept verbatim. */
function Count({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  useEffect(() => {
    const match = value.match(/^([^0-9]*)([0-9,]+)(.*)$/);
    if (!inView || reduce || !match || !ref.current) return;
    const target = Number(match[2].replace(/,/g, ""));
    const node = ref.current;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${match[1]}${Math.round(v).toLocaleString("en-US")}${match[3]}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return <span ref={ref}>{value}</span>;
}

/** Four numbers from the CV, set like the totals row of a test report. */
export function Figures() {
  return (
    <section aria-label="Numbers from the CV" className="border-y border-[var(--rule)]">
      <Shell>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {figures.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col py-9 md:py-11 ${i % 2 === 1 ? "pl-5 sm:pl-8" : "pr-5"} ${
                i > 0 ? "lg:border-l lg:border-[var(--rule)] lg:pl-8" : ""
              } ${i < 2 ? "border-b border-[var(--rule)] lg:border-b-0" : ""} ${i % 2 === 1 ? "border-l border-[var(--rule)]" : ""}`}
            >
              <dt className="order-3 mt-1.5 max-w-[24ch] text-[14px] leading-snug text-[var(--ink-2)]">
                {f.label}
              </dt>
              <dd className="display order-1 text-[clamp(2.4rem,4.6vw,3.8rem)] text-[var(--ink)]">
                <Count value={f.value} />
              </dd>
              <dd className="note order-2 mt-2">{f.unit}</dd>
            </div>
          ))}
        </dl>
      </Shell>
    </section>
  );
}
