export type ScentTier = {
  tier: string;
  en: string;
  notes: string;
  body: string;
};

export type Scent = {
  slug: string;
  numeral: string;
  name: string;
  notesLine: string;
  price: string;
  /** liquid gradient inside the flacon */
  hues: [string, string];
  /** particle colors for the vapor field */
  vapor: [string, string];
  tagline: string;
  story: string;
  ritual: string;
  pyramid: ScentTier[];
};

export const SCENTS: Scent[] = [
  {
    slug: "ombre",
    numeral: "No. I",
    name: "Ombre",
    notesLine: "Smoke · Vetiver · Cold Stone",
    price: "€240",
    hues: ["#4a4350", "#191622"],
    vapor: ["#766a8a", "#d3ccdf"],
    tagline: "The memory of a fire that burned out before you arrived.",
    story:
      "Ombre was the first perfume the house ever sealed, in 1947, and it has not been touched since. It was composed for the hour after a room empties — when the candles are out, the stone walls give back their cold, and the smoke has settled into wool and hair. It is not a dark perfume. It is what darkness smells like when you are no longer afraid of it.",
    ritual:
      "Worn closest to the skin — one trace at the base of the throat. Ombre does not project; it waits to be discovered.",
    pyramid: [
      {
        tier: "Tête",
        en: "Top notes",
        notes: "Pink pepper · Cade smoke",
        body: "A struck match, immediately regretted. The pepper flares and is gone inside ten minutes.",
      },
      {
        tier: "Cœur",
        en: "Heart notes",
        notes: "Haitian vetiver · Cypress",
        body: "The green dark of a hedge at dusk. Vetiver cut with cypress so it reads cold rather than earthy.",
      },
      {
        tier: "Fond",
        en: "Base notes",
        notes: "Mineral accord · Labdanum · Ash",
        body: "Cold stone is not a poetry — it is an accord the house has kept secret for eighty years.",
      },
    ],
  },
  {
    slug: "solaire",
    numeral: "No. II",
    name: "Solaire",
    notesLine: "Bergamot · White Amber · Salt",
    price: "€240",
    hues: ["#c79a52", "#5c3f1a"],
    vapor: ["#b9883f", "#e8dcc4"],
    tagline: "Noon, kept in a bottle against the winter.",
    story:
      "Solaire took forty-one years to leave the atelier. The brief was a single sentence in the founder's notebook: the smell of a white wall at midday. Bergamot pressed within hours of harvest, an amber that behaves like light rather than syrup, and the faintest line of salt — the skin of someone who swam in the sea that morning and told no one.",
    ritual:
      "Worn generously, on warm skin and on linen. Solaire is the only perfume of the house that is permitted to enter a room before you do.",
    pyramid: [
      {
        tier: "Tête",
        en: "Top notes",
        notes: "Calabrian bergamot · Pink salt",
        body: "Citrus with the bitterness left in. The salt is felt more than smelled — a brightness at the edges.",
      },
      {
        tier: "Cœur",
        en: "Heart notes",
        notes: "White amber · Orange blossom",
        body: "An amber stripped of its sweetness until only the warmth remains, lit from inside by blossom.",
      },
      {
        tier: "Fond",
        en: "Base notes",
        notes: "Driftwood · White musk",
        body: "Wood that has forgotten the forest. Hours later, it is simply the smell of your own skin, improved.",
      },
    ],
  },
  {
    slug: "minuit",
    numeral: "No. III",
    name: "Minuit",
    notesLine: "Iris · Black Fig · Night Air",
    price: "€260",
    hues: ["#2c3563", "#0e1126"],
    vapor: ["#46578f", "#b3bedf"],
    tagline: "What the garden does when no one is watching.",
    story:
      "Minuit is the youngest perfume of the house — sealed in 2011 after three hundred and twelve trials. It began as an attempt to bottle the garden at Rue de l'Oratoire at two in the morning: fig leaves cooling, iris roots breathing under black soil, and the particular air that exists only between midnight and the first birds. It is worn by people who prefer questions to answers.",
    ritual:
      "Worn at night, or in defiance of the morning. One trace inside each wrist — Minuit rises with the pulse.",
    pyramid: [
      {
        tier: "Tête",
        en: "Top notes",
        notes: "Black fig leaf · Bitter green",
        body: "The snap of a fig leaf in the dark — milky, green, and slightly forbidding.",
      },
      {
        tier: "Cœur",
        en: "Heart notes",
        notes: "Orris root · Violet leaf",
        body: "Iris as the house insists on it: raw root, cold and suede-like, never powder.",
      },
      {
        tier: "Fond",
        en: "Base notes",
        notes: "Night air accord · Cedar · Ambrette",
        body: "The empty space of the composition. A coolness with no name that makes everything else honest.",
      },
    ],
  },
];

export function getScent(slug: string): Scent | undefined {
  return SCENTS.find((s) => s.slug === slug);
}
