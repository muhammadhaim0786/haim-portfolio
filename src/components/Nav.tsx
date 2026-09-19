"use client";

import { useEffect, useState } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";
import { ThemeToggle } from "./ThemeToggle";
import { Shell } from "./Primitives";

const links = [
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#method", label: "Method" },
];

export function Nav() {
  const [lifted, setLifted] = useState(false);

  /* IntersectionObserver rather than a scroll listener: no per-frame work. */
  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: "-8px 0px 0px 0px",
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 h-16 border-b transition-colors duration-300 ${
        lifted
          ? "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <Shell className="flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="font-mono text-[13px] tracking-tight text-[var(--fg)] transition-opacity hover:opacity-70"
        >
          {person.name}
          <span className="text-[var(--accent)]">.</span>
        </a>

        <nav aria-label="Sections" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13.5px] text-[var(--fg-muted)] transition-colors duration-200 hover:text-[var(--fg)]"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-3.5 text-[13px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px"
          >
            Get in touch
            <ArrowUpRightIcon size={13} weight="bold" />
          </a>
        </div>
      </Shell>
    </header>
  );
}
