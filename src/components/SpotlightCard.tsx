"use client";

import type { CSSProperties, ReactNode } from "react";

/**
 * Writes the pointer position to --mx / --my on the element itself so the
 * .spotlight CSS can light the border under the cursor. No React state, no
 * re-render per pointer move.
 */
export function SpotlightCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`spotlight ${className}`}
      style={style}
      onPointerMove={(e) => {
        const el = e.currentTarget;
        const r = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {children}
    </div>
  );
}
