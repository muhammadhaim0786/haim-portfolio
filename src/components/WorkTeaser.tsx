import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { work } from "@/content/resume";
import { Reveal } from "./Reveal";
import { SectionHeading, Shell } from "./Primitives";

/** Compact index on the home page. The detail lives on /work. */
export function WorkTeaser() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--bg-2)] py-24 md:py-32">
      <Shell>
        <SectionHeading>Selected work</SectionHeading>

        <ol className="mt-10">
          {work.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.05}>
              <Link
                href="/work"
                className="group grid gap-x-8 gap-y-2 border-t border-[var(--line)] py-7 transition-colors duration-200 hover:bg-[var(--bg)] sm:grid-cols-12 sm:items-baseline"
              >
                <span className="font-mono text-[11.5px] text-[var(--fg-dim)] sm:col-span-3">
                  {item.client} / {item.year}
                </span>
                <span className="text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[var(--fg)] sm:col-span-6">
                  {item.title}
                </span>
                <span className="flex items-center gap-2 font-mono text-[12px] text-[var(--accent)] sm:col-span-3 sm:justify-end">
                  {item.outcome[0].v}
                  <ArrowRightIcon
                    size={13}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <Link
            href="/work"
            className="mt-8 inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-5 text-[14px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg)] active:translate-y-px"
          >
            Read the case studies
            <ArrowRightIcon size={14} weight="bold" />
          </Link>
        </Reveal>
      </Shell>
    </section>
  );
}
