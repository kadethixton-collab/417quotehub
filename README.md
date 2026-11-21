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

## Google Sheet lead log (free): emails partners, builds your monthly report

`integrations/google-sheets/Code.gs` is a Google Apps Script that turns a Google Sheet into your lead back office, with no Zapier or paid tools. For every request it:

- logs the lead to a **Leads** tab, with blank **Outcome** and **Your Notes** columns for you to fill in,
- **emails each matched partner the full lead instantly**, with reply-to set to the homeowner,
- emails you a copy, with the subject flagged **⚠ UNMATCHED** when no partner holds that territory,
- adds a row per partner to **Partner Leads**, which feeds a live **Monthly Report** of leads per partner per month (send each partner their numbers with their invoice) and unmatched leads by territory (the demand you can show when selling seats),
- logs contractor applications to **Partner Applications** and emails you.

**Setup (about 5 minutes):**

1. Create a Google Sheet (use the Google account that should send the emails).
2. **Extensions → Apps Script**, delete the sample code, paste in `Code.gs`, and click **Save**.
3. Edit `CONFIG` at the top. Optionally set `SHARED_SECRET` to a random string.
4. Pick `setup` in the function dropdown, click **Run**, and approve the permissions.
5. **Deploy → New deployment → Web app**. Set *Execute as*: **Me**, *Who has access*: **Anyone**, then **Deploy** and copy the URL.
6. In Vercel, set `LEAD_WEBHOOK_URL` to that URL. If you set a secret, add `?key=YOUR_SECRET`. To also send leads to Zapier, comma-separate the URLs.
7. Redeploy on Vercel, then submit a test request on the live site.

Gmail allows about 100 emails a day on a free account (1,500 on Google Workspace), which covers roughly 30 leads a day. If you edit the script later, use **Deploy → Manage deployments → Edit → New version** so the URL stays the same.

## Analytics & conversion tracking

- **Vercel Web Analytics:** turn it on in the project's **Analytics** tab. Page views and form events are recorded automatically on Vercel.
- **Google Analytics 4 (optional):** set `NEXT_PUBLIC_GA_ID=G-XXXXXXX`. It loads after the page is interactive, so it doesn't slow the site down. Mark `generate_lead` as a key event in GA4 to use it for Google Ads conversion tracking later.

Form funnel events (no names, phones, or emails are ever sent):

| Event | When |
| --- | --- |
| `quote_start` | First click in the form |
| `quote_step_view` | Each step shown (`step`, `step_name`, whether city/service were preset) |
| `quote_validation_error` | Contact step had errors (`fields`) |
| `quote_photo_uploaded` / `quote_photo_error` | Photo upload results |
| `quote_success` + `generate_lead` | Request submitted (`project_type`, `city`, `matched`, `photos`) |
| `quote_error` | Submit failed |
| `mobile_cta_click`, `partner_application` | Sticky CTA taps, contractor applications |

Compare `quote_step_view` counts for steps 1 through 4 to see exactly where homeowners drop off.

## Project photos (optional)

Homeowners can attach up to 3 photos on the last step. Photos are resized to 1600px in the browser, which keeps uploads fast on mobile data and removes GPS location data from phone pictures. They're stored in Vercel Blob, and the links are included in the lead and in partner emails.

To enable it: Vercel → **Storage → Create → Blob**, then connect it to this project (this adds `BLOB_READ_WRITE_TOKEN`) and **redeploy**. Without the token the photo field stays hidden.

## Spam protection

The forms include a hidden honeypot field, a minimum fill time, server-side validation, and a per-IP rate limit (5 requests per 10 minutes). Only photo links from your own Blob store are accepted. For heavy abuse, add a rate-limit rule in Vercel's Firewall.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo. The framework is detected as Next.js; no build settings need changing.
3. Under **Settings → Environment Variables**, add:
   - `LEAD_WEBHOOK_URL`: your Google Sheet web app URL (see above), plus any Zapier/CRM hooks, comma-separated
   - `PARTNER_WEBHOOK_URL` (optional)
   - `NEXT_PUBLIC_SITE_URL`: `https://417quotehub.com`.
   - Optional: `NEXT_PUBLIC_GA_ID`. `BLOB_READ_WRITE_TOKEN` is added automatically when you connect a Blob store. It's used for canonical URLs, the sitemap, and JSON-LD.
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

**Must do**
- [ ] Deploy to Vercel and connect `417quotehub.com` (and redirect `www`)
- [ ] Set up the Google Sheet lead log and put its URL in `LEAD_WEBHOOK_URL`
- [ ] Submit a test request on the live site and confirm the sheet row and your email arrive
- [ ] Set the real retainer price in `trades.ts` (`defaultPartnerPlan.monthlyPrice` is a **$597/mo** placeholder)
- [ ] Have a Missouri attorney review `/privacy` and `/terms`, including TCPA consent wording for calls and texts
- [ ] Make sure `quotes@417quotehub.com` actually receives mail

**Should do**
- [ ] Turn on Vercel Web Analytics; add GA4 if you plan to run Google Ads
- [ ] Connect a Vercel Blob store to enable photo uploads
- [ ] Submit `https://417quotehub.com/sitemap.xml` in Google Search Console
- [ ] Verify the city facts (neighborhoods, landmarks, permit offices) against your local knowledge
- [ ] Share the homepage link once to check the social preview image

**When a contractor pays**
- [ ] Add them to `src/config/partners.ts`, then commit. Vercel redeploys and their leads start routing
- [ ] Do a test lead in their territory and confirm they receive the email
