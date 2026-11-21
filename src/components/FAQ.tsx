import type { FAQ as FAQItem } from "@/config/trades";

export default function FAQ({ items, title = "Frequently Asked Questions", id = "faq" }: { items: FAQItem[]; title?: string; id?: string }) {
  return (
    <section id={id} className="bg-white py-16 sm:py-20" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-3xl px-4">
        <h2 id={`${id}-title`} className="text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h2>
        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200">
          {items.map((f) => (
            <details key={f.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold text-slate-900">
                <span>{f.q}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-brand-700 transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
