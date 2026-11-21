/**
 * Global brand settings. Change the brand name here and it updates everywhere:
 * headers, footer disclaimer, meta tags, JSON-LD, legal pages, and emails/webhooks.
 */
export const site = {
  name: "417 QuoteHub",
  shortName: "QuoteHub",
  tagline: "The 2-Quote Guarantee for Southwest Missouri homeowners",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.417quotehub.com").replace(/\/$/, ""),
  email: "hello@417quotehub.com",
  areaCode: "417",
  region: "Southwest Missouri",
  regionNickname: "the Ozarks",
  state: "MO",
  stateName: "Missouri",
  /** The trade shown on the homepage and at /services/[city]. Must match a slug in trades.ts. */
  primaryTradeSlug: "roofing",
  /** Max number of contractors a homeowner is matched with. This is the core promise. */
  maxQuotes: 2,
  legalLastUpdated: "November 20, 2026",
} as const;

export const disclaimer = `${site.name} is a free local referral and quote-matching service connecting homeowners with independent, third-party contractors in Southwest Missouri. We do not perform physical construction or trade work, nor do we guarantee or warrant the work performed by independent contractors.`;
