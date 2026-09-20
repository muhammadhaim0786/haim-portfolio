import { Hero } from "@/components/Hero";
import { Toolchain } from "@/components/Toolchain";
import { WorkTeaser } from "@/components/WorkTeaser";
import { Capabilities } from "@/components/Capabilities";
import { Method } from "@/components/Method";
import { Contact } from "@/components/Contact";

export default function Page() {
  return (
    <>
      <Hero />
      <Toolchain />
      <WorkTeaser />
      <Capabilities />
      <Method />
      <Contact />
    </>
  );
}
