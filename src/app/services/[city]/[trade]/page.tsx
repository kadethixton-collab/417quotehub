import { notFound } from "next/navigation";
import CityLanding, { cityMetadata } from "@/components/CityLanding";
import { cities, cityBySlug } from "@/config/cities";
import { activeTrades, tradeBySlug } from "@/config/trades";
import { site } from "@/config/site";

/**
 * Additional trades get pages at /services/[city]/[trade].
 * The primary trade (site.primaryTradeSlug) lives at /services/[city].
 */
type Props = { params: Promise<{ city: string; trade: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const secondary = activeTrades.filter((t) => t.slug !== site.primaryTradeSlug);
  const params = secondary.flatMap((t) => cities.map((c) => ({ city: c.slug, trade: t.slug })));
  // Next requires at least one param when dynamicParams is false; this placeholder 404s.
  return params.length ? params : [{ city: cities[0].slug, trade: "__none__" }];
}

async function resolve(params: Props["params"]) {
  const p = await params;
  const city = cityBySlug(p.city);
  const trade = tradeBySlug(p.trade);
  if (!city || !trade || trade.slug === site.primaryTradeSlug) return null;
  return { city, trade };
}

export async function generateMetadata({ params }: Props) {
  const r = await resolve(params);
  return r ? cityMetadata(r.trade, r.city) : {};
}

export default async function CityTradePage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  return <CityLanding trade={r.trade} city={r.city} />;
}
