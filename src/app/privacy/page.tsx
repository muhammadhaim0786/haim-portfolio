import type { Metadata } from "next";
import { person } from "@/content/resume";
import { PageHeader } from "@/components/PageHeader";
import { Shell } from "@/components/Primitives";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "What this site collects, why, who processes it, and how to have it deleted.",
  robots: { index: true, follow: true },
};

const updated = "September 2026";

const sections = [
  {
    h: "What this site collects",
    body: [
      "Nothing at all unless you submit the inquiry form. There is no analytics, no tracking pixel, no advertising script, and no third-party embed on any page.",
      "If you submit the inquiry form, it collects exactly the fields shown on it: the subject you pick, your name, your email address, an optional company name, and your message. Nothing else is read from your browser and attached to it.",
    ],
  },
  {
    h: "Why it is collected",
    body: [
      "To read your message and reply to it. That is the only purpose. Your email address is used to answer you and for nothing else.",
      "Your details are never sold, never shared for marketing, and never added to a mailing list. There is no mailing list.",
    ],
  },
  {
    h: "Who else handles it",
    body: [
      "The site is hosted on Vercel, which processes standard server request data such as IP address and user agent in order to serve pages and keep the service running.",
      "Form submissions are passed through a form delivery provider, which forwards the message to a personal email inbox. Your details sit with that provider and in that inbox.",
      "Both are third parties with their own privacy terms. Neither is given your data for any purpose beyond delivering the message to me.",
    ],
  },
  {
    h: "Storage on your device",
    body: [
      "One item only: your light or dark theme choice, kept in your browser's local storage so the site does not flip back on your next visit. It stays on your device, is never transmitted, and contains no identifier. Clearing your browser data removes it.",
      "This site sets no cookies.",
    ],
  },
  {
    h: "How long it is kept",
    body: [
      "Inquiry emails are kept while the conversation is live and for a reasonable period after, in case it picks back up. They are not archived indefinitely for any other reason.",
    ],
  },
  {
    h: "Your rights",
    body: [
      "You can ask what is held about you, ask for a copy, ask for a correction, or ask for it to be deleted. Email the address below and it will be handled, normally within a few days.",
      "If you are in the UK, EU, or another region with equivalent data protection law, those rights apply to you regardless of where this site is hosted.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        title="Privacy"
        lede="A short, plain description of what this site does with your details. It is short because the site does very little."
      />

      <section className="py-20 md:py-28">
        <Shell>
          <div className="max-w-[68ch]">
            <p className="font-mono text-[12px] text-[var(--fg-dim)]">Last updated {updated}</p>

            {sections.map((s) => (
              <div key={s.h} className="mt-12 border-t border-[var(--line)] pt-8 first:border-t-0">
                <h2 className="text-[1.3rem] font-medium tracking-[-0.025em] text-[var(--fg)]">
                  {s.h}
                </h2>
                {s.body.map((para) => (
                  <p
                    key={para}
                    className="mt-4 text-[15px] leading-[1.75] text-[var(--fg-muted)]"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

            <div className="mt-12 border-t border-[var(--line)] pt-8">
              <h2 className="text-[1.3rem] font-medium tracking-[-0.025em] text-[var(--fg)]">
                Contact
              </h2>
              <p className="mt-4 text-[15px] leading-[1.75] text-[var(--fg-muted)]">
                For anything on this page, including a deletion request, email{" "}
                <a
                  href={`mailto:${person.email}`}
                  className="break-all text-[var(--fg)] underline decoration-[var(--line-strong)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                >
                  {person.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Shell>
      </section>
    </>
  );
}
