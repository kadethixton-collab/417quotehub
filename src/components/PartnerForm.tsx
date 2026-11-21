"use client";

import { useState, type FormEvent } from "react";
import { formatPhone, validatePartner, type FieldErrors, type PartnerInput } from "@/lib/lead";
import { Icon } from "./Icons";
import { track } from "@/lib/analytics";

type Props = {
  /** Open seats per territory for each trade. */
  trades: { slug: string; name: string; openByTerritory: Record<string, number> }[];
  cities: { slug: string; name: string; territory: string }[];
};

export default function PartnerForm({ trades, cities }: Props) {
  const [form, setForm] = useState<PartnerInput>({
    companyName: "",
    contactName: "",
    phone: "",
    email: "",
    trade: trades.length === 1 ? trades[0].slug : "",
    yearsInBusiness: "",
    serviceCities: [],
    website: "",
    insured: false,
    message: "",
    company_url: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [seatStatus, setSeatStatus] = useState("");
  const [serverError, setServerError] = useState("");

  const set = <K extends keyof PartnerInput>(k: K, v: PartnerInput[K]) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k as string]) setErrors(({ [k as string]: _omit, ...rest }) => rest);
  };
  const selectedTrade = trades.find((t) => t.slug === form.trade);
  const isFull = (citySlug: string) => {
    const c = cities.find((x) => x.slug === citySlug);
    return !!selectedTrade && !!c && (selectedTrade.openByTerritory[c.territory] ?? 0) <= 0;
  };
  // Waitlist only when every city the applicant serves is in a territory with no open seats.
  const waitlist = form.serviceCities.length > 0 && form.serviceCities.every(isFull);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validatePartner(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/submit-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setSeatStatus(data.seatStatus ?? "");
        track("partner_application", { trade: form.trade, cities: form.serviceCities.length, seat_status: data.seatStatus ?? "" });
        setStatus("done");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || "Please check the highlighted fields.");
      setStatus("error");
    } catch {
      setServerError("Network error — please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-xl ring-1 ring-slate-200" role="status">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-8 w-8" strokeWidth={2.5} />
        </div>
        <h3 className="text-2xl font-extrabold text-slate-900">Application received!</h3>
        <p className="mt-2 text-slate-600">
          {seatStatus === "waitlist"
            ? "All seats in the territories you serve are currently filled, so you're on the waitlist. We'll reach out the moment a seat opens."
            : "We'll review your company and reach out within 2 business days to verify your details and get you set up."}
        </p>
      </div>
    );
  }

  const input =
    "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-sm focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200";
  const label = "text-sm font-semibold text-slate-700";
  const err = (k: string) => (errors[k] ? <p className="mt-1 text-sm font-medium text-red-600">{errors[k]}</p> : null);

  return (
    <form onSubmit={onSubmit} noValidate className="relative space-y-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-200 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="pf-company" className={label}>Company name</label>
          <input id="pf-company" autoComplete="organization" value={form.companyName} onChange={(e) => set("companyName", e.target.value)} className={input} aria-invalid={!!errors.companyName} />
          {err("companyName")}
        </div>
        <div>
          <label htmlFor="pf-contact" className={label}>Your name</label>
          <input id="pf-contact" autoComplete="name" value={form.contactName} onChange={(e) => set("contactName", e.target.value)} className={input} aria-invalid={!!errors.contactName} />
          {err("contactName")}
        </div>
        <div>
          <label htmlFor="pf-phone" className={label}>Phone</label>
          <input id="pf-phone" type="tel" autoComplete="tel-national" value={form.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} className={input} aria-invalid={!!errors.phone} />
          {err("phone")}
        </div>
        <div>
          <label htmlFor="pf-email" className={label}>Email</label>
          <input id="pf-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={input} aria-invalid={!!errors.email} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="pf-trade" className={label}>Trade</label>
          <select id="pf-trade" value={form.trade} onChange={(e) => set("trade", e.target.value)} className={input} aria-invalid={!!errors.trade}>
            {trades.length > 1 && <option value="">Select…</option>}
            {trades.map((t) => (
              <option key={t.slug} value={t.slug}>
                {t.name}
              </option>
            ))}
          </select>
          {err("trade")}
        </div>
        <div>
          <label htmlFor="pf-years" className={label}>Years in business</label>
          <select id="pf-years" value={form.yearsInBusiness} onChange={(e) => set("yearsInBusiness", e.target.value)} className={input} aria-invalid={!!errors.yearsInBusiness}>
            <option value="">Select…</option>
            <option value="<2">Less than 2</option>
            <option value="2-5">2–5</option>
            <option value="5-10">5–10</option>
            <option value="10+">10+</option>
          </select>
          {err("yearsInBusiness")}
        </div>
      </div>

      <fieldset>
        <legend className={label}>Cities you serve</legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {cities.map((c) => {
            const checked = form.serviceCities.includes(c.slug);
            return (
              <label key={c.slug} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm ${checked ? "border-brand-600 bg-brand-50" : "border-slate-200"}`}>
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-brand-600"
                  checked={checked}
                  onChange={(e) =>
                    set("serviceCities", e.target.checked ? [...form.serviceCities, c.slug] : form.serviceCities.filter((s) => s !== c.slug))
                  }
                />
                {c.name}
                {isFull(c.slug) && <span className="ml-auto text-xs font-semibold text-amber-700">Full</span>}
              </label>
            );
          })}
        </div>
        {err("serviceCities")}
      </fieldset>

      <div>
        <label htmlFor="pf-site" className={label}>Website or Google Business profile <span className="font-normal text-slate-500">(optional)</span></label>
        <input id="pf-site" type="url" inputMode="url" value={form.website} onChange={(e) => set("website", e.target.value)} className={input} />
      </div>
      <div>
        <label htmlFor="pf-msg" className={label}>Anything else? <span className="font-normal text-slate-500">(optional)</span></label>
        <textarea id="pf-msg" rows={3} value={form.message} onChange={(e) => set("message", e.target.value)} className={input} />
      </div>
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <input tabIndex={-1} autoComplete="off" value={form.company_url} onChange={(e) => set("company_url", e.target.value)} />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm text-slate-600">
          <input type="checkbox" checked={form.insured} onChange={(e) => set("insured", e.target.checked)} className="mt-0.5 h-5 w-5 accent-brand-600" />
          My company carries general liability insurance and holds all licenses/registrations required by the cities and counties I work in.
        </label>
        {err("insured")}
      </div>
      {serverError && <p className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{serverError}</p>}
      <button type="submit" disabled={status === "submitting"} className="w-full rounded-xl bg-accent-500 py-4 text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400 disabled:opacity-60">
        {status === "submitting" ? "Submitting…" : waitlist ? "Join the Waitlist" : "Apply to Claim a Seat"}
      </button>
    </form>
  );
}
