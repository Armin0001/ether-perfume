"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        smooth: 1.1,
        effects: true,
        smoothTouch: 0.1,
      });

      // Anchor links need special handling: the browser's native hash jump
      // scrolls the fixed, overflow-hidden wrapper instead of the page,
      // which desyncs ScrollSmoother. Route them through the smoother.
      const wrapper = document.getElementById("smooth-wrapper")!;

      const scrollToHash = (hash: string, smooth: boolean) => {
        const el = document.querySelector(hash);
        if (!el) return false;
        wrapper.scrollTop = 0;
        smoother.scrollTo(el, smooth, "top top");
        return true;
      };

      const onClick = (e: MouseEvent) => {
        const a = (e.target as Element).closest("a[href]");
        if (!a) return;
        const url = new URL(a.getAttribute("href")!, location.href);
        if (
          url.origin !== location.origin ||
          url.pathname !== location.pathname ||
          !url.hash
        )
          return;
        if (scrollToHash(url.hash, true)) {
          e.preventDefault();
          history.pushState(null, "", url.hash);
        }
      };
      document.addEventListener("click", onClick);

      // Hash present on load / after cross-page navigation.
      if (location.hash) {
        requestAnimationFrame(() => scrollToHash(location.hash, false));
      }

      // Safety net: if anything else (e.g. the router) scrolls the wrapper
      // natively, undo it and redo the scroll through the smoother.
      const onStrayScroll = () => {
        if (!wrapper.scrollTop) return;
        wrapper.scrollTop = 0;
        if (location.hash) scrollToHash(location.hash, false);
      };
      wrapper.addEventListener("scroll", onStrayScroll);

      return () => {
        document.removeEventListener("click", onClick);
        wrapper.removeEventListener("scroll", onStrayScroll);
        smoother.kill();
      };
    });
  });

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
