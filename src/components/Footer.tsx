import Link from "next/link";
import {
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
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
    <footer className="border-t border-[var(--rule)] bg-[var(--paper-2)] py-14 pb-28 sm:pb-14">
      <Shell className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="title text-[22px] text-[var(--ink)]">{person.name}</p>
          <p className="mt-2 max-w-[38ch] text-[14.5px] leading-relaxed text-[var(--ink-2)]">
            {person.discipline}. Based in {person.location}, working with teams anywhere.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={person.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="icon-btn"
            >
              <WhatsappLogoIcon size={18} />
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="icon-btn"
            >
              <LinkedinLogoIcon size={18} />
            </a>
            <a href={`mailto:${person.email}`} aria-label="Email" className="icon-btn">
              <EnvelopeSimpleIcon size={18} />
            </a>
            <a href={person.cv} download={person.cvName} aria-label="Download CV" className="icon-btn">
              <DownloadSimpleIcon size={18} />
            </a>
          </div>
        </div>

        <nav
          aria-label="Footer pages"
          className="flex flex-wrap gap-x-7 gap-y-3 md:col-span-6 md:justify-end md:self-end"
        >
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="redlink text-[14px] text-[var(--ink-2)] hover:text-[var(--ink)]"
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </Shell>
    </footer>
  );
}
