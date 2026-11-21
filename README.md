# 417 QuoteHub

A fast, hyper-local quote-matching site for Southwest Missouri (the 417), built with **Next.js (App Router)** and **Tailwind CSS v4**.

**The 2-Quote Guarantee:** a homeowner submits one request and is matched with **no more than 2** vetted local contractors. They compare prices without being spammed by 5+ call centers.

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

The prompt's `[YOUR BRAND NAME]` and `[YOUR FIRST TRADE]` placeholders are set in config:

| What | Where |
| --- | --- |
| Brand name, email, site URL, max quotes | `src/config/site.ts` |
| Which trade the homepage and `/services/[city]` show | `primaryTradeSlug` in `src/config/site.ts` |
| Trade content (project types, FAQs, partner pricing, per-city copy) | `src/config/trades.ts` |
| Cities (neighborhoods, landmarks, ZIPs, permit offices) | `src/config/cities.ts` |
| Brand colors | `@theme` block in `src/app/globals.css` |

The footer disclaimer, legal pages, meta tags, and JSON-LD all read the brand name from `site.ts`.

## Adding a 2nd or 3rd trade

Everything about a trade lives in **one file: `src/config/trades.ts`**.

1. Copy the `hvac` example entry, which ships disabled, or copy the roofing entry.
2. Fill in `projectTypes` (exactly 4; "Something Else" is added automatically), `faqs`, `localConsiderations`, and `partner` pricing and seats.
3. Set `enabled: true`.

You get these automatically:

- `/services/[city]/[trade]` pages for all 7 cities, statically generated with meta tags and JSON-LD
- Sitemap entries, plus links on `/services`
- The trade in the contractor application's dropdown, with live seat counts

`cityContent` is optional. Without it, city pages use localized templates built from `cities.ts`. Custom copy per city ranks better, so write it when you can (see roofing for examples).

## Lead delivery (webhook)

The quote form POSTs to `/api/submit-lead`. The route validates the request on the server (phone, email, SW-Missouri ZIP, and consent), runs basic bot checks (a honeypot field and a minimum fill time), then forwards clean JSON to `LEAD_WEBHOOK_URL`:

```json
{
  "type": "homeowner_lead",
  "leadId": "uuid",
  "submittedAt": "2026-11-21T00:11:13.520Z",
  "brand": "417 QuoteHub",
  "maxContractors": 2,
  "trade": "roofing",
  "tradeName": "Roofing",
  "projectType": "storm",
  "projectTypeLabel": "Hail / Storm Damage",
  "timeline": "asap",
  "timelineLabel": "ASAP",
  "city": "Nixa",
  "citySlug": "nixa-mo",
  "zip": "65714",
  "fullName": "Jane Doe",
  "phone": "4175551234",
  "email": "jane@example.com",
  "note": "Hail last spring",
  "consent": true,
  "consentText": "I agree to be contacted by up to 2 local contractors…",
  "sourcePage": "/services/nixa-mo",
  "userAgent": "…"
}
```

- **No webhook set:** the lead is logged to the server console (visible in Vercel → Logs) and the homeowner still sees the "You're Matched!" screen.
- **Webhook fails** (non-2xx or a 10-second timeout): the full payload is logged so the lead isn't lost, and the homeowner gets a "please try again" message.

Contractor applications from `/contractors` POST to `/api/submit-partner`. They are forwarded to `PARTNER_WEBHOOK_URL`, or to `LEAD_WEBHOOK_URL` if that is blank, with `"type": "partner_application"`.

Any endpoint that accepts JSON works: Zapier/Make/n8n "Catch Hook", a Slack workflow, GoHighLevel, HubSpot, or your own API. Route on the `type` field.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. The framework is detected as Next.js; no build settings need changing.
3. Under **Settings → Environment Variables**, add:
   - `LEAD_WEBHOOK_URL`: your Zapier/Make/CRM webhook URL
   - `PARTNER_WEBHOOK_URL` (optional)
   - `NEXT_PUBLIC_SITE_URL`: your production URL, e.g. `https://www.yourdomain.com`. It's used for canonical URLs, the sitemap, and JSON-LD.
4. Deploy. Then add your custom domain under **Settings → Domains**.
5. Submit `https://yourdomain.com/sitemap.xml` in Google Search Console.

After changing environment variables, redeploy. `NEXT_PUBLIC_SITE_URL` is baked in at build time.

## Project structure

```
src/
  app/
    page.tsx                         Homepage
    services/page.tsx                Service-area index
    services/[city]/page.tsx         Primary-trade city pages (static)
    services/[city]/[trade]/page.tsx Additional-trade city pages (static)
    contractors/page.tsx             2-Seat Partner Program + application
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

- [ ] Set the brand name, email, and domain in `src/config/site.ts`
- [ ] Set real `partner.monthlyPrice` and `seatsOpen` in `trades.ts`
- [ ] Have a Missouri attorney review `/privacy` and `/terms`, including TCPA consent wording for calls and texts
- [ ] Connect `LEAD_WEBHOOK_URL` and send a test lead
- [ ] Verify the city facts (neighborhoods, landmarks, permit offices) against your local knowledge
