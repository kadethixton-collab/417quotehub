import { notFound } from "next/navigation";
import CityLanding, { cityMetadata } from "@/components/CityLanding";
import { cities, cityBySlug } from "@/config/cities";
import { getPrimaryTrade } from "@/lib/content";

type Props = { params: Promise<{ city: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const city = cityBySlug((await params).city);
  return city ? cityMetadata(getPrimaryTrade(), city) : {};
}

export default async function CityPage({ params }: Props) {
  const city = cityBySlug((await params).city);
  if (!city) notFound();
  return <CityLanding trade={getPrimaryTrade()} city={city} />;
}
