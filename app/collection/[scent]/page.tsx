import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SCENTS, getScent } from "@/lib/scents";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Bottle from "@/components/Bottle";
import ScentVapor from "@/components/ScentVapor";
import Reveal from "@/components/Reveal";

type Params = { scent: string };

export function generateStaticParams(): Params[] {
  return SCENTS.map((s) => ({ scent: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const scent = getScent((await params).scent);
  if (!scent) return {};
  return {
    title: `${scent.name} ${scent.numeral} — ÉTHER`,
    description: `${scent.tagline} ${scent.notesLine}.`,
  };
}

export default async function ScentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const scent = getScent((await params).scent);
  if (!scent) notFound();

  const index = SCENTS.findIndex((s) => s.slug === scent.slug);
  const prev = SCENTS[(index + SCENTS.length - 1) % SCENTS.length];
  const next = SCENTS[(index + 1) % SCENTS.length];

  return (
    <>
      <Nav delay={0.4} />
      <SmoothScroll>
        <main>
          {/* hero */}
          <section className="relative flex min-h-svh items-center overflow-clip">
            <ScentVapor colors={scent.vapor} />
            <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-20 pt-36 md:grid-cols-2 md:gap-10">
              <Reveal>
                <p className="text-overline" data-reveal>
                  {scent.numeral}&ensp;·&ensp;Eau de Parfum
                </p>
                <h1
                  className="font-display mt-6 text-7xl font-light italic leading-[0.95] text-bone md:text-[8.5rem]"
                  data-reveal
                >
                  {scent.name}
                </h1>
                <p
                  className="mt-8 max-w-md font-display text-xl italic leading-relaxed text-bone-dim md:text-2xl"
                  data-reveal
                >
                  {scent.tagline}
                </p>
                <p
                  className="mt-6 text-xs uppercase tracking-[0.28em] text-bone-dim"
                  data-reveal
                >
                  {scent.notesLine}
                </p>
                <div className="mt-12 flex items-center gap-8" data-reveal>
                  <span className="text-sm text-bone-dim">
                    {scent.price} · 50 ml
                  </span>
                  <Link
                    href="/fitting"
                    className="border border-amber/60 px-7 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-amber transition-colors duration-500 hover:bg-amber hover:text-ink"
                  >
                    Reserve a fitting
                  </Link>
                </div>
              </Reveal>
              <Reveal className="flex justify-center md:justify-end md:pr-12">
                <div data-reveal data-speed="0.92">
                  <Bottle
                    hues={scent.hues}
                    name={scent.name}
                    className="h-[24rem] w-auto md:h-[30rem]"
                  />
                </div>
              </Reveal>
            </div>
          </section>

          {/* story */}
          <Reveal>
            <section className="mx-auto max-w-4xl px-6 py-32 md:py-44">
              <div className="rule mb-16" data-reveal />
              <p className="text-overline mb-10" data-reveal>
                The Composition
              </p>
              <p
                className="font-display text-2xl font-light leading-[1.5] text-bone md:text-3xl"
                data-reveal
              >
                {scent.story}
              </p>
            </section>
          </Reveal>

          {/* pyramid */}
          <Reveal>
            <section className="bg-ink-soft px-6 py-32 md:py-40">
              <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-3 md:gap-12">
                {scent.pyramid.map((t) => (
                  <div key={t.tier} data-reveal>
                    <div className="flex items-baseline gap-4">
                      <h2 className="font-display text-3xl font-light italic text-bone">
                        {t.tier}
                      </h2>
                      <span className="text-[0.6rem] uppercase tracking-[0.35em] text-bone-dim">
                        {t.en}
                      </span>
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.24em] text-amber">
                      {t.notes}
                    </p>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-dim">
                      {t.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          {/* ritual */}
          <Reveal>
            <section className="mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
              <p className="text-overline mb-10" data-reveal>
                The Ritual
              </p>
              <p
                className="font-display text-2xl font-light italic leading-[1.5] text-bone-dim md:text-3xl"
                data-reveal
              >
                {scent.ritual}
              </p>
            </section>
          </Reveal>

          {/* prev / next */}
          <nav
            aria-label="Other perfumes"
            className="mx-auto flex max-w-7xl items-center justify-between border-t border-bone/10 px-6 py-14"
          >
            <Link
              href={`/collection/${prev.slug}`}
              className="group flex items-center gap-4 text-bone-dim transition-colors hover:text-bone"
            >
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 group-hover:-translate-x-1.5"
              >
                ←
              </span>
              <span className="text-[0.65rem] uppercase tracking-[0.3em]">
                {prev.numeral} {prev.name}
              </span>
            </Link>
            <Link
              href={`/collection/${next.slug}`}
              className="group flex items-center gap-4 text-bone-dim transition-colors hover:text-bone"
            >
              <span className="text-[0.65rem] uppercase tracking-[0.3em]">
                {next.numeral} {next.name}
              </span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </nav>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
