import { person } from "@/content/resume";
import { Shell } from "./Primitives";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] py-8">
      <Shell className="flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="font-mono text-[12px] text-[var(--fg-dim)]">
          {person.name}, {person.discipline}
        </p>
        <p className="font-mono text-[12px] text-[var(--fg-dim)]">{person.location}</p>
      </Shell>
    </footer>
  );
}
