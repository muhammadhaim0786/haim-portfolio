import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Work } from "@/components/Work";
import { Builds } from "@/components/Builds";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies in QA process design, Playwright automation, and performance testing, plus apps built with AI.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="What was wrong,"
        marked="what I changed."
        lede="Three pieces of quality work with the detail a hiring manager actually asks about, then the apps I build with AI."
      />
      <Work />
      <Builds />
      <Contact />
    </>
  );
}
