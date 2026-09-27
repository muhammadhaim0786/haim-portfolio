import { NextResponse } from "next/server";
import { inquiryTopics, person } from "@/content/resume";

/**
 * Inquiry relay, sent through Resend (https://resend.com).
 *
 *   RESEND_API_KEY=re_xxxxxxxx            required
 *   CONTACT_TO_EMAIL=you@gmail.com         optional, defaults to person.email
 *   CONTACT_FROM_EMAIL=Portfolio <hello@yourdomain.com>
 *                                          optional, defaults to onboarding@resend.dev
 *
 * With the default sender (no verified domain) Resend only delivers to the
 * email address the Resend account was created with, so sign up to Resend
 * with the same inbox you want messages in.
 *
 * The key is read server side only. Without it the route answers 503 and the
 * contact page shows direct email, WhatsApp and LinkedIn instead of a form.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX = { name: 100, email: 160, company: 120, message: 4000 } as const;
// Single source of truth: the same list drives the form's dropdown.
const TOPICS: Record<string, string> = Object.fromEntries(inquiryTopics.map((t) => [t.value, t.label]));
const TIMEOUT_MS = 15000;
const DEFAULT_TO = person.email;
const DEFAULT_FROM = "Portfolio Inquiry <onboarding@resend.dev>";

/* Best-effort per-instance rate limit: 8 submissions per IP per 10 minutes.
   Serverless instances do not share memory, so this slows a single abuser
   down rather than guaranteeing a global cap. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 8;
const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

type Payload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  topic?: unknown;
  website?: unknown; // honeypot, must stay empty
};

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Strip CR/LF so nothing a visitor types can inject extra email headers. */
function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, " ");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: "The contact form is not configured yet. Please email or WhatsApp directly." },
      { status: 503 },
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many messages from this connection. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Bots fill every field they find. A real person never sees this one.
  if (str(body.website, 200) !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = oneLine(str(body.name, MAX.name));
  const email = oneLine(str(body.email, MAX.email));
  const company = oneLine(str(body.company, MAX.company));
  const message = str(body.message, MAX.message);
  const topic = str(body.topic, 40) || "other";

  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.email = "Please enter a valid email address.";
  if (message.length < 20) fields.message = "Please write at least a sentence or two (20+ characters).";
  if (!(topic in TOPICS)) fields.topic = "Please choose one of the listed options.";

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ ok: false, fields }, { status: 422 });
  }

  const to = process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
  const topicLabel = TOPICS[topic];
  const subject = `New inquiry: ${topicLabel} from ${name}${company ? ` (${company})` : ""}`;

  const text = [
    `Topic: ${topicLabel}`,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not given"}`,
    "",
    message,
    "",
    "Reply to this email to answer them directly.",
  ].join("\n");

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#111">
    <p style="margin:0 0 4px;font-size:12px;color:#666;text-transform:uppercase;letter-spacing:.08em">${esc(topicLabel)}</p>
    <h2 style="margin:0 0 20px;font-size:20px">New inquiry from ${esc(name)}</h2>
    <table style="font-size:14px;border-collapse:collapse;margin-bottom:20px">
      <tr><td style="padding:4px 16px 4px 0;color:#666">Email</td><td><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
      <tr><td style="padding:4px 16px 4px 0;color:#666">Company</td><td>${esc(company || "Not given")}</td></tr>
    </table>
    <div style="font-size:15px;line-height:1.6;white-space:pre-wrap;border-left:3px solid #a3e635;padding-left:14px">${esc(message)}</div>
    <p style="margin-top:28px;font-size:12px;color:#888">Hit reply to answer ${esc(name)} directly.</p>
  </div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject, text, html }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    if (!res.ok) {
      // Details go to the server log only; visitors get a clean message.
      console.error("resend rejected", res.status, (await res.text().catch(() => "")).slice(0, 500));
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please email or WhatsApp directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("resend request failed", err);
    return NextResponse.json(
      { ok: false, error: "The message could not be delivered. Please email or WhatsApp directly." },
      { status: 502 },
    );
  }
}
