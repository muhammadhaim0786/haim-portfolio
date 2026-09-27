import {
  ArrowUpRightIcon,
  DownloadSimpleIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

const channels = [
  {
    key: "email",
    label: "Email",
    value: person.email,
    href: `mailto:${person.email}?subject=Portfolio%20inquiry`,
    Icon: EnvelopeSimpleIcon,
    external: false,
    download: false,
  },
  {
    key: "whatsapp",
    label: "WhatsApp",
    value: person.phone,
    href: person.whatsapp,
    Icon: WhatsappLogoIcon,
    external: true,
    download: false,
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    value: person.linkedinHandle,
    href: person.linkedin,
    Icon: LinkedinLogoIcon,
    external: true,
    download: false,
  },
  {
    key: "cv",
    label: "CV",
    value: "Download PDF",
    href: person.cv,
    Icon: DownloadSimpleIcon,
    external: false,
    download: true,
  },
] as const;

/**
 * Every way to reach Haim as a row. The whole row is the link and it fills
 * with the accent on hover, so the target is large on touch and obvious on
 * desktop.
 */
export function ContactChannels({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="grid border-t border-[var(--line)]">
      {channels.map(({ key, label, value, href, Icon, external, download }) => (
        <li key={key} className="border-b border-[var(--line)]">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            {...(download ? { download: person.cvName } : {})}
            className={`group relative flex items-center gap-5 overflow-hidden px-1 transition-colors duration-300 hover:text-[var(--accent-fg)] ${
              compact ? "py-5" : "py-6 md:py-7"
            }`}
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-0 origin-bottom scale-y-0 bg-[var(--accent)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
            />
            <Icon
              size={compact ? 20 : 24}
              className="relative shrink-0 text-[var(--accent)] transition-colors group-hover:text-[var(--accent-fg)]"
            />
            <span className="relative min-w-0 flex-1">
              <span
                className={`display block ${compact ? "text-[1.1rem]" : "text-[clamp(1.3rem,2.4vw,2rem)]"}`}
              >
                {label}
              </span>
              <span className="mt-1.5 block truncate font-mono text-[12.5px] text-[var(--fg-muted)] transition-colors group-hover:text-[var(--accent-fg)] sm:text-[13.5px]">
                {value}
              </span>
            </span>
            <ArrowUpRightIcon
              size={compact ? 18 : 22}
              weight="bold"
              className="relative shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
