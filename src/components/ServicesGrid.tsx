import Link from "next/link";
import type { City } from "@/config/cities";
import type { Trade } from "@/config/trades";
import { serviceHref } from "@/lib/content";
import { Icon } from "./Icons";

/** Links to every service page for a city. Good for homeowners and for internal SEO linking. */
export default function ServicesGrid({ trade, city, title }: { trade: Trade; city: City; title?: string }) {
  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby={`svc-grid-${city.slug}`}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 id={`svc-grid-${city.slug}`} className="text-center text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          {title ?? `Popular ${trade.subject} projects in ${city.name}`}
        </h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trade.projectTypes.map((p) => (
            <li key={p.slug}>
              <Link
                href={serviceHref(city, p)}
                className="group flex h-full flex-col rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 transition hover:-translate-y-0.5 hover:bg-white hover:shadow-md hover:ring-brand-300"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={p.icon} />
                </span>
                <span className="mt-3 font-bold text-slate-900">{p.label}</span>
                <span className="mt-1 flex-1 text-sm text-slate-600">{p.description}</span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 group-hover:gap-2">
                  Compare quotes <Icon name="arrowRight" className="h-4 w-4 transition-all" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
