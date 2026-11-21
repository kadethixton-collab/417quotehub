import { NextResponse } from "next/server";
import { site } from "@/config/site";
import { territoryBySlug } from "@/config/cities";
import { tradeBySlug } from "@/config/trades";
import { TIMELINES, normalizePhone, validateLead, type LeadInput } from "@/lib/lead";
import { forwardToWebhook } from "@/lib/webhook";
import { matchPartners, resolveCity } from "@/lib/routing";

export const runtime = "nodejs";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const input: LeadInput = {
    trade: str(body.trade, 50),
    projectType: str(body.projectType, 50),
    timeline: str(body.timeline, 50),
    city: str(body.city, 80),
    zip: str(body.zip, 10),
    fullName: str(body.fullName, 120),
    phone: str(body.phone, 30),
    email: str(body.email, 200),
    note: str(body.note, 1000),
    consent: body.consent === true,
    sourcePage: str(body.sourcePage, 300),
    company: str(body.company, 200),
    startedAt: typeof body.startedAt === "number" ? body.startedAt : undefined,
  };

  // Bot checks: honeypot filled, or form completed impossibly fast. Pretend success.
  if (input.company || (input.startedAt && Date.now() - input.startedAt < 2500)) {
    return NextResponse.json({ ok: true });
  }

  const trade = tradeBySlug(input.trade);
  const errors = validateLead(input);
  if (!trade) errors.trade = "Unknown trade.";
  const projectType = trade?.projectTypes.find((p) => p.id === input.projectType);
  if (trade && input.projectType !== "other" && !projectType) errors.projectType = "Unknown project type.";
  const timeline = TIMELINES.find((t) => t.id === input.timeline);
  if (!timeline) errors.timeline = "Unknown timeline.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const city = resolveCity(input.city, input.zip);
  const territory = city ? territoryBySlug(city.territory) : undefined;
  const matched = matchPartners(trade!.slug, territory?.slug);
  const lead = {
    type: "homeowner_lead",
    leadId: crypto.randomUUID(),
    submittedAt: new Date().toISOString(),
    brand: site.name,
    maxContractors: site.maxQuotes,
    trade: trade!.slug,
    tradeName: trade!.name,
    projectType: input.projectType,
    projectTypeLabel: projectType?.label ?? "Other",
    timeline: input.timeline,
    timelineLabel: timeline!.label,
    city: city?.name ?? "Other 417",
    citySlug: city?.slug ?? "other",
    territory: territory?.slug ?? null,
    territoryName: territory?.name ?? null,
    zip: input.zip,
    fullName: input.fullName,
    phone: normalizePhone(input.phone),
    email: input.email.toLowerCase(),
    note: input.note || null,
    consent: true,
    consentText: `I agree to be contacted by up to ${site.maxQuotes} local contractors by phone, text, or email about my project.`,
    sourcePage: input.sourcePage || null,
    userAgent: req.headers.get("user-agent"),
    // Routing: the partners (max site.maxQuotes) who hold a seat in this trade + territory.
    routing: matched.length ? "auto" : "manual",
    matchedPartners: matched.map((p) => ({ id: p.id, company: p.company, phone: p.phone, email: p.email })),
  };

  const result = await forwardToWebhook(process.env.LEAD_WEBHOOK_URL, "lead", lead);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "We couldn't submit your request just now. Please try again in a moment." },
      { status: 502 },
    );
  }
  // Deliver to each matched partner's own webhook, if they have one. Failures are logged,
  // not shown to the homeowner — the main webhook above already has the full lead.
  await Promise.allSettled(
    matched
      .filter((p) => p.webhookUrl)
      .map((p) => forwardToWebhook(p.webhookUrl, `lead→${p.id}`, { ...lead, deliveredTo: p.id })),
  );

  return NextResponse.json({
    ok: true,
    leadId: lead.leadId,
    // Company names only — shown on the success screen so homeowners recognize the calls.
    matched: matched.map((p) => p.company),
  });
}
