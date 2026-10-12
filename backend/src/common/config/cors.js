function isProduction() {
  return process.env.NODE_ENV === "production";
}

/**
 * Resolves allowed CORS origin(s). Production requires CORS_ORIGIN (validated at startup).
 */
export function resolveCorsOriginConfig() {
  const raw = process.env.CORS_ORIGIN?.trim();

  if (raw) {
    const origins = raw
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);
    return origins.length === 1 ? origins[0] : origins;
  }

  if (isProduction()) {
    return false;
  }

  return true;
}
