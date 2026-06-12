"use client";

import { useState } from "react";

const FIELD =
  "w-full border-b border-bone/20 bg-transparent py-3 text-bone outline-none transition-colors duration-500 placeholder:text-bone-dim/50 focus:border-amber";

export default function FittingForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="border border-amber/30 px-10 py-16 text-center">
        <p className="font-display text-3xl font-light italic text-bone">
          Your request has been received.
        </p>
        <p className="mt-6 text-sm leading-relaxed text-bone-dim">
          The atelier replies by hand, within three days. There is no waiting
          list — only a calendar, and it is honest.
        </p>
      </div>
    );
  }

  return (
    <form
      className="flex flex-col gap-10"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="text-overline mb-3 block">Name</span>
          <input
            type="text"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={FIELD}
          />
        </label>
        <label className="block">
          <span className="text-overline mb-3 block">Email</span>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={FIELD}
          />
        </label>
      </div>

      <div className="grid gap-10 md:grid-cols-2">
        <label className="block">
          <span className="text-overline mb-3 block">Atelier</span>
          <select name="atelier" className={`${FIELD} appearance-none`}>
            <option className="bg-ink" value="grasse">
              Grasse — 7 Rue de l&rsquo;Oratoire
            </option>
            <option className="bg-ink" value="paris">
              Paris — 12 Rue de Sévigné
            </option>
          </select>
        </label>
        <label className="block">
          <span className="text-overline mb-3 block">Preferred month</span>
          <input
            type="month"
            name="month"
            className={`${FIELD} [color-scheme:dark]`}
          />
        </label>
      </div>

      <label className="block">
        <span className="text-overline mb-3 block">
          A scent you have loved&ensp;<span className="normal-case tracking-normal text-bone-dim/60">(optional)</span>
        </span>
        <textarea
          name="note"
          rows={3}
          placeholder="Rain on hot pavement, my grandmother's coat, a church in winter…"
          className={`${FIELD} resize-none`}
        />
      </label>

      <button
        type="submit"
        className="group mt-4 inline-flex w-fit items-center gap-4 border border-amber/60 px-10 py-4 text-[0.7rem] uppercase tracking-[0.34em] text-amber transition-colors duration-500 hover:bg-amber hover:text-ink"
      >
        Request an appointment
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-500 group-hover:translate-x-1.5"
        >
          →
        </span>
      </button>
    </form>
  );
}
