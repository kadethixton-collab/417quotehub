/**
 * ───────────────────────────────────────────────────────────────────────────
 *  TRADE CONFIG — the single file you edit to launch a new trade category.
 * ───────────────────────────────────────────────────────────────────────────
 * To add a 2nd or 3rd trade:
 *   1. Copy the `hvac` example below (or the roofing entry), give it a new slug.
 *   2. Fill in project types, FAQs, local considerations, and partner pricing.
 *   3. Set `enabled: true`.
 * That's it. The site automatically generates:
 *   - /services/[city]/[trade] landing pages for all 7 cities
 *   - sitemap entries, JSON-LD, and a trade selector on the contractor application
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

export type Trade = {
  slug: string;
  enabled: boolean;
  /** "Roofing" — used in "417 Roofing Pros". */
  name: string;
  /** "roofer" / "roofers" — used in body copy. */
  proSingular: string;
  proPlural: string;
  /** "roof" — the thing being worked on, used in body copy. */
  subject: string;
  /** Schema.org serviceType for JSON-LD. */
  serviceType: string;
  /** Exactly 4 project types. "Other" is appended automatically in the form. */
  projectTypes: ProjectType[];
  shortDescription: string;
  /** Southwest-Missouri-specific considerations for this trade (used on every city page). */
  localConsiderations: Consideration[];
  /** Trade-specific FAQs shown on the homepage alongside the general ones. */
  faqs: FAQ[];
  partner: {
    monthlyPrice: number;
    seatsTotal: number;
    seatsOpen: number;
    /** e.g. "8–15 exclusive-to-2 requests per month" — keep honest. */
    leadEstimate: string;
  };
  cityContent: Partial<Record<string, CityTradeContent>>;
};

export const trades: Trade[] = [
  {
    slug: "roofing",
    enabled: true,
    name: "Roofing",
    proSingular: "roofer",
    proPlural: "roofers",
    subject: "roof",
    serviceType: "Roofing contractor referral",
    shortDescription: "Roof replacement, storm & hail damage, leak repair, and gutters.",
    projectTypes: [
      { id: "replacement", label: "Full Roof Replacement", description: "Tear-off & new roof", icon: "home" },
      { id: "repair", label: "Leak or Roof Repair", description: "Missing shingles, leaks, flashing", icon: "wrench" },
      { id: "storm", label: "Hail / Storm Damage", description: "Inspection & insurance claim help", icon: "storm" },
      { id: "gutters", label: "Gutters & Downspouts", description: "New, repair, or guards", icon: "droplet" },
    ],
    localConsiderations: [
      {
        title: "Hail is the #1 roof killer in the 417",
        body: "Southwest Missouri sits in one of the most active hail corridors in the country, and spring storms routinely bruise shingles without obvious leaks. A vetted local roofer can document hail damage for your insurance adjuster before small bruises turn into big leaks.",
      },
      {
        title: "Ask about Class 4 impact-resistant shingles",
        body: "Many Missouri insurers offer premium discounts for UL 2218 Class 4 impact-rated shingles. When you compare your 2 quotes, ask each roofer to price both a standard architectural shingle and a Class 4 option.",
      },
      {
        title: "Freeze-thaw and ice dams",
        body: "Ozarks winters bounce above and below freezing constantly, and ice storms like the one that crippled Springfield in 2007 can load gutters and eaves. Proper ice-and-water shield along eaves and valleys matters here more than many homeowners realize.",
      },
      {
        title: "Beware of storm chasers",
        body: "After every major hailstorm, out-of-state crews flood Greene and Christian Counties. They're often gone before warranty issues show up. Every pro we match you with is a local, established company — not a crew that leaves when the storm season ends.",
      },
    ],
    faqs: [
      {
        q: "How do I know if my roof has hail damage?",
        a: "Hail damage often isn't visible from the ground. Look for dented gutters, downspouts, or AC fins after a storm — that's a good sign your shingles took hits too. Either of your 2 matched roofers can do an inspection and tell you whether it's worth filing a claim.",
      },
      {
        q: "Will the roofers help with my insurance claim?",
        a: "Most established 417 roofers are very familiar with local adjusters and can document damage with photos and measurements. You are always in control of your claim — never sign over your insurance proceeds without reading the contract carefully.",
      },
    ],
    partner: {
      monthlyPrice: 497,
      seatsTotal: 2,
      seatsOpen: 2,
      leadEstimate: "a steady flow of exclusive-to-2 homeowner requests every month",
    },
    cityContent: {
      "springfield-mo": {
        intro: [
          "Springfield's roofs tell the story of the city itself. The 1920s bungalows and Tudors in Rountree, Phelps Grove, and Midtown often have steep pitches, multiple layers of old shingles, and original wood decking that needs to be inspected (and sometimes replaced) during a tear-off. Out on the south side past Battlefield Mall, newer homes tend to have complex rooflines with lots of valleys — great looking, but more places for water to sneak in.",
          "Whether you're near Missouri State University, off Commercial Street, or in Southern Hills, we'll match you with up to 2 vetted Springfield roofers who know Greene County weather and local code requirements — so you can compare honest prices without getting buried in calls.",
        ],
        considerations: [
          {
            title: "Historic districts may need extra review",
            body: "If you live in one of Springfield's designated historic districts (like Walnut Street or parts of Midtown), visible exterior changes may require review before work begins. A local roofer will know whether your project needs it.",
          },
          {
            title: "Multiple shingle layers on older homes",
            body: "Many older Springfield homes have two (or more) layers of shingles. Building codes generally limit how many layers are allowed, so a full tear-off is often required. Make sure both quotes spell out tear-off, disposal, and decking replacement costs.",
          },
          {
            title: "Permits through the City of Springfield",
            body: "Roof replacements inside city limits typically go through Building Development Services. Ask each roofer whether permit fees are included in their quote.",
          },
        ],
        faqs: [
          {
            q: "Do I need a permit to replace my roof in Springfield, MO?",
            a: "In many cases, yes — roof replacements in Springfield city limits generally require a permit through Building Development Services. Reputable local roofers pull the permit for you. Confirm it's included when comparing your 2 quotes.",
          },
          {
            q: "How long does a roof replacement take in Springfield?",
            a: "A typical single-family roof replacement takes 1–3 days once materials are delivered. After a major hailstorm, demand spikes across Springfield and lead times can stretch to several weeks — another reason to get matched early.",
          },
          {
            q: "Do you serve all Springfield ZIP codes?",
            a: "Yes. We match homeowners across 65802, 65803, 65804, 65806, 65807, 65809, and 65810 — from the north side near Doling Park to the far south side.",
          },
        ],
      },
      "nixa-mo": {
        intro: [
          "Nixa has grown fast, and a lot of the roofs on subdivision homes off Tracker Road, Northview, and the Highway 160 corridor were installed in the same building boom. That means many neighborhoods are hitting the 15–25 year mark at the same time — right when builder-grade 3-tab shingles start to curl, crack, and lose granules.",
          "Add Christian County's spring hail storms to the mix and it's no surprise that roofing is one of the most-requested projects in Nixa. Tell us about your roof and we'll connect you with up to 2 vetted local roofers who regularly work in Nixa neighborhoods — no call-center spam.",
        ],
        considerations: [
          {
            title: "HOA approval on shingle colors",
            body: "Many Nixa subdivisions have HOA covenants that restrict shingle color or style. Check with your HOA before you sign, and ask both roofers if they can provide sample boards for approval.",
          },
          {
            title: "Builder-grade roofs aging out together",
            body: "If your neighbors are getting new roofs, there's a good chance yours was installed in the same era. A free inspection from a local pro can tell you how much life you have left.",
          },
          {
            title: "Wind exposure on open lots",
            body: "Newer Nixa subdivisions often have fewer mature trees, which means more wind exposure. Ask about high-wind-rated shingles and proper starter strip installation.",
          },
        ],
        faqs: [
          {
            q: "Does my Nixa HOA need to approve my new roof?",
            a: "It depends on your subdivision's covenants, but many Nixa HOAs do require approval for shingle color and style. Get approval in writing before work starts — either of your matched roofers can help with sample colors.",
          },
          {
            q: "Do roofers in Nixa need a permit?",
            a: "Roofing work inside Nixa city limits may require a permit through the City of Nixa. Your roofer should know the current requirements and include any permit costs in their quote.",
          },
          {
            q: "How quickly can I get a quote in Nixa?",
            a: "Most Nixa homeowners hear from their matched roofers within one business day. After big storms, response times can be a bit longer as demand spikes.",
          },
        ],
      },
      "ozark-mo": {
        intro: [
          "Ozark offers a little of everything when it comes to roofs: historic homes around the square, wooded lots along the Finley River, and plenty of 2000s-era subdivisions east of Highway 65. Each comes with different challenges — from fragile older decking to tree debris clogging valleys and gutters.",
          "Whether you're near Finley River Park, off J Highway, or out along CC, we'll match you with up to 2 vetted local roofers who know Christian County's weather and building requirements. One request, two honest quotes, zero spam.",
        ],
        considerations: [
          {
            title: "Tree cover and moss near the Finley",
            body: "Homes on wooded lots near the Finley River stay shaded and damp, which can lead to moss, algae streaking, and clogged valleys. Ask about algae-resistant shingles and gutter guards.",
          },
          {
            title: "Older decking around the square",
            body: "Older homes near the historic square may have plank decking or damage hidden under several layers of shingles. Make sure each quote lists a per-sheet price for any decking replacement.",
          },
          {
            title: "Christian County storm season",
            body: "Spring hail and summer straight-line winds hit Ozark hard. A local roofer can inspect after a storm and help you understand whether an insurance claim makes sense.",
          },
        ],
        faqs: [
          {
            q: "Do I need a building permit for a new roof in Ozark, MO?",
            a: "Roofing projects inside Ozark city limits may require a permit through the City of Ozark. Reputable local roofers handle this for you — ask whether it's included when you compare quotes.",
          },
          {
            q: "My house is surrounded by trees. What should I ask roofers?",
            a: "Ask about algae-resistant shingles, gutter guards, and whether they recommend trimming overhanging branches before installation. Tree-heavy lots along the Finley benefit from all three.",
          },
          {
            q: "Do you match homeowners outside Ozark city limits?",
            a: "Yes — if you're in the 65721 ZIP code or elsewhere in Christian County, we can match you with local pros who serve your area.",
          },
        ],
      },
      "republic-mo": {
        intro: [
          "Republic is one of the fastest-growing cities in Greene County, and many homes along the Highway 60 and 174 corridors sit on open, wind-exposed lots with few mature trees to break up a storm. When hail and straight-line winds roll across the prairie west of Springfield, Republic roofs often take the brunt of it.",
          "From newer north-side subdivisions to older ranch homes near downtown and the neighborhoods around Wilson's Creek National Battlefield, we'll connect you with up to 2 vetted local roofers who know Republic — and who won't disappear after the storm season ends.",
        ],
        considerations: [
          {
            title: "Wind-rated installation matters here",
            body: "Open lots mean higher wind exposure. Ask both roofers about high-wind shingle ratings, nailing patterns, and whether their installation qualifies for the manufacturer's enhanced wind warranty.",
          },
          {
            title: "Storm chasers target growing towns",
            body: "After major storms, door-knockers often canvass newer Republic subdivisions. Stick with established local companies who'll be around to honor their workmanship warranty.",
          },
          {
            title: "Check permit requirements with the city",
            body: "Republic has its own building department. Your roofer should confirm whether a permit is required and include it in the quote.",
          },
        ],
        faqs: [
          {
            q: "Why do Republic roofs seem to get more storm damage?",
            a: "Many Republic neighborhoods are newer and sit on open ground with fewer mature trees to block wind and hail. That exposure makes quality installation and impact-resistant shingles especially valuable.",
          },
          {
            q: "Do I need a roofing permit in Republic, MO?",
            a: "Roof replacements in Republic city limits may require a permit. A reputable local roofer will know the current rules and pull any required permits for you.",
          },
          {
            q: "How many roofers will contact me?",
            a: "No more than 2. That's our 2-Quote Guarantee — your information is never sold to a list of 5+ companies.",
          },
        ],
      },
      "willard-mo": {
        intro: [
          "Willard roofs range from small-town ranch homes in town to rural properties with barns, shops, and outbuildings along Highway 160 and AB. Many homeowners here want quotes that cover more than just the house — and not every roofer is set up for metal roofing on a pole barn or a detached shop.",
          "Tell us what you need roofed and we'll match you with up to 2 vetted local roofers who serve Willard and northwest Greene County, from the Frisco Highline Trail trailhead out toward Walnut Grove. Two honest quotes, no spam calls.",
        ],
        considerations: [
          {
            title: "Outbuildings and metal roofing",
            body: "If you have a barn, shop, or detached garage, mention it in your project notes. We'll prioritize matching you with roofers who handle both shingles and metal.",
          },
          {
            title: "City vs. county rules",
            body: "Properties inside Willard city limits and those in unincorporated Greene County can have different permit requirements. Your roofer should confirm which applies.",
          },
          {
            title: "Exposure on rural lots",
            body: "Open acreage means more wind and hail exposure. Ask about impact-resistant shingles or metal roofing, which many Missouri insurers reward with discounts.",
          },
        ],
        faqs: [
          {
            q: "Can I get quotes for my house and my shop at the same time?",
            a: "Yes. Just mention every structure in the optional project note on step 4. Your 2 matched roofers can quote everything in one visit.",
          },
          {
            q: "Is metal roofing a good idea in Willard?",
            a: "Metal roofing is popular on rural 417 properties because of its long lifespan and storm resistance. Ask both roofers to price metal alongside architectural shingles so you can compare.",
          },
          {
            q: "Do you serve rural addresses outside Willard?",
            a: "Yes. If you're in the 65781 ZIP code or nearby northwest Greene County, we can match you with local roofers who serve your area.",
          },
        ],
      },
      "battlefield-mo": {
        intro: [
          "Battlefield is known for its established, tree-lined streets off Weaver Road and Highway FF — and those mature oaks and maples are beautiful until they drop limbs on your roof or pack your gutters with leaves every fall. Many homes here were built in the 1970s through 1990s and are on their second or third roof.",
          "Just east of Wilson's Creek National Battlefield, Battlefield homeowners deserve local roofers who show up, do it right, and don't hand your number to a call center. We'll match you with up to 2 vetted pros so you can compare quotes on your terms.",
        ],
        considerations: [
          {
            title: "Mature trees = more roof wear",
            body: "Overhanging branches scrape shingles, drop debris, and keep roofs damp. Ask each roofer whether they recommend trimming and gutter guards as part of your project.",
          },
          {
            title: "Ventilation on older ranch homes",
            body: "Many 1970s–1990s Battlefield homes were built with minimal attic ventilation, which shortens shingle life. A good quote will address ridge vents and intake ventilation — not just shingles.",
          },
          {
            title: "Second and third roofs",
            body: "If your home has had a layover in the past, expect a full tear-off this time. Make sure both quotes include disposal and any decking repair pricing.",
          },
        ],
        faqs: [
          {
            q: "My Battlefield home is surrounded by big trees. Will that affect my quote?",
            a: "Possibly. Heavy tree cover can mean extra cleanup, protective tarps, and recommended gutter guards. Ask both roofers to itemize so you can compare apples to apples.",
          },
          {
            q: "Why does attic ventilation matter for my new roof?",
            a: "Poor ventilation traps heat and moisture in the attic, which can void shingle warranties and shorten roof life. Many older Battlefield homes benefit from added ridge and soffit vents during replacement.",
          },
          {
            q: "Is your service really free for Battlefield homeowners?",
            a: "Yes, 100% free. Our local partner contractors pay a flat membership fee — you never pay us anything.",
          },
        ],
      },
      "rogersville-mo": {
        intro: [
          "Rogersville homeowners east of Springfield often have more than a house to think about — detached garages, shops, and barns on acreage along US-60 and Highway 125 all need solid roofs too. And newer subdivisions near Logan-Rogersville schools are starting to age into their first round of roof replacements.",
          "Whether you're in town or out toward Fordland, we'll match you with up to 2 vetted local roofers who regularly work in Webster and eastern Greene County. One simple request. Two honest quotes. No spam calls.",
        ],
        considerations: [
          {
            title: "Webster vs. Greene County",
            body: "Rogersville straddles county lines, and properties in city limits vs. unincorporated areas may have different permit rules. Your roofer should know which applies to your address.",
          },
          {
            title: "Multiple structures on acreage",
            body: "Mention shops, barns, or detached garages in your project note so your matched roofers can quote everything in a single trip.",
          },
          {
            title: "Longer drive times after storms",
            body: "After major storms, some Springfield-based crews prioritize closer jobs. We match you with pros who actively serve the Rogersville area.",
          },
        ],
        faqs: [
          {
            q: "Do roofers actually come out to Rogersville?",
            a: "Yes. We only match you with roofers who serve your ZIP code, so you won't be passed to someone who considers 65742 too far away.",
          },
          {
            q: "Can I get a metal roof quote for my barn or shop?",
            a: "Absolutely. Mention it in your project note and we'll prioritize roofers who handle metal roofing on outbuildings.",
          },
          {
            q: "Do I need a permit in Rogersville?",
            a: "It depends on whether your property is inside city limits and which county it's in. Your matched roofer will confirm the requirements for your address.",
          },
        ],
      },
    },
  },

  /* ── Example 2nd trade (disabled). Flip `enabled` to true to launch it. ── */
  {
    slug: "hvac",
    enabled: false,
    name: "HVAC",
    proSingular: "HVAC contractor",
    proPlural: "HVAC contractors",
    subject: "heating & cooling system",
    serviceType: "HVAC contractor referral",
    shortDescription: "AC replacement, furnace installs, heat pumps, and repairs.",
    projectTypes: [
      { id: "ac", label: "AC Repair or Replace", description: "Not cooling, old unit", icon: "snowflake" },
      { id: "furnace", label: "Furnace / Heating", description: "Repair or new furnace", icon: "flame" },
      { id: "heat-pump", label: "Heat Pump", description: "New install or upgrade", icon: "fan" },
      { id: "tuneup", label: "Tune-Up / Inspection", description: "Seasonal maintenance", icon: "search" },
    ],
    localConsiderations: [
      {
        title: "Humid Ozarks summers",
        body: "Southwest Missouri summers are hot and humid, so proper sizing and dehumidification matter as much as raw cooling power.",
      },
      {
        title: "Heat pumps and Missouri winters",
        body: "Modern cold-climate heat pumps handle most Ozarks winters well, often with a gas or electric backup for the coldest nights.",
      },
    ],
    faqs: [
      {
        q: "Should I repair or replace my AC?",
        a: "If your system is 12–15+ years old or needs a major repair, replacement often makes more sense. Your 2 matched pros can give you both options.",
      },
    ],
    partner: { monthlyPrice: 497, seatsTotal: 2, seatsOpen: 2, leadEstimate: "a steady flow of exclusive-to-2 homeowner requests every month" },
    cityContent: {},
  },
];

export const activeTrades = trades.filter((t) => t.enabled);
export const tradeBySlug = (slug: string) => activeTrades.find((t) => t.slug === slug);
