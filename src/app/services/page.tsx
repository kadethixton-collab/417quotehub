import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import { activeTrades } from "@/config/trades";
import { cityHref, serviceHref } from "@/lib/content";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Service Areas — Springfield, Nixa, Ozark & the ${site.areaCode}`,
  description: `${site.name} matches homeowners with up to ${site.maxQuotes} vetted local contractors in Springfield, Nixa, Ozark, Republic, Willard, Battlefield, and Rogersville, MO.`,
  alternates: { canonical: "/services" },
};

export default function ServicesIndex() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Our {site.areaCode} Service Areas</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Pick your city to see local tips, FAQs, and get up to {site.maxQuotes} free quotes from vetted pros who work there.
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cities.map((c) => (
            <div key={c.slug} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900">
                <Icon name="pin" className="h-5 w-5 text-brand-600" /> {c.name}, MO
              </h2>
              <p className="mt-1 text-sm text-slate-500">{c.county} · {c.zips.join(", ")}</p>
              <p className="mt-3 text-slate-600">{c.blurb}</p>
              <ul className="mt-4 space-y-1">
                {activeTrades.map((t) => (
                  <li key={t.slug}>
                    <Link href={cityHref(c, t)} className="inline-flex items-center gap-1 font-semibold text-brand-700 hover:underline">
                      {t.name} quotes in {c.name} <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                    <ul className="mt-1 space-y-1 border-l border-slate-200 pl-3 text-sm">
                      {t.projectTypes.map((p) => (
                        <li key={p.slug}>
                          <Link href={serviceHref(c, p)} className="text-slate-600 hover:text-brand-700 hover:underline">{p.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
