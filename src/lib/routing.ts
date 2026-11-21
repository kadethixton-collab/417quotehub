import { site } from "@/config/site";
import { cities, territories, type City } from "@/config/cities";
import { partners, type Partner } from "@/config/partners";
import type { Trade } from "@/config/trades";

/** Resolve the homeowner's city from the chosen city slug, falling back to ZIP lookup. */
export function resolveCity(citySlug: string, zip: string): City | undefined {
  return cities.find((c) => c.slug === citySlug) ?? cities.find((c) => c.zips.includes(zip));
}

const activePartners = (tradeSlug: string) => partners.filter((p) => p.active && p.trade === tradeSlug);

/** Up to site.maxQuotes active partners holding a seat in this trade + territory. */
export function matchPartners(tradeSlug: string, territory: string | undefined): Partner[] {
  if (!territory) return [];
  return activePartners(tradeSlug)
    .filter((p) => p.territories.includes(territory))
    .sort((a, b) => (a.priority ?? 100) - (b.priority ?? 100))
    .slice(0, site.maxQuotes);
}

export type SeatInfo = {
  territory: string;
  name: string;
  cities: string[];
  total: number;
  taken: number;
  open: number;
  price: number;
};

/** Seat availability per territory for a trade, derived from partners.ts. */
export function seatAvailability(trade: Trade): SeatInfo[] {
  const ap = activePartners(trade.slug);
  return territories.map((t) => {
    const taken = ap.filter((p) => p.territories.includes(t.slug)).length;
    const total = trade.partner.seatsPerTerritory;
    return {
      territory: t.slug,
      name: t.name,
      cities: cities.filter((c) => c.territory === t.slug).map((c) => c.name),
      total,
      taken: Math.min(taken, total),
      open: Math.max(total - taken, 0),
      price: trade.partner.territoryPrices?.[t.slug] ?? trade.partner.monthlyPrice,
    };
  });
}
