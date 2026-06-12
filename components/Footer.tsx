import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative overflow-clip border-t border-bone/10 px-6 pt-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 pb-16 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="font-display text-2xl tracking-[0.18em] text-bone">
            ÉTHER
          </p>
          <p className="mt-4 text-xs leading-relaxed text-bone-dim">
            7 Rue de l&rsquo;Oratoire, Grasse · 12 Rue de Sévigné, Paris.
            A fictional maison, composed for the love of the craft.
          </p>
        </div>
        <div className="flex gap-16 text-xs">
          <div className="flex flex-col gap-3">
            <p className="text-overline mb-1">Maison</p>
            <Link href="/maison" className="link-sweep w-fit text-bone-dim hover:text-bone">Story</Link>
            <Link href="/#collection" className="link-sweep w-fit text-bone-dim hover:text-bone">Collection</Link>
            <Link href="/fitting" className="link-sweep w-fit text-bone-dim hover:text-bone">Private Fitting</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-overline mb-1">Contact</p>
            <a href="mailto:atelier@ether.example" className="link-sweep w-fit text-bone-dim hover:text-bone">atelier@ether.example</a>
            <span className="text-bone-dim">+33 4 00 00 00 00</span>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none select-none text-center font-display text-[clamp(6rem,24vw,22rem)] font-light leading-[0.78] tracking-[-0.02em] text-bone/[0.05]"
        data-speed="0.85"
      >
        ÉTHER
      </div>

      <div className="border-t border-bone/10 py-6 text-center text-[0.65rem] uppercase tracking-[0.3em] text-bone-dim/70">
        © 2026 Maison Éther · Grasse
      </div>
    </footer>
  );
}
