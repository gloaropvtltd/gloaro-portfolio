const WINDOW_MS = 60_000;
const MAX_REQUESTS = 5;

// Best-effort in-memory limiter. Works within a single warm serverless
// instance; it does NOT coordinate across multiple instances on Vercel.
// For guaranteed protection under real traffic, back this with a shared
// store (e.g. Upstash Redis) instead.
const hits = new Map();

export function isRateLimited(key) {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  hits.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
