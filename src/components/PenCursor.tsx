"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const INTERACTIVE = "a, button, input, textarea, select, label, [role='button']";

/**
 * Pen-tip follower. The system cursor stays as it is; this is a small red
 * nib that trails it and opens into a ring over anything clickable. Only on
 * devices with a fine pointer and hover, never under reduced motion. Position
 * lives in motion values, so moving the mouse never re-renders React.
 */
export function PenCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const over = !!(e.target as Element | null)?.closest?.(INTERACTIVE);
      setActive((prev) => (prev === over ? prev : over));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[58]"
    >
      <motion.div animate={{ opacity: visible ? 1 : 0 }} transition={{ duration: 0.2 }} className="relative">
        {/* Nib: a solid dot while writing. */}
        <motion.span
          animate={{ scale: active ? 0 : 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute -left-[4px] -top-[4px] block size-[8px] rounded-full bg-[var(--red)]"
        />
        {/* Ring: opens over anything you can click, like circling it. */}
        <motion.span
          animate={{ scale: active ? 1 : 0.2, opacity: active ? 1 : 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute -left-[20px] -top-[20px] block size-[40px] rounded-full border-[1.5px] border-[var(--red)]"
        />
      </motion.div>
    </motion.div>
  );
}
