import { WhatsappLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { person } from "@/content/resume";

/**
 * Persistent WhatsApp entry point. The pulse is semantic (a live chat
 * channel), stops under reduced motion, and the label is always in the
 * accessible name even when it is visually collapsed on mobile.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={person.whatsapp}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-[55] flex items-center gap-2.5 rounded-full border border-[var(--line-strong)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] py-2 pl-2 pr-2 shadow-[0_18px_50px_-12px_rgb(0_0_0_/_0.8)] backdrop-blur-xl transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-[#25D366] sm:bottom-7 sm:right-7 sm:pr-5"
    >
      <span className="relative grid size-11 place-items-center rounded-full bg-[#25D366] text-[#062b14]">
        <span aria-hidden className="ping absolute inset-0 rounded-full bg-[#25D366]" />
        <WhatsappLogoIcon size={24} weight="fill" className="relative" />
      </span>
      <span className="hidden text-[13.5px] font-medium text-[var(--fg)] sm:inline">
        Chat on WhatsApp
      </span>
    </a>
  );
}
