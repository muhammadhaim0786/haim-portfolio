"use client";

import { useRef, type ReactNode } from "react";
import { useInView } from "motion/react";

/**
 * Red strikethrough that draws across wrapped text, line by line. It is an
 * inline background gradient, so with the default box-decoration-break
 * (slice) the stroke travels along the text as one continuous line.
 */
export function Strike({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLSpanElement>(null);
  const on = useInView(ref, { once: true, amount: 1 });
  return (
    <span ref={ref} data-on={on ? "" : undefined} className="strike">
      {children}
    </span>
  );
}
