import { z } from "zod";
import {
  CROP_TYPES,
  QUANTITY_UNITS,
} from "../../marketplace/schemas/marketplaceSchemas.js";

export { CROP_TYPES, QUANTITY_UNITS };


const MATCH_CONFIG = Object.freeze({
  MIN_REQUESTED_QUANTITY: 1,
  LOCATION_MAX_LENGTH: 120,
  MIN_MAX_PRICE: 0.01,
});

const MATCH_SEARCH_CONFIG = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});

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

const requestedQuantitySchema = z
  .number({ error: "Please enter how much you need." })
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

const maxPriceSchema = z
  .number({ error: "Please enter a valid price." })
  .min(MATCH_CONFIG.MIN_MAX_PRICE, "Maximum price must be greater than zero");

export const matchSearchSchema = z
  .object({
    cropType: cropTypeSchema,
    requestedQuantity: requestedQuantitySchema,
    requestedQuantityUnit: quantityUnitSchema,
    location: locationSchema.optional(),
    maxPrice: maxPriceSchema.optional(),
    page: z
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(MATCH_SEARCH_CONFIG.DEFAULT_PAGE),
    limit: z
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
