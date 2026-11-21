import type { Metadata } from "next";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import { activeTrades } from "@/config/trades";
import { getPrimaryTrade } from "@/lib/content";
import PartnerForm from "@/components/PartnerForm";
import FAQ from "@/components/FAQ";
import MobileCtaBar from "@/components/MobileCtaBar";
import { Icon, type IconName } from "@/components/Icons";

const trade = getPrimaryTrade();
const { leadPack, priority } = trade.partner;
const perLead = Math.round(leadPack.price / leadPack.leads);

export const metadata: Metadata = {
  title: `Partner With Us: ${site.areaCode} ${trade.name} Leads, Capped at ${site.quoteRange} Quotes`,
  description: `Get exclusive-to-${site.maxQuotes} ${trade.name.toLowerCase()} requests from Springfield-area homeowners. Prepaid ${leadPack.leads}-Lead Growth Packs or Monthly Priority Placement. Never shared with 5+ competitors.`,
  alternates: { canonical: "/contractors" },
};

export default function Contractors() {
  const benefits: { icon: IconName; title: string; body: string }[] = [
    { icon: "users", title: `${site.quoteRange} quotes max per project`, body: `Every homeowner request is capped at ${site.maxQuotes} contractors. You're never racing 5–8 companies to the phone.` },
    { icon: "pin", title: `100% ${site.areaCode} homeowners`, body: "Requests come only from Springfield, Nixa, Ozark, Republic, Willard, Battlefield, Rogersville & nearby." },
    { icon: "shield", title: "Homeowners expect your call", body: `They explicitly agree to hear from up to ${site.maxQuotes} local pros, and they're ready to compare.` },
    { icon: "scale", title: "No auctions or bidding wars", body: "Win jobs on quality and price, not on who dialed fastest or paid the most for the lead." },
    { icon: "dollar", title: "Pick how you pay", body: "Prepay for leads as you need them, or lock in priority access for one flat monthly retainer." },
    { icon: "x", title: "No long-term contracts", body: "Growth Packs never lock you in, and Priority Placement is month-to-month." },
  ];

  const faqs = [
    {
      q: "What's the difference between the two plans?",
      a: `The ${leadPack.name} is pay-as-you-go: you prepay for ${leadPack.leads} homeowner requests and reload when you need more. ${priority.name} is a flat monthly retainer that gives you first claim on every matching request in your service cities, with no per-lead charges. Priority seats are limited to ${priority.seatsTotal} per trade.`,
    },
    {
      q: `How many contractors get each lead?`,
      a: `Never more than ${site.maxQuotes}. Most projects go to 2 or 3 pros, so homeowners get real choice without being overwhelmed. That's a big part of why your close rate should beat shared-lead platforms.`,
    },
    {
      q: "What if a lead is bad?",
      a: "If a request has a disconnected number, is outside your service area, or is clearly not a real project, let us know and we'll credit it back to your Growth Pack.",
    },
    {
      q: "How many requests will I get on Priority Placement?",
      a: "Volume depends on the season, the weather, and the cities you serve, so we don't promise a fixed number. Priority Partners get first claim on every matching request we receive in their area.",
    },
    { q: "Do you take a cut of the jobs I win?", a: "No. You pay for leads or your monthly retainer, and that's it. Whatever you quote and win is yours." },
    {
      q: "What do you require from partners?",
      a: "Any license or registration required by the cities and counties you work in, active general liability insurance (and workers' comp where required), an established local presence, and a commitment to respond to homeowners within one business day.",
    },
    { q: `Are you a ${trade.proSingular} or a competitor?`, a: `No. ${site.name} is a matching service only. We never perform trade work and never compete with our partners.` },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-slate-900 to-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-100 ring-1 ring-white/20">
            <span className={`h-2 w-2 rounded-full ${priority.seatsOpen > 0 ? "bg-emerald-400" : "bg-amber-400"}`} aria-hidden="true" />
            {priority.seatsOpen > 0
              ? `${priority.seatsOpen} of ${priority.seatsTotal} Priority Placement seats open`
              : "Priority seats full. Growth Packs available"}
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {site.areaCode} {trade.name} Leads Capped at {site.quoteRange} Quotes. Never 5.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100 sm:text-xl">
            Stop paying to fight 5+ competitors over the same shared lead. Every homeowner project on {site.name} goes to{" "}
            {site.maxQuotes} local {trade.proPlural} max. Choose pay-as-you-go lead packs or a flat monthly retainer.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#plans" className="rounded-xl bg-accent-500 px-7 py-4 text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400">
              See Plans &amp; Pricing
            </a>
            <a href="#apply" className="rounded-xl px-7 py-4 text-lg font-bold text-white ring-1 ring-white/40 hover:bg-white/10">
              Apply Now
            </a>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="scroll-mt-20 bg-slate-50 py-16 sm:py-20" aria-labelledby="plans-title">
        <div className="mx-auto max-w-5xl px-4">
          <h2 id="plans-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Two ways to grow with {site.name}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Both plans include the same promise: every project is capped at {site.quoteRange} quotes.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <PlanCard
              name={leadPack.name}
              tag="Pay-As-You-Go"
              price={`$${leadPack.price}`}
              priceNote={`per ${leadPack.leads} leads (~$${perLead}/lead)`}
              features={leadPack.features}
              cta={`Buy a ${leadPack.leads}-Lead Pack`}
              href="?plan=lead-pack#apply"
            />
            <PlanCard
              name={priority.name}
              tag={priority.seatsOpen > 0 ? `Only ${priority.seatsTotal} seats per trade` : "Waitlist"}
              price={`$${priority.monthlyPrice}`}
              priceNote="per month · flat retainer"
              features={priority.features}
              cta={priority.seatsOpen > 0 ? "Claim a Priority Seat" : "Join the Priority Waitlist"}
              href="?plan=priority#apply"
              featured
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20" aria-labelledby="benefits-title">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="benefits-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Built for local contractors, not lead brokers
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-slate-200 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={b.icon} /></span>
                <h3 className="mt-4 text-lg font-bold text-slate-900">{b.title}</h3>
                <p className="mt-2 text-slate-600">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20" aria-labelledby="compare-title">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="compare-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900">The math is simple</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-6 ring-2 ring-brand-600">
              <h3 className="font-bold text-brand-700">{site.name} Partner</h3>
              <ul className="mt-4 space-y-2 text-slate-700">
                {[`Shared with ${site.quoteRange} pros max`, "Prepaid packs or flat monthly", `Homeowners expect ${site.quoteRange} calls`, "Local 417 requests only"].map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-600">Typical shared-lead platforms</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                {["Same lead sold to 4–5+ companies", "Surprise per-lead charges", "Homeowner overwhelmed by calls", "Race to the bottom on price"].map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="x" className="h-5 w-5 shrink-0 text-red-500" />{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-20 bg-white py-16 sm:py-20" aria-labelledby="apply-title">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 id="apply-title" className="text-3xl font-extrabold tracking-tight text-slate-900">Apply to partner</h2>
            <p className="mt-3 text-lg text-slate-600">
              Takes 2 minutes. We&apos;ll verify your business and get back to you within 2 business days.
            </p>
            <ol className="mt-6 space-y-4">
              {["Pick a plan & submit your application", "We verify licensing, insurance & reputation", "Get set up & start receiving homeowner requests"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                  <span className="font-medium text-slate-800">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <PartnerForm
            trades={activeTrades.map((t) => ({ slug: t.slug, name: t.name, prioritySeatsOpen: t.partner.priority.seatsOpen }))}
            cities={cities.map((c) => ({ slug: c.slug, name: c.name }))}
          />
        </div>
      </section>

      <FAQ items={faqs} title="Partner FAQs" id="partner-faq" />
      <MobileCtaBar href="#apply" targetId="apply" label="Apply to Partner" />
    </>
  );
}

function PlanCard(props: {
  name: string;
  tag: string;
  price: string;
  priceNote: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <div className={`flex flex-col rounded-2xl bg-white p-7 shadow-sm ${props.featured ? "ring-2 ring-brand-600" : "ring-1 ring-slate-200"}`}>
      <span className={`self-start rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${props.featured ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700"}`}>
        {props.tag}
      </span>
      <h3 className="mt-4 text-xl font-extrabold text-slate-900">{props.name}</h3>
      <p className="mt-3">
        <span className="text-4xl font-black text-slate-900">{props.price}</span>{" "}
        <span className="text-slate-600">{props.priceNote}</span>
      </p>
      <ul className="mt-6 flex-1 space-y-2.5 text-slate-700">
        {props.features.map((f) => (
          <li key={f} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{f}</li>
        ))}
      </ul>
      <a
        href={props.href}
        className={`mt-7 block rounded-xl py-3.5 text-center text-lg font-extrabold ${props.featured ? "bg-accent-500 text-slate-900 hover:bg-accent-400" : "bg-brand-600 text-white hover:bg-brand-700"}`}
      >
        {props.cta}
      </a>
    </div>
  );
}
