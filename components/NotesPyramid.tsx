"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TIERS = [
  {
    tier: "Tête",
    en: "Top notes",
    body: "The first breath. Gone in minutes, remembered for years — bergamot struck cold, a flicker of pink salt.",
  },
  {
    tier: "Cœur",
    en: "Heart notes",
    body: "The argument of the perfume. Iris root and white amber negotiate for hours on warm skin.",
  },
  {
    tier: "Fond",
    en: "Base notes",
    body: "What stays after you leave the room. Vetiver, cold stone, the ghost of smoke on wool.",
  },
];

export default function NotesPyramid() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=220%",
            pin: true,
            scrub: 0.6,
          },
        });
        tl.from(".notes-line", { scaleY: 0, ease: "none", duration: 3 }, 0);
        gsap.utils.toArray<HTMLElement>(".notes-tier").forEach((el, i) => {
          tl.from(
            el,
            { autoAlpha: 0, y: 60, ease: "power2.out", duration: 0.8 },
            i * 0.95 + 0.15
          );
        });
        tl.to(".notes-heading", { autoAlpha: 0.25, ease: "none", duration: 1.4 }, 1.4);
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="notes"
      ref={ref}
      className="relative flex min-h-svh items-center overflow-clip bg-ink-soft px-6 py-24"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-2 md:gap-24">
        <div className="notes-heading self-center">
          <p className="text-overline mb-8">Composition</p>
          <h2 className="font-display text-5xl font-light leading-[1.05] text-bone md:text-7xl">
            The architecture of a{" "}
            <em className="text-amber">scent</em>
          </h2>
        </div>

        <div className="relative flex flex-col gap-16 pl-8 md:gap-20 md:pl-12">
          <span
            aria-hidden="true"
            className="notes-line absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-amber/70 via-amber/30 to-transparent"
          />
          {TIERS.map((t) => (
            <div key={t.tier} className="notes-tier">
              <div className="flex items-baseline gap-4">
                <h3 className="font-display text-3xl font-light italic text-bone md:text-4xl">
                  {t.tier}
                </h3>
                <span className="text-[0.6rem] uppercase tracking-[0.35em] text-bone-dim">
                  {t.en}
                </span>
              </div>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-bone-dim">
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
