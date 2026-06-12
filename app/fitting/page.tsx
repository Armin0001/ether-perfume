import type { Metadata } from "next";
import Nav from "@/components/Nav";
import SmoothScroll from "@/components/SmoothScroll";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import FittingForm from "@/components/FittingForm";

export const metadata: Metadata = {
  title: "Private Fitting — ÉTHER",
  description:
    "Reserve a private fitting in Grasse or Paris. One hour, three perfumes, your skin.",
};

const DETAILS = [
  {
    title: "One hour",
    body: "No perfume reveals itself in a spray on a paper strip. A fitting lasts one hour because skin takes one hour to tell the truth.",
  },
  {
    title: "Three perfumes",
    body: "You will wear all three — one on each wrist, one at the throat — and then you will go for a walk. The decision is made outdoors.",
  },
  {
    title: "No obligation",
    body: "Roughly a third of fittings end without a purchase. The house considers these successes: the wrong perfume was not sold.",
  },
];

export default function FittingPage() {
  return (
    <>
      <Nav delay={0.4} />
      <SmoothScroll>
        <main>
          <section className="relative overflow-clip px-6 pb-24 pt-44">
            <div className="mx-auto w-full max-w-7xl">
              <Reveal>
                <p className="text-overline mb-8" data-reveal>
                  By appointment only
                </p>
                <h1
                  className="font-display max-w-4xl text-6xl font-light leading-[1.02] text-bone md:text-8xl"
                  data-reveal
                >
                  A fitting, not a <em className="text-amber">purchase.</em>
                </h1>
              </Reveal>
            </div>
          </section>

          <Reveal>
            <section className="mx-auto max-w-7xl px-6 pb-32">
              <div className="grid gap-16 md:grid-cols-3 md:gap-12">
                {DETAILS.map((d, i) => (
                  <div key={d.title} data-reveal>
                    <p className="text-overline mb-6">0{i + 1}</p>
                    <h2 className="font-display text-3xl font-light italic text-bone">
                      {d.title}
                    </h2>
                    <p className="mt-5 max-w-sm text-sm leading-relaxed text-bone-dim">
                      {d.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>

          <Reveal>
            <section className="bg-ink-soft px-6 py-32 md:py-40">
              <div className="mx-auto grid max-w-7xl gap-20 md:grid-cols-[1fr_1.2fr] md:gap-24">
                <div data-reveal>
                  <p className="text-overline mb-8">The Ateliers</p>
                  <div className="flex flex-col gap-12">
                    <div>
                      <h2 className="font-display text-3xl font-light italic text-bone">
                        Grasse
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                        7 Rue de l&rsquo;Oratoire
                        <br />
                        Tuesday – Saturday, 10h – 17h
                      </p>
                    </div>
                    <div>
                      <h2 className="font-display text-3xl font-light italic text-bone">
                        Paris
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-bone-dim">
                        12 Rue de Sévigné
                        <br />
                        Thursday – Saturday, 11h – 19h
                      </p>
                    </div>
                  </div>
                </div>
                <div data-reveal>
                  <FittingForm />
                </div>
              </div>
            </section>
          </Reveal>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
