import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Closing moment. The one centered composition on the page. */
export function Contact() {
  return (
    <section
      className="border-t border-[var(--line)] py-28 md:py-36"
      style={{
        backgroundImage: "radial-gradient(60% 90% at 50% 100%, var(--accent-wash), transparent 70%)",
      }}
    >
      <Shell>
        <Reveal>
          <div className="mx-auto max-w-[44rem] text-center">
            <h2 id="contact" className="scroll-mt-28 text-[clamp(1.9rem,4.4vw,3rem)] font-medium leading-[1.06] tracking-[-0.035em] text-[var(--fg)]">
              Hiring for release quality?
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
              I am open to quality engineering roles, remote or Islamabad based. Send a note and I
              will reply with a short read on where your current coverage is likely thin.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${person.email}`}
                className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-6 text-[14px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
              >
                Get in touch
                <ArrowUpRightIcon size={14} weight="bold" />
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex h-11 items-center whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-6 text-[14px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-2)] active:translate-y-px"
              >
                LinkedIn
              </a>
            </div>

            <dl className="mx-auto mt-12 grid max-w-lg gap-px overflow-hidden rounded-[var(--r)] border border-[var(--line)] bg-[var(--line)] sm:grid-cols-2">
              <div className="bg-[var(--bg)] px-5 py-4 text-left">
                <dt className="font-mono text-[11px] text-[var(--fg-dim)]">Email</dt>
                <dd className="mt-1.5">
                  <a
                    href={`mailto:${person.email}`}
                    className="break-all text-[13.5px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                  >
                    {person.email}
                  </a>
                </dd>
              </div>
              <div className="bg-[var(--bg)] px-5 py-4 text-left">
                <dt className="font-mono text-[11px] text-[var(--fg-dim)]">Phone</dt>
                <dd className="mt-1.5">
                  <a
                    href={`tel:${person.phoneHref}`}
                    className="text-[13.5px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                  >
                    {person.phone}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Shell>
    </section>
  );
}
