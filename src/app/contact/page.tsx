import type { Metadata } from "next";
import { DownloadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { paths, person } from "@/content/resume";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hiring for release quality, an automation build, or a QA process from scratch. Send an inquiry or download the CV.",
};

/**
 * Rendered per request, not at build time. Reading the env at module scope
 * bakes the value into the static HTML, so adding CONTACT_ENDPOINT in Vercel
 * later would silently leave the fallback panel in place.
 */
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const formLive = Boolean(process.env.CONTACT_ENDPOINT);

  return (
    <>
      <PageHeader
        title="Work with me"
        lede="Three kinds of engagement, all of them about release quality. Pick the one that matches what is breaking."
        aside={
          <a
            href={person.cv}
            download={person.cvName}
            className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-5 text-[14px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-2)] active:translate-y-px"
          >
            <DownloadSimpleIcon size={15} weight="regular" />
            Download CV
          </a>
        }
      />

      <section className="py-20 md:py-24">
        <Shell>
          <div className="grid gap-4 md:grid-cols-3">
            {paths.map((p, i) => (
              <Reveal
                as="article"
                key={p.id}
                delay={i * 0.05}
                className="flex h-full flex-col rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg-2)] p-7"
              >
                <h2 className="text-[1.15rem] font-medium leading-snug tracking-[-0.02em] text-[var(--fg)]">
                  {p.title}
                </h2>
                <dl className="mt-6 grid flex-1 gap-5">
                  <div>
                    <dt className="font-mono text-[11px] text-[var(--fg-dim)]">Who it is for</dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                      {p.forWho}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-[var(--fg-dim)]">What you get</dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                      {p.youGet}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[11px] text-[var(--fg-dim)]">How to start</dt>
                    <dd className="mt-1.5 text-[14px] leading-relaxed text-[var(--fg-muted)]">
                      {p.start}
                    </dd>
                  </div>
                </dl>
                <p className="mt-6 font-mono text-[12px] text-[var(--accent)]">{p.reply}</p>
              </Reveal>
            ))}
          </div>
        </Shell>
      </section>

      <section
        className="border-t border-[var(--line)] py-20 md:py-28"
        style={{
          backgroundImage:
            "radial-gradient(52% 80% at 50% 100%, var(--accent-wash), transparent 70%)",
        }}
      >
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="text-[clamp(1.6rem,3vw,2.2rem)] font-medium leading-[1.1] tracking-[-0.03em] text-[var(--fg)]">
                Send an inquiry
              </h2>
              <p className="mt-5 max-w-[40ch] text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
                It goes straight to my inbox. I answer every message within 48 hours, including the
                ones that are not a fit.
              </p>

              <dl className="mt-10 grid gap-5 border-t border-[var(--line)] pt-8">
                <div>
                  <dt className="font-mono text-[11px] text-[var(--fg-dim)]">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${person.email}`}
                      className="break-all text-[14px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                    >
                      {person.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] text-[var(--fg-dim)]">Phone</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`tel:${person.phoneHref}`}
                      className="text-[14px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                    >
                      {person.phone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[11px] text-[var(--fg-dim)]">LinkedIn</dt>
                  <dd className="mt-1.5">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[14px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                    >
                      muhammad-haim
                    </a>
                  </dd>
                </div>
              </dl>
            </div>

            <div className="lg:col-span-7">
              {formLive ? (
                <ContactForm />
              ) : (
                <div className="rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg-2)] p-8">
                  <p className="text-[16px] font-medium text-[var(--fg)]">
                    Email is the fastest route
                  </p>
                  <p className="mt-3 max-w-[46ch] text-[14px] leading-relaxed text-[var(--fg-muted)]">
                    Send the stack, how you ship today, and what is currently getting caught late.
                    I answer within 48 hours.
                  </p>
                  <a
                    href={`mailto:${person.email}?subject=Portfolio%20inquiry`}
                    className="mt-7 inline-flex h-11 items-center whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-6 text-[14px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
                  >
                    Email me
                  </a>
                </div>
              )}
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
