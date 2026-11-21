import "server-only";

/**
 * Best-effort in-memory rate limiter (per server instance). Stops casual spam and
 * accidental double-submits; for heavy abuse, put Vercel's firewall rate limiting in front.
 */
const hits = new Map<string, number[]>();

export function clientIp(req: Request) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function rateLimited(req: Request, bucket: string, limit: number, windowMs: number) {
  const key = `${bucket}:${clientIp(req)}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  }
  return recent.length > limit;
}
