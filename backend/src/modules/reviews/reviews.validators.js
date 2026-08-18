import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import { REVIEW_CONFIG } from "./reviews.constants.js";

export const createReviewSchema = z
  .object({
    orderId: z.string().uuid("Invalid order ID"),
    rating: z
      .number()
      .int()
      .min(
        REVIEW_CONFIG.MIN_RATING,
        `Rating must be at least ${REVIEW_CONFIG.MIN_RATING}`,
      )
      .max(
        REVIEW_CONFIG.MAX_RATING,
        `Rating must be at most ${REVIEW_CONFIG.MAX_RATING}`,
      ),
    comment: z
      .string()
      .trim()
      .max(
        REVIEW_CONFIG.COMMENT_MAX_LENGTH,
        `Comment must be at most ${REVIEW_CONFIG.COMMENT_MAX_LENGTH} characters`,
      )
      .optional(),
  })
  .strict();

export const orderIdParamSchema = z
  .object({
    orderId: z.string().uuid("Invalid order ID"),
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
