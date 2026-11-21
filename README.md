# 417 Quote Hub

A fast, hyper-local quote-matching site for Southwest Missouri (the 417), built with **Next.js (App Router)** and **Tailwind CSS v4**.

**The 3-Quote Max Guarantee:** a homeowner submits one request and is matched with **2–3** vetted local concrete & driveway contractors, never more than 3. They compare prices without being spammed by 5+ call centers.

Live domain: **417quotehub.com** · Contact: **quotes@417quotehub.com**

Service area: Springfield, Nixa, Ozark, Republic, Willard, Battlefield, and Rogersville, MO.

---

## Quick start

```bash
npm install
cp .env.example .env.local   # optional; leads print to the console when no webhook is set
npm run dev                  # http://localhost:3000
```

Production build: `npm run build && npm start`. Type-check only: `npm run lint`.

## Changing the brand or trade

The brand (417 Quote Hub), the primary trade (Concrete & Driveway), and the quote cap are set in config:

| What | Where |
| --- | --- |
| Brand name, email, domain, quote cap (`maxQuotes: 3`, `quoteRange: "2–3"`) | `src/config/site.ts` |
| Which trade the homepage and `/services/[city]` show | `primaryTradeSlug` in `src/config/site.ts` |
| Trade content (project types, FAQs, retainer price & seats, per-city copy) | `src/config/trades.ts` |
| Cities (neighborhoods, landmarks, ZIPs, permit offices) | `src/config/cities.ts` |
| Brand colors | `@theme` block in `src/app/globals.css` |

The footer disclaimer, legal pages, meta tags, and JSON-LD all read the brand name from `site.ts`.

## Adding a 2nd or 3rd trade

Everything about a trade lives in **one file: `src/config/trades.ts`**.

1. Copy the `roofing` example entry, which ships disabled, or copy the concrete entry.
2. Fill in `projectTypes` (exactly 4; "Something Else" is added automatically), `notePlaceholder`, `faqs`, `localConsiderations`, and `partner` plans.
3. Set `enabled: true`.

You get these automatically:

- `/services/[city]/[trade]` hub pages and `/services/[city]/[service]` pages for all 7 cities, statically generated with meta tags and JSON-LD
- Sitemap entries, plus links on `/services`
- The trade in the contractor application's dropdown

`cityContent` is optional. Without it, city pages use localized templates built from `cities.ts`. Custom copy per city ranks better, so write it when you can (see concrete for examples).

## Territories, partners & lead routing

This is a rank-and-rent model: you own the site and its rankings, and contractors rent **seats** for a flat monthly retainer.

- **Territories** (`src/config/cities.ts`): the 7 cities are grouped into 5 rentable territories: Springfield · Nixa & Ozark · Republic & Battlefield · Willard · Rogersville.
- **Seats** (`src/config/trades.ts`): each trade has `seatsPerTerritory` seats (3, matching the quote cap) at `monthlyPrice` per territory. Use `territoryPrices` to charge more in a bigger market, e.g. `{ springfield: 797 }`.
- **Partners** (`src/config/partners.ts`): when a contractor pays, add them with the trade and territories they hold. That's all it takes:
  - every homeowner lead in their trade and territory includes them in `matchedPartners` (up to 3 per lead),
  - the open-seat table on `/contractors` updates and switches to "waitlist" when a territory is full,
  - homeowners see the partner's company name on the "You're Matched!" screen, so they pick up the call,
  - if the partner has a `webhookUrl`, each lead is also POSTed straight to it (for example a Zapier hook that texts them).
- Set `active: false` to pause a partner who stops paying. Their seat reopens and their leads stop.
- Leads with no partner in their territory arrive with `"routing": "manual"` so you can handle them yourself or use them to sell that territory's seats.

## Pages

Each trade generates:

- `/services/[city]`: city hub page (7)
- `/services/[city]/[service]`: one page per project type per city (4 × 7 = 28). These target searches like "concrete driveway Nixa" or "concrete leveling Springfield". The form on each one starts with the service already selected, which skips a step.

## Lead delivery (webhook)

The quote form POSTs to `/api/submit-lead`. The route validates the request on the server (phone, email, SW-Missouri ZIP, and consent), runs basic bot checks (a honeypot field and a minimum fill time), then forwards clean JSON to `LEAD_WEBHOOK_URL`:

```json
{
  "type": "homeowner_lead",
  "leadId": "uuid",
  "submittedAt": "2026-11-21T00:11:13.520Z",
  "brand": "417 Quote Hub",
  "maxContractors": 3,
  "trade": "concrete",
  "tradeName": "Concrete & Driveway",
  "projectType": "driveway",
  "projectTypeLabel": "Concrete Driveways",
  "timeline": "asap",
  "timelineLabel": "ASAP",
  "city": "Nixa",
  "citySlug": "nixa-mo",
  "territory": "christian-county",
  "territoryName": "Nixa & Ozark",
  "zip": "65714",
  "fullName": "Jane Doe",
  "phone": "4175551234",
  "email": "jane@example.com",
  "note": "Replace cracked 2-car driveway",
  "consent": true,
  "consentText": "I agree to be contacted by up to 3 local contractors…",
  "sourcePage": "/services/nixa-mo",
  "userAgent": "…",
  "routing": "auto",
  "matchedPartners": [
    { "id": "ozark-concrete-co", "company": "Ozark Concrete Co.", "phone": "4175550100", "email": "office@example.com" }
  ]
}
```

- **No webhook set:** the lead is logged to the server console (visible in Vercel → Logs) and the homeowner still sees the "You're Matched!" screen.
- **Webhook fails** (non-2xx or a 10-second timeout): the full payload is logged so the lead isn't lost, and the homeowner gets a "please try again" message.

Contractor applications from `/contractors` POST to `/api/submit-partner`. They are forwarded to `PARTNER_WEBHOOK_URL`, or to `LEAD_WEBHOOK_URL` if that is blank, with `"type": "partner_application"`, the plan name and monthly price, and a `seatStatus` of `seat_available` or `waitlist`.

Any endpoint that accepts JSON works: Zapier/Make/n8n "Catch Hook", a Slack workflow, GoHighLevel, HubSpot, or your own API. Route on the `type` field.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. The framework is detected as Next.js; no build settings need changing.
3. Under **Settings → Environment Variables**, add:
   - `LEAD_WEBHOOK_URL`: your Zapier/Make/CRM webhook URL
   - `PARTNER_WEBHOOK_URL` (optional)
   - `NEXT_PUBLIC_SITE_URL`: `https://417quotehub.com`. It's used for canonical URLs, the sitemap, and JSON-LD.
4. Deploy. Then add `417quotehub.com` (and `www.417quotehub.com`, redirecting to the apex) under **Settings → Domains**.
5. Submit `https://417quotehub.com/sitemap.xml` in Google Search Console.

After changing environment variables, redeploy. `NEXT_PUBLIC_SITE_URL` is baked in at build time.

## Project structure

```
src/
  app/
    page.tsx                         Homepage
    services/page.tsx                Service-area index
    services/[city]/page.tsx         Primary-trade city pages (static)
    services/[city]/[slug]/page.tsx  Service × city pages + additional-trade hubs (static)
    contractors/page.tsx             Monthly retainer offer + application
    privacy/, terms/                 Legal pages
    api/submit-lead/route.ts         Homeowner lead → webhook
    api/submit-partner/route.ts      Contractor application → webhook
    sitemap.ts, robots.ts
  components/
    QuoteForm.tsx                    4-step form (client)
    CityLanding.tsx                  Shared city page template + metadata + JSON-LD
    MobileCtaBar.tsx                 Sticky mobile CTA (hides when the form is on screen)
    ...
  config/
    site.ts                          Brand + global settings
    trades.ts                        ← add trades here
    partners.ts                      ← add paying contractors here
    cities.ts                        Local facts per city
  lib/
    lead.ts                          Shared client/server validation
    content.ts                       Copy builders + fallbacks
    webhook.ts                       Webhook forwarding with console fallback
```

## Performance notes

- Every page is statically pre-rendered. Only the two API routes run on the server.
- There are no web fonts, no images, and no third-party scripts. It uses the system font stack and inline SVG icons.
- The FAQ accordions use native `<details>`, so they need no JavaScript. The quote form, partner form, and mobile CTA bar are the only client components.
- Local Lighthouse run (mobile emulation): Performance 98, Accessibility 100, Best Practices 100, SEO 100.

Adding analytics or chat widgets will lower those scores. Load them with `next/script` and `strategy="lazyOnload"`.

## Before launch: checklist

- [ ] Set the real retainer price in `trades.ts` (`defaultPartnerPlan.monthlyPrice` is a **$597/mo** placeholder)
- [ ] Add each paying contractor to `src/config/partners.ts`. Seats and routing update automatically
- [ ] Have a Missouri attorney review `/privacy` and `/terms`, including TCPA consent wording for calls and texts
- [ ] Connect `LEAD_WEBHOOK_URL` and send a test lead
- [ ] Verify the city facts (neighborhoods, landmarks, permit offices) against your local knowledge
