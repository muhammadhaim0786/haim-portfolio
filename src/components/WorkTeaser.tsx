import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { work } from "@/content/resume";
import { Strike } from "./Strike";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";
import { WorkPinned } from "./WorkPinned";

/**
 * Work as corrections. Desktop with motion allowed gets the pinned, scroll
 * driven sequence; mobile and reduced motion get the same content as a list.
 */
export function WorkTeaser() {
  return (
    <section className="py-16 md:py-12">
      <div className="hidden motion-safe:md:[@media(min-height:700px)]:block">
        <WorkPinned />
      </div>

      <Shell className="motion-safe:md:[@media(min-height:700px)]:hidden">
        <SectionHeading>Selected work</SectionHeading>

        <ol className="mt-12">
          {work.map((item, i) => (
            <Reveal
              as="li"
              key={item.title}
              delay={i * 0.05}
              className="grid gap-6 border-t border-[var(--rule)] py-10 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="md:col-span-5">
                <p className="font-mono text-[12px] text-[var(--ink-3)]">
                  {item.client} / {item.year} / {item.kind}
                </p>
                <h3 className="title mt-3 max-w-[18ch] text-[clamp(1.6rem,2.6vw,2.1rem)] text-[var(--ink)]">
                  {item.title}
                </h3>
              </div>
              <div className="grid content-start gap-4 md:col-span-7 md:pt-7">
                <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-snug text-[var(--ink-3)]">
                  <span className="sr-only">Before: </span>
                  <Strike>{item.before}</Strike>
                </p>
                <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-snug text-[var(--ink)]">
                  <span className="sr-only">After: </span>
                  {item.after}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Link href="/work" className="btn btn-line mt-4">
          Read the case studies
          <ArrowRightIcon size={14} weight="bold" />
        </Link>
      </Shell>
    </section>
  );
}
