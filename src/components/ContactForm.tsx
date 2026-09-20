"use client";

import { useRef, useState } from "react";
import { ArrowUpRightIcon, CheckCircleIcon, WarningCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { inquiryTopics, person } from "@/content/resume";

type Status = "idle" | "submitting" | "sent" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message" | "topic", string>>;

const field =
  "w-full rounded-[var(--r)] border bg-[var(--bg)] px-3.5 py-2.5 text-[14.5px] text-[var(--fg)] transition-colors duration-200 placeholder:text-[var(--fg-dim)] focus:border-[var(--accent)] focus:outline-none";

function Label({ htmlFor, children, optional }: { htmlFor: string; children: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-[13px] font-medium text-[var(--fg)]">
      {children}
      {optional ? <span className="ml-1.5 font-normal text-[var(--fg-dim)]">optional</span> : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="flex items-start gap-1.5 text-[12.5px] text-[var(--accent)]">
      <WarningCircleIcon size={14} weight="fill" className="mt-[1px] shrink-0" />
      {message}
    </p>
  );
}

export function ContactForm({ defaultTopic }: { defaultTopic?: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setStatus("submitting");
    setErrors({});
    setFormError("");

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (res.ok && json.ok) {
        setStatus("sent");
        formRef.current?.reset();
        return;
      }
      if (res.status === 422 && json.fields) {
        setErrors(json.fields as FieldErrors);
        setStatus("idle");
        return;
      }
      setFormError(json.error || "Something went wrong. Please email directly.");
      setStatus("error");
    } catch {
      setFormError("No connection. Please check your network, or email directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-[var(--r)] border border-[var(--line)] bg-[var(--bg-2)] p-8 text-center">
        <CheckCircleIcon size={26} weight="regular" className="mx-auto text-[var(--accent)]" />
        <p className="mt-4 text-[17px] font-medium text-[var(--fg)]">Message sent</p>
        <p className="mx-auto mt-2 max-w-[42ch] text-[14px] leading-relaxed text-[var(--fg-muted)]">
          It lands in my inbox directly. I reply to everything within 48 hours, including the ones
          that are not a fit.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-[13.5px] text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
        >
          Send another
        </button>
      </div>
    );
  }

  const busy = status === "submitting";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5">
      {/* Honeypot. Hidden from people, irresistible to bots. */}
      <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="topic">What is this about</Label>
        <select
          id="topic"
          name="topic"
          defaultValue={defaultTopic ?? inquiryTopics[0].value}
          disabled={busy}
          className={`${field} border-[var(--line-strong)] disabled:opacity-60`}
        >
          {inquiryTopics.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Your name</Label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            disabled={busy}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={`${field} disabled:opacity-60 ${
              errors.name ? "border-[var(--accent)]" : "border-[var(--line-strong)]"
            }`}
          />
          <FieldError id="name-error" message={errors.name} />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="email">Your email</Label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            disabled={busy}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={`${field} disabled:opacity-60 ${
              errors.email ? "border-[var(--accent)]" : "border-[var(--line-strong)]"
            }`}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="company" optional>
          Company
        </Label>
        <input
          id="company"
          name="company"
          type="text"
          autoComplete="organization"
          disabled={busy}
          className={`${field} border-[var(--line-strong)] disabled:opacity-60`}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <textarea
          id="message"
          name="message"
          rows={6}
          disabled={busy}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-help"}
          className={`${field} resize-y disabled:opacity-60 ${
            errors.message ? "border-[var(--accent)]" : "border-[var(--line-strong)]"
          }`}
        />
        {errors.message ? (
          <FieldError id="message-error" message={errors.message} />
        ) : (
          <p id="message-help" className="text-[12.5px] text-[var(--fg-dim)]">
            The stack, how you ship today, and what is currently getting caught late.
          </p>
        )}
      </div>

      {status === "error" ? (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-[var(--r)] border border-[var(--accent)] bg-[var(--accent-wash)] px-4 py-3"
        >
          <WarningCircleIcon size={16} weight="fill" className="mt-[2px] shrink-0 text-[var(--accent)]" />
          <p className="text-[13.5px] leading-relaxed text-[var(--fg)]">
            {formError}{" "}
            <a
              href={`mailto:${person.email}`}
              className="underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-[var(--accent)]"
            >
              {person.email}
            </a>
          </p>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-[var(--r)] bg-[var(--accent)] px-6 text-[14px] font-medium text-[var(--accent-fg)] transition-[transform,opacity] duration-200 hover:opacity-90 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-70"
        >
          {busy ? "Sending" : "Send inquiry"}
          {busy ? null : <ArrowUpRightIcon size={14} weight="bold" />}
        </button>
        <p aria-live="polite" className="text-[12.5px] text-[var(--fg-dim)]">
          {busy ? "Sending your message" : "I reply within 48 hours."}
        </p>
      </div>
    </form>
  );
}
