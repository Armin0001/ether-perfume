"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "/maison", label: "Maison" },
  { href: "/#collection", label: "Collection" },
  { href: "/#notes", label: "Notes" },
  { href: "/#atelier", label: "Atelier" },
];

export default function Nav({ delay = 1.4 }: { delay?: number }) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(ref.current, {
          y: -24,
          autoAlpha: 0,
          duration: 1.2,
          delay,
          ease: "power3.out",
        });
        // a whisper of background once the hero is left behind
        gsap.to(ref.current, {
          backgroundColor: "rgba(11, 9, 8, 0.72)",
          backdropFilter: "blur(12px)",
          duration: 0.4,
          scrollTrigger: {
            trigger: document.body,
            start: () => `${window.innerHeight * 0.7} top`,
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    { scope: ref }
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[90] flex items-center justify-between px-6 py-5 md:px-12"
    >
      <Link
        href="/"
        className="font-display text-xl tracking-[0.18em] text-bone"
        aria-label="ÉTHER home"
      >
        ÉTHER
      </Link>
      <nav className="hidden gap-10 md:flex" aria-label="Primary">
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="link-sweep text-[0.7rem] uppercase tracking-[0.32em] text-bone-dim transition-colors hover:text-bone"
          >
            {l.label}
          </Link>
        ))}
      </nav>
      <Link
        href="/fitting"
        className="border border-bone/25 px-5 py-2 text-[0.65rem] uppercase tracking-[0.3em] text-bone transition-colors duration-500 hover:border-amber hover:text-amber"
      >
        Private Fitting
      </Link>
    </header>
  );
}
