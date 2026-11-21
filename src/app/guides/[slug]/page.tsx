import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { cities, cityBySlug } from "@/config/cities";
import { guideBySlug, guides } from "@/config/guides";
import { findService, serviceHref } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import MobileCtaBar from "@/components/MobileCtaBar";
import { Icon } from "@/components/Icons";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => guides.map((g) => ({ slug: g.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const g = guideBySlug((await params).slug);
  if (!g) return {};
  return {
    title: { absolute: `${g.title} | ${site.name}` },
    description: g.description,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { title: g.title, description: g.description, type: "article", url: `/guides/${g.slug}`, publishedTime: g.published, modifiedTime: g.updated ?? g.published },
  };
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default async function GuidePage({ params }: Props) {
  const g = guideBySlug((await params).slug);
  if (!g) notFound();
  const svc = findService(g.serviceSlug);
  const springfield = cityBySlug("springfield-mo") ?? cities[0];
  const ctaHref = svc ? serviceHref(springfield, svc.service) : "/#quote";
  const url = `${site.url}/guides/${g.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: g.title,
            description: g.description,
            datePublished: g.published,
            dateModified: g.updated ?? g.published,
            mainEntityOfPage: url,
            image: `${site.url}/opengraph-image`,
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@type": "Organization", name: site.name, url: site.url },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Guides", item: `${site.url}/guides` },
              { "@type": "ListItem", position: 3, name: g.title, item: url },
            ],
          },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="hover:text-brand-700">Home</Link> / <Link href="/guides" className="hover:text-brand-700">Guides</Link>
        </nav>
        <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">{g.title}</h1>
        <p className="mt-3 text-sm text-slate-500">
          By {site.name} · Updated {fmtDate(g.updated ?? g.published)} · {g.readMinutes} min read
        </p>
        <p className="mt-6 text-lg leading-relaxed text-slate-700">{g.intro}</p>

        <aside className="my-8 rounded-2xl bg-brand-50 p-5 ring-1 ring-brand-100">
          <p className="font-bold text-slate-900">Want real numbers for your project?</p>
          <p className="mt-1 text-slate-700">Get {site.quoteRange} free quotes from vetted local pros. {site.maxQuotes} max, zero spam calls.</p>
          <Link href={ctaHref} className="mt-3 inline-flex items-center gap-1 rounded-lg bg-accent-500 px-4 py-2.5 font-bold text-slate-900 hover:bg-accent-400">
            Compare free quotes <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </aside>

        <div className="space-y-10">
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-2xl font-bold text-slate-900">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 40)} className="mt-3 text-lg leading-relaxed text-slate-700">{p}</p>
              ))}
              {s.bullets && (
                <ul className="mt-4 space-y-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-slate-700"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{b}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {svc && (
          <section className="mt-12 rounded-2xl bg-slate-900 p-6 text-white sm:p-8">
            <h2 className="text-2xl font-extrabold">Get {svc.service.seoName.toLowerCase()} quotes near you</h2>
            <p className="mt-2 text-slate-300">Pick your city. It takes about 60 seconds, and your info goes to {site.maxQuotes} local pros max.</p>
            <ul className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={serviceHref(c, svc.service)} className="block rounded-lg bg-white/10 px-3 py-2 font-semibold hover:bg-white/20">{c.name}, MO</Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-10 text-sm text-slate-500">
          This guide is general information, not professional engineering or legal advice. Requirements vary by property and city, so confirm details with your contractor and local building office.
        </p>
      </article>
      <MobileCtaBar href={ctaHref} targetId="__none__" label={`Get ${site.quoteRange} Free Quotes`} />
    </>
  );
}
