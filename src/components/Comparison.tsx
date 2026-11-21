import { site } from "@/config/site";
import type { Trade } from "@/config/trades";
import { Icon } from "./Icons";

export default function Comparison({ trade }: { trade: Trade }) {
  const rows = [
    { label: "Contractors who get your info", us: `${site.maxQuotes} max — guaranteed`, them: "Often 4–5+, sold as shared leads" },
    { label: "Spam calls & texts", us: "None. Only your matched pros", them: "Call-center blitz within minutes" },
    { label: "Who you're matched with", us: `Vetted, established Ozarks ${trade.proPlural}`, them: "Whoever pays for the lead" },
    { label: "Local knowledge", us: "Built for the 417 only", them: "National, one-size-fits-all" },
    { label: "Cost to homeowners", us: "100% free", them: "Free (you pay with your phone number)" },
  ];
  const cards = [
    { icon: "phoneOff" as const, title: `${site.maxQuotes} Local Bids Max`, body: "Not a 5-way spam call free-for-all. Your info goes to two pros, period." },
    { icon: "shield" as const, title: "Vetted Ozarks Pros", body: "Established local companies with required licensing, insurance, and real 417 track records." },
    { icon: "dollar" as const, title: "100% Free for Homeowners", body: "Contractors pay a flat membership, so you never pay us — and there's no obligation to hire." },
  ];
  return (
    <section className="bg-white py-16 sm:py-20" aria-labelledby="cmp-title">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="cmp-title" className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
          Why {site.areaCode} Homeowners Choose Us Over National Sites
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cards.map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-200 p-6">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Icon name={c.icon} /></span>
              <h3 className="mt-4 text-lg font-bold text-slate-900">{c.title}</h3>
              <p className="mt-2 text-slate-600">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm sm:text-base">
            <caption className="sr-only">{site.name} compared with national lead-generation sites</caption>
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="p-3 font-semibold text-slate-500 sm:p-4"><span className="sr-only">Feature</span></th>
                <th scope="col" className="bg-brand-600 p-3 font-bold text-white sm:p-4">{site.name}</th>
                <th scope="col" className="p-3 font-bold text-slate-700 sm:p-4">National Lead Sites</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => (
                <tr key={r.label}>
                  <th scope="row" className="p-3 font-semibold text-slate-700 sm:p-4">{r.label}</th>
                  <td className="bg-brand-50 p-3 text-slate-900 sm:p-4">
                    <span className="flex items-start gap-2"><Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />{r.us}</span>
                  </td>
                  <td className="p-3 text-slate-500 sm:p-4">
                    <span className="flex items-start gap-2"><Icon name="x" className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />{r.them}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-center text-xs text-slate-500">
          Comparison reflects the shared-lead model common among national referral sites; individual platforms vary.
        </p>
      </div>
    </section>
  );
}
