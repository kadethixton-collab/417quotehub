import { site } from "@/config/site";

export default function CtaBand({ label, title = "Ready for honest quotes without the phone spam?" }: { label: string; title?: string }) {
  return (
    <section className="bg-brand-700 py-14 text-center text-white">
      <div className="mx-auto max-w-3xl px-4">
        <h2 className="text-2xl font-extrabold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-brand-100">It takes about 60 seconds. Free, no obligation, {site.maxQuotes} pros max.</p>
        <a href="#quote" className="mt-6 inline-block rounded-xl bg-accent-500 px-8 py-4 text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400">
          {label}
        </a>
      </div>
    </section>
  );
}
