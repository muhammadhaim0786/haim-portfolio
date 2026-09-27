"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRightIcon, DownloadSimpleIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

const links = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Floating glass pill. Sits over the hero, gains a stronger backdrop once the
 * page has scrolled (IntersectionObserver on a sentinel, no scroll listener).
 */
export function Nav() {
  const pathname = usePathname();
  const [lifted, setLifted] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById("top-sentinel");
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => setLifted(!entry.isIntersecting), {
      rootMargin: "-8px 0px 0px 0px",
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <div
        className={`pointer-events-auto w-full max-w-[980px] rounded-[26px] border transition-[background-color,border-color,box-shadow] duration-500 ${
          lifted || open
            ? "border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--bg)_78%,transparent)] shadow-[0_20px_60px_-20px_rgb(0_0_0_/_0.9)] backdrop-blur-xl"
            : "border-[var(--line)] bg-[color-mix(in_srgb,var(--bg)_35%,transparent)] backdrop-blur-md"
        }`}
      >
        <div className="flex h-14 items-center justify-between gap-4 pl-5 pr-2">
          <Link
            href="/"
            className="display-soft text-[15px] tracking-tight text-[var(--fg)] transition-opacity hover:opacity-70"
          >
            HAIM<span className="text-[var(--accent)]">.</span>
          </Link>

          <nav aria-label="Pages" className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-[13.5px] transition-colors duration-200 ${
                    active
                      ? "bg-[var(--surface-2)] text-[var(--fg)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={person.cv}
              download={person.cvName}
              className="hidden h-10 items-center gap-1.5 rounded-full px-3.5 text-[13px] text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)] lg:inline-flex"
            >
              <DownloadSimpleIcon size={15} />
              CV
            </a>
            <Link href="/contact" className="btn btn-primary hidden !h-10 !px-4 !text-[13px] sm:inline-flex">
              Get in touch
              <ArrowUpRightIcon size={13} weight="bold" />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--fg)] md:hidden"
            >
              {open ? <XIcon size={16} weight="bold" /> : <ListIcon size={16} weight="bold" />}
            </button>
          </div>
        </div>

        {open ? (
          <div id="mobile-nav" className="grid gap-1 border-t border-[var(--line)] p-2 md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-2xl px-4 py-3 text-[15px] ${
                  pathname === l.href ? "bg-[var(--surface-2)] text-[var(--fg)]" : "text-[var(--fg-muted)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={person.cv}
              download={person.cvName}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-2xl px-4 py-3 text-[15px] text-[var(--fg-muted)]"
            >
              <DownloadSimpleIcon size={16} />
              Download CV
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-1 w-full sm:hidden"
            >
              Get in touch
              <ArrowUpRightIcon size={13} weight="bold" />
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}
