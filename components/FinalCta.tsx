"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const NOTES =
  "Bergamot — Iris — Vetiver — White Amber — Black Fig — Cold Stone — Pink Salt — Night Air — ";

export default function FinalCta() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          const split = SplitText.create(".cta-title", {
            type: "words",
            wordsClass: "will-change-transform",
          });
          gsap.from(split.words, {
            yPercent: 60,
            autoAlpha: 0,
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.12,
            scrollTrigger: { trigger: ref.current, start: "top 60%" },
          });
        });
        gsap.from(".cta-button", {
          autoAlpha: 0,
          y: 24,
          duration: 1.2,
          delay: 0.4,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 60%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="fitting" ref={ref} className="relative overflow-clip py-40 md:py-56">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 select-none opacity-[0.16]"
      >
        <div className="marquee-track font-display text-6xl font-light italic text-bone md:text-8xl">
          <span>{NOTES}</span>
          <span>{NOTES}</span>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 pt-24 text-center">
        <h2 className="cta-title font-display text-6xl font-light leading-[1.02] text-bone md:text-[7rem]">
          Wear the <em className="text-amber">invisible.</em>
        </h2>
        <p className="mt-10 max-w-md text-sm leading-relaxed text-bone-dim">
          Fittings are held by appointment only, in Grasse and Paris. One hour.
          Your skin, our three perfumes, and a decision you will not regret.
        </p>
        <Link
          href="/fitting"
          className="cta-button group mt-14 inline-flex items-center gap-4 border border-amber/60 px-10 py-4 text-[0.7rem] uppercase tracking-[0.34em] text-amber transition-colors duration-500 hover:bg-amber hover:text-ink"
        >
          Reserve a private fitting
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  );
}
