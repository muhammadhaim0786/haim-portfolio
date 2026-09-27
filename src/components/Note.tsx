import type { ReactNode } from "react";
import { ArrowElbowDownRightIcon } from "@phosphor-icons/react/dist/ssr";

/**
 * A reviewer's margin note: short, mono, red, with an elbow arrow pointing
 * back at the line it comments on. Content is real text, not decoration.
 */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`note flex items-start gap-1.5 ${className}`}>
      <ArrowElbowDownRightIcon size={14} weight="bold" className="mt-[2px] shrink-0 -scale-y-100" />
      <span>{children}</span>
    </p>
  );
}
