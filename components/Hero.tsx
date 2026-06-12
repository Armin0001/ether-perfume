"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

const VaporCanvas = dynamic(() => import("./VaporCanvas"), { ssr: false });

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          const split = SplitText.create(".hero-title", {
            type: "chars",
            charsClass: "will-change-transform",
          });
          gsap
            .timeline({ defaults: { ease: "power4.out" } })
            .from(split.chars, {
              yPercent: 112,
              autoAlpha: 0,
              duration: 1.6,
              stagger: 0.045,
              delay: 0.3,
            })
            .from(
              ".hero-fade",
              { autoAlpha: 0, y: 18, duration: 1.4, stagger: 0.18 },
              "-=1.0"
            )
            .from(
              ".hero-cue",
              { autoAlpha: 0, duration: 1.2 },
              "-=0.6"
            );
        });

        // headline drifts up and dissolves as you leave the hero
        gsap.to(".hero-inner", {
          yPercent: -18,
          autoAlpha: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom 30%",
            scrub: true,
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      className="relative flex h-svh items-center justify-center overflow-clip"
    >
      <VaporCanvas />

      <div className="hero-inner relative z-10 flex flex-col items-center px-6 text-center">
        <p className="hero-fade text-overline mb-8">
          Maison de Parfum&ensp;·&ensp;Grasse, est. 1924
        </p>
        <h1
          className="hero-title font-display overflow-clip text-[clamp(5rem,22vw,19rem)] font-light leading-[0.85] tracking-[-0.02em] text-bone"
          style={{ fontVariationSettings: "'opsz' 144, 'SOFT' 40, 'WONK' 0" }}
        >
          ÉTHER
        </h1>
        <p className="hero-fade mt-10 max-w-md font-display text-lg italic leading-relaxed text-bone-dim md:text-xl">
          Perfume for the hours that do not exist.
        </p>
      </div>

      <div className="hero-cue absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4">
        <span className="text-[0.6rem] uppercase tracking-[0.4em] text-bone-dim">
          Scroll
        </span>
        <span className="block h-12 w-px bg-gradient-to-b from-bone/40 to-transparent" />
      </div>
    </section>
  );
}
