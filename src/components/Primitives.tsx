import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/**
 * Section headings are set in the expanded display face. No eyebrow label:
 * the section's position on the page already says what it is.
 */
export function SectionHeading({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`display scroll-mt-28 text-[clamp(2.2rem,5.6vw,4.6rem)] text-[var(--fg)] ${className}`}
    >
      {children}
    </h2>
  );
}
