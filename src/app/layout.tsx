import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { person } from "@/content/resume";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";


const description =
  "Quality Engineer with 4+ years building layered automation and cross-layer verification across healthcare, government, and enterprise systems.";

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammadhaim.vercel.app"),
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
  },
  twitter: { card: "summary_large_image", title: `${person.name} | ${person.role}`, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0d10" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
  ],
};

/* Applied before paint so the chosen theme never flashes. */
const themeBoot = `(function(){try{var s=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: light)").matches;document.documentElement.setAttribute("data-theme",s||(m?"light":"dark"));}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-[var(--r)] focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[14px] focus:font-medium focus:text-[var(--accent-fg)]"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
