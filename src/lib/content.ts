import { site } from "@/config/site";
import { cities, type City } from "@/config/cities";
import { activeTrades, tradeBySlug, type CityTradeContent, type FAQ, type Trade } from "@/config/trades";

export function getPrimaryTrade(): Trade {
  const t = tradeBySlug(site.primaryTradeSlug) ?? activeTrades[0];
  if (!t) throw new Error("No enabled trades in src/config/trades.ts");
  return t;
}

/** URL for a city landing page. The primary trade lives at /services/[city]. */
export function cityHref(city: City, trade: Trade = getPrimaryTrade()) {
  return trade.slug === site.primaryTradeSlug
    ? `/services/${city.slug}`
    : `/services/${city.slug}/${trade.slug}`;
}

const listify = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;

/** Custom city copy for a trade, or a localized template when none exists yet. */
export function cityTradeContent(trade: Trade, city: City): CityTradeContent {
  const custom = trade.cityContent[city.slug];
  if (custom) return custom;

  return {
    intro: [
      `${city.name} homes include ${city.housingNote}. Each comes with its own ${trade.subject} challenges, and Southwest Missouri's hot, humid summers, heavy spring rains, and freeze-thaw winters put every project to the test.`,
      `Whether you live in ${listify(city.neighborhoods.slice(0, 3))}, we'll match you with ${site.quoteRange} vetted local ${trade.proPlural} who regularly work in ${city.name} and ${city.county} — so you can compare honest quotes without getting buried in spam calls.`,
    ],
    considerations: [
      {
        title: `Permits in ${city.name}`,
        body: `Many ${trade.subject} projects require a permit through ${city.permitAuthority}. Ask both ${trade.proPlural} whether permit fees are included in their quote.`,
      },
      {
        title: `Local pros who know ${city.county}`,
        body: `Every ${trade.proSingular} we match you with is an established local company that serves ${city.name} — not an out-of-town crew that disappears after the job.`,
      },
    ],
    faqs: [
      {
        q: `Do you serve all of ${city.name}, MO?`,
        a: `Yes. We match homeowners in ${city.zips.join(", ")} and surrounding areas of ${city.county} with local ${trade.proPlural}.`,
      },
      {
        q: `Do I need a permit for ${trade.name.toLowerCase()} work in ${city.name}?`,
        a: `It depends on the scope. Check with ${city.permitAuthority}, or ask your matched ${trade.proPlural} — reputable local pros pull required permits for you.`,
      },
    ],
  };
}

export function generalFaqs(trade: Trade): FAQ[] {
  return [
    {
      q: "Is it really free?",
      a: `Yes — 100% free for homeowners, with no obligation to hire anyone. ${site.name} is paid by our local partner contractors, through a flat monthly retainer. You'll never pay us a dime.`,
    },
    {
      q: "Will my phone get spammed?",
      a: `No. That's the whole point. With our ${site.guaranteeName}, your request goes to a maximum of ${site.maxQuotes} vetted local ${trade.proPlural} — never sold to a list of 5+ companies or a national call center. We don't sell your information.`,
    },
    {
      q: "Are the contractors licensed & insured?",
      a: `Missouri doesn't issue a statewide license for most home trades, so licensing is handled at the city and county level. Before a contractor can join our network, we check that they hold any locally required licenses or registrations, carry general liability insurance, and have an established local track record. We still recommend asking for a current certificate of insurance before you hire anyone.`,
    },
    {
      q: "How fast will I hear back?",
      a: `Most homeowners hear from their matched ${trade.proPlural} within one business day — often the same day. In peak season, typically spring through fall, it can take a little longer.`,
    },
    {
      q: `Are you the company doing the ${trade.name.toLowerCase()} work?`,
      a: `No. ${site.name} is a free local matching service. The independent contractors we connect you with provide their own quotes, contracts, and warranties. You choose who (if anyone) to hire.`,
    },
    ...trade.faqs,
  ];
}

export { cities, activeTrades };
