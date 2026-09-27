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
    value: "Download the PDF",
    href: person.cv,
    Icon: DownloadSimpleIcon,
    external: false,
    download: true,
  },
] as const;

/**
 * Every way to reach Haim as a row. The whole row is the link; on hover the
 * label gets the reviewer's red underline and the arrow nudges.
 */
export function ContactChannels({ compact = false }: { compact?: boolean }) {
  return (
    <ul className="grid border-t border-[var(--rule-strong)]">
      {channels.map(({ key, label, value, href, Icon, external, download }) => (
        <li key={key} className="border-b border-[var(--rule-strong)]">
          <a
            href={href}
            {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
            {...(download ? { download: person.cvName } : {})}
            className={`group flex items-center gap-4 px-1 sm:gap-5 ${compact ? "py-4" : "py-5 md:py-6"}`}
          >
            <Icon size={compact ? 20 : 22} className="shrink-0 text-[var(--red)]" />
            <span className="min-w-0 flex-1">
              <span
                className={`title redlink block w-fit group-hover:bg-[length:100%_2px] ${compact ? "text-[1.15rem]" : "text-[clamp(1.25rem,2vw,1.6rem)]"}`}
              >
                {label}
              </span>
              <span className="mt-1 block truncate font-mono text-[12.5px] text-[var(--ink-2)]">{value}</span>
            </span>
            <ArrowUpRightIcon
              size={compact ? 18 : 20}
              weight="bold"
              className="shrink-0 text-[var(--ink-2)] transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--red)]"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
