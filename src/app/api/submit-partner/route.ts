import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { cities } from "@/config/cities";
import { tradeBySlug } from "@/config/trades";
import { normalizePhone, validatePartner, type PartnerInput } from "@/lib/lead";
import { forwardToWebhook } from "@/lib/webhook";

export const runtime = "nodejs";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const validSlugs = new Set(cities.map((c) => c.slug));
  const input: PartnerInput = {
    companyName: str(body.companyName, 150),
    contactName: str(body.contactName, 120),
    phone: str(body.phone, 30),
    email: str(body.email, 200),
    trade: str(body.trade, 50),
    yearsInBusiness: str(body.yearsInBusiness, 20),
    serviceCities: Array.isArray(body.serviceCities)
      ? body.serviceCities.filter((s): s is string => typeof s === "string" && validSlugs.has(s))
      : [],
    website: str(body.website, 200),
    insured: body.insured === true,
    message: str(body.message, 2000),
    company_url: str(body.company_url, 200),
  };

  if (input.company_url) return NextResponse.json({ ok: true });

  const trade = tradeBySlug(input.trade);
  const errors = validatePartner(input);
  if (!trade) errors.trade = "Unknown trade.";
  if (Object.keys(errors).length) return NextResponse.json({ ok: false, errors }, { status: 422 });

  const application = {
    type: "partner_application",
    applicationId: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    brand: site.name,
    trade: trade!.slug,
    tradeName: trade!.name,
    plan: trade!.partner.name,
    monthlyPrice: trade!.partner.monthlyPrice,
    seatStatus: trade!.partner.seatsOpen > 0 ? "seat_available" : "waitlist",
    companyName: input.companyName,
    contactName: input.contactName,
    phone: normalizePhone(input.phone),
    email: input.email.toLowerCase(),
    yearsInBusiness: input.yearsInBusiness,
    serviceCities: input.serviceCities.map((s) => cities.find((c) => c.slug === s)!.name),
    website: input.website || null,
    insured: true,
    message: input.message || null,
  };

  const result = await forwardToWebhook(
    process.env.PARTNER_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL,
    "partner",
    application,
  );
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: "Submission failed. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true, seatStatus: application.seatStatus });
}
