import Link from "next/link";
import { disclaimer, site } from "@/config/site";
import { cities } from "@/config/cities";
import { cityHref, getPrimaryTrade } from "@/lib/content";
import { Logo } from "./Logo";

export default function Footer() {
  const trade = getPrimaryTrade();
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-white">
              <Logo className="h-8 w-8" /> {site.name}
            </Link>
            <p className="mt-3 max-w-sm text-sm text-slate-400">
              {site.tagline}. One request, up to {site.maxQuotes} vetted local pros, zero spam calls.
            </p>
            <p className="mt-3 text-sm">
              <a href={`mailto:${site.email}`} className="hover:text-white">{site.email}</a>
            </p>
          </div>
          <nav aria-label="Service areas">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">{trade.name} Quotes Near You</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={cityHref(c)} className="hover:text-white">{c.name}, MO</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Company">
            <h2 className="text-sm font-bold uppercase tracking-wide text-white">Company</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link href="/#how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/guides" className="hover:text-white">Homeowner Guides</Link></li>
              <li><Link href="/contractors" className="hover:text-white">Partner With Us</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
            </ul>
          </nav>
        </div>

        <div className="mt-10 rounded-xl border border-slate-700 bg-slate-800/60 p-5" role="note" aria-label="Disclaimer">
          <p className="text-sm leading-relaxed text-slate-200">
            <strong className="text-white">Disclaimer: </strong>
            {disclaimer}
          </p>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          © {new Date().getFullYear()} {site.name}. Serving Springfield, Nixa, Ozark, Republic, Willard, Battlefield &amp; Rogersville, Missouri.
        </p>
      </div>
    </footer>
  );
}
