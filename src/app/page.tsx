import { Hero } from "@/components/Hero";
import { Figures } from "@/components/Figures";
import { Toolchain } from "@/components/Toolchain";
import { WorkTeaser } from "@/components/WorkTeaser";
import { Capabilities } from "@/components/Capabilities";
import { Method } from "@/components/Method";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <Figures />
      <Toolchain />
      <WorkTeaser />
      <Capabilities />
      <Method />
      <Contact />
    </>
  );
}
