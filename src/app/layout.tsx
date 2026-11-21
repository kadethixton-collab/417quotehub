import type { Metadata, Viewport } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/config/site";
import { getPrimaryTrade } from "@/lib/content";
import "./globals.css";

const trade = getPrimaryTrade();

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Compare ${site.quoteRange} Free ${trade.name} Quotes in Springfield, MO & the 417`,
    template: `%s | ${site.name}`,
  },
  description: `Get up to ${site.maxQuotes} free quotes from vetted local ${trade.proPlural} in Springfield, Nixa, Ozark, Republic & across Southwest Missouri. No spam calls — ${site.maxQuotes} pros max, guaranteed.`,
  applicationName: site.name,
  openGraph: { type: "website", siteName: site.name, locale: "en_US" },
  twitter: { card: "summary" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#102a5c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <body className="min-h-screen font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:font-semibold">
          Skip to content
        </a>
        <Header />
        <main id="main" className="pb-24 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
