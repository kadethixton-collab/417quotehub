import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-extrabold text-slate-900">We couldn&apos;t find that page</h1>
      <p className="mt-3 text-slate-600">Let&apos;s get you back to comparing quotes.</p>
      <Link href="/" className="mt-8 inline-block rounded-xl bg-brand-600 px-6 py-3 font-bold text-white hover:bg-brand-700">Back to home</Link>
    </section>
  );
}
