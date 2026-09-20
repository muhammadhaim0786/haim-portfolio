import Link from "next/link";
import { ArrowUpRightIcon, DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Closing call to action. The one centered composition on each page. */
export function Contact() {
  return (
    <section
      className="border-t border-[var(--line)] py-24 md:py-32"
      style={{
        backgroundImage: "radial-gradient(60% 90% at 50% 100%, var(--accent-wash), transparent 70%)",
      }}
    >
      <Shell>
        <Reveal>
          <div className="mx-auto max-w-[44rem] text-center">
            <h2 className="text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-[-0.035em] text-[var(--fg)]">
              Hiring for release quality?
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
              I am open to quality engineering roles, remote or Islamabad based. Send a note and I
              will reply with a short read on where your current coverage is likely thin.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-6 text-[14px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
              >
                Get in touch
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
              <a
                href={person.cv}
                download={person.cvName}
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-6 text-[14px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-2)] active:translate-y-px"
              >
                <DownloadSimpleIcon size={15} weight="regular" />
                Download CV
              </a>
            </div>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
