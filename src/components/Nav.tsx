"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DownloadSimpleIcon, ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

/**
 * Full-width document header. The active page carries a red underline, the
 * same mark the reviewer uses everywhere else on the site.
 */
export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--rule)] bg-[color-mix(in_srgb,var(--paper)_86%,transparent)] backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="title text-[17px] text-[var(--ink)]">
          Muhammad Haim
        </Link>

        <nav aria-label="Pages" className="hidden items-center gap-8 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`redlink py-1 text-[14px] ${
                  active
                    ? "!bg-[length:100%_2px] text-[var(--ink)]"
                    : "text-[var(--ink-2)] hover:text-[var(--ink)]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={person.cv}
            download={person.cvName}
            className="flex items-center gap-1.5 text-[14px] text-[var(--ink-2)] transition-colors hover:text-[var(--red)]"
          >
            <DownloadSimpleIcon size={15} />
            CV
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn btn-ink hidden !h-10 !px-4 !text-[13.5px] sm:inline-flex">
            Get in touch
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-[var(--r)] border border-[var(--rule-strong)] text-[var(--ink)] md:hidden"
          >
            {open ? <XIcon size={16} weight="bold" /> : <ListIcon size={16} weight="bold" />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="mobile-nav" className="border-t border-[var(--rule)] md:hidden">
          <div className="mx-auto grid max-w-[1280px] gap-1 px-5 py-3 sm:px-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={pathname === l.href ? "page" : undefined}
                className={`rounded-[var(--r)] px-2 py-3 text-[16px] ${
                  pathname === l.href ? "text-[var(--red)]" : "text-[var(--ink)]"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={person.cv}
              download={person.cvName}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 rounded-[var(--r)] px-2 py-3 text-[16px] text-[var(--ink)]"
            >
              <DownloadSimpleIcon size={16} />
              Download CV
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn btn-ink mb-2 mt-2 w-full sm:hidden"
            >
              Get in touch
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
