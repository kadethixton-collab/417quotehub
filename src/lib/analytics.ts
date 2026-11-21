"use client";

import { track as vercelTrack } from "@vercel/analytics";

type Props = Record<string, string | number | boolean | null | undefined>;

type AnalyticsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, opts?: { props?: Props }) => void;
};

/**
 * Send an event to whichever analytics tools are installed (Vercel Analytics,
 * Google Analytics 4, Plausible). Never send names, phone numbers, or emails.
 */
export function track(event: string, props: Props = {}) {
  if (typeof window === "undefined") return;
  const w = window as AnalyticsWindow;
  const clean = Object.fromEntries(Object.entries(props).filter(([, v]) => v !== undefined)) as Record<
    string,
    string | number | boolean | null
  >;
  try {
    vercelTrack(event, clean);
  } catch {}
  try {
    w.gtag?.("event", event, clean);
  } catch {}
  try {
    w.plausible?.(event, { props: clean });
  } catch {}
}
