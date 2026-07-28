class InMemoryStore {
  constructor() {
    this.buckets = new Map();
  }

  /**
   * Increments the counter for `key`. If the key doesn't exist or
   * its window has expired, starts a fresh window of `windowMs`.
   * Returns { count, resetAt }.
   */
  increment(key, windowMs) {
    const now = Date.now();
    const existing = this.buckets.get(key);

    if (!existing || existing.resetAt <= now) {
      const resetAt = now + windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return { count: 1, resetAt };
    }

    existing.count += 1;
    return { count: existing.count, resetAt: existing.resetAt };
  }

  /**
   * Periodic cleanup to prevent unbounded memory growth from stale
   * keys. Not required for correctness (expired keys are treated as
   * fresh on next increment), but keeps the Map from growing forever
   * under high key cardinality (e.g. many distinct IPs).
   */
  sweep() {
    const now = Date.now();
    for (const [key, value] of this.buckets.entries()) {
      if (value.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
  }
}

// Single shared in-memory store instance for this process. Adequate
// for a single-instance deployment; a multi-instance deployment
// needs a shared store (Redis) so limits are enforced consistently
// across instances — this is exactly the seam the store interface
// exists to fill later.
const defaultStore = new InMemoryStore();
setInterval(() => defaultStore.sweep(), 60_000).unref();

function resolveIpKey(req, routeName) {
  const ip = req.ip || req.socket?.remoteAddress || "unknown";
  return `rate-limit:${routeName}:ip:${ip}`;
}

function resolveUserKey(req, routeName) {
  // req.user is only populated for routes behind auth.middleware.js;
  // falls back to IP-based keying if no authenticated user exists,
  // so this strategy is also safe on public (pre-auth) routes.
  const userId = req.user?.id;
  return userId
    ? `rate-limit:${routeName}:user:${userId}`
    : resolveIpKey(req, routeName);
}

const KEY_RESOLVERS = Object.freeze({
  ip: resolveIpKey,
  user: resolveUserKey,
});

// Creates a rate-limiting middleware instance for a specific route.
export function rateLimiter({
  routeName,
  windowMs,
  max,
  strategy = "ip",
  store = defaultStore,
}) {
  if (!routeName || !windowMs || !max) {
    throw new Error("rateLimiter requires routeName, windowMs, and max");
  }

  const resolveKey = KEY_RESOLVERS[strategy];
  if (!resolveKey) {
    throw new Error(`Unsupported rate limiter strategy: "${strategy}"`);
  }

  return function rateLimiterMiddleware(req, res, next) {
    const key = resolveKey(req, routeName);
    const { count, resetAt } = store.increment(key, windowMs);

    const remaining = Math.max(0, max - count);
    const resetSeconds = Math.ceil((resetAt - Date.now()) / 1000);

    res.setHeader("X-RateLimit-Limit", String(max));
    res.setHeader("X-RateLimit-Remaining", String(remaining));
    res.setHeader("X-RateLimit-Reset", String(resetSeconds));

    if (count > max) {
      res.setHeader("Retry-After", String(resetSeconds));
      return res.status(429).json({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
          details: { retryAfterSeconds: resetSeconds },
        },
      });
    }

    next();
  };
}
