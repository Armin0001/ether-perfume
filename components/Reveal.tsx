"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Animates any descendant marked with [data-reveal] as it enters the
 * viewport, so server-rendered pages can opt into motion declaratively.
 */
export default function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils
          .toArray<HTMLElement>("[data-reveal]", ref.current)
          .forEach((el) => {
            gsap.from(el, {
              autoAlpha: 0,
              y: 48,
              duration: 1.3,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 84%" },
            });
          });
      });
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
