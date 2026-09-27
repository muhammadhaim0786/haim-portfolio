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
    <footer className="relative overflow-hidden border-t border-[var(--line)] pt-16">
      <Shell className="grid gap-10 pb-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <p className="max-w-[36ch] text-[14.5px] leading-relaxed text-[var(--fg-muted)]">
            {person.discipline}. Based in {person.location}, working with teams anywhere.
          </p>
          <div className="mt-6 flex gap-2">
            <a
              href={person.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="WhatsApp"
              className="icon-btn !size-11"
            >
              <WhatsappLogoIcon size={18} />
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              aria-label="LinkedIn"
              className="icon-btn !size-11"
            >
              <LinkedinLogoIcon size={18} />
            </a>
            <a href={`mailto:${person.email}`} aria-label="Email" className="icon-btn !size-11">
              <EnvelopeSimpleIcon size={18} />
            </a>
            <a href={person.cv} download={person.cvName} aria-label="Download CV" className="icon-btn !size-11">
              <DownloadSimpleIcon size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer pages" className="flex flex-wrap gap-x-7 gap-y-3 md:col-span-6 md:justify-end md:self-end">
          {pages.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="text-[14px] text-[var(--fg-muted)] transition-colors hover:text-[var(--accent)]"
            >
              {p.label}
            </Link>
          ))}
        </nav>
      </Shell>

      <div aria-hidden className="select-none px-3">
        <p className="display translate-y-[16%] whitespace-nowrap text-center text-[24vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(238_241_232_/_0.16)]">
          Haim<span className="text-[var(--accent)] [-webkit-text-stroke:0]">.</span>
        </p>
      </div>
    </footer>
  );
}
