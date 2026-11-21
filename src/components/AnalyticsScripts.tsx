import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

/**
 * Analytics, all optional and loaded after the page is interactive so they don't hurt speed:
 * - Vercel Web Analytics: automatic when deployed on Vercel (enable it in the project's Analytics tab).
 * - Google Analytics 4: set NEXT_PUBLIC_GA_ID (e.g. G-XXXXXXX).
 */
export default function AnalyticsScripts() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <>
      {process.env.VERCEL && <Analytics />}
      {ga && /^G-[A-Z0-9]+$/.test(ga) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="lazyOnload" />
          <Script id="ga-init" strategy="lazyOnload">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
    </>
  );
}
