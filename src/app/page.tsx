import type { Metadata } from "next";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import ServiceAreaGrid from "@/components/ServiceAreaGrid";
import FAQ from "@/components/FAQ";
import MobileCtaBar from "@/components/MobileCtaBar";
import JsonLd from "@/components/JsonLd";
import CtaBand from "@/components/CtaBand";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import { generalFaqs, getPrimaryTrade } from "@/lib/content";

const trade = getPrimaryTrade();

export const metadata: Metadata = {
  title: { absolute: `Compare ${site.quoteRange} Free ${trade.name} Quotes in Springfield, MO & the 417 | ${site.name}` },
  alternates: { canonical: "/" },
};

export default function Home() {
  const faqs = generalFaqs(trade);
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            email: site.email,
            description: `Free local ${trade.name.toLowerCase()} quote-matching service for Southwest Missouri.`,
            areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, MO` })),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <Hero
        trade={trade}
        eyebrow={
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-brand-100 ring-1 ring-white/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400" aria-hidden="true" /> The {site.guaranteeName}
          </span>
        }
        headline={
          <>
            Compare {site.quoteRange} Free Quotes From Vetted {site.areaCode} {trade.name} Pros —{" "}
            <span className="text-accent-400">Zero Spam Calls</span>
          </>
        }
        subheadline={
          <>
            One quick request for homeowners in Springfield, Nixa, Ozark &amp; surrounding Southwest Missouri towns. We
            match you with {site.quoteRange} local pros, never 5 call centers.
          </>
        }
      />
      <HowItWorks trade={trade} />
      <Comparison trade={trade} />
      <ServiceAreaGrid trade={trade} />
      <FAQ items={faqs} />
      <CtaBand label={`Get ${site.quoteRange} Free ${trade.name} Quotes`} />
      <MobileCtaBar label={`Get ${site.quoteRange} Free Quotes`} />
    </>
  );
}

