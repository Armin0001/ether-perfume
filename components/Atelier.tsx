"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { value: 312, suffix: "", label: "Trials before No. III was sealed" },
  { value: 14, suffix: "", label: "Months of maceration in oak-dark cellars" },
  { value: 1, suffix: "", label: "Nose. One pair of hands. No committee" },
  { value: 100, suffix: "%", label: "Naturals traced to a single harvest" },
];

export default function Atelier() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
          const end = Number(el.dataset.value);
          const counter = { n: 0 };
          gsap.to(counter, {
            n: end,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
            onUpdate: () => {
              el.firstChild!.textContent = String(Math.round(counter.n));
            },
          });
        });
        gsap.from(".stat-cell", {
          autoAlpha: 0,
          y: 40,
          stagger: 0.12,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: { trigger: ref.current, start: "top 70%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section
      id="atelier"
      ref={ref}
      className="relative mx-auto max-w-7xl px-6 py-36 md:py-52"
    >
      <p className="text-overline mb-16 text-center">The Atelier</p>
      <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((s) => (
          <div key={s.label} className="stat-cell text-center">
            <p
              className="stat-num font-display text-7xl font-light text-bone md:text-8xl"
              data-value={s.value}
            >
              <span>{s.value}</span>
              <span className="text-amber">{s.suffix}</span>
            </p>
            <div className="mx-auto my-6 h-px w-10 bg-amber/50" />
            <p className="mx-auto max-w-[16rem] text-xs leading-relaxed tracking-wide text-bone-dim">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
