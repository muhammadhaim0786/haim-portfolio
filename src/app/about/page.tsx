import type { Metadata } from "next";
import Image from "next/image";
import { bio, person } from "@/content/resume";
import { PageHeader } from "@/components/PageHeader";
import { Experience } from "@/components/Experience";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Reveal } from "@/components/Reveal";
import { Shell } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Muhammad Haim, Quality Engineer in Islamabad. Five roles across healthcare, enterprise, government, gaming, and ERP delivery.",
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About"
        accent="me."
        lede="Quality Engineer, four and a half years in, currently owning release quality for a healthcare product across eight domains."
      />

      <section className="py-20 md:py-28">
        <Shell>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <figure className="lg:sticky lg:top-28">
                <Image
                  src="/haim.jpg"
                  alt={`${person.name}, ${person.role}`}
                  width={400}
                  height={400}
                  quality={90}
                  priority
                  className="w-full max-w-[380px] rounded-[var(--r-card)] border border-[var(--line-strong)] object-cover shadow-[0_30px_80px_-30px_rgb(128_160_44_/_0.6)]"
                />
                <figcaption className="mt-5 grid gap-1">
                  <span className="display-soft text-[1.3rem] text-[var(--fg)]">{person.name}</span>
                  <span className="text-[13.5px] text-[var(--fg-muted)]">{person.role}</span>
                  <span className="font-mono text-[11.5px] text-[var(--fg-dim)]">
                    {person.location}
                  </span>
                </figcaption>
              </figure>
            </Reveal>

            <div className="lg:col-span-7">
              {bio.map((para, i) => (
                <Reveal key={para} delay={i * 0.05}>
                  <p className="mb-6 max-w-[62ch] text-[17px] leading-[1.75] text-[var(--fg-muted)] first:text-[var(--fg)] first:text-[1.35rem] first:leading-[1.5]">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </Shell>
      </section>

      <Experience />
      <Credentials />
      <Contact />
    </>
  );
}
