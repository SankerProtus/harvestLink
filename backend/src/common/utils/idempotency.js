import { ConflictError } from "../../errors/commonErrors.js";
import { sha256Hash } from "./crypto.js";

export const IDEMPOTENCY_SCOPE = "marketplace.create-listing";
export const IDEMPOTENCY_TTL_MS = 24 * 60 * 60 * 1000;

export function getRequestHash(input) {
  return sha256Hash(JSON.stringify(input));
}

export function requireIdempotencyKey(value) {
  if (typeof value !== "string" || value.length < 16 || value.length > 255) {
    throw new ConflictError(
      "A valid idempotency key is required to safely retry this request",
      { reason: "INVALID_IDEMPOTENCY_KEY" },
    );
  }
  return value;
}
