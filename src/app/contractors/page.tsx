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

export const metadata: Metadata = {
  title: `Partner With Us — ${site.maxQuotes}-Seat ${trade.name} Partner Program`,
  description: `Only ${trade.partner.seatsTotal} ${trade.name.toLowerCase()} contractor seats in the ${site.areaCode}. Flat monthly pricing, no bidding wars, no shared leads sold to 5 competitors. Apply to claim a seat.`,
  alternates: { canonical: "/contractors" },
};

export default function Contractors() {
  const { partner } = trade;
  const benefits: { icon: IconName; title: string; body: string }[] = [
    { icon: "users", title: `Only ${partner.seatsTotal} seats per trade`, body: `Every homeowner request is shared with ${site.maxQuotes} companies max — you and at most one other ${trade.proSingular}. Not 5. Not 8.` },
    { icon: "dollar", title: "Flat monthly pricing", body: "One predictable membership fee. No per-lead charges, no surprise invoices, no paying for junk leads." },
    { icon: "scale", title: "Zero bidding wars", body: "No auctions and no racing 4 competitors to the phone. Win jobs on quality, not on who dials fastest." },
    { icon: "pin", title: `100% ${site.areaCode} homeowners`, body: `Requests come only from Springfield, Nixa, Ozark, Republic, Willard, Battlefield, Rogersville & nearby.` },
    { icon: "shield", title: "Real, exclusive-to-2 requests", body: "Homeowners explicitly consent to hear from 2 local pros. They expect your call and they're ready to compare." },
    { icon: "x", title: "No long-term contract", body: "Month-to-month. If it doesn't work for your business, cancel any time." },
  ];
  const faqs = [
    { q: "How are seats assigned?", a: `First-come, first-qualified. We verify licensing/registration, insurance, and local reputation, then offer seats in the order applications are approved. Once both seats in a trade are filled, new applicants join the waitlist.` },
    { q: "How many requests will I get?", a: `Volume depends on season and weather, so we don't promise a fixed number. Our goal is ${partner.leadEstimate}, and because only ${site.maxQuotes} companies share each request, your close rate should be far higher than with shared-lead platforms.` },
    { q: `Do you take a cut of the jobs I win?`, a: "No. You pay a flat monthly membership. Whatever you quote and win is yours." },
    { q: "What do you require from partners?", a: "Any license or registration required by the cities and counties you work in, active general liability insurance (and workers' comp where required), an established local presence, and a commitment to respond to homeowners within one business day." },
    { q: `Are you a ${trade.proSingular} or a competitor?`, a: `No. ${site.name} is a matching service only. We never perform trade work and never compete with our partners.` },
  ];

  return (
    <>
      <section className="bg-gradient-to-b from-slate-900 to-brand-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-100 ring-1 ring-white/20">
            <span className={`h-2 w-2 rounded-full ${partner.seatsOpen > 0 ? "bg-emerald-400" : "bg-amber-400"}`} aria-hidden="true" />
            {partner.seatsOpen > 0 ? `${partner.seatsOpen} of ${partner.seatsTotal} ${trade.name} seats open` : `${trade.name} seats full — waitlist open`}
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            The {partner.seatsTotal}-Seat Partner Program for {site.areaCode} {trade.name} Companies
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100 sm:text-xl">
            Stop paying to fight 5 competitors over the same shared lead. We give homeowner requests to {site.maxQuotes} local {trade.proPlural} max —
            for one flat monthly price.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#apply" className="rounded-xl bg-accent-500 px-7 py-4 text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400">
              {partner.seatsOpen > 0 ? "Claim an Open Seat" : "Join the Waitlist"}
            </a>
            <p className="text-brand-100">
              <span className="text-3xl font-extrabold text-white">${partner.monthlyPrice}</span>/month · flat · month-to-month
            </p>
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
                {["Shared with 1 other pro max", "Flat monthly fee", "Homeowners expect 2 calls", "Local 417 requests only"].map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-500">Typical shared-lead platforms</h3>
              <ul className="mt-4 space-y-2 text-slate-500">
                {["Same lead sold to 4–5+ companies", "Pay per lead, good or bad", "Homeowner overwhelmed by calls", "Race to the bottom on price"].map((t) => (
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
            <h2 id="apply-title" className="text-3xl font-extrabold tracking-tight text-slate-900">
              {partner.seatsOpen > 0 ? "Claim your seat" : "Join the waitlist"}
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Takes 2 minutes. We&apos;ll verify your business and get back to you within 2 business days.
            </p>
            <ol className="mt-6 space-y-4">
              {["Submit your application", "We verify licensing, insurance & reputation", "Onboarding call & start receiving requests"].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-600 font-bold text-white">{i + 1}</span>
                  <span className="font-medium text-slate-800">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <PartnerForm
            trades={activeTrades.map((t) => ({ slug: t.slug, name: t.name, seatsOpen: t.partner.seatsOpen }))}
            cities={cities.map((c) => ({ slug: c.slug, name: c.name }))}
          />
        </div>
      </section>

      <FAQ items={faqs} title="Partner FAQs" id="partner-faq" />
      <MobileCtaBar href="#apply" targetId="apply" label={partner.seatsOpen > 0 ? "Claim an Open Seat" : "Join the Waitlist"} />
    </>
  );
}
