import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import {
  CROP_TYPES,
  QUANTITY_UNITS,
  MATCH_SEARCH_CONFIG,
  MATCH_CONFIG,
} from "./buyerMatching.constants.js";

//  Reusable Field Schemas
const cropTypeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .min(1, "Crop type is required")
  .max(80, "Crop type is too long")
  .regex(/^[A-Z][A-Z0-9_]*$/, "Invalid crop type");

const quantityUnitSchema = z.enum([
  QUANTITY_UNITS.KILOGRAM,
  QUANTITY_UNITS.BAG,
  QUANTITY_UNITS.CRATE,
  QUANTITY_UNITS.SACK,
  QUANTITY_UNITS.BUNCH,
  QUANTITY_UNITS.PIECE,
  QUANTITY_UNITS.BASKET,
]);

const requestedQuantitySchema = z.coerce
  .number()
  .min(
    MATCH_CONFIG.MIN_REQUESTED_QUANTITY,
    `Requested quantity must be at least ${MATCH_CONFIG.MIN_REQUESTED_QUANTITY}`,
  );

const locationSchema = z
  .string()
  .trim()
  .max(
    MATCH_CONFIG.LOCATION_MAX_LENGTH,
    `Location must be at most ${MATCH_CONFIG.LOCATION_MAX_LENGTH} characters`,
  );

const maxPriceSchema = z.coerce
  .number()
  .min(MATCH_CONFIG.MIN_MAX_PRICE, "Maximum price must be greater than zero");

//  Request Schema
export const matchSearchSchema = z
  .object({
    cropType: cropTypeSchema,
    requestedQuantity: requestedQuantitySchema,
    requestedQuantityUnit: quantityUnitSchema,
    location: locationSchema.optional(),
    maxPrice: maxPriceSchema.optional(),
    page: z.coerce
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(MATCH_SEARCH_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        MATCH_SEARCH_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${MATCH_SEARCH_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(MATCH_SEARCH_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();

//  Validation Helper

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
