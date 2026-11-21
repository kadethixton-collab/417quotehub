import "server-only";

type Result = { ok: true; delivered: number } | { ok: false; error: string };

/** Split a comma-separated env var into webhook URLs. */
export const webhookList = (value: string | undefined) =>
  (value ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

async function post(url: string, payload: unknown) {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
    cache: "no-store",
    redirect: "follow", // Google Apps Script web apps answer with a redirect
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

/**
 * POSTs a JSON payload to one or more webhooks (comma-separated, e.g. a Google Sheet
 * and a Zapier hook). Succeeds if at least one delivery works. With no URLs configured,
 * logs the payload to the server console (visible in Vercel logs).
 */
export async function forwardToWebhook(urls: string | undefined, kind: string, payload: unknown): Promise<Result> {
  const list = webhookList(urls);
  if (!list.length) {
    console.log(`[${kind}] No webhook configured — logging payload:\n${JSON.stringify(payload, null, 2)}`);
    return { ok: true, delivered: 0 };
  }

  const results = await Promise.allSettled(list.map((u) => post(u, payload)));
  const failed = results.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  const delivered = results.length - failed.length;

  if (failed.length) {
    // Log the full payload so the lead is never lost, even if a webhook is down.
    console.error(
      `[${kind}] ${failed.length}/${list.length} webhook deliveries failed:`,
      failed.map((f) => String(f.reason)),
      `\nPayload:\n${JSON.stringify(payload, null, 2)}`,
    );
  }
  return delivered > 0 ? { ok: true, delivered } : { ok: false, error: "delivery_failed" };
}
