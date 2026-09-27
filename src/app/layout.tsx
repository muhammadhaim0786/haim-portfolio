import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { person } from "@/content/resume";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { PenCursor } from "@/components/PenCursor";
import "./globals.css";

/* Bricolage Grotesque variable (weight, width, optical size), self-hosted
   from @fontsource-variable. Headlines only; body and notes stay Geist. */
const display = localFont({
  src: "../../node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2",
  variable: "--font-display",
  weight: "200 800",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
  display: "swap",
});

const description =
  "Quality Engineer with 4+ years building layered automation and cross-layer verification across healthcare, government, and enterprise systems.";

/* Set NEXT_PUBLIC_SITE_URL to your real domain. On Vercel the production URL
   is picked up automatically, so Open Graph and canonical links resolve. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${person.name} | ${person.role}`,
    template: `%s | ${person.name}`,
  },
  description,
  keywords: [
    "Quality Engineer",
    "QA Automation",
    "Playwright",
    "TypeScript",
    "API Testing",
    "Apache JMeter",
    "Test Strategy",
  ],
  authors: [{ name: person.name, url: person.linkedin }],
  openGraph: {
    title: `${person.name} | ${person.role}`,
    description,
    type: "profile",
    locale: "en_US",
    images: [{ url: "/haim.jpg", width: 400, height: 400, alt: person.name }],
  },
  twitter: { card: "summary", title: `${person.name} | ${person.role}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f1f2ee" },
    { media: "(prefers-color-scheme: dark)", color: "#111315" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${GeistSans.variable} ${GeistMono.variable} ${display.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[var(--r)] focus:bg-[var(--ink)] focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-[var(--paper)]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <PenCursor />
      </body>
    </html>
  );
}
