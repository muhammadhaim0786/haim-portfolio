import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { toolchain } from "@/content/resume";
import { Shell } from "./Primitives";

const marks = toolchain
  .map((key) => (icons as unknown as Record<string, SimpleIcon>)[key])
  .filter(Boolean);

function Mark({ icon }: { icon: SimpleIcon }) {
  return (
    <span
      className="flex h-8 shrink-0 items-center text-[var(--fg-dim)] transition-colors duration-300 hover:text-[var(--fg)]"
      title={icon.title}
    >
      <svg
        role="img"
        aria-label={icon.title}
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="currentColor"
      >
        <path d={icon.path} />
      </svg>
    </span>
  );
}

/**
 * Toolchain rail. The only marquee on the page. Justification: this list is
 * about breadth, not individual attention, and a static grid of eleven marks
 * would read as a logo dump. Pauses on hover, static under reduced motion.
 */
export function Toolchain() {
  return (
    <section aria-label="Day to day toolchain" className="border-y border-[var(--line)] bg-[var(--bg-2)]">
      <Shell className="py-7">
        <div className="rail relative overflow-hidden">
          <div className="rail-track flex w-max items-center gap-12 sm:gap-16">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center gap-12 sm:gap-16" aria-hidden={copy === 1}>
                {marks.map((icon) => (
                  <Mark key={`${copy}-${icon.slug}`} icon={icon} />
                ))}
              </div>
            ))}
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-20"
            style={{ background: "linear-gradient(to right, var(--bg-2), transparent)" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-20"
            style={{ background: "linear-gradient(to left, var(--bg-2), transparent)" }}
          />
        </div>
      </Shell>
    </section>
  );
}
