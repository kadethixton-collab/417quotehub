import Link from "next/link";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import type { Trade } from "@/config/trades";
import { cityHref } from "@/lib/content";
import { Icon } from "./Icons";

export default function ServiceAreaGrid({ trade, exclude, title }: { trade: Trade; exclude?: string; title?: string }) {
  const list = cities.filter((c) => c.slug !== exclude);
  return (
    <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="areas-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="areas-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {title ?? `Serving Homeowners Across the ${site.areaCode}`}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
          Local {trade.name.toLowerCase()} pros who actually know your town. Pick your city for local tips, FAQs, and {site.maxQuotes} free quotes.
        </p>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((c) => (
            <li key={c.slug}>
              <Link
                href={cityHref(c, trade)}
                className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:shadow-md hover:ring-brand-300"
              >
                <span className="flex items-center gap-2 font-bold text-slate-900">
                  <Icon name="pin" className="h-5 w-5 text-brand-600" />
                  {c.name}, MO
                </span>
                <span className="mt-2 flex-1 text-sm text-slate-600">{c.blurb}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">
                  {trade.name} quotes in {c.name} <Icon name="arrowRight" className="h-4 w-4 transition-all" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
