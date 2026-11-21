import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { guides } from "@/config/guides";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: `Homeowner Guides for ${site.areaCode} Projects`,
  description: `Practical guides for Southwest Missouri homeowners: costs, repair-or-replace decisions, and how to compare contractor quotes in Springfield, Nixa, Ozark & the ${site.areaCode}.`,
  alternates: { canonical: "/guides" },
};

export default function GuidesIndex() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Homeowner Guides</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-600">
          Straight answers for {site.areaCode} homeowners, written for Southwest Missouri soil, weather, and prices.
        </p>
        <ul className="mt-10 space-y-5">
          {guides.map((g) => (
            <li key={g.slug}>
              <Link href={`/guides/${g.slug}`} className="group block rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md hover:ring-brand-300">
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-700">{g.title}</h2>
                <p className="mt-2 text-slate-600">{g.description}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                  {g.readMinutes} min read <Icon name="arrowRight" className="h-4 w-4" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
