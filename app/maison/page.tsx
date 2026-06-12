import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "The Maison — ÉTHER",
  description:
    "A house of silence. The history of Maison Éther, Grasse, est. 1924 — one century, three perfumes.",
};

const TIMELINE = [
  {
    year: "1924",
    text: "Marguerite Aubel, daughter of a jasmine farmer, opens an atelier at 7 Rue de l'Oratoire with one rule written above the door: nothing leaves until it is inevitable.",
  },
  {
    year: "1947",
    text: "No. I — Ombre is sealed after the war, composed for the hour after a room empties. It has not been reformulated since.",
  },
  {
    year: "1968",
    text: "The house refuses its last commission, returning a blank cheque to a film studio. It will never take another.",
  },
  {
    year: "1989",
    text: "No. II — Solaire leaves the atelier after forty-one years of trials, answering a single sentence in the founder's notebook: the smell of a white wall at midday.",
  },
  {
    year: "2011",
    text: "No. III — Minuit is sealed on the 312th trial by Claire Aubel, third nose of the house, from the garden it was written in.",
  },
  {
    year: "2026",
    text: "The maison remains three perfumes. There is no fourth in progress. There may never be.",
  },
];

const PRINCIPLES = [
  {
    title: "No seasons",
    body: "A perfume that is right in April and wrong in October was never right. The house releases nothing annually, and nothing twice.",
  },
  {
    title: "One harvest",
    body: "Every natural in a bottle of ÉTHER is traced to a single field and a single year, or it is not used at all.",
  },
  {
    title: "Sealed by hand",
    body: "Each flacon is filled, corked, and waxed by one of four people, all of whom can be named on request.",
  },
];

export default function MaisonPage() {
  return (
    <>
      <Nav delay={0.4} />
      <SmoothScroll>
        <main>
          {/* hero */}
          <section className="relative flex min-h-[80svh] items-end overflow-clip px-6 pb-24 pt-44">
            <div className="mx-auto w-full max-w-7xl">
              <Reveal>
                <p className="text-overline mb-8" data-reveal>
                  Grasse, est. 1924
                </p>
                <h1
                  className="font-display max-w-4xl text-6xl font-light leading-[1.02] text-bone md:text-8xl"
                  data-reveal
                >
                  A house of <em className="text-amber">silence.</em>
                </h1>
                <p
                  className="mt-10 max-w-xl text-sm leading-relaxed text-bone-dim"
                  data-reveal
                >
                  Most perfume houses speak constantly — launches, editions,
                  ambassadors. ÉTHER has said three things in one hundred
                  years. This page is the whole of its history.
                </p>
              </Reveal>
            </div>
          </section>

          {/* timeline */}
          <Reveal>
            <section className="mx-auto max-w-4xl px-6 py-24 md:py-32">
              <div className="rule mb-20" data-reveal />
              <ol className="flex flex-col gap-16 md:gap-20">
                {TIMELINE.map((t) => (
                  <li
                    key={t.year}
                    className="grid gap-4 md:grid-cols-[8rem_1fr] md:gap-12"
                    data-reveal
                  >
                    <p className="font-display text-4xl font-light text-amber md:text-5xl">
                      {t.year}
                    </p>
                    <p className="max-w-xl self-center text-sm leading-relaxed text-bone-dim">
                      {t.text}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* the nose */}
          <Reveal>
            <section className="bg-ink-soft px-6 py-32 md:py-44">
              <div className="mx-auto max-w-4xl text-center">
                <p className="text-overline mb-12" data-reveal>
                  The Nose
                </p>
                <blockquote data-reveal>
                  <p className="font-display text-3xl font-light italic leading-[1.4] text-bone md:text-5xl md:leading-[1.35]">
                    &ldquo;I do not invent perfumes. I wait for them, and when
                    they arrive I try not to ruin them.&rdquo;
                  </p>
                  <footer className="mt-10 text-[0.65rem] uppercase tracking-[0.35em] text-bone-dim">
                    Claire Aubel · Third nose of the house
                  </footer>
                </blockquote>
              </div>
            </section>
          </Reveal>

          {/* principles */}
          <Reveal>
            <section className="mx-auto max-w-7xl px-6 py-32 md:py-44">
              <div className="grid gap-16 md:grid-cols-3 md:gap-12">
                {PRINCIPLES.map((p, i) => (
                  <div key={p.title} data-reveal>
                    <p className="text-overline mb-6">0{i + 1}</p>
                    <h2 className="font-display text-3xl font-light italic text-bone">
                      {p.title}
                    </h2>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
                      {p.body}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-28 text-center" data-reveal>
                <Link
                  href="/fitting"
                  className="inline-block border border-amber/60 px-10 py-4 text-[0.7rem] uppercase tracking-[0.34em] text-amber transition-colors duration-500 hover:bg-amber hover:text-ink"
                >
                  Visit the atelier
                </Link>
              </div>
            </section>
          </Reveal>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
