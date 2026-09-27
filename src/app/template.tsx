"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Page turn. A template remounts on every navigation, so each new page is
 * revealed by a sheet of paper lifting off the top of the screen, its lower
 * edge ruled in red. The very first load skips the sheet so it never delays
 * the first paint of the hero.
 */
let firstLoad = true;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  // Read once per mount: true only for the initial page of the visit.
  const [initial] = useState(() => {
    // The server renders every request as a first load, which is also what
    // the client hydrates, so markup always matches.
    if (typeof window === "undefined") return true;
    const was = firstLoad;
    firstLoad = false;
    return was;
  });
  const play = !initial && !reduce;

  return (
    <>
      {play ? (
        <motion.div
          aria-hidden
          initial={{ y: "0%" }}
          animate={{ y: "-102%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          className="pointer-events-none fixed inset-0 z-[65] border-b-2 border-[var(--red)] bg-[var(--paper-2)] shadow-[0_24px_50px_-20px_rgb(19_21_24_/_0.4)]"
        />
      ) : null}
      <motion.div
        initial={play ? { opacity: 0, y: 18 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </>
  );
}
