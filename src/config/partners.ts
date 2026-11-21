/**
 * ───────────────────────────────────────────────────────────────────────────
 *  PARTNER ROSTER — who receives leads, and which seats are taken.
 * ───────────────────────────────────────────────────────────────────────────
 * Add a contractor here when they sign up for a territory seat:
 *   - Their leads route automatically (every homeowner request in their trade
 *     + territory is sent to them, up to site.maxQuotes partners per lead).
 *   - The open-seat counts on /contractors update automatically.
 *   - Homeowners see the partner's company name on the "You're Matched!" screen
 *     so they recognize the calls.
 *
 * Set `active: false` to pause a partner (e.g. unpaid retainer) without deleting them.
 * `webhookUrl` is optional: if set, each matched lead is also POSTed there
 * (e.g. a Zapier hook that texts/emails the contractor or drops it into their CRM).
 */
export type Partner = {
  id: string;
  company: string;
  /** Trade slug from trades.ts. */
  trade: string;
  /** Territory slugs from cities.ts this partner holds a seat in. */
  territories: string[];
  /** Business contact info — included in the lead payload so leads can be forwarded. */
  phone: string;
  email: string;
  webhookUrl?: string;
  active: boolean;
  /** Lower numbers are matched first if a territory ever has more partners than the quote cap. */
  priority?: number;
};

export const partners: Partner[] = [
  // Example — copy, fill in, and set active: true.
  // {
  //   id: "ozark-concrete-co",
  //   company: "Ozark Concrete Co.",
  //   trade: "concrete",
  //   territories: ["christian-county", "springfield"],
  //   phone: "4175550100",
  //   email: "office@example.com",
  //   webhookUrl: "",
  //   active: true,
  // },
];
