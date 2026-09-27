import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

/**
 * Persistent WhatsApp entry point. Brand green on the icon only, so it reads
 * as WhatsApp without adding a second accent to the page.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={person.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[55] flex items-center gap-2.5 rounded-[var(--r)] border border-[var(--rule-strong)] bg-[var(--sheet)] p-2 shadow-[0_16px_40px_-18px_rgb(19_21_24_/_0.55)] transition-transform duration-300 hover:-translate-y-0.5 sm:bottom-7 sm:right-7 sm:pr-4"
    >
      <span className="grid size-10 place-items-center rounded-[calc(var(--r)-2px)] bg-[#25D366] text-[#073b1c]">
        <WhatsappLogoIcon size={23} weight="fill" />
      </span>
      <span className="hidden text-[13.5px] font-medium text-[var(--ink)] sm:inline">Chat on WhatsApp</span>
    </a>
  );
}
