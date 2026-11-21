import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { cities, type City } from "@/config/cities";
import type { ProjectType, Trade } from "@/config/trades";
import { cityHref, generalFaqs, serviceCityContent, serviceHref } from "@/lib/content";
import Hero from "./Hero";
import HowItWorks from "./HowItWorks";
import FAQ from "./FAQ";
import CtaBand from "./CtaBand";
import MobileCtaBar from "./MobileCtaBar";
import JsonLd from "./JsonLd";
import { Icon } from "./Icons";

export function serviceMetadata(trade: Trade, service: ProjectType, city: City): Metadata {
  const title = `${service.seoName} in ${city.name}, MO — Compare ${site.quoteRange} Free Quotes`;
  const raw = `Get ${site.quoteRange} free ${service.seoName.toLowerCase()} quotes from vetted ${city.name}, MO ${trade.proPlural}. Local pros, ${site.maxQuotes} max, zero spam calls. 100% free for homeowners.`;
  const path = serviceHref(city, service);
  return {
    title: { absolute: `${title} | ${site.name}` },
    description: raw.length > 160 ? raw.slice(0, 157).replace(/\s+\S*$/, "") + "…" : raw,
    alternates: { canonical: path },
    openGraph: { title, description: raw, url: path, type: "website" },
    other: { "geo.region": "US-MO", "geo.placename": `${city.name}, Missouri` },
  };
}

export default function ServiceLanding({ trade, service, city }: { trade: Trade; service: ProjectType; city: City }) {
  const content = serviceCityContent(trade, service, city);
  const url = `${site.url}${serviceHref(city, service)}`;
  const cityUrl = `${site.url}${cityHref(city, trade)}`;
  const faqs = [...content.faqs, ...generalFaqs(trade).slice(0, 2)];
  const otherServices = trade.projectTypes.filter((p) => p.slug !== service.slug);
  const otherCities = cities.filter((c) => c.slug !== city.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${service.seoName} Quotes in ${city.name}, MO`,
      serviceType: service.seoName,
      category: trade.serviceType,
      description: `Free matching with up to ${site.maxQuotes} independent local ${trade.proPlural} for ${service.seoName.toLowerCase()} projects in ${city.name}, Missouri.`,
      url,
      provider: { "@type": "Organization", name: site.name, url: site.url, email: site.email },
      areaServed: { "@type": "City", name: `${city.name}, MO`, containedInPlace: { "@type": "AdministrativeArea", name: `${city.county}, Missouri` } },
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD", description: `${site.quoteRange} free quotes from local ${trade.proPlural}` },
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
        { "@type": "ListItem", position: 3, name: `${city.name}, MO`, item: cityUrl },
        { "@type": "ListItem", position: 4, name: service.seoName, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <Hero
        trade={trade}
        defaultCity={city.slug}
        defaultProjectType={service.id}
        eyebrow={
          <nav aria-label="Breadcrumb" className="text-sm text-brand-200">
            <ol className="flex flex-wrap items-center gap-1">
              <li><Link href="/" className="hover:text-white">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href={cityHref(city, trade)} className="hover:text-white">{city.name}, MO</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-semibold text-white">{service.label}</li>
            </ol>
          </nav>
        }
        headline={
          <>
            Compare {site.quoteRange} Free {service.seoName} Quotes in {city.name}, MO —{" "}
            <span className="text-accent-400">Zero Spam Calls</span>
          </>
        }
        subheadline={
          <>
            Vetted local {trade.proPlural} serving {city.neighborhoods[0]} and all of {city.name}. {site.maxQuotes} pros max, 100% free.
          </>
        }
      />

      <section className="bg-white py-16 sm:py-20" aria-labelledby="svc-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-700">{city.name}, {city.county}</p>
            <h2 id="svc-title" className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">
              {service.seoName} Pros in {city.name}
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-slate-700">
              {content.intro.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
            </div>
          </div>
          <aside className="h-fit rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
            <h3 className="font-bold text-slate-900">What affects your {service.seoName.toLowerCase()} quote</h3>
            <ul className="mt-3 space-y-2 text-slate-700">
              {content.costFactors.map((f) => (
                <li key={f} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />{f}</li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-slate-600">
              Tip: ask all of your matched pros to itemize these so you can compare quotes line by line.
            </p>
          </aside>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="svc-local-title">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="svc-local-title" className="text-3xl font-extrabold tracking-tight text-slate-900">
            Southwest Missouri factors for {city.name} {trade.subject} projects
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {trade.localConsiderations.map((c) => (
              <div key={c.title} className="flex gap-4 rounded-2xl bg-white p-6 ring-1 ring-slate-200">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-700"><Icon name="shield" className="h-5 w-5" /></span>
                <div>
                  <h3 className="font-semibold text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-slate-600">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks trade={trade} />
      <FAQ items={faqs} title={`${service.seoName} FAQs for ${city.name}`} />

      {/* Internal links: other services here, same service nearby */}
      <section className="bg-slate-50 py-16" aria-labelledby="related-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2">
          <div>
            <h2 id="related-title" className="text-xl font-bold text-slate-900">More {trade.subject} services in {city.name}</h2>
            <ul className="mt-4 space-y-2">
              {otherServices.map((p) => (
                <li key={p.slug}>
                  <Link href={serviceHref(city, p)} className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">
                    {p.label} in {city.name} <Icon name="arrowRight" className="h-4 w-4" />
                  </Link>
                </li>
              ))}
              <li>
                <Link href={cityHref(city, trade)} className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">
                  All {trade.name.toLowerCase()} quotes in {city.name} <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{service.label} near {city.name}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {otherCities.map((c) => (
                <li key={c.slug}>
                  <Link href={serviceHref(c, service)} className="font-semibold text-brand-700 hover:underline">{c.name}, MO</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand label={`Get ${site.quoteRange} Free Quotes in ${city.name}`} title={`Ready for honest ${service.seoName.toLowerCase()} quotes in ${city.name}?`} />
      <MobileCtaBar label={`Get ${site.quoteRange} Free Quotes`} />
    </>
  );
}
