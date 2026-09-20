import { NextResponse } from "next/server";

/**
 * Inquiry relay.
 *
 * The provider credential is read server side only, so it never reaches the
 * browser bundle. Works with any endpoint that accepts a JSON POST and answers
 * JSON, which covers both Formspree and Web3Forms:
 *
 *   CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxx
 * or
 *   CONTACT_ENDPOINT=https://api.web3forms.com/submit
 *   CONTACT_ACCESS_KEY=<your web3forms access key>
 *
 * With neither set the route answers 503 and the contact page renders the
 * direct email details instead of a form, so nothing ever fakes a success.
 */

export const runtime = "nodejs";

const MAX = { name: 100, email: 160, company: 120, message: 4000 } as const;
const TOPICS = new Set(["fulltime", "automation", "process", "other"]);

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

export async function POST(request: Request) {
  const endpoint = process.env.CONTACT_ENDPOINT;
  if (!endpoint) {
    return NextResponse.json(
      { ok: false, error: "The contact form is not configured yet. Please email directly." },
      { status: 503 },
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

  const name = str(body.name, MAX.name);
  const email = str(body.email, MAX.email);
  const company = str(body.company, MAX.company);
  const message = str(body.message, MAX.message);
  const topic = str(body.topic, 40);

  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fields.email = "Please enter a valid email address.";
  if (message.length < 20) fields.message = "Please give at least a sentence or two of context.";
  if (topic && !TOPICS.has(topic)) fields.topic = "Please choose one of the listed options.";

  if (Object.keys(fields).length > 0) {
    return NextResponse.json({ ok: false, fields }, { status: 422 });
  }

  const payload: Record<string, string> = {
    name,
    email,
    company: company || "Not given",
    message,
    topic: topic || "other",
    subject: `Portfolio inquiry from ${name}${company ? ` (${company})` : ""}`,
    _replyto: email,
  };
  if (process.env.CONTACT_ACCESS_KEY) payload.access_key = process.env.CONTACT_ACCESS_KEY;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    if (!res.ok) {
      console.error("inquiry relay rejected", res.status, await res.text().catch(() => ""));
      return NextResponse.json(
        { ok: false, error: "The message could not be delivered. Please email directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("inquiry relay failed", err);
    return NextResponse.json(
      { ok: false, error: "The message could not be delivered. Please email directly." },
      { status: 502 },
    );
  }
}
