/**
 * Homeowner guides — long-form articles that rank for research searches
 * ("polyjacking vs mudjacking", "how to compare concrete quotes") and send
 * readers to the matching service page. Add a guide by appending to this list;
 * pages, sitemap entries, and Article schema are generated automatically.
 */
export type GuideSection = { heading: string; paragraphs: string[]; bullets?: string[] };

export type Guide = {
  slug: string;
  title: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  published: string;
  updated?: string;
  readMinutes: number;
  /** Trade slug + service slug this guide sends readers to. */
  trade: string;
  serviceSlug: string;
  intro: string;
  sections: GuideSection[];
};

export const guides: Guide[] = [
  {
    slug: "concrete-driveway-replacement-springfield-mo",
    title: "Concrete Driveway Replacement in Springfield, MO: What Drives the Cost (and How to Compare Quotes)",
    description:
      "What really changes the price of a new concrete driveway in Springfield and the 417: thickness, base, tear-out, reinforcement, finish, and permits. Plus how to compare quotes line by line.",
    published: "2026-11-21",
    readMinutes: 7,
    trade: "concrete",
    serviceSlug: "concrete-driveways",
    intro:
      "Two quotes for the same Springfield driveway can be thousands of dollars apart, and the cheaper one isn't always the better deal. Most of the difference comes from a handful of line items that are easy to compare once you know what to look for. Here's what actually drives the price of a concrete driveway in Southwest Missouri, and how to tell whether you're comparing apples to apples.",
    sections: [
      {
        heading: "1. Thickness: 4 inches vs. 5–6 inches",
        paragraphs: [
          "A 4-inch slab is common for passenger cars. If you park a heavy pickup, a trailer, a boat, or an RV, which is common across the 417, many contractors recommend 5 to 6 inches with rebar. More thickness means more concrete and a higher price, but it's also the single biggest factor in whether a driveway holds up under heavy loads.",
          "When you compare quotes, make sure each one states the thickness in writing. A low quote at 4 inches and a higher quote at 5 inches aren't the same driveway.",
        ],
      },
      {
        heading: "2. What's underneath: excavation and gravel base",
        paragraphs: [
          "Much of the Springfield area sits on red clay over fractured limestone and chert. Clay swells when it's wet and shrinks during droughts, and that movement cracks slabs that were poured on a thin or poorly compacted base. A proper base, excavated to the right depth with compacted gravel, costs more up front and is the best insurance against early cracking.",
          "Ask every contractor how deep they'll excavate, how many inches of gravel they'll put down, and how they'll compact it. Vague answers are a red flag.",
        ],
      },
      {
        heading: "3. Tear-out and haul-away",
        paragraphs: [
          "Removing an old concrete or asphalt driveway is real work: breaking it up, loading it, and paying disposal fees. Some quotes include it, and some list it separately or leave it out entirely. Confirm that tear-out and haul-away are included so you don't get a surprise bill.",
        ],
      },
      {
        heading: "4. Reinforcement and control joints",
        paragraphs: [
          "Wire mesh, rebar, or fiber reinforcement all help hold a slab together if it cracks. Control joints, the straight grooves cut into the surface, decide where cracks happen so they stay neat and straight instead of random. Ozarks freeze-thaw cycles make both especially important.",
        ],
        bullets: [
          "What reinforcement is included: mesh, rebar, or fiber?",
          "How far apart will the control joints be?",
          "Is the concrete air-entrained for freeze-thaw resistance?",
        ],
      },
      {
        heading: "5. Finish and extras",
        paragraphs: [
          "A standard broom finish is the most affordable and gives good traction in ice. Exposed aggregate, color, or stamped borders add cost and curb appeal. Sealing is usually a separate line item and worth asking about, since it helps protect against salt and freeze-thaw scaling.",
        ],
      },
      {
        heading: "6. Permits and the city apron",
        paragraphs: [
          "Inside Springfield city limits, work in the public right-of-way, such as the apron where your driveway meets the street or the public sidewalk, often needs a permit. Reputable local contractors know the process and usually pull the permit for you. Ask whether permit fees are included.",
        ],
      },
      {
        heading: "Should you replace or level?",
        paragraphs: [
          "If your driveway is sunken but mostly intact, concrete lifting (polyjacking) may fix it for a fraction of the cost of replacement. If it's badly cracked, crumbling, or heaved by tree roots, replacement usually makes more sense. A good contractor will tell you honestly which one fits your slab.",
        ],
      },
      {
        heading: "How to compare quotes the easy way",
        paragraphs: [
          "Put each quote side by side and check that every one lists the same items: square footage, thickness, base depth, reinforcement, joint spacing, tear-out, finish, sealing, permits, and warranty. When one is missing an item, ask for it in writing before you decide. That's also why comparing 2–3 local quotes beats taking the first one you get.",
        ],
      },
    ],
  },
  {
    slug: "polyjacking-vs-mudjacking-vs-replacement",
    title: "Polyjacking vs. Mudjacking vs. Replacement: How to Fix Sunken Concrete in the Ozarks",
    description:
      "Why driveways, sidewalks, and patios sink in Southwest Missouri, how foam leveling and mudjacking compare, and when it's smarter to replace the slab instead.",
    published: "2026-11-21",
    readMinutes: 6,
    trade: "concrete",
    serviceSlug: "concrete-lifting-leveling",
    intro:
      "Sunken driveways, tilted sidewalk panels, and garage aprons that drop away from the slab are everywhere in the 417. The good news is that a sunken slab doesn't always need to be torn out. Here's why concrete sinks in Southwest Missouri, how the two main lifting methods compare, and how to know when replacement is the better call.",
    sections: [
      {
        heading: "Why concrete sinks in Southwest Missouri",
        paragraphs: [
          "Three local conditions do most of the damage. First, clay soils shrink in dry spells and swell when wet, which leaves voids under slabs. Second, fill dirt around newer homes, common in Nixa, Republic, and Ozark subdivisions, often wasn't fully compacted and keeps settling for years. Third, the Springfield Plateau is karst country, where water can wash soil out from under concrete.",
          "Poor drainage makes all three worse. If downspouts or runoff dump water next to a slab, fixing that is part of any lasting repair.",
        ],
      },
      {
        heading: "Polyjacking (foam leveling)",
        paragraphs: [
          "Polyjacking injects a high-density polyurethane foam under the slab through small holes, about the size of a penny. The foam expands, fills voids, and lifts the concrete back into place. It cures quickly, so the area is often usable the same day, and it adds very little weight to soil that's already weak.",
        ],
        bullets: ["Small, discreet holes", "Fast cure, often usable the same day", "Lightweight material that won't add load to weak soil"],
      },
      {
        heading: "Mudjacking (slabjacking)",
        paragraphs: [
          "Mudjacking pumps a cement-based slurry under the slab through larger holes. It's an older, proven method and is sometimes less expensive per job, but the material is much heavier and takes longer to cure. Many 417 contractors now prefer foam for driveways and sidewalks, while some still use mudjacking for certain jobs. Ask each contractor which method they use and why.",
        ],
      },
      {
        heading: "When replacement is the better choice",
        paragraphs: [
          "Lifting works best when the slab is mostly intact. If the concrete is broken into many pieces, crumbling or scaling at the surface, or was heaved by tree roots, lifting may just postpone the problem. Replacement also makes sense if you want to change the size, thickness, or layout anyway.",
        ],
        bullets: [
          "Mostly intact, just sunken → lifting is usually the smart, cheaper fix",
          "Badly cracked, crumbling, or root-heaved → replacement is usually better",
          "Not sure? Ask for both quotes and compare",
        ],
      },
      {
        heading: "Questions to ask before you hire",
        paragraphs: ["Whichever method you choose, these questions help you compare contractors fairly:"],
        bullets: [
          "Foam or slurry, and why for my slab?",
          "What caused the settling, and what will you do about it, such as drainage?",
          "Will you seal the joints and cracks afterward?",
          "What warranty do you offer on the lift?",
          "How soon can we walk or drive on it?",
        ],
      },
    ],
  },
  {
    slug: "how-to-compare-concrete-quotes",
    title: "How to Compare Concrete Quotes: 12 Questions to Ask Before You Hire in the 417",
    description:
      "A simple checklist for comparing driveway, patio, and slab quotes from Springfield-area concrete contractors, so you pick on value, not just the lowest number.",
    published: "2026-11-21",
    readMinutes: 5,
    trade: "concrete",
    serviceSlug: "patios-sidewalks-stamped-concrete",
    intro:
      "Concrete is permanent, so a mistake lasts a long time. The lowest quote can be the most expensive one five years from now if the base was thin or the joints were skipped. Use these 12 questions to compare quotes from Springfield, Nixa, Ozark, Republic, and other 417 contractors side by side.",
    sections: [
      {
        heading: "The scope: are you comparing the same job?",
        paragraphs: ["Before price, make sure every quote describes the same project."],
        bullets: [
          "1. What's the exact square footage and thickness?",
          "2. Is tear-out and haul-away of the old concrete included?",
          "3. How deep will you excavate, and how much gravel base goes down?",
          "4. What reinforcement is included: wire mesh, rebar, or fiber?",
        ],
      },
      {
        heading: "The details that decide how long it lasts",
        paragraphs: ["These are the line items that separate a 30-year slab from a 3-year headache in Ozarks weather."],
        bullets: [
          "5. How far apart will the control joints be?",
          "6. Is the mix air-entrained for freeze-thaw resistance?",
          "7. How will you handle drainage so water runs away from the house?",
          "8. Is sealing included, and how often should it be redone?",
        ],
      },
      {
        heading: "The business side",
        paragraphs: ["A great price doesn't matter if the contractor can't stand behind the work."],
        bullets: [
          "9. Do you carry general liability insurance? Can I see the certificate?",
          "10. Are permits included, if my city requires one?",
          "11. What's your workmanship warranty, in writing?",
          "12. What's the payment schedule? (Be cautious of large up-front deposits.)",
        ],
      },
      {
        heading: "Making the decision",
        paragraphs: [
          "Lay the quotes side by side and fill in any gaps by asking for missing items in writing. Then weigh price against the answers above, along with how responsive and clear each contractor was. Comparing 2–3 vetted local quotes is usually enough to see what a fair price looks like without getting buried in calls.",
        ],
      },
    ],
  },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
