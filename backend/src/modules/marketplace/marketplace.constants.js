//
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

// Quantity units — per your confirmed business rule.

export const QUANTITY_UNITS = Object.freeze({
  KILOGRAM: "KILOGRAM",
  BAG: "BAG",
  CRATE: "CRATE",
  SACK: "SACK",
  BUNCH: "BUNCH",
  PIECE: "PIECE",
  BASKET: "BASKET",
});

// Listings Status
export const LISTING_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  SOLD: "SOLD",
  REMOVED: "REMOVED",
});

// Listing field constraints

export const LISTING_CONFIG = Object.freeze({
  TITLE_MIN_LENGTH: 3,
  TITLE_MAX_LENGTH: 120,
  DESCRIPTION_MAX_LENGTH: 1000,
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 100000,
  MIN_PRICE_PER_UNIT: 0.01,
  MAX_PRICE_PER_UNIT: 1000000,
  MAX_IMAGES: 5,
  MAX_AVAILABILITY_WINDOW_DAYS: 90,
  /** Flag prices below reference min by more than this fraction (scam bait). */
  PRICE_BAND_LOW_TOLERANCE: 0.4,
  /** Flag prices above reference max by more than this fraction. */
  PRICE_BAND_HIGH_TOLERANCE: 0.4,
});

/** Minimum farmer verification tier required to publish listings (0 = phone OTP). */
export const LISTING_VERIFICATION_MIN_TIER = 0;

// Search / pagination defaults

export const SEARCH_CONFIG = Object.freeze({
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  DEFAULT_SORT: "CREATED_AT_DESC",
});
