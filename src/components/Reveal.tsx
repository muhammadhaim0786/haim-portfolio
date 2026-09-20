import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveal, CSS only.
 *
 * Deliberately not IntersectionObserver. An observer fires on a sampling tick,
 * so a fast fling, an End keypress or a programmatic jump can carry an element
 * past the viewport between two ticks; the callback never runs and the content
 * stays at opacity 0 permanently. This was reproducible.
 *
 * A view() timeline is computed from scroll position every frame instead of
 * from events, so it cannot be skipped. Browsers without support fall through
 * the @supports gate and render the content plainly, and the whole thing sits
 * behind prefers-reduced-motion. There is no JavaScript and no client bundle.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  /** Stagger position. Kept as a number for call-site compatibility. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const step = Math.min(Math.round(delay / 0.05), 8);
  return (
    <Tag className={`reveal ${className}`} style={{ "--i": step } as CSSProperties}>
      {children}
    </Tag>
  );
}
