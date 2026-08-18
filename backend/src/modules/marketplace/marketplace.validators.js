import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import {
  CROP_TYPES,
  QUANTITY_UNITS,
  LISTING_STATUS,
  LISTING_CONFIG,
  SEARCH_CONFIG,
} from "./marketplace.constants.js";

//  Reusable Field Schemas

const titleSchema = z
  .string()
  .trim()
  .min(
    LISTING_CONFIG.TITLE_MIN_LENGTH,
    `Title must be at least ${LISTING_CONFIG.TITLE_MIN_LENGTH} characters`,
  )
  .max(
    LISTING_CONFIG.TITLE_MAX_LENGTH,
    `Title must be at most ${LISTING_CONFIG.TITLE_MAX_LENGTH} characters`,
  );

const descriptionSchema = z
  .string()
  .trim()
  .max(
    LISTING_CONFIG.DESCRIPTION_MAX_LENGTH,
    `Description must be at most ${LISTING_CONFIG.DESCRIPTION_MAX_LENGTH} characters`,
  );

const cropTypeSchema = z.enum([
  CROP_TYPES.TOMATO,
  CROP_TYPES.MAIZE,
  CROP_TYPES.CASSAVA,
  CROP_TYPES.PLANTAIN,
  CROP_TYPES.YAM,
  CROP_TYPES.PEPPER,
  CROP_TYPES.ONION,
  CROP_TYPES.RICE,
  CROP_TYPES.GROUNDNUT,
  CROP_TYPES.COCOA,
]);

const quantityUnitSchema = z.enum([
  QUANTITY_UNITS.KILOGRAM,
  QUANTITY_UNITS.BAG,
  QUANTITY_UNITS.CRATE,
  QUANTITY_UNITS.SACK,
  QUANTITY_UNITS.BUNCH,
  QUANTITY_UNITS.PIECE,
  QUANTITY_UNITS.BASKET,
]);

const listingStatusSchema = z.enum([
  LISTING_STATUS.ACTIVE,
  LISTING_STATUS.SOLD,
  LISTING_STATUS.REMOVED,
]);

const quantitySchema = z
  .number()
  .positive("Quantity must be greater than zero")
  .max(
    LISTING_CONFIG.MAX_QUANTITY,
    `Quantity must be at most ${LISTING_CONFIG.MAX_QUANTITY}`,
  );

const updatableQuantitySchema = z
  .number()
  .min(0, "Quantity cannot be negative")
  .max(
    LISTING_CONFIG.MAX_QUANTITY,
    `Quantity must be at most ${LISTING_CONFIG.MAX_QUANTITY}`,
  );

const pricePerUnitSchema = z
  .number()
  .positive("Price per unit must be greater than zero")
  .max(
    LISTING_CONFIG.MAX_PRICE_PER_UNIT,
    `Price per unit must be at most ${LISTING_CONFIG.MAX_PRICE_PER_UNIT}`,
  );

const locationSchema = z
  .string()
  .trim()
  .min(1, "Location is required")
  .max(120, "Location is too long");

const harvestDateSchema = z.coerce.date({
  errorMap: () => ({ message: "Harvest date must be a valid date" }),
});

const imagesSchema = z
  .array(z.string().url("Each image must be a valid URL"))
  .max(
    LISTING_CONFIG.MAX_IMAGES,
    `A listing may have at most ${LISTING_CONFIG.MAX_IMAGES} images`,
  );

const listingIdSchema = z.string().uuid("Invalid listing ID");

//  Request Schemas

export const createListingSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema.optional(),
    cropType: cropTypeSchema,
    quantity: quantitySchema,
    quantityUnit: quantityUnitSchema,
    pricePerUnit: pricePerUnitSchema,
    location: locationSchema,
    harvestDate: harvestDateSchema.optional(),
    images: imagesSchema.optional(),
  })
  .strict();

export const updateListingSchema = z
  .object({
    title: titleSchema.optional(),
    description: descriptionSchema.optional(),
    cropType: cropTypeSchema.optional(),
    quantity: updatableQuantitySchema.optional(),
    quantityUnit: quantityUnitSchema.optional(),
    pricePerUnit: pricePerUnitSchema.optional(),
    location: locationSchema.optional(),
    harvestDate: harvestDateSchema.optional(),
    images: imagesSchema.optional(),
  })
  .strict();

export const listingIdParamSchema = z
  .object({
    listingId: listingIdSchema,
  })
  .strict();

export const updateListingQuantitySchema = z
  .object({
    quantity: updatableQuantitySchema,
  })
  .strict();

export const changeListingStatusSchema = z
  .object({
    status: listingStatusSchema,
  })
  .strict();

// Search / List Request Schemas
export const listingSearchSchema = z
  .object({
    cropType: cropTypeSchema.optional(),
    quantityUnit: quantityUnitSchema.optional(),
    location: z.string().trim().max(120).optional(),
    minPrice: z.coerce
      .number()
      .positive("minPrice must be greater than zero")
      .optional(),
    maxPrice: z.coerce
      .number()
      .positive("maxPrice must be greater than zero")
      .optional(),
    page: z.coerce
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(1),
    limit: z.coerce
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        SEARCH_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${SEARCH_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(SEARCH_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict()
  .refine(
    (data) =>
      data.minPrice === undefined ||
      data.maxPrice === undefined ||
      data.maxPrice >= data.minPrice,
    {
      message: "maxPrice must be greater than or equal to minPrice",
      path: ["maxPrice"],
    },
  );

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
