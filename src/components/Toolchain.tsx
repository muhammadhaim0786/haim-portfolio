import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { toolchain } from "@/content/resume";

const marks = toolchain.map((key) => (icons as unknown as Record<string, SimpleIcon>)[key]).filter(Boolean);

/**
 * Toolchain rail, logos only. The only marquee on the site: it shows breadth
 * of tooling at a glance. Pauses on hover, static under reduced motion.
 */
export function Toolchain() {
  return (
    <section aria-label="Day to day toolchain" className="py-9">
      <div className="rail relative overflow-hidden">
        <div className="rail-track flex w-max items-center">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex items-center gap-16 pr-16" aria-hidden={copy === 1}>
              {marks.map((icon) => (
                <li
                  key={`${copy}-${icon.slug}`}
                  title={icon.title}
                  className="text-[var(--ink-3)] transition-colors hover:text-[var(--ink)]"
                >
                  <svg
                    role="img"
                    aria-label={icon.title}
                    viewBox="0 0 24 24"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d={icon.path} />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--paper)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--paper)] to-transparent"
        />
      </div>
    </section>
  );
}
