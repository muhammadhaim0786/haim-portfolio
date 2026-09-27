import * as icons from "simple-icons";
import type { SimpleIcon } from "simple-icons";
import { toolchain } from "@/content/resume";

const marks = toolchain
  .map((key) => (icons as unknown as Record<string, SimpleIcon>)[key])
  .filter(Boolean);

function Mark({ icon }: { icon: SimpleIcon }) {
  return (
    <span
      className="flex shrink-0 items-center gap-3 text-[var(--fg-dim)] transition-colors duration-300 hover:text-[var(--fg)]"
      title={icon.title}
    >
      <svg role="img" aria-label={icon.title} viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d={icon.path} />
      </svg>
      <span className="display-soft text-[15px] uppercase">{icon.title}</span>
    </span>
  );
}

/**
 * Toolchain rail. The only marquee on the site: it communicates breadth of
 * tooling at a glance. Pauses on hover, static under reduced motion.
 */
export function Toolchain() {
  return (
    <section aria-label="Day to day toolchain" className="border-b border-[var(--line)] py-7">
      <div className="rail relative overflow-hidden">
        <div className="rail-track flex w-max items-center gap-14">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center gap-14 pr-14" aria-hidden={copy === 1}>
              {marks.map((icon) => (
                <Mark key={`${copy}-${icon.slug}`} icon={icon} />
              ))}
            </div>
          ))}
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--bg)] to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--bg)] to-transparent"
        />
      </div>
    </section>
  );
}
