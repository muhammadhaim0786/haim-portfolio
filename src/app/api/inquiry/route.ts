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
export const dynamic = "force-dynamic";

const MAX = { name: 100, email: 160, company: 120, message: 4000 } as const;
const TOPICS = new Set(["fulltime", "automation", "process", "other"]);
const TIMEOUT_MS = 15000;

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

function endpointUrl() {
  return process.env.CONTACT_ENDPOINT?.trim();
}

function accessKey() {
  return process.env.CONTACT_ACCESS_KEY?.trim();
}

/** Undici hides the real cause one level down. Surface it. */
function describeError(err: unknown) {
  const e = err as { name?: string; message?: string; cause?: { code?: string; message?: string } };
  return {
    errorName: e?.name ?? "Unknown",
    errorMessage: (e?.message ?? "").slice(0, 200),
    errorCode: e?.cause?.code ?? null,
    errorCause: (e?.cause?.message ?? "").slice(0, 200) || null,
  };
}

/**
 * Diagnostic. Reports whether the credentials reached this deployment, without
 * revealing them. With ?probe=1 it also opens a real connection to the provider
 * using a deliberately invalid key, so the provider refuses it and NO message is
 * ever delivered. That separates "cannot reach the provider" from "the provider
 * rejected our request". Safe to delete once the form is confirmed working.
 */
export async function GET(request: Request) {
  const endpoint = endpointUrl();
  const key = accessKey();

  let host: string | null = null;
  try {
    host = endpoint ? new URL(endpoint).host : null;
  } catch {
    host = "INVALID_URL";
  }

  const config = {
    endpointPresent: Boolean(endpoint),
    endpointHost: host,
    accessKeyPresent: Boolean(key),
    accessKeyLength: key ? key.length : 0,
    nodeVersion: process.version,
  };

  if (new URL(request.url).searchParams.get("probe") !== "1" || !endpoint) {
    return NextResponse.json(config);
  }

  const started = Date.now();
  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-contact-form/1.0)",
      },
      // Intentionally invalid key: the provider refuses, nothing is delivered.
      body: JSON.stringify({
        access_key: "00000000-0000-0000-0000-000000000000",
        name: "connectivity probe",
        email: "probe@example.com",
        message: "Connectivity probe. This should be refused, not delivered.",
      }),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });
    const body = (await res.text().catch(() => "")).slice(0, 300);
    return NextResponse.json({
      ...config,
      probe: { reached: true, status: res.status, ms: Date.now() - started, body },
    });
  } catch (err) {
    return NextResponse.json({
      ...config,
      probe: { reached: false, ms: Date.now() - started, ...describeError(err) },
    });
  }
}

export async function POST(request: Request) {
  const endpoint = endpointUrl();
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
    // Web3Forms spells this `replyto`; Formspree uses `_replyto`. Send both.
    replyto: email,
    _replyto: email,
  };
  const key = accessKey();
  if (key) payload.access_key = key;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0 (compatible; portfolio-contact-form/1.0)",
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(TIMEOUT_MS),
      cache: "no-store",
    });

    const raw = await res.text().catch(() => "");
    let providerMessage = "";
    let providerOk = res.ok;
    try {
      const parsed = JSON.parse(raw);
      providerMessage = String(parsed?.message ?? "");
      // Some providers answer HTTP 200 with a failure body, so check both.
      if (typeof parsed?.success === "boolean") providerOk = res.ok && parsed.success;
    } catch {
      providerMessage = raw.slice(0, 200);
    }

    if (!providerOk) {
      console.error("inquiry relay rejected", res.status, raw.slice(0, 500));
      return NextResponse.json(
        {
          ok: false,
          error: "The message could not be delivered. Please email directly.",
          providerStatus: res.status,
          providerMessage,
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    const detail = describeError(err);
    console.error("inquiry relay failed", detail);
    return NextResponse.json(
      {
        ok: false,
        error: "The message could not be delivered. Please email directly.",
        ...detail,
      },
      { status: 502 },
    );
  }
}
