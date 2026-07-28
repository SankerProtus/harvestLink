export {
  CROP_TYPES,
  QUANTITY_UNITS,
} from "../marketplace/marketplace.constants.js";

export const MATCH_SEARCH_CONFIG = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});

export const MATCH_CONFIG = Object.freeze({
  MIN_REQUESTED_QUANTITY: 1,
  LOCATION_MAX_LENGTH: 120,
  MIN_MAX_PRICE: 0.01,
});

export const MATCH_SORT_ORDER = Object.freeze([
  "LOCATION_MATCH",
  "PRICE_ASC",
  "NEWEST_FIRST",
]);
