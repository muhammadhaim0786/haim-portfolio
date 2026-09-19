"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";

type Theme = "light" | "dark";

/**
 * The current theme lives on <html data-theme>, set by an inline script before
 * paint. This reads that attribute as an external store rather than mirroring
 * it into component state, so there is no effect-driven re-render and no flash.
 */
const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => {
    listeners.delete(onChange);
  };
}

function getSnapshot(): Theme {
  return (document.documentElement.getAttribute("data-theme") as Theme) ?? "dark";
}

function getServerSnapshot(): Theme | null {
  return null;
}

function setTheme(next: Theme) {
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* blocked storage: the toggle still works for this visit */
  }
  listeners.forEach((fn) => fn());
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label={theme === "light" ? "Switch to dark theme" : "Switch to light theme"}
      className="grid size-9 place-items-center rounded-[var(--r)] border border-[var(--line)] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--line-strong)] hover:text-[var(--fg)] active:translate-y-px"
    >
      {theme === null ? null : theme === "light" ? (
        <MoonIcon size={16} weight="regular" />
      ) : (
        <SunIcon size={16} weight="regular" />
      )}
    </button>
  );
}
