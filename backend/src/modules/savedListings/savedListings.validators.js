import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";

import { SAVED_LISTING_CONFIG } from "./savedListings.constants.js";

export const listingIdParamSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
  })
  .strict();

export function parseOrThrow(schema, payload) {
  const result = schema.safeParse(payload);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "(root)",
      message: issue.message,
      code: issue.code,
    }));
    throw new ValidationError("Request validation failed", details);
  }
  return result.data;
}

export const savedListQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1).default(SAVED_LISTING_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(SAVED_LISTING_CONFIG.MAX_PAGE_SIZE)
      .default(SAVED_LISTING_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();