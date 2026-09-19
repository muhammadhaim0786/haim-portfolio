"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Scroll reveal. Justification: sequences a section so the eye lands on the
 * heading before the detail.
 *
 * Deliberately not built on whileInView. The element renders VISIBLE on the
 * server and is only hidden on the client, before paint, when it starts below
 * the fold and motion is allowed. Once revealed it can never be hidden again,
 * so a resize, a rotation, a failed hydration or a disabled-JS visit can never
 * leave content invisible.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(true);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return;
    setArmed(true);
    setShown(false);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !armed || shown) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [armed, shown]);

  return (
    <Tag
      // @ts-expect-error one ref type across the four allowed tags
      ref={ref}
      className={className}
      style={
        armed
          ? {
              opacity: shown ? 1 : 0,
              transform: shown ? "none" : "translate3d(0, 18px, 0)",
              transition: `opacity 560ms cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 560ms cubic-bezier(0.16,1,0.3,1) ${delay}s`,
              willChange: shown ? "auto" : "opacity, transform",
            }
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
