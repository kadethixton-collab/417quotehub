import { notFound } from "next/navigation";
import CityLanding, { cityMetadata } from "@/components/CityLanding";
import ServiceLanding, { serviceMetadata } from "@/components/ServiceLanding";
import { cities, cityBySlug } from "@/config/cities";
import { activeTrades, tradeBySlug } from "@/config/trades";
import { site } from "@/config/site";
import { findService } from "@/lib/content";

/**
 * /services/[city]/[slug] serves two kinds of pages:
 *   - a service page, e.g. /services/nixa-mo/concrete-driveways (every project type × city)
 *   - a trade hub for non-primary trades, e.g. /services/nixa-mo/roofing
 * The primary trade's hub lives at /services/[city].
 */
type Props = { params: Promise<{ city: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const slugs = [
    ...activeTrades.filter((t) => t.slug !== site.primaryTradeSlug).map((t) => t.slug),
    ...activeTrades.flatMap((t) => t.projectTypes.map((p) => p.slug)),
  ];
  const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
  if (dupes.length) throw new Error(`Duplicate service/trade slugs in trades.ts: ${dupes.join(", ")}`);
  return cities.flatMap((c) => slugs.map((slug) => ({ city: c.slug, slug })));
}

async function resolve(params: Props["params"]) {
  const p = await params;
  const city = cityBySlug(p.city);
  if (!city) return null;
  const service = findService(p.slug);
  if (service) return { kind: "service" as const, city, ...service };
  const trade = tradeBySlug(p.slug);
  if (trade && trade.slug !== site.primaryTradeSlug) return { kind: "trade" as const, city, trade };
  return null;
}

export async function generateMetadata({ params }: Props) {
  const r = await resolve(params);
  if (!r) return {};
  return r.kind === "service" ? serviceMetadata(r.trade, r.service, r.city) : cityMetadata(r.trade, r.city);
}

export default async function CitySlugPage({ params }: Props) {
  const r = await resolve(params);
  if (!r) notFound();
  return r.kind === "service" ? (
    <ServiceLanding trade={r.trade} service={r.service} city={r.city} />
  ) : (
    <CityLanding trade={r.trade} city={r.city} />
  );
}
