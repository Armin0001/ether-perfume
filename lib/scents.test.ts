import { describe, expect, it } from "vitest";
import { SCENTS, adjacentScents, getScent } from "./scents";

// The catalog drives the statically generated scent pages, the flacon gradients and the WebGL vapor
// colours. These tests are its contract: a typo here would otherwise only show up as a broken page,
// a missing link or a shader quietly drawn in the wrong colour.

const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

describe("the scent catalog", () => {
  it("has unique, URL-safe slugs, since each one becomes /collection/<slug>", () => {
    const slugs = SCENTS.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z]+(-[a-z]+)*$/);
  });

  it("numbers the scents No. I, No. II, ... in catalog order", () => {
    expect(SCENTS.map((s) => s.numeral)).toEqual(SCENTS.map((_, i) => `No. ${ROMAN[i]}`));
  });

  it("gives every scent a top, heart and base tier, in that order", () => {
    for (const scent of SCENTS) {
      expect(scent.pyramid.map((t) => [t.tier, t.en])).toEqual([
        ["Tête", "Top notes"],
        ["Cœur", "Heart notes"],
        ["Fond", "Base notes"],
      ]);
      for (const tier of scent.pyramid) expect(tier.notes.trim()).not.toBe("");
    }
  });

  it("uses six-digit hex colours, which both the CSS gradients and THREE.Color accept", () => {
    for (const scent of SCENTS) {
      for (const color of [...scent.hues, ...scent.vapor]) expect(color).toMatch(HEX_COLOR);
    }
  });

  it("prices every scent in whole euros", () => {
    for (const scent of SCENTS) expect(scent.price).toMatch(/^€\d+$/);
  });

  it("has the copy each scent page renders", () => {
    for (const scent of SCENTS) {
      expect(scent.name.trim()).not.toBe("");
      expect(scent.tagline.trim()).not.toBe("");
      expect(scent.story.length).toBeGreaterThan(100);
      expect(scent.ritual.trim()).not.toBe("");
      expect(scent.notesLine.split(" · ")).toHaveLength(3);
    }
  });
});

describe("getScent", () => {
  it("finds a scent by its slug", () => {
    expect(getScent(SCENTS[0].slug)).toBe(SCENTS[0]);
  });

  it("returns undefined for anything else, so the page can 404", () => {
    expect(getScent("nope")).toBeUndefined();
    expect(getScent(SCENTS[0].slug.toUpperCase())).toBeUndefined();
  });
});

describe("adjacentScents", () => {
  const last = SCENTS.length - 1;

  it("links each scent to its neighbours", () => {
    expect(adjacentScents(SCENTS[1].slug)).toEqual({ prev: SCENTS[0], next: SCENTS[2] });
  });

  it("wraps around at both ends of the collection", () => {
    expect(adjacentScents(SCENTS[0].slug)?.prev).toBe(SCENTS[last]);
    expect(adjacentScents(SCENTS[last].slug)?.next).toBe(SCENTS[0]);
  });

  it("returns undefined for an unknown slug", () => {
    expect(adjacentScents("nope")).toBeUndefined();
  });
});
