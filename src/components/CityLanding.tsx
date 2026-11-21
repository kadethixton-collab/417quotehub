import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { cities, type City } from "@/config/cities";
import type { Trade } from "@/config/trades";
import { cityHref, cityTradeContent, generalFaqs } from "@/lib/content";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import ServiceAreaGrid from "./ServiceAreaGrid";
import FAQ from "./FAQ";
import CtaBand from "./CtaBand";
import MobileCtaBar from "./MobileCtaBar";
import JsonLd from "./JsonLd";
import ServicesGrid from "./ServicesGrid";
import { Icon } from "./Icons";

export function cityMetadata(trade: Trade, city: City): Metadata {
  const title = `${trade.name} Quotes in ${city.name}, MO — Compare ${site.quoteRange} Local Pros`;
  const description = `Get ${site.quoteRange} free ${trade.name.toLowerCase()} quotes from vetted ${city.name}, MO ${trade.proPlural}. Serving ${city.neighborhoods
    .slice(0, 2)
    .join(" & ")} and all of ${city.zips.join(", ")}. No spam calls — ${site.maxQuotes} pros max.`;
  const path = cityHref(city, trade);
  return {
    title: { absolute: `${title} | ${site.name}` },
    description: description.length > 160 ? description.slice(0, 157).replace(/\s+\S*$/, "") + "…" : description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, type: "website" },
    other: { "geo.region": "US-MO", "geo.placename": `${city.name}, Missouri` },
  };
}

export default function CityLanding({ trade, city }: { trade: Trade; city: City }) {
  const content = cityTradeContent(trade, city);
  const url = `${site.url}${cityHref(city, trade)}`;
  const faqs = [...content.faqs, ...generalFaqs(trade).slice(0, 3)];
  const nearby = cities.filter((c) => c.slug !== city.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": `${url}#business`,
      name: `${site.name} — ${city.name} ${trade.name} Quotes`,
      description: `Free ${trade.name.toLowerCase()} contractor matching service for homeowners in ${city.name}, Missouri. We connect homeowners with up to ${site.maxQuotes} independent local contractors.`,
      url,
      email: site.email,
      priceRange: "Free for homeowners",
      address: { "@type": "PostalAddress", addressLocality: city.name, addressRegion: site.state, postalCode: city.zips[0], addressCountry: "US" },
      geo: { "@type": "GeoCoordinates", latitude: city.geo.lat, longitude: city.geo.lng },
      areaServed: { "@type": "City", name: `${city.name}, MO`, containedInPlace: { "@type": "AdministrativeArea", name: `${city.county}, Missouri` } },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${trade.name} Quote Matching in ${city.name}, MO`,
      serviceType: trade.serviceType,
      provider: { "@id": `${url}#business` },
      areaServed: city.zips.map((z) => ({ "@type": "PostalCodeRangeSpecification", postalCodeBegin: z, postalCodeEnd: z, addressCountry: "US" })),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: `Up to ${site.maxQuotes} free quotes from local ${trade.proPlural}` },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${trade.name} projects`,
        itemListElement: trade.projectTypes.map((p) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: p.label } })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: `${site.url}/services` },
        { "@type": "ListItem", position: 3, name: `${city.name}, MO`, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        trade={trade}
        defaultCity={city.slug}
        eyebrow={
          <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-white">Service Areas</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">{city.name}, MO</li>
            </ol>
          </nav>
        }
        headline={
          <>
            Compare {site.quoteRange} Free {trade.name} Quotes in {city.name}, MO —{" "}
            <span className="text-accent-400">Zero Spam Calls</span>
          </>
        }
        subheadline={
          <>
            Vetted local {trade.proPlural} serving {city.neighborhoods[0]} and all of {city.name}. One request,{" "}
            {site.maxQuotes} pros max.
          </>
        }
      />

      <ServicesGrid trade={trade} city={city} />

      {/* Local intro */}
      <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="local-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{city.county}</p>
            <h2 id="local-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              Local {trade.name} Pros Who Know {city.name}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-700">
              {content.intro.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
          </div>
          <aside className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
            <h3 className="font-bold text-slate-900">Areas we serve in {city.name}</h3>
            <ul className="mt-3 space-y-1.5 text-slate-700">
              {city.neighborhoods.map((n) => (
                <li key={n} className="flex gap-2"><Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{n}</li>
              ))}
            </ul>
            <h3 className="mt-6 font-bold text-slate-900">Near local landmarks</h3>
            <p className="mt-2 text-slate-700">{city.landmarks.join(" · ")}</p>
            <h3 className="mt-6 font-bold text-slate-900">ZIP codes</h3>
            <p className="mt-2 text-slate-700">{city.zips.join(", ")}</p>
          </aside>
        </div>
      </section>

      {/* Considerations */}
      <section className="bg-white py-16 sm:py-20" aria-labelledby="consider-title">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="consider-title" className="text-3xl font-extrabold tracking-tight text-slate-900">
            {city.name} {trade.name} Projects: What to Know Before You Hire
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {content.considerations.map((c) => (
              <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h3 className="font-bold text-slate-900">{c.title}</h3>
                <p className="mt-2 text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>
          <h3 className="mt-12 text-xl font-bold text-slate-900">Southwest Missouri factors every {city.name} homeowner should consider</h3>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {trade.localConsiderations.map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name="shield" className="h-5 w-5" /></span>
                <div>
                  <h4 className="font-semibold text-slate-900">{c.title}</h4>
                  <p className="mt-1 text-slate-600">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks trade={trade} />
      <FAQ items={faqs} title={`${city.name} ${trade.name} FAQs`} />
      <CtaBand label={`Get ${site.quoteRange} Free Quotes in ${city.name}`} title={`${city.name} homeowners: get honest ${trade.name.toLowerCase()} quotes today`} />
      {nearby.length > 0 && <ServiceAreaGrid trade={trade} exclude={city.slug} title={`Nearby ${site.areaCode} Service Areas`} />}
      <MobileCtaBar label={`Get ${site.quoteRange} Free Quotes in ${city.name}`} />
    </>
  );
}
