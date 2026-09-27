import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactChannels } from "./ContactChannels";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Closing call to action shared by home, work and about. */
export function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden py-24 md:py-36"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(60% 70% at 20% 100%, var(--glow), transparent 70%)",
        }}
      />
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-[clamp(3.2rem,9vw,8rem)] text-[var(--fg)]">
              Let&rsquo;s
              <br />
              <span className="text-[var(--accent)]">talk.</span>
            </h2>
            <p className="mt-8 max-w-[42ch] text-[16px] leading-relaxed text-[var(--fg-muted)]">
              Open to quality engineering roles, remote or Islamabad based. Send a note and I will
              reply within 48 hours with a short read on where your coverage is likely thin.
            </p>
            <Link href="/contact" className="btn btn-primary mt-9">
              Get in touch
              <ArrowUpRightIcon size={14} weight="bold" />
            </Link>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6 lg:self-end">
            <ContactChannels />
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
