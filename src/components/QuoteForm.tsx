"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Trade } from "@/config/trades";
import { Icon } from "./Icons";
import {
  TIMELINES,
  digitsOnly,
  formatPhone,
  isSwMoZip,
  validateContact,
  type FieldErrors,
} from "@/lib/lead";

type CityOption = { slug: string; name: string; zips: string[] };

type Props = {
  trade: Pick<Trade, "slug" | "name" | "proPlural" | "projectTypes">;
  cities: CityOption[];
  /** Pre-select a city (used on city landing pages). */
  defaultCity?: string;
  brandName: string;
  maxQuotes: number;
};

const STEPS = ["Project", "Timeline", "Location", "Contact"] as const;

export default function QuoteForm({ trade, cities, defaultCity, brandName, maxQuotes }: Props) {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("");
  const [timeline, setTimeline] = useState("");
  const [city, setCity] = useState(defaultCity ?? "");
  const [zip, setZip] = useState(() => {
    const c = cities.find((x) => x.slug === defaultCity);
    return c && c.zips.length === 1 ? c.zips[0] : "";
  });
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // honeypot
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "done" | "error">("idle");
  const [serverError, setServerError] = useState("");
  const isDone = status === "done";
  const startedAt = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the new step's heading for keyboard & screen-reader users.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const panel = panelRef.current;
    if (!panel) return;
    panel.querySelector<HTMLElement>("[data-step-heading]")?.focus({ preventScroll: true });
    const top = panel.getBoundingClientRect().top;
    if (isDone || top < 72 || top > window.innerHeight * 0.6) {
      panel.scrollIntoView({ behavior: "smooth", block: isDone ? "center" : "start" });
    }
  }, [step, isDone]);

  const allProjectTypes = [
    ...trade.projectTypes,
    { id: "other", label: "Something Else", description: "Tell us in step 4", icon: "plus" as const },
  ];

  const clear = (k: string) => errors[k] && setErrors(({ [k]: _omit, ...rest }) => rest);

  const go = (n: number) => {
    setErrors({});
    setStep(n);
  };

  const nextFromLocation = () => {
    const e: FieldErrors = {};
    if (!city) e.city = "Please choose your city.";
    if (!isSwMoZip(zip)) e.zip = "Please enter a valid 417-area ZIP code (e.g. 65804).";
    setErrors(e);
    if (!Object.keys(e).length) setStep(3);
  };

  const onCityChange = (slug: string) => {
    setCity(slug);
    const c = cities.find((x) => x.slug === slug);
    if (c && c.zips.length === 1) setZip(c.zips[0]);
    else if (c && zip && !c.zips.includes(zip)) setZip("");
  };

  async function onSubmit(ev: FormEvent) {
    ev.preventDefault();
    if (step !== 3) return;
    const e = validateContact({ fullName, phone, email, consent });
    setErrors(e);
    if (Object.keys(e).length) return;

    setStatus("submitting");
    setServerError("");
    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade: trade.slug,
          projectType,
          timeline,
          city,
          zip,
          fullName,
          phone,
          email,
          note,
          consent,
          company,
          startedAt: startedAt.current,
          sourcePage: window.location.pathname,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        return;
      }
      if (data.errors) setErrors(data.errors);
      setServerError(data.error || "Please check the highlighted fields and try again.");
      setStatus("error");
    } catch {
      setServerError("Network error — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div ref={panelRef} className="rounded-2xl bg-white p-6 text-center shadow-xl ring-1 ring-slate-200 sm:p-8" role="status">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <Icon name="check" className="h-9 w-9" strokeWidth={2.5} />
        </div>
        <h2 tabIndex={-1} data-step-heading className="text-2xl font-extrabold text-slate-900 outline-none">
          You&apos;re Matched!
        </h2>
        <p className="mt-3 text-lg text-slate-700">
          Expect calls/texts from up to {maxQuotes} local 417 pros shortly.
        </p>
        <ul className="mt-6 space-y-2 text-left text-sm text-slate-600">
          <li className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" /> Most homeowners hear back within one business day.</li>
          <li className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" /> Your info goes to {maxQuotes} pros max — never a call center.</li>
          <li className="flex gap-2"><Icon name="check" className="h-5 w-5 shrink-0 text-emerald-600" /> Compare both quotes. There&apos;s zero obligation to hire.</li>
        </ul>
      </div>
    );
  }

  const progress = ((step + 1) / STEPS.length) * 100;
  const optionBtn =
    "group flex w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 sm:p-4";
  const optionState = (active: boolean) =>
    active ? "border-brand-600 bg-brand-50" : "border-slate-200 bg-white hover:border-brand-400 hover:bg-slate-50";
  const input =
    "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-base text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-200";
  const err = (k: string) =>
    errors[k] ? (
      <p id={`${k}-error`} className="mt-1 text-sm font-medium text-red-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="relative rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-200 sm:p-7"
      aria-label={`Get ${maxQuotes} free ${trade.name.toLowerCase()} quotes`}
    >
      {/* Progress */}
      <div className="mb-5">
        <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-500">
          <span>
            Step {step + 1} of {STEPS.length}: <span className="text-brand-700">{STEPS[step]}</span>
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-slate-100"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Form progress"
        >
          <div className="h-full rounded-full bg-brand-600 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div ref={panelRef} aria-live="polite" className="scroll-mt-24">
        {step === 0 && (
          <fieldset>
            <legend tabIndex={-1} data-step-heading className="mb-3 text-lg font-bold text-slate-900 outline-none sm:mb-4 sm:text-xl">
              What kind of {trade.name.toLowerCase()} project?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {allProjectTypes.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-pressed={projectType === p.id}
                  onClick={() => {
                    setProjectType(p.id);
                    go(1);
                  }}
                  className={`${optionBtn} ${optionState(projectType === p.id)} ${p.id === "other" ? "sm:col-span-2" : ""}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={p.icon} />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{p.label}</span>
                    <span className="block text-sm text-slate-500">{p.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend tabIndex={-1} data-step-heading className="mb-3 text-lg font-bold text-slate-900 outline-none sm:mb-4 sm:text-xl">
              When do you want to get started?
            </legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {TIMELINES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  aria-pressed={timeline === t.id}
                  onClick={() => {
                    setTimeline(t.id);
                    go(2);
                  }}
                  className={`${optionBtn} ${optionState(timeline === t.id)}`}
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
                    <Icon name={t.id === "asap" ? "bolt" : t.id === "planning" ? "clipboard" : "calendar"} />
                  </span>
                  <span>
                    <span className="block font-semibold text-slate-900">{t.label}</span>
                    <span className="block text-sm text-slate-500">{t.description}</span>
                  </span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend tabIndex={-1} data-step-heading className="mb-3 text-lg font-bold text-slate-900 outline-none sm:mb-4 sm:text-xl">
              Where is the project?
            </legend>
            <div className="space-y-4">
              <div>
                <label htmlFor="qf-city" className="text-sm font-semibold text-slate-700">City</label>
                <select
                  id="qf-city"
                  value={city}
                  onChange={(e) => { onCityChange(e.target.value); clear("city"); }}
                  className={input}
                  aria-invalid={!!errors.city}
                  aria-describedby={errors.city ? "city-error" : undefined}
                >
                  <option value="">Select your city…</option>
                  {cities.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.name}, MO</option>
                  ))}
                  <option value="other">Other 417 ZIP</option>
                </select>
                {err("city")}
              </div>
              <div>
                <label htmlFor="qf-zip" className="text-sm font-semibold text-slate-700">ZIP code</label>
                <input
                  id="qf-zip"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={5}
                  placeholder="e.g. 65804"
                  value={zip}
                  onChange={(e) => { setZip(digitsOnly(e.target.value).slice(0, 5)); clear("zip"); }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      nextFromLocation();
                    }
                  }}
                  className={input}
                  aria-invalid={!!errors.zip}
                  aria-describedby={errors.zip ? "zip-error" : undefined}
                />
                {err("zip")}
              </div>
            </div>
          </fieldset>
        )}

        {step === 3 && (
          <fieldset>
            <legend tabIndex={-1} data-step-heading className="mb-1 text-xl font-bold text-slate-900 outline-none">
              Last step — where should your {maxQuotes} quotes go?
            </legend>
            <p className="mb-4 text-sm text-slate-500">Shared with {maxQuotes} vetted local pros only. Never sold.</p>
            <div className="space-y-3">
              <div>
                <label htmlFor="qf-name" className="text-sm font-semibold text-slate-700">Full name</label>
                <input id="qf-name" autoComplete="name" value={fullName} onChange={(e) => { setFullName(e.target.value); clear("fullName"); }} className={input} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? "fullName-error" : undefined} />
                {err("fullName")}
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="qf-phone" className="text-sm font-semibold text-slate-700">Phone</label>
                  <input id="qf-phone" type="tel" inputMode="tel" autoComplete="tel-national" placeholder="(417) 555-0123" value={phone} onChange={(e) => { setPhone(formatPhone(e.target.value)); clear("phone"); }} className={input} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
                  {err("phone")}
                </div>
                <div>
                  <label htmlFor="qf-email" className="text-sm font-semibold text-slate-700">Email</label>
                  <input id="qf-email" type="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); clear("email"); }} className={input} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
                  {err("email")}
                </div>
              </div>
              <div>
                <label htmlFor="qf-note" className="text-sm font-semibold text-slate-700">
                  Project details <span className="font-normal text-slate-500">(optional)</span>
                </label>
                <textarea id="qf-note" rows={2} maxLength={1000} placeholder="e.g. Hail last spring, some missing shingles on the north side" value={note} onChange={(e) => setNote(e.target.value)} className={input} />
              </div>
              {/* Honeypot: hidden from humans */}
              <div className="absolute -left-[9999px]" aria-hidden="true">
                <label htmlFor="qf-company">Company</label>
                <input id="qf-company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
              </div>
              <div>
                <label className="flex items-start gap-3 text-sm text-slate-600">
                  <input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); clear("consent"); }} className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 accent-brand-600" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
                  <span>
                    I agree to receive up to {maxQuotes} quotes and to be contacted by up to {maxQuotes} independent local
                    contractors by phone, text, or email about my project. Consent isn&apos;t required to buy anything. Msg &amp;
                    data rates may apply. See our{" "}
                    <a href="/privacy" className="underline hover:text-brand-700">Privacy Policy</a> &amp;{" "}
                    <a href="/terms" className="underline hover:text-brand-700">Terms</a>.
                  </span>
                </label>
                {err("consent")}
              </div>
            </div>
            {serverError && (
              <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{serverError}</p>
            )}
          </fieldset>
        )}
      </div>

      {/* Nav */}
      <div className="mt-5 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => go(step - 1)} className="inline-flex items-center gap-1 rounded-lg px-2 py-3 font-semibold text-slate-600 sm:px-3 hover:bg-slate-100 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200">
            <Icon name="arrowLeft" className="h-5 w-5" /> Back
          </button>
        )}
        {step === 2 && (
          <button type="button" onClick={nextFromLocation} className="ml-auto inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3.5 text-base font-bold sm:text-lg text-white shadow hover:bg-brand-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-200 sm:flex-none">
            Continue <Icon name="arrowRight" className="h-5 w-5" />
          </button>
        )}
        {step === 3 && (
          <button type="submit" disabled={status === "submitting"} className="ml-auto inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-accent-500 px-4 py-3.5 text-base font-bold sm:px-5 sm:text-lg text-slate-900 shadow hover:bg-accent-400 focus:outline-none focus-visible:ring-4 focus-visible:ring-accent-200 disabled:opacity-60">
            {status === "submitting" ? "Matching you…" : `Get My ${maxQuotes} Free Quotes`}
          </button>
        )}
        {step < 2 && (
          <p className="ml-auto flex items-center gap-1.5 text-xs text-slate-500">
            <Icon name="shield" className="h-4 w-4 text-emerald-600" /> Free · No obligation · {maxQuotes} pros max
          </p>
        )}
      </div>
      <p className="sr-only">{brandName} is a free matching service, not a contractor.</p>
    </form>
  );
}
