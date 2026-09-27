"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Kinetic poster hero. Three headline lines rise out of a clip mask in
 * sequence (establishes reading order), then everything stops. The olive
 * glow tracks the pointer through motion values, never React state.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(30);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(48% 55% at ${sx}% ${sy}%, var(--glow), transparent 70%)`;

  function onMove(e: React.PointerEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  }

  const line = (i: number) => ({
    initial: reduce ? false : { y: "105%" },
    animate: { y: "0%" },
    transition: { duration: 1, delay: 0.1 + i * 0.09, ease },
  });
  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.45 + i * 0.08, ease },
  });

  return (
    <section
      ref={ref}
      id="top"
      onPointerMove={onMove}
      className="relative isolate flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={{ background: glow }} />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-[var(--bg)]"
      />

      <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col justify-center px-5 pb-14 pt-28 sm:px-8 md:pt-32">
        <motion.p {...rise(-2)} className="chip w-fit gap-2 !px-3 !py-1.5 !text-[11.5px]">
          <span className="relative flex size-2">
            <span className="ping absolute inset-0 rounded-full bg-[var(--accent)]" />
            <span className="relative size-2 rounded-full bg-[var(--accent)]" />
          </span>
          {person.available}
        </motion.p>

        <div className="relative">
          <h1 className="display glow-text mt-7 text-[clamp(2.9rem,8.2vw,8.6rem)] text-[var(--fg)]">
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span {...line(0)} className="block">
                I find the
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span {...line(1)} className="block text-[var(--accent)]">
                defects
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span {...line(2)} className="block">
                your UI hides<span className="text-[var(--accent)]">.</span>
              </motion.span>
            </span>
          </h1>
          <motion.figure
            {...rise(2)}
            className="absolute right-0 top-2 hidden w-[340px] items-center gap-5 xl:flex"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-3 -z-10 rounded-[28px] bg-[var(--accent)] opacity-20 blur-2xl"
              />
              <Image
                src="/haim.jpg"
                alt={`${person.name}, ${person.role}`}
                width={400}
                height={400}
                priority
                sizes="144px"
                className="size-36 -rotate-3 rounded-[var(--r-card)] border border-[var(--line-strong)] object-cover grayscale-[35%] transition-[transform,filter] duration-500 hover:rotate-0 hover:grayscale-0"
              />
            </div>
            <figcaption>
              <p className="display-soft text-[20px] text-[var(--fg)]">{person.name}</p>
              <p className="mt-1.5 text-[13.5px] text-[var(--fg-muted)]">{person.discipline}</p>
              <p className="mt-1 font-mono text-[11.5px] text-[var(--fg-dim)]">{person.location}</p>
            </figcaption>
          </motion.figure>
        </div>

        <div className="mt-10">
          <div>
            <motion.p
              {...rise(0)}
              className="max-w-[46ch] text-[16px] leading-relaxed text-[var(--fg-muted)] sm:text-[17px]"
            >
              {person.subline}
            </motion.p>

            <motion.div {...rise(1)} className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn btn-primary">
                Get in touch
                <ArrowUpRightIcon size={14} weight="bold" />
              </Link>
              <a href={person.cv} download={person.cvName} className="btn btn-ghost">
                <DownloadSimpleIcon size={16} />
                Download CV
              </a>
              <span aria-hidden className="mx-1 hidden h-6 w-px bg-[var(--line-strong)] sm:block" />
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
        </div>
      </div>
      <div id="top-sentinel" className="absolute left-0 top-2 h-px w-px" aria-hidden />
    </section>
  );
}
