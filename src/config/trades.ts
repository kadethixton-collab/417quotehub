/**
 * ───────────────────────────────────────────────────────────────────────────
 *  TRADE CONFIG — the single file you edit to launch a new trade category.
 * ───────────────────────────────────────────────────────────────────────────
 * To add a 2nd or 3rd trade:
 *   1. Copy the disabled `roofing` example at the bottom (or the concrete entry).
 *   2. Fill in project types, FAQs, local considerations, and partner pricing.
 *   3. Set `enabled: true`.
 * The site automatically generates:
 *   - /services/[city]/[trade] landing pages for all 7 cities
 *   - sitemap entries, JSON-LD, and a trade option on the contractor application
 * `cityContent` is optional — without it, city pages use localized templates
 * built from cities.ts. Write custom city copy when you can; it ranks better.
 *
 * Which trade appears on the homepage and at /services/[city] is set by
 * `primaryTradeSlug` in site.ts.
 */
import type { IconName } from "@/components/Icons";

export type ProjectType = { id: string; label: string; description: string; icon: IconName };
export type FAQ = { q: string; a: string };
export type Consideration = { title: string; body: string };
export type CityTradeContent = {
  intro: string[];
  considerations: Consideration[];
  faqs: FAQ[];
};

/** The contractor offer: a flat monthly retainer with a limited number of seats per trade. */
export type PartnerPlan = {
  name: string;
  monthlyPrice: number;
  /** Seats per trade. Keep this equal to site.maxQuotes so every project can reach its full quote cap. */
  seatsTotal: number;
  seatsOpen: number;
  features: string[];
};

export type Trade = {
  slug: string;
  enabled: boolean;
  /** "Concrete & Driveway" — used in "417 Concrete & Driveway Pros". */
  name: string;
  /** "concrete contractor" / "concrete contractors" — used in body copy. */
  proSingular: string;
  proPlural: string;
  /** "concrete" — the thing being worked on, used in body copy. */
  subject: string;
  /** Schema.org serviceType for JSON-LD. */
  serviceType: string;
  /** Exactly 4 project types. "Something Else" is appended automatically in the form. */
  projectTypes: ProjectType[];
  /** Placeholder for the optional project note on step 4 of the form. */
  notePlaceholder: string;
  shortDescription: string;
  /** Southwest-Missouri-specific considerations for this trade (used on every city page). */
  localConsiderations: Consideration[];
  /** Trade-specific FAQs shown on the homepage alongside the general ones. */
  faqs: FAQ[];
  partner: PartnerPlan;
  cityContent: Partial<Record<string, CityTradeContent>>;
};

/* Partner retainer. THE PRICE IS A PLACEHOLDER — set your real number before launch. */
const defaultPartnerPlan: PartnerPlan = {
  name: "Monthly Priority Placement",
  monthlyPrice: 597,
  seatsTotal: 3,
  seatsOpen: 3,
  features: [
    "Every matching homeowner request in the cities you serve",
    "Each project shared with 2–3 pros max — never 5+",
    "No per-lead charges: one flat monthly retainer",
    "Limited seats per trade, so no one can buy their way past you",
    "Month-to-month. Cancel anytime",
  ],
};

export const trades: Trade[] = [
  {
    slug: "concrete",
    enabled: true,
    name: "Concrete & Driveway",
    proSingular: "concrete contractor",
    proPlural: "concrete contractors",
    subject: "concrete",
    serviceType: "Concrete contractor referral",
    shortDescription: "Driveways, patios, sidewalks, stamped concrete, slab leveling, and garage & shop slabs.",
    notePlaceholder: "e.g. Replace a cracked 2-car driveway, about 20×40 ft, plus the front walk",
    projectTypes: [
      { id: "driveway", label: "Concrete Driveways", description: "New & replacement", icon: "road" },
      { id: "patio-sidewalk", label: "Patios, Sidewalks & Stamped Concrete", description: "Flatwork & decorative finishes", icon: "grid" },
      { id: "lifting-leveling", label: "Concrete Lifting & Leveling", description: "Polyjacking sunken slabs", icon: "level" },
      { id: "slab", label: "Garage, Basement & Shop Slabs", description: "New pours & replacements", icon: "layers" },
    ],
    localConsiderations: [
      {
        title: "Ozarks clay and rock need a real base",
        body: "Much of the 417 sits on red clay over fractured limestone and chert. Clay swells when wet and shrinks in drought, which cracks slabs poured on a thin or poorly compacted base. Ask each contractor how deep they excavate and how many inches of compacted gravel they put down.",
      },
      {
        title: "Freeze-thaw cycles are hard on concrete",
        body: "Southwest Missouri winters swing above and below freezing again and again. Air-entrained concrete, proper control joints, and a quality sealer help prevent surface scaling and spalling. Skip rock salt for the first winter after a pour.",
      },
      {
        title: "Karst means slabs can sink",
        body: "The Springfield Plateau is karst country, full of sinkholes and voids where soil can wash out from under a slab. That's why so many 417 driveways, sidewalks, and garage floors settle. Polyjacking (foam leveling) can often lift a sunken slab for far less than replacement.",
      },
      {
        title: "Summer heat changes how concrete cures",
        body: "Hot, humid Missouri summers can make concrete set too fast, which weakens the surface. Good crews pour early in the day and cure the slab properly. Ask each contractor how they handle curing in July and August.",
      },
    ],
    faqs: [
      {
        q: "Should I level my concrete or replace it?",
        a: "If the slab is sunken but mostly intact, with few large cracks or broken pieces, lifting and leveling with polyjacking is usually faster and much cheaper than replacement. If it's badly cracked, crumbling, or heaved by tree roots, replacement often makes more sense. Your matched pros can tell you which fits your slab.",
      },
      {
        q: "How long before I can drive on a new concrete driveway?",
        a: "Most contractors recommend staying off new concrete on foot for about a day and with passenger vehicles for about 7 days. Wait closer to a month before heavy trucks, trailers, or RVs. Your contractor will give exact guidance for your mix and the weather.",
      },
      {
        q: "How thick should my driveway be?",
        a: "Four inches is common for passenger cars. If you park heavy pickups, trailers, boats, or RVs, ask each contractor to quote 5–6 inches with rebar. That's common for 417 homes on acreage.",
      },
    ],
    partner: defaultPartnerPlan,
    cityContent: {
      "springfield-mo": {
        intro: [
          "Springfield's concrete tells the story of the city. In older neighborhoods like Rountree, Phelps Grove, and Midtown, decades-old driveways and front walks are often narrow, cracked, or heaved by the roots of big shade trees. Across the mid-century ranch neighborhoods on the north and west sides, sunken garage aprons and sidewalks are common: soil settles or washes out underneath, and the Springfield Plateau's karst geology doesn't help.",
          "Whether you're near Missouri State, off Commercial Street, or out in Southern Hills past Battlefield Mall, we'll match you with 2–3 vetted Springfield concrete contractors who know Greene County soils and city requirements. Compare honest prices without getting buried in calls.",
        ],
        considerations: [
          {
            title: "Driveway approaches & city sidewalks",
            body: "Work in the public right-of-way, like the driveway apron where it meets the street or the public sidewalk, often needs a permit from the City of Springfield. Ask each contractor whether permits are included in their quote.",
          },
          {
            title: "Tree roots in established neighborhoods",
            body: "Mature trees in Rountree, Phelps Grove, and Galloway lift and crack slabs. A good quote addresses the roots, for example by rerouting, a root barrier, or a thicker slab with rebar, so the new driveway doesn't crack the same way.",
          },
          {
            title: "Level first, replace second",
            body: "Many sunken Springfield driveways and garage floors are still structurally sound. Ask for a polyjacking quote alongside a replacement quote. Leveling can cost a fraction of the price.",
          },
        ],
        faqs: [
          {
            q: "Do I need a permit to replace my driveway in Springfield, MO?",
            a: "If the work touches the city right-of-way, such as the apron at the street or the public sidewalk, a permit from the City of Springfield is commonly required. Reputable local contractors handle this for you. Confirm it's included when you compare quotes.",
          },
          {
            q: "Why is my Springfield driveway sinking?",
            a: "Usually the soil underneath has settled, washed out, or was never compacted well. Springfield's karst geology and clay soils make this common. Polyjacking injects foam beneath the slab to lift it back into place, usually in a few hours.",
          },
          {
            q: "Do you serve all Springfield ZIP codes?",
            a: "Yes. We match homeowners across 65802, 65803, 65804, 65806, 65807, 65809, and 65810, from the north side near Doling Park to the far south side.",
          },
        ],
      },
      "nixa-mo": {
        intro: [
          "Nixa has grown fast, and many subdivision homes off Tracker Road, Northview, and the Highway 160 corridor were built in the same boom. A common result is settling concrete. Soil backfilled around new foundations is often not compacted well, so a few years later the driveway sinks near the garage, the front walk tilts toward the house, or the back patio pulls away from the foundation.",
          "Nixa homeowners are also adding stamped patios, wider driveways, and extra parking pads. Tell us about your project and we'll connect you with 2–3 vetted local concrete contractors who regularly work in Nixa neighborhoods, with no call-center spam.",
        ],
        considerations: [
          {
            title: "HOA rules on driveway widening",
            body: "Many Nixa subdivisions have HOA covenants covering driveway width, extra parking pads, or decorative finishes. Get approval in writing before you sign any quote.",
          },
          {
            title: "Settling near the garage and foundation",
            body: "If your slab is sinking toward the house, water can run toward your foundation. Polyjacking can lift the slab and restore drainage, often in a single afternoon.",
          },
          {
            title: "Stamped concrete done right",
            body: "Stamped patios look great but need proper sealing to hold up through Ozarks winters. Ask each contractor which sealer they use and how often they recommend resealing.",
          },
        ],
        faqs: [
          {
            q: "Does my Nixa HOA need to approve a new driveway or patio?",
            a: "Often, yes, especially for widening a driveway or adding a parking pad. Check your subdivision's covenants and get approval in writing before work starts.",
          },
          {
            q: "Why is the concrete near my Nixa home's foundation sinking?",
            a: "In many newer subdivisions, the soil backfilled around the foundation wasn't fully compacted and settles over time. Concrete lifting can usually raise the slab and restore drainage away from your house.",
          },
          {
            q: "How quickly can I get concrete quotes in Nixa?",
            a: "Most Nixa homeowners hear from their matched contractors within one business day. In peak season, typically spring through fall, it can take a little longer.",
          },
        ],
      },
      "ozark-mo": {
        intro: [
          "Ozark lives up to its name. Hilly lots near the Finley River, sloped driveways off J Highway and CC, and rocky ground east of Highway 65 make concrete work here more involved than pouring a flat slab in a cornfield. Grading, drainage, and digging through chert all affect the price, so comparing quotes really matters.",
          "Whether you want a new driveway climbing a hillside, a stamped patio overlooking a wooded lot, or a sunken walk near the historic square leveled, we'll match you with 2–3 vetted local concrete contractors who know Christian County terrain.",
        ],
        considerations: [
          {
            title: "Sloped driveways need traction & drainage",
            body: "Steep Ozark driveways get slick in ice storms. Ask about a heavier broom finish, and make sure each quote addresses drainage so water doesn't run under the slab or toward your garage.",
          },
          {
            title: "Rocky ground affects excavation",
            body: "Chert and limestone close to the surface can slow excavation and raise costs. A quote that seems low may not include rock removal, so ask each contractor to spell it out.",
          },
          {
            title: "Shade and moisture near the Finley",
            body: "Wooded, shaded lots stay damp, which can lead to algae and slick surfaces. A quality sealer and good drainage help patios and walks stay safe and clean.",
          },
        ],
        faqs: [
          {
            q: "Is a concrete driveway on a hill more expensive in Ozark?",
            a: "Often it is, because of extra grading, forming, drainage work, and sometimes rock removal. That's why comparing 2–3 quotes from contractors who know Ozark terrain is worth it.",
          },
          {
            q: "Do I need a permit for driveway work in Ozark, MO?",
            a: "Driveway approaches and work in the public right-of-way may need a permit from the City of Ozark. Your contractor should know the current requirements and include them in the quote.",
          },
          {
            q: "Do you match homeowners outside Ozark city limits?",
            a: "Yes. If you're in the 65721 ZIP code or elsewhere nearby in Christian County, we can match you with local pros who serve your area.",
          },
        ],
      },
      "republic-mo": {
        intro: [
          "Republic is one of the fastest-growing cities in Greene County, and its newer neighborhoods along the Highway 60 and 174 corridors are full of homeowners adding on: wider driveways, RV and boat pads, backyard patios, and walkways builders never included. Older ranch homes near downtown are reaching the age where original driveways need replacing.",
          "Whether you're near Republic schools, on the north side, or close to Wilson's Creek National Battlefield, we'll connect you with 2–3 vetted local concrete contractors who know Republic. They'll still be around if something needs fixing.",
        ],
        considerations: [
          {
            title: "RV, boat & trailer pads",
            body: "Heavy vehicles need a thicker slab (often 5–6 inches) with rebar and a well-compacted base. Make sure every quote list thickness and reinforcement so you can compare apples to apples.",
          },
          {
            title: "Clay soils on new-construction lots",
            body: "Disturbed soil on recently built lots can keep settling for years. Proper compaction and base depth matter more here than on established lots.",
          },
          {
            title: "Check city requirements",
            body: "Republic has its own building department. Driveway approaches or added curb cuts may need approval, so your contractor should confirm before pouring.",
          },
        ],
        faqs: [
          {
            q: "How thick should an RV pad be in Republic?",
            a: "Many contractors recommend 5–6 inches of concrete with rebar over a compacted gravel base for RVs and heavy trailers. Ask each of your matched pros to quote the same spec.",
          },
          {
            q: "Do I need a permit to widen my driveway in Republic, MO?",
            a: "Widening at the street or adding a curb cut commonly requires city approval. A reputable local contractor will know the current rules and handle the paperwork.",
          },
          {
            q: "How many contractors will contact me?",
            a: "No more than 3. That's our 3-Quote Max Guarantee: your information is never sold to a list of 5+ companies.",
          },
        ],
      },
      "willard-mo": {
        intro: [
          "Willard concrete projects often go well beyond a front walk. Rural properties along Highway 160 and AB tend to have long driveways, detached shops, barns, and equipment pads, and not every contractor is set up for a 40×60 shop slab or a few hundred feet of driveway. In town, ranch homes and newer subdivisions need the usual driveway, patio, and sidewalk work.",
          "Tell us what you need poured and we'll match you with 2–3 vetted local concrete contractors who serve Willard and northwest Greene County, from the Frisco Highline Trail trailhead out toward Walnut Grove.",
        ],
        considerations: [
          {
            title: "Shop & equipment slabs",
            body: "Shop floors that carry tractors, trucks, or lifts need thicker concrete, rebar, and often a vapor barrier. Mention the slab size and what will park on it in your project note.",
          },
          {
            title: "Long driveways: concrete vs. gravel",
            body: "On acreage, many homeowners pour concrete near the house and garage and keep gravel for the rest. Ask each contractor to price a few options.",
          },
          {
            title: "City vs. county rules",
            body: "Properties inside Willard city limits and in unincorporated Greene County can have different requirements. Your contractor should confirm which apply.",
          },
        ],
        faqs: [
          {
            q: "Can I get quotes for a shop slab and a driveway at the same time?",
            a: "Yes. Mention every project in the optional note on step 4, and your matched contractors can quote everything in one visit.",
          },
          {
            q: "How thick should a shop slab be?",
            a: "It depends on what will sit on it. Many shop slabs are 5–6 inches with rebar, and thicker where lifts or heavy equipment will sit. Ask each contractor to explain their recommended spec.",
          },
          {
            q: "Do you serve rural addresses outside Willard?",
            a: "Yes. If you're in the 65781 ZIP code or nearby northwest Greene County, we can match you with contractors who serve your area.",
          },
        ],
      },
      "battlefield-mo": {
        intro: [
          "Battlefield's established, tree-lined streets off Weaver Road and Highway FF are full of 1970s–1990s homes, and many still have their original concrete. After 30 to 50 years of Ozarks freeze-thaw, those driveways, garage aprons, and front walks are showing it: cracks, sunken sections, trip hazards, and slabs lifted by big oak and maple roots.",
          "Just east of Wilson's Creek National Battlefield, Battlefield homeowners deserve contractors who show up and do it right. We'll match you with 2–3 vetted local pros so you can compare leveling and replacement quotes on your terms.",
        ],
        considerations: [
          {
            title: "Original concrete at the end of its life",
            body: "Concrete from the 1970s–90s often wasn't air-entrained or reinforced the way it is today. If yours is crumbling or badly cracked, replacement may beat repeated patching.",
          },
          {
            title: "Trip hazards on walks & steps",
            body: "Sunken sidewalk panels and porch steps are a fall risk. Polyjacking can often bring panels back to level in a few hours, without tearing anything out.",
          },
          {
            title: "Mature trees vs. new slabs",
            body: "If roots caused the damage, make sure each quote explains how they'll keep it from happening again.",
          },
        ],
        faqs: [
          {
            q: "My Battlefield driveway is 40 years old. Repair or replace?",
            a: "If it's sunken but mostly intact, leveling may buy many more years. If it's scaling, crumbling, or cracked into many pieces, replacement usually makes more sense. Ask for both options when your pros visit.",
          },
          {
            q: "Can sunken sidewalk panels be fixed without replacing them?",
            a: "Often, yes. Polyjacking lifts panels back to level through small holes, and the area is usually walkable the same day.",
          },
          {
            q: "Is your service really free for Battlefield homeowners?",
            a: "Yes, 100% free. Our local partner contractors pay us; you never pay us anything and you're never obligated to hire.",
          },
        ],
      },
      "rogersville-mo": {
        intro: [
          "Rogersville homeowners east of Springfield often have more than a driveway to think about. Shops, barns, detached garages, and equipment pads on acreage along US-60 and Highway 125 all need solid concrete. Newer subdivisions near the Logan-Rogersville schools are adding patios, walks, and parking pads too.",
          "Whether you're in town or out toward Fordland, we'll match you with 2–3 vetted local concrete contractors who regularly work in Webster and eastern Greene County. One simple request, honest quotes, and no spam calls.",
        ],
        considerations: [
          {
            title: "Webster vs. Greene County",
            body: "Rogersville straddles county lines, and city vs. unincorporated properties can have different requirements. Your contractor should know which apply to your address.",
          },
          {
            title: "Heavy-duty slabs for rural use",
            body: "Trucks, trailers, and farm equipment need thicker, reinforced concrete. Tell us what will park on the slab so we can match you with the right crews.",
          },
          {
            title: "Contractors who actually make the drive",
            body: "Some Springfield-based crews skip jobs out east during busy season. We only match you with pros who serve your ZIP code.",
          },
        ],
        faqs: [
          {
            q: "Do concrete contractors actually come out to Rogersville?",
            a: "Yes. We only match you with contractors who serve your ZIP code, so you won't be passed to someone who considers 65742 too far away.",
          },
          {
            q: "Can I get one quote for a shop slab, driveway, and patio?",
            a: "Absolutely. List each project in your note and your matched contractors can quote them together. Bundling often lowers the price.",
          },
          {
            q: "Do I need a permit in Rogersville?",
            a: "It depends on whether your property is inside city limits and which county it's in. Your matched contractor will confirm the requirements for your address.",
          },
        ],
      },
    },
  },

  /* ── Example 2nd trade (disabled). Flip `enabled` to true to launch it. ──
     With no cityContent, its city pages use the localized fallback templates. */
  {
    slug: "roofing",
    enabled: false,
    name: "Roofing",
    proSingular: "roofer",
    proPlural: "roofers",
    subject: "roof",
    serviceType: "Roofing contractor referral",
    shortDescription: "Roof replacement, storm & hail damage, leak repair, and gutters.",
    notePlaceholder: "e.g. Hail last spring, some missing shingles on the north side",
    projectTypes: [
      { id: "replacement", label: "Full Roof Replacement", description: "Tear-off & new roof", icon: "home" },
      { id: "repair", label: "Leak or Roof Repair", description: "Missing shingles, leaks, flashing", icon: "wrench" },
      { id: "storm", label: "Hail / Storm Damage", description: "Inspection & insurance claim help", icon: "storm" },
      { id: "gutters", label: "Gutters & Downspouts", description: "New, repair, or guards", icon: "droplet" },
    ],
    localConsiderations: [
      {
        title: "Hail is the #1 roof killer in the 417",
        body: "Southwest Missouri sits in an active hail corridor, and spring storms routinely bruise shingles without obvious leaks. A local roofer can document damage for your insurance adjuster.",
      },
      {
        title: "Beware of storm chasers",
        body: "After big hailstorms, out-of-state crews flood Greene and Christian Counties. Every pro we match you with is an established local company.",
      },
    ],
    faqs: [
      {
        q: "Will the roofers help with my insurance claim?",
        a: "Most established 417 roofers know local adjusters and can document damage with photos and measurements. Never sign over insurance proceeds without reading the contract carefully.",
      },
    ],
    partner: defaultPartnerPlan,
    cityContent: {},
  },
];

export const activeTrades = trades.filter((t) => t.enabled);
export const tradeBySlug = (slug: string) => activeTrades.find((t) => t.slug === slug);
