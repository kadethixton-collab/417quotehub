import Link from "next/link";
import { site } from "@/config/site";
import { Logo } from "./Logo";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-extrabold text-slate-900" aria-label={`${site.name} home`}>
          <Logo />
          <span className="text-lg tracking-tight">{site.name}</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-semibold sm:gap-4" aria-label="Main">
          <Link href="/services" className="hidden rounded px-2 py-2 text-slate-600 hover:text-brand-700 sm:block">Service Areas</Link>
          <Link href="/guides" className="hidden rounded px-2 py-2 text-slate-600 hover:text-brand-700 md:block">Guides</Link>
          <Link href="/contractors" className="rounded px-2 py-2 text-slate-600 hover:text-brand-700">For Contractors</Link>
          <Link href="/#quote" className="hidden rounded-lg bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 md:block">Get {site.quoteRange} Free Quotes</Link>
        </nav>
      </div>
    </header>
  );
}
