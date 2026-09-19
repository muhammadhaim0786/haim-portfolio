import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Toolchain } from "@/components/Toolchain";
import { Experience } from "@/components/Experience";
import { Work } from "@/components/Work";
import { Capabilities } from "@/components/Capabilities";
import { Method } from "@/components/Method";
import { Credentials } from "@/components/Credentials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Toolchain />
        <Experience />
        <Work />
        <Capabilities />
        <Method />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
