import type { ReactNode } from "react";

export function Shell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 ${className}`}>{children}</div>;
}

/** Section headings: sentence case, display face, no eyebrow label. */
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
      className={`display scroll-mt-24 text-[clamp(2.2rem,4.8vw,4rem)] text-[var(--ink)] ${className}`}
    >
      {children}
    </h2>
  );
}
