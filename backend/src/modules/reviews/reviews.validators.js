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

export const farmerIdParamSchema = z
  .object({
    farmerId: z.string().uuid("Invalid farmer ID"),
  })
  .strict();

export const listingIdParamSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
  })
  .strict();

export const reviewIdParamSchema = z
  .object({
    reviewId: z.string().uuid("Invalid review ID"),
  })
  .strict();

export const listReviewsQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(REVIEW_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        REVIEW_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${REVIEW_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(REVIEW_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();

export const createReviewCommentSchema = z
  .object({
    body: z
      .string()
      .trim()
      .min(1, "Reply cannot be empty")
      .max(
        REVIEW_CONFIG.COMMENT_REPLY_MAX_LENGTH,
        `Reply must be at most ${REVIEW_CONFIG.COMMENT_REPLY_MAX_LENGTH} characters`,
      ),
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
