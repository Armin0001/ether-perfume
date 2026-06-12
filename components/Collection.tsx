"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENTS } from "@/lib/scents";
import Bottle from "./Bottle";

gsap.registerPlugin(ScrollTrigger);

export default function Collection() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(".scent-card", {
          y: 90,
          autoAlpha: 0,
          duration: 1.4,
          ease: "power3.out",
          stagger: 0.16,
          scrollTrigger: { trigger: ref.current, start: "top 65%" },
        });
      });
    },
    { scope: ref }
  );

  return (
    <section id="collection" ref={ref} className="relative px-6 py-32 md:py-44">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-5xl font-light leading-none text-bone md:text-7xl">
            The
            <em className="text-amber"> Collection</em>
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-bone-dim">
            Three compositions. Nothing else has left the atelier in one
            hundred years.
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-3 md:gap-10">
          {SCENTS.map((s, i) => (
            <article
              key={s.slug}
              className="scent-card group flex flex-col items-center border border-bone/10 px-8 pb-10 pt-14 transition-colors duration-700 hover:border-amber/40"
              data-lag={(0.06 * (i + 1)).toFixed(2)}
            >
              <Link
                href={`/collection/${s.slug}`}
                className="transition-transform duration-700 ease-out group-hover:-translate-y-3"
                aria-label={`Discover ${s.name}`}
              >
                <Bottle hues={s.hues} name={s.name} />
              </Link>
              <p className="text-overline mt-12">{s.numeral}</p>
              <h3 className="font-display mt-3 text-4xl font-light italic text-bone">
                {s.name}
              </h3>
              <p className="mt-4 text-xs uppercase tracking-[0.22em] text-bone-dim">
                {s.notesLine}
              </p>
              <div className="mt-8 flex w-full items-center justify-between border-t border-bone/10 pt-6">
                <span className="text-sm text-bone-dim">{s.price} · 50 ml</span>
                <Link
                  href={`/collection/${s.slug}`}
                  className="link-sweep text-[0.65rem] uppercase tracking-[0.3em] text-amber"
                >
                  Discover
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
