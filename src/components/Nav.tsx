"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRightIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";
import { ThemeToggle } from "./ThemeToggle";
import { Shell } from "./Primitives";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  /* IntersectionObserver rather than a scroll listener: no per-frame work. */
  useEffect(() => {
    // Every page renders a sentinel (Hero on home, PageHeader elsewhere).
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: "-8px 0px 0px 0px",
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        lifted || open
          ? "border-[var(--line)] bg-[var(--bg)] supports-[color:color-mix(in_srgb,red,red)]:bg-[color-mix(in_srgb,var(--bg)_88%,transparent)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <Shell className="flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="font-mono text-[13px] tracking-tight text-[var(--fg)] transition-opacity hover:opacity-70"
        >
          {person.name}
          <span className="text-[var(--accent)]">.</span>
        </Link>

        <nav aria-label="Pages" className="hidden items-center gap-7 sm:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`text-[13.5px] transition-colors duration-200 hover:text-[var(--fg)] ${
                  active ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={person.cv}
            download={person.cvName}
            className="hidden h-9 items-center whitespace-nowrap rounded-[var(--r)] border border-[var(--line-strong)] px-3.5 text-[13px] font-medium text-[var(--fg)] transition-colors duration-200 hover:bg-[var(--bg-2)] active:translate-y-px md:inline-flex"
          >
            Download CV
          </a>
          <Link
            href="/contact"
            className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-3.5 text-[13px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px sm:inline-flex"
          >
            Get in touch
            <ArrowUpRightIcon size={13} weight="bold" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-[var(--r)] border border-[var(--line)] text-[var(--fg)] transition-colors duration-200 hover:border-[var(--line-strong)] active:translate-y-px sm:hidden"
          >
            {open ? <XIcon size={16} weight="bold" /> : <ListIcon size={16} weight="bold" />}
          </button>
        </div>
      </Shell>

      {open ? (
        <div id="mobile-nav" className="border-t border-[var(--line)] sm:hidden">
          <Shell className="grid gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-[var(--r)] px-2 py-2.5 text-[15px] transition-colors ${
                  pathname === l.href
                    ? "bg-[var(--bg-2)] text-[var(--fg)]"
                    : "text-[var(--fg-muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={person.cv}
              download={person.cvName}
              onClick={() => setOpen(false)}
              className="rounded-[var(--r)] px-2 py-2.5 text-[15px] text-[var(--fg-muted)]"
            >
              Download CV
            </a>
          </Shell>
        </div>
      ) : null}
    </header>
  );
}
