import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import { INTEREST_CONFIG } from "./listingInterest.constants.js";

export const expressInterestSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
  })
  .strict();

export const listingIdParamSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
  })
  .strict();

export const listInterestQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(INTEREST_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        INTEREST_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${INTEREST_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(INTEREST_CONFIG.DEFAULT_PAGE_SIZE),
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
