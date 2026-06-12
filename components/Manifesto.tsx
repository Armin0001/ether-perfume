"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Manifesto() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        document.fonts.ready.then(() => {
          const split = SplitText.create(".manifesto-text", {
            type: "lines",
            linesClass: "line",
          });
          gsap.from(split.lines, {
            yPercent: 110,
            duration: 1.3,
            ease: "power4.out",
            stagger: 0.09,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 62%",
            },
          });
        });

        gsap.from(".manifesto-rule", {
          scaleX: 0,
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ref.current, start: "top 75%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="maison"
      ref={ref}
      className="relative mx-auto max-w-6xl px-6 py-40 md:py-56"
    >
      <div className="manifesto-rule rule mb-20 origin-left" />
      <p className="text-overline mb-12" data-speed="1.05">
        The Maison
      </p>
      <p className="manifesto-text split-mask font-display text-3xl font-light leading-[1.35] text-bone md:text-5xl md:leading-[1.3]">
        Scent is the only sense that cannot be remembered — only{" "}
        <em className="text-amber">relived</em>. For a century we have bottled
        the moment between sleep and waking, when the air still belongs to no
        one.
      </p>
      <p
        className="mt-16 max-w-md text-sm leading-relaxed text-bone-dim"
        data-speed="0.95"
      >
        Founded in Grasse in 1924, ÉTHER composes in silence. No seasonal
        releases. No flankers. Three perfumes, reworked until they disappear
        into the skin.
      </p>
    </section>
  );
}
