import { site } from "@/config/site";
import { cities } from "@/config/cities";
import type { Trade } from "@/config/trades";
import QuoteForm from "./QuoteForm";
import { Icon } from "./Icons";

type Props = {
  trade: Trade;
  headline: React.ReactNode;
  subheadline: React.ReactNode;
  defaultCity?: string;
  defaultProjectType?: string;
  eyebrow?: React.ReactNode;
};

export default function Hero({ trade, headline, subheadline, defaultCity, defaultProjectType, eyebrow }: Props) {
  const cityOptions = cities.map(({ slug, name, zips }) => ({ slug, name, zips }));
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-900 via-brand-800 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-5 px-4 sm:gap-8 py-6 sm:py-14 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-12 lg:py-20">
        <div>
          {eyebrow && <div className="mb-3 sm:mb-4">{eyebrow}</div>}
          <h1 className="text-[1.65rem] font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">{headline}</h1>
          <p className="mt-3 text-base text-brand-100 sm:mt-4 sm:text-xl">{subheadline}</p>
          <ul className="mt-6 hidden gap-3 text-brand-50 sm:grid">
            {[
              `${site.guaranteeName}: your info goes to ${site.maxQuotes} pros max`,
              `Vetted, established local ${trade.proPlural} — no fly-by-night crews`,
              "100% free for homeowners. No obligation, ever.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-2">
                <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div id="quote" className="scroll-mt-20 text-slate-900">
          <QuoteForm
            trade={{ slug: trade.slug, name: trade.name, proPlural: trade.proPlural, projectTypes: trade.projectTypes.map(({ id, slug, label, description, icon, seoName }) => ({ id, slug, label, description, icon, seoName })), notePlaceholder: trade.notePlaceholder }}
            cities={cityOptions}
            defaultCity={defaultCity}
            defaultProjectType={defaultProjectType}
            brandName={site.name}
            maxQuotes={site.maxQuotes}
            quoteRange={site.quoteRange}
            photosEnabled={!!process.env.BLOB_READ_WRITE_TOKEN}
          />
        </div>
      </div>
    </section>
  );
}
