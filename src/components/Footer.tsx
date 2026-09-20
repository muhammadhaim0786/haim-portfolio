import Link from "next/link";
import { person } from "@/content/resume";
import { Shell } from "./Primitives";

const pages = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-12">
      <Shell className="grid gap-8 sm:grid-cols-2 sm:items-start">
        <div>
          <p className="font-mono text-[13px] text-[var(--fg)]">
            {person.name}
            <span className="text-[var(--accent)]">.</span>
          </p>
          <p className="mt-2 max-w-[34ch] text-[13px] leading-relaxed text-[var(--fg-muted)]">
            {person.discipline}
          </p>
          <p className="mt-3 font-mono text-[11.5px] text-[var(--fg-dim)]">{person.location}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:justify-items-end">
          <nav aria-label="Footer pages" className="grid content-start gap-2.5">
            <p className="font-mono text-[11px] text-[var(--fg-dim)]">Pages</p>
            {pages.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                className="text-[13.5px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <div className="grid content-start gap-2.5">
            <p className="font-mono text-[11px] text-[var(--fg-dim)]">Elsewhere</p>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[13.5px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              LinkedIn
            </a>
            <a
              href={`mailto:${person.email}`}
              className="text-[13.5px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              Email
            </a>
            <a
              href={person.cv}
              download={person.cvName}
              className="text-[13.5px] text-[var(--fg-muted)] transition-colors hover:text-[var(--fg)]"
            >
              CV
            </a>
          </div>
        </div>
      </Shell>
    </footer>
  );
}
