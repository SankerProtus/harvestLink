import { z } from "zod";

export const CROP_TYPES = Object.freeze({
  TOMATO: "TOMATO",
  MAIZE: "MAIZE",
  CASSAVA: "CASSAVA",
  PLANTAIN: "PLANTAIN",
  YAM: "YAM",
  PEPPER: "PEPPER",
  ONION: "ONION",
  RICE: "RICE",
  GROUNDNUT: "GROUNDNUT",
  COCOA: "COCOA",
});

export const QUANTITY_UNITS = Object.freeze({
  KILOGRAM: "KILOGRAM",
  BAG: "BAG",
  CRATE: "CRATE",
  SACK: "SACK",
  BUNCH: "BUNCH",
  PIECE: "PIECE",
  BASKET: "BASKET",
});

export const LISTING_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  SOLD: "SOLD",
  REMOVED: "REMOVED",
});

const LISTING_CONFIG = Object.freeze({
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 1000,
  MAX_QUANTITY: 100000,
  MAX_PRICE_PER_UNIT: 1000000,
  MAX_IMAGES: 5,
  LOCATION_MAX_LENGTH: 120,
});

const SEARCH_CONFIG = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});

// ─────────────────────────────────────────────────────────────
// Reusable field schemas — same shape, bounds, and messages as
// marketplace.validators.js
// ─────────────────────────────────────────────────────────────

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

const cropTypeSchema = z.enum(
  [
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
  ],
  { error: "Please select a crop type." },
);

const quantityUnitSchema = z.enum(
  [
    QUANTITY_UNITS.KILOGRAM,
    QUANTITY_UNITS.BAG,
    QUANTITY_UNITS.CRATE,
    QUANTITY_UNITS.SACK,
    QUANTITY_UNITS.BUNCH,
    QUANTITY_UNITS.PIECE,
    QUANTITY_UNITS.BASKET,
  ],
  { error: "Please select a unit." },
);

const listingStatusSchema = z.enum([
  LISTING_STATUS.ACTIVE,
  LISTING_STATUS.SOLD,
  LISTING_STATUS.REMOVED,
]);

// NOTE: creation requires strictly positive quantity (matches
// createListingSchema's quantitySchema). A SEPARATE, looser schema
// is defined below specifically for update paths, mirroring the
// backend's own deliberate quantity-zero-allowed-on-update asymmetry.
const positiveQuantitySchema = z
  .number({ error: "Please enter a quantity." })
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
  .number({ error: "Please enter a price." })
  .positive("Price per unit must be greater than zero")
  .max(
    LISTING_CONFIG.MAX_PRICE_PER_UNIT,
    `Price per unit must be at most ${LISTING_CONFIG.MAX_PRICE_PER_UNIT}`,
  );

const locationSchema = z
  .string()
  .trim()
  .min(1, "Location is required")
  .max(
    LISTING_CONFIG.LOCATION_MAX_LENGTH,
    `Location must be at most ${LISTING_CONFIG.LOCATION_MAX_LENGTH} characters`,
  );

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

// ─────────────────────────────────────────────────────────────
// Request schemas — one per real Marketplace endpoint requiring a
// body/params/query, matching marketplace.validators.js exactly.
// ─────────────────────────────────────────────────────────────

export const createListingSchema = z
  .object({
    title: titleSchema,
    description: descriptionSchema.optional(),
    cropType: cropTypeSchema,
    quantity: positiveQuantitySchema,
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

export const listingSearchSchema = z
  .object({
    cropType: cropTypeSchema.optional(),
    quantityUnit: quantityUnitSchema.optional(),
    location: z
      .string()
      .trim()
      .max(LISTING_CONFIG.LOCATION_MAX_LENGTH)
      .optional(),
    // The form keeps these as text-input strings and defaults them to ""
    // (never `undefined`) so the input can be controlled. Plain z.number()
    // rejects "" outright, so `.optional()` never actually kicks in and
    // validation fails on every submit -- including chip taps for
    // cropType, which share this same form/schema via handleSubmit. The
    // preprocess step normalizes "" (and null) to undefined and coerces
    // any other string to a number before the number/positive checks run.
    minPrice: z.preprocess(
      (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "minPrice must be a number" })
        .positive("minPrice must be greater than zero")
        .optional(),
    ),
    maxPrice: z.preprocess(
      (val) => (val === "" || val === undefined || val === null ? undefined : Number(val)),
      z
        .number({ invalid_type_error: "maxPrice must be a number" })
        .positive("maxPrice must be greater than zero")
        .optional(),
    ),
    page: z
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(SEARCH_CONFIG.DEFAULT_PAGE),
    limit: z
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