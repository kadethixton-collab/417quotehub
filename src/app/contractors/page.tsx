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
const plan = trade.partner;
const open = plan.seatsOpen > 0;

export const metadata: Metadata = {
  title: `Partner With Us: Only ${plan.seatsTotal} ${trade.name} Seats in the ${site.areaCode}`,
  description: `A flat monthly retainer for ${site.areaCode} ${trade.name.toLowerCase()} contractors. Only ${plan.seatsTotal} seats per trade, no per-lead fees, and every homeowner project capped at ${site.quoteRange} quotes.`,
  alternates: { canonical: "/contractors" },
};

export default function Contractors() {
  const benefits: { icon: IconName; title: string; body: string }[] = [
    { icon: "users", title: `Only ${plan.seatsTotal} seats per trade`, body: `We cap each trade at ${plan.seatsTotal} partner companies across the ${site.areaCode}. Once they're filled, new applicants wait.` },
    { icon: "dollar", title: "One flat monthly retainer", body: "No per-lead charges, no surprise invoices, no paying more in a busy month. You know your cost up front." },
    { icon: "scale", title: `${site.quoteRange} quotes max per project`, body: `Every homeowner request goes to ${site.maxQuotes} contractors at most. No racing 5–8 companies to the phone.` },
    { icon: "pin", title: `100% ${site.areaCode} homeowners`, body: "Requests come only from Springfield, Nixa, Ozark, Republic, Willard, Battlefield, Rogersville & nearby." },
    { icon: "shield", title: "Homeowners expect your call", body: `They explicitly agree to hear from up to ${site.maxQuotes} local pros, and they're ready to compare.` },
    { icon: "x", title: "No long-term contract", body: "Month-to-month. If it isn't working for your business, cancel anytime." },
  ];

  const faqs = [
    {
      q: "How does the retainer work?",
      a: `You pay one flat monthly fee for a partner seat. In return, you receive the homeowner requests in your trade for the cities you serve. There are no per-lead charges, and we never take a cut of the jobs you win.`,
    },
    {
      q: "How many contractors get each request?",
      a: `Never more than ${site.maxQuotes}. Because there are only ${plan.seatsTotal} seats per trade, a request goes to the partners who serve that homeowner's city, so most projects go to 2 or 3 pros. Homeowners get real choice without being overwhelmed.`,
    },
    {
      q: "How are seats assigned?",
      a: "First-come, first-qualified. We verify licensing/registration, insurance, and local reputation, then offer seats in the order applications are approved. Once every seat in a trade is filled, new applicants join the waitlist.",
    },
    {
      q: "How many requests will I get?",
      a: "Volume depends on the season, the weather, and the cities you serve, so we don't promise a fixed number. What we do promise is that you'll never be one of 5+ companies fighting over the same homeowner.",
    },
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
            <span className={`h-2 w-2 rounded-full ${open ? "bg-emerald-400" : "bg-amber-400"}`} aria-hidden="true" />
            {open ? `${plan.seatsOpen} of ${plan.seatsTotal} ${trade.name} seats open` : `${trade.name} seats full. Waitlist open`}
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {site.areaCode} {trade.name} Leads on a Flat Monthly Retainer. Only {plan.seatsTotal} Seats.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-brand-100 sm:text-xl">
            No pay-per-lead. No bidding wars. No fighting 5+ competitors over the same homeowner. Every project on {site.name} is
            capped at {site.quoteRange} quotes, and only {plan.seatsTotal} {trade.proPlural} get a seat.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#apply" className="rounded-xl bg-accent-500 px-7 py-4 text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400">
              {open ? "Claim an Open Seat" : "Join the Waitlist"}
            </a>
            <p className="text-brand-100">
              <span className="text-3xl font-extrabold text-white">${plan.monthlyPrice}</span>/month · flat · month-to-month
            </p>
          </div>
        </div>
      </section>

      {/* The plan */}
      <section id="plan" className="scroll-mt-20 bg-slate-50 py-16 sm:py-20" aria-labelledby="plan-title">
        <div className="mx-auto max-w-xl px-4">
          <h2 id="plan-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            One simple plan
          </h2>
          <div className="mt-8 flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-2 ring-brand-600">
            <span className="self-start rounded-full bg-brand-600 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
              {open ? `${plan.seatsOpen} of ${plan.seatsTotal} seats open` : "Waitlist"}
            </span>
            <h3 className="mt-4 text-xl font-extrabold text-slate-900">{plan.name}</h3>
            <p className="mt-3">
              <span className="text-4xl font-black text-slate-900">${plan.monthlyPrice}</span>{" "}
              <span className="text-slate-600">per month · flat retainer</span>
            </p>
            <ul className="mt-6 space-y-2.5 text-slate-700">
              {plan.features.map((f) => (
                <li key={f} className="flex gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{f}</li>
              ))}
            </ul>
            <a href="#apply" className="mt-7 block rounded-xl bg-accent-500 py-3.5 text-center text-lg font-extrabold text-slate-900 hover:bg-accent-400">
              {open ? "Claim a Seat" : "Join the Waitlist"}
            </a>
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
                {[`Shared with ${site.quoteRange} pros max`, "One flat monthly retainer", `Only ${plan.seatsTotal} seats per trade`, "Local 417 requests only"].map((t) => (
                  <li key={t} className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" />{t}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-white p-6 ring-1 ring-slate-200">
              <h3 className="font-bold text-slate-600">Typical pay-per-lead platforms</h3>
              <ul className="mt-4 space-y-2 text-slate-600">
                {["Same lead sold to 4–5+ companies", "Pay for every lead, good or bad", "Costs spike in busy months", "Race to the bottom on price"].map((t) => (
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
              {open ? "Claim your seat" : "Join the waitlist"}
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
      <MobileCtaBar href="#apply" targetId="apply" label={open ? "Claim an Open Seat" : "Join the Waitlist"} />
    </>
  );
}
