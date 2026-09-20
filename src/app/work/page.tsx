import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Work } from "@/components/Work";
import { Method } from "@/components/Method";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in QA process design, Playwright automation, and performance testing across healthcare, government, and enterprise systems.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="What I built and what it changed"
        lede="Three pieces of work with the detail a hiring manager actually asks about: what was wrong, what I built, and what moved as a result."
      />
      <Work />
      <Method />
      <Contact />
    </>
  );
}
