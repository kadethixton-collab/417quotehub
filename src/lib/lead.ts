/**
 * Shared lead + partner validation, used by both the client forms and the API routes.
 */
export const TIMELINES = [
  { id: "asap", label: "ASAP", description: "It's urgent" },
  { id: "2-weeks", label: "Within 2 Weeks", description: "Ready to move soon" },
  { id: "1-2-months", label: "Within 1–2 Months", description: "Planning ahead" },
  { id: "planning", label: "Just Planning", description: "Gathering prices" },
] as const;

export type LeadInput = {
  trade: string;
  projectType: string;
  timeline: string;
  city: string;
  zip: string;
  fullName: string;
  phone: string;
  email: string;
  note?: string;
  /** Public URLs of uploaded project photos (max 3). */
  photos?: string[];
  consent: boolean;
  sourcePage?: string;
  /** Honeypot — must stay empty. */
  company?: string;
  /** ms timestamp when the form was rendered (basic bot check). */
  startedAt?: number;
};

export type PartnerInput = {
  companyName: string;
  contactName: string;
  phone: string;
  email: string;
  trade: string;
  yearsInBusiness: string;
  serviceCities: string[];
  website?: string;
  insured: boolean;
  message?: string;
  company_url?: string; // honeypot
};

export const digitsOnly = (v: string) => v.replace(/\D/g, "");

export function normalizePhone(v: string): string | null {
  let d = digitsOnly(v);
  if (d.length === 11 && d.startsWith("1")) d = d.slice(1);
  if (d.length !== 10) return null;
  // NANP: area code and exchange can't start with 0 or 1
  if (/^[01]/.test(d) || /^[01]/.test(d.slice(3))) return null;
  return d;
}

export function formatPhone(v: string): string {
  const d = digitsOnly(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
/** 417-area ZIPs in Southwest Missouri fall in the 646xx–658xx range. */
export const isSwMoZip = (v: string) => /^6(4[6-9]|5[0-8])\d{2}$/.test(v.trim());

export type FieldErrors = Partial<Record<string, string>>;

export function validateContact(input: Pick<LeadInput, "fullName" | "phone" | "email" | "consent">): FieldErrors {
  const e: FieldErrors = {};
  if (input.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  if (!normalizePhone(input.phone)) e.phone = "Please enter a valid 10-digit phone number.";
  if (!isEmail(input.email)) e.email = "Please enter a valid email address.";
  if (!input.consent) e.consent = "Please check the box so your 2 matched pros can contact you.";
  return e;
}

export function validateLead(input: LeadInput): FieldErrors {
  const e: FieldErrors = {};
  if (!input.trade) e.trade = "Missing trade.";
  if (!input.projectType) e.projectType = "Please choose a project type.";
  if (!input.timeline) e.timeline = "Please choose a timeline.";
  if (!input.city) e.city = "Please choose your city.";
  if (!isSwMoZip(input.zip)) e.zip = "Please enter a valid Southwest Missouri ZIP code.";
  if ((input.note ?? "").length > 1000) e.note = "Please keep your note under 1,000 characters.";
  return { ...e, ...validateContact(input) };
}

export function validatePartner(input: PartnerInput): FieldErrors {
  const e: FieldErrors = {};
  if (input.companyName.trim().length < 2) e.companyName = "Please enter your company name.";
  if (input.contactName.trim().length < 2) e.contactName = "Please enter your name.";
  if (!normalizePhone(input.phone)) e.phone = "Please enter a valid 10-digit phone number.";
  if (!isEmail(input.email)) e.email = "Please enter a valid email address.";
  if (!input.trade) e.trade = "Please choose your trade.";
  if (!input.yearsInBusiness) e.yearsInBusiness = "Please choose one.";
  if (!input.serviceCities?.length) e.serviceCities = "Choose at least one city you serve.";
  if (!input.insured) e.insured = "Partners must carry general liability insurance.";
  if ((input.message ?? "").length > 2000) e.message = "Please keep your message under 2,000 characters.";
  return e;
}
