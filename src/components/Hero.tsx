"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";
import { Mark } from "./Mark";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Split hero. Left: the claim, typeset plainly, then marked up by the
 * reviewer in sequence (circle, underline, margin note). Right: the person,
 * presented as the exhibit, stamped. Motion tells the story once and stops.
 */
export function Hero() {
  const reduce = useReducedMotion();
  // Depth on scroll: paper lines drift slower than the page, the photo a
  // little faster, the copy stays put. Transform only, off under reduced motion.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const linesY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 140]);
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const photoR = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -3]);
  const rise = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: d, ease },
  });

  return (
    <section ref={ref} id="top" className="relative isolate overflow-hidden">
      <motion.div
        aria-hidden
        style={{ y: linesY }}
        className="ruled absolute -bottom-40 -top-4 inset-x-0 -z-10 opacity-70"
      />

      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-14 px-5 pb-20 pt-14 sm:px-8 md:pb-28 md:pt-20 lg:min-h-[calc(100dvh-4rem)] lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-8">
          <motion.h1
            {...rise(0)}
            className="display max-w-[17ch] text-[clamp(2.6rem,5.4vw,5.1rem)] text-[var(--ink)]"
          >
            Every release has a{" "}
            <Mark kind="circle" delay={0.55}>
              bug.
            </Mark>{" "}
            I find it{" "}
            <Mark kind="underline" delay={1.35}>
              before your users
            </Mark>{" "}
            do.
          </motion.h1>

          <motion.p {...rise(1.9)} className="note mt-5 flex items-center gap-2 text-[12.5px]">
            <span aria-hidden className="h-px w-8 bg-[var(--red)]" />
            UI, API, database, logs. Defects get checked where the truth lives.
          </motion.p>

          <motion.p
            {...rise(0.15)}
            className="mt-9 max-w-[50ch] text-[17px] leading-relaxed text-[var(--ink-2)]"
          >
            {person.subline}
          </motion.p>

          <motion.div {...rise(0.25)} className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/contact" className="btn btn-ink">
              Get in touch
            </Link>
            <a href={person.cv} download={person.cvName} className="btn btn-line">
              <DownloadSimpleIcon size={16} />
              Download CV
            </a>
            <span aria-hidden className="mx-1 hidden h-6 w-px bg-[var(--rule-strong)] sm:block" />
            <a
              href={person.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="icon-btn"
            >
              <WhatsappLogoIcon size={19} />
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="icon-btn"
            >
              <LinkedinLogoIcon size={19} />
            </a>
            <a href={`mailto:${person.email}`} aria-label="Email" className="icon-btn">
              <EnvelopeSimpleIcon size={19} />
            </a>
          </motion.div>
        </div>

        <motion.div
          style={{ y: photoY, rotate: photoR }}
          className="relative mx-auto w-full max-w-[340px] lg:col-span-4 lg:mx-0 lg:justify-self-end"
        >
          <motion.figure {...rise(0.35)} className="relative">
            <div className="sheet rotate-[1.5deg] p-3 pb-4 shadow-[0_30px_60px_-35px_rgb(19_21_24_/_0.45)] transition-transform duration-500 hover:rotate-0">
              <Image
                src="/haim.jpg"
                alt={`${person.name}, ${person.role}`}
                width={400}
                height={400}
                priority
                sizes="(min-width: 1024px) 320px, 90vw"
                className="aspect-square w-full rounded-[calc(var(--r)-3px)] object-cover"
              />
              <figcaption className="mt-4 px-1">
                <p className="title text-[19px] text-[var(--ink)]">{person.name}</p>
                <p className="mt-1 text-[13.5px] text-[var(--ink-2)]">{person.discipline}</p>
                <p className="mt-0.5 font-mono text-[11.5px] text-[var(--ink-3)]">{person.location}</p>
              </figcaption>
            </div>
            <motion.span
              initial={reduce ? false : { opacity: 0, scale: 1.6, rotate: -18 }}
              animate={{ opacity: 1, scale: 1, rotate: -12 }}
              transition={{ duration: 0.35, delay: 2.1, ease: [0.2, 1.4, 0.4, 1] }}
              className="stamp absolute -left-6 top-6 bg-[var(--sheet)] text-[15px] sm:-left-10"
            >
              Open to work
              <span className="text-[9.5px] tracking-[0.14em]">QA roles and contracts</span>
            </motion.span>
          </motion.figure>
        </motion.div>
      </div>
    </section>
  );
}
