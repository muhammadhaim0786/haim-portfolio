import type { Metadata } from "next";
import { DownloadSimpleIcon, WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { paths, person } from "@/content/resume";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";
import { ContactChannels } from "@/components/ContactChannels";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Hiring for release quality, an automation build, or a QA process from scratch. Send a message, WhatsApp, or download the CV.",
};

/**
 * Rendered per request, not at build time. Reading the env at module scope
 * would bake the value into static HTML, so adding RESEND_API_KEY in Vercel
 * later would silently leave the fallback panel in place.
 */
export const dynamic = "force-dynamic";

export default function ContactPage() {
  const formLive = Boolean(process.env.RESEND_API_KEY?.trim());

  return (
    <>
      <PageHeader
        title="Work"
        accent="with me."
        lede="Three kinds of engagement, all of them about release quality. Pick the one that matches what is breaking, or just send a message."
        aside={
          <div className="flex flex-wrap gap-3">
            <a href="#send-message" className="btn btn-primary">
              Send a message
            </a>
            <a href={person.whatsapp} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
              <WhatsappLogoIcon size={16} />
              WhatsApp
            </a>
            <a href={person.cv} download={person.cvName} className="btn btn-ghost">
              <DownloadSimpleIcon size={16} />
              Download CV
            </a>
          </div>
        }
      />

      <section className="py-20 md:py-28">
        <Shell>
          <ol className="grid">
            {paths.map((p, i) => (
              <Reveal
                as="li"
                key={p.id}
                delay={i * 0.05}
                className="grid gap-6 border-t border-[var(--line)] py-10 md:grid-cols-12 md:gap-10"
              >
                <div className="md:col-span-5">
                  <span className="display stroke-text text-[3.2rem]">{i + 1}</span>
                  <h2 className="display-soft mt-3 max-w-[16ch] text-[clamp(1.6rem,2.6vw,2.2rem)] text-[var(--fg)]">
                    {p.title}
                  </h2>
                </div>
                <dl className="grid gap-6 sm:grid-cols-3 md:col-span-7 md:self-end">
                  {[
                    ["Who it is for", p.forWho],
                    ["What you get", p.youGet],
                    ["How to start", p.start],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="font-mono text-[12px] text-[var(--accent)]">{k}</dt>
                      <dd className="mt-2 text-[14.5px] leading-relaxed text-[var(--fg-muted)]">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ))}
          </ol>
        </Shell>
      </section>

      <section
        id="send-message"
        className="relative isolate scroll-mt-24 border-t border-[var(--line)] py-20 md:py-28"
      >
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{ background: "radial-gradient(50% 70% at 85% 100%, var(--glow), transparent 70%)" }}
        />
        <Shell>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <h2 className="display text-[clamp(2.4rem,5vw,4rem)] text-[var(--fg)]">
                Send a <span className="text-[var(--accent)]">message</span>
              </h2>
              <p className="mt-6 max-w-[40ch] text-[15.5px] leading-relaxed text-[var(--fg-muted)]">
                It lands straight in my inbox. I answer every message within 48 hours, including the
                ones that are not a fit. Prefer chat? WhatsApp works too.
              </p>
              <div className="mt-10">
                <ContactChannels compact />
              </div>
            </div>

            <div className="lg:col-span-7">
              {formLive ? (
                <div className="card p-6 sm:p-9">
                  <ContactForm />
                </div>
              ) : (
                <div className="card p-8 sm:p-10">
                  <p className="display-soft text-[1.6rem] text-[var(--fg)]">Email or WhatsApp is fastest</p>
                  <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
                    Send the stack, how you ship today, and what is currently getting caught late. I
                    answer within 48 hours.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href={`mailto:${person.email}?subject=Portfolio%20inquiry`} className="btn btn-primary">
                      Email me
                    </a>
                    <a href={person.whatsapp} target="_blank" rel="noreferrer noopener" className="btn btn-ghost">
                      <WhatsappLogoIcon size={16} />
                      WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
