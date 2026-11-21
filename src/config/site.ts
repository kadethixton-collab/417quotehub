/**
 * Global brand settings. Change the brand name here and it updates everywhere:
 * headers, footer disclaimer, meta tags, JSON-LD, legal pages, and webhooks.
 */
export const site = {
  name: "417 Quote Hub",
  shortName: "Quote Hub",
  domain: "417quotehub.com",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://417quotehub.com").replace(/\/$/, ""),
  email: "quotes@417quotehub.com",
  areaCode: "417",
  region: "Southwest Missouri",
  regionNickname: "the Ozarks",
  state: "MO",
  stateName: "Missouri",
  /** The trade shown on the homepage and at /services/[city]. Must match a slug in trades.ts. */
  primaryTradeSlug: "concrete",
  /**
   * The hard cap: a homeowner's request is NEVER shared with more than this many contractors.
   * Used in consent text, legal pages, and every "X pros max" promise.
   */
  maxQuotes: 3,
  /** How the number of quotes is described in homeowner-facing headlines and CTAs. */
  quoteRange: "2–3",
  guaranteeName: "3-Quote Max Guarantee",
  tagline: "The 3-Quote Max Guarantee for Southwest Missouri homeowners",
  legalLastUpdated: "November 21, 2026",
} as const;

export const disclaimer = `${site.name} is a free local referral and quote-matching service connecting homeowners with independent, third-party contractors in Southwest Missouri. We do not perform physical construction or trade work, nor do we guarantee or warrant the work performed by independent contractors.`;
