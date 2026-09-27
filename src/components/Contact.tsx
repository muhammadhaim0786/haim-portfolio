import Link from "next/link";
import { ContactChannels } from "./ContactChannels";
import { Mark } from "./Mark";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

/** Closing section shared by home, work and about. The sign-off. */
export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-[var(--rule)] py-24 md:py-32">
      <Shell>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <h2 className="display text-[clamp(2.6rem,6vw,5rem)] text-[var(--ink)]">
              Ready to ship{" "}
              <Mark kind="underline" onView delay={0.3}>
                with confidence?
              </Mark>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[16.5px] leading-relaxed text-[var(--ink-2)]">
              Open to quality engineering roles and app builds, remote or Islamabad based. Send a note and I
              will reply within 48 hours.
            </p>
            <Link href="/contact" className="btn btn-ink mt-9">
              Get in touch
            </Link>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-6 lg:self-end">
            <ContactChannels />
          </Reveal>
        </div>
      </Shell>
    </section>
  );
}
