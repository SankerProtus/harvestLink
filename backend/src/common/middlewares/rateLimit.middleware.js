import rateLimit from "express-rate-limit";

function resolveIpKey(req) {
  return req.ip || req.socket?.remoteAddress || "unknown";
}

function resolveUserKey(req) {
  return req.user?.id ?? resolveIpKey(req);
}

const KEY_RESOLVERS = Object.freeze({
  ip: resolveIpKey,
  user: resolveUserKey,
});

/**
 * Creates a rate-limiting middleware for a route (express-rate-limit).
 * Set TRUST_PROXY on the Express app when deployed behind a reverse proxy.
 */
export function rateLimiter({
  routeName,
  windowMs,
  max,
  strategy = "ip",
}) {
  if (!routeName || !windowMs || !max) {
    throw new Error("rateLimiter requires routeName, windowMs, and max");
  }

  const resolveKey = KEY_RESOLVERS[strategy];
  if (!resolveKey) {
    throw new Error(`Unsupported rate limiter strategy: "${strategy}"`);
  }

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    keyGenerator: (req) =>
      `rate-limit:${routeName}:${strategy}:${resolveKey(req)}`,
    handler: (req, res, _next, options) => {
      const retryAfterSeconds = Math.ceil(options.windowMs / 1000);
      res.setHeader("Retry-After", String(retryAfterSeconds));
      res.status(429).json({
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many requests. Please try again later.",
          details: { retryAfterSeconds },
        },
      });
    },
  });
}
