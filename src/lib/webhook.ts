import "server-only";

type Result = { ok: true; delivered: boolean } | { ok: false; error: string };

/**
 * POSTs a JSON payload to a webhook. If no URL is configured, logs the payload
 * to the server console (handy in development and visible in Vercel logs).
 */
export async function forwardToWebhook(url: string | undefined, kind: string, payload: unknown): Promise<Result> {
  if (!url) {
    console.log(`[${kind}] No webhook configured — logging payload:\n${JSON.stringify(payload, null, 2)}`);
    return { ok: true, delivered: false };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return { ok: true, delivered: true };
  } catch (err) {
    // Log the full payload so the lead is never lost, even if the webhook is down.
    console.error(`[${kind}] Webhook delivery failed:`, err, `\nPayload:\n${JSON.stringify(payload, null, 2)}`);
    return { ok: false, error: "delivery_failed" };
  }
}
