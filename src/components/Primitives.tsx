import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1240px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * Section headings carry no eyebrow label. The section's position on the page
 * already says what it is, and a mono uppercase tag above every heading is the
 * fastest way to make a site look templated.
 */
export function SectionHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="text-[clamp(1.75rem,3.4vw,2.6rem)] font-medium leading-[1.05] tracking-[-0.03em] text-[var(--fg)]"
    >
      {children}
    </h2>
  );
}
