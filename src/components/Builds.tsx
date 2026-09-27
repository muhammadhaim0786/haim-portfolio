import Image from "next/image";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { builds } from "@/content/resume";
import { Mark } from "./Mark";
import { Note } from "./Note";
import { Reveal } from "./Reveal";
import { Shell } from "./Primitives";

type Build = (typeof builds)[number];

function Status({ status }: { status: string }) {
  return (
    <span className="inline-flex items-center rounded-[4px] border border-[var(--red)] px-2 py-0.5 font-mono text-[11px] text-[var(--red)]">
      {status}
    </span>
  );
}

function Cover({ b, big }: { b: Build; big: boolean }) {
  const image = (b.image as string) || "";
  if (!image) return null;
  return (
    <Image
      src={image}
      alt=""
      width={1200}
      height={900}
      sizes={big ? "(min-width: 768px) 560px, 100vw" : "(min-width: 768px) 380px, 100vw"}
      className={`w-full rounded-[calc(var(--r)-3px)] border border-[var(--rule)] bg-[var(--paper-2)] object-cover ${
        big ? "aspect-[4/3] h-full md:aspect-auto" : "aspect-[4/3]"
      }`}
    />
  );
}

function BuildCard({ b, big = false }: { b: Build; big?: boolean }) {
  const href = (b.href as string) || "";
  const Wrapper = href ? "a" : "div";
  return (
    <Wrapper
      {...(href ? { href, target: "_blank", rel: "noreferrer noopener" } : {})}
      className={`sheet group grid h-full gap-7 p-5 transition-[transform,box-shadow] duration-300 sm:p-6 ${
        big ? "md:grid-cols-2 md:gap-10" : ""
      } ${href ? "hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--red)]" : ""}`}
    >
      {big ? null : <Cover b={b} big={false} />}
      <div className={`flex flex-col ${big ? "p-2 sm:p-4" : "px-1 pb-1"}`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[12px] text-[var(--ink-3)]">{b.kind}</p>
          <Status status={b.status} />
        </div>
        <h3
          className={`display mt-4 text-[var(--ink)] ${
            big ? "text-[clamp(2.2rem,4.2vw,3.6rem)]" : "text-[clamp(1.6rem,2.4vw,2rem)]"
          }`}
        >
          {b.name}
          {href ? (
            <ArrowUpRightIcon
              size={big ? 28 : 20}
              weight="bold"
              className="ml-2 inline align-baseline text-[var(--red)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          ) : null}
        </h3>
        <p className={`mt-4 leading-relaxed text-[var(--ink-2)] ${big ? "text-[16.5px]" : "text-[15px]"}`}>
          {b.what}
        </p>
        <Note className="mt-5">{b.ai}</Note>
        <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 pt-7">
          {b.stack.map((s) => (
            <li key={s} className="font-mono text-[12px] text-[var(--ink-3)]">
              {s}
            </li>
          ))}
        </ul>
      </div>
      {big ? <Cover b={b} big /> : null}
    </Wrapper>
  );
}

/**
 * The builder side. First project gets the wide cell, the rest share the row
 * below, so four items tile as 1 wide + 3 without an empty cell.
 */
export function Builds() {
  const [first, ...rest] = builds;
  return (
    <section
      id="builds"
      className="scroll-mt-20 border-y border-[var(--rule)] bg-[var(--paper-2)] py-24 md:py-32"
    >
      <Shell>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h2 className="display text-[clamp(2.3rem,5vw,4.2rem)] text-[var(--ink)]">
              I also build apps{" "}
              <Mark kind="scribble" onView delay={0.2}>
                with AI.
              </Mark>
            </h2>
            <p className="mt-6 max-w-[54ch] text-[16.5px] leading-relaxed text-[var(--ink-2)]">
              AI writes code fast. Most of it is not ready to ship. I build with AI agents and then test the
              result like a release, so it holds up with real users.
            </p>
          </div>
          <div className="lg:col-span-4 lg:self-end">
            <Note>The unfair advantage: the builder is also the QA.</Note>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          <Reveal className="md:col-span-3">
            <BuildCard b={first} big />
          </Reveal>
          {rest.map((b, i) => (
            <Reveal key={b.name} delay={0.05 * (i + 1)}>
              <BuildCard b={b} />
            </Reveal>
          ))}
        </div>
      </Shell>
    </section>
  );
}
