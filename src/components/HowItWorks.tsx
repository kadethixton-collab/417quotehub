import { site } from "@/config/site";
import type { Trade } from "@/config/trades";
import { Icon, type IconName } from "./Icons";

export default function HowItWorks({ trade }: { trade: Trade }) {
  const steps: { icon: IconName; title: string; body: string }[] = [
    { icon: "clipboard", title: "Tell us about your project", body: "Answer 4 quick questions about your " + trade.subject + " project. It takes about 60 seconds." },
    { icon: "users", title: `We match you with ${site.quoteRange} vetted local pros`, body: `We hand-pick up to ${site.maxQuotes} established ${site.areaCode} ${trade.proPlural} who serve your city. Never 5. Never a call center.` },
    { icon: "scale", title: "Compare quotes & hire who you trust", body: "Get honest, competing quotes. Choose the best fit — or no one at all. Zero obligation." },
  ];
  return (
    <section id="how-it-works" className="bg-slate-50 py-16 sm:py-20" aria-labelledby="hiw-title">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-center text-sm font-bold uppercase tracking-widest text-brand-700">How It Works</p>
        <h2 id="hiw-title" className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          {site.quoteRange} honest quotes in 3 simple steps
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white"><Icon name={s.icon} /></span>
                <span className="text-4xl font-black text-slate-200" aria-hidden="true">{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-bold text-slate-900"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
              {i < steps.length - 1 && (
                <Icon name="arrowRight" className="absolute -right-5 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-brand-300 md:block" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
