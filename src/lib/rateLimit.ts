// NOTE: This in-memory rate limiter works correctly in development and
// single-process Node.js servers. On Vercel (serverless/edge), each
// invocation may run in a separate instance so the store can reset.
// For production-grade rate limiting, replace with Upstash Redis or Vercel KV.

type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

/**
 * Returns true if the request is allowed, false if rate limited.
 * @param key      - unique key (e.g. IP + route)
 * @param limit    - max requests allowed in the window
 * @param windowMs - time window in milliseconds
 */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= limit) return false;

  entry.count++;
  return true;
}
