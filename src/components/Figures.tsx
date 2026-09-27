"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { figures } from "@/content/resume";

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

export function Figures() {
  return (
    <section aria-label="Numbers from the CV" className="relative">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden border-y border-[var(--line)] bg-[var(--line)] lg:grid-cols-4">
        {figures.map((f) => (
          <div key={f.label} className="bg-[var(--bg)] px-5 py-9 sm:px-8 md:py-12">
            <p className="display text-[clamp(2.4rem,5.2vw,4.4rem)] text-[var(--fg)]">
              <Count value={f.value} />
            </p>
            <p className="mt-3 font-mono text-[11.5px] text-[var(--accent)]">{f.unit}</p>
            <p className="mt-1.5 max-w-[24ch] text-[13.5px] leading-snug text-[var(--fg-muted)]">
              {f.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
