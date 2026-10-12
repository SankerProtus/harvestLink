import { LISTING_CONFIG } from "../marketplace/marketplace.constants.js";

// Delivery Tracking Constants

export const ORDER_STATUS = Object.freeze({
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELLATION_REQUESTED: "CANCELLATION_REQUESTED",
  CANCELLED: "CANCELLED",
});

// Order Configuration
export const ORDER_CONFIG = Object.freeze({
  MIN_QUANTITY: 1,
  MAX_QUANTITY: LISTING_CONFIG.MAX_QUANTITY,
  /** Buyer may cancel a confirmed order without farmer consent within this window. */
  BUYER_CANCEL_GRACE_MS: 30 * 60 * 1000,
});

// GPS Configuration
export const GPS_CONFIG = Object.freeze({
  LATITUDE_MIN: -90,
  LATITUDE_MAX: 90,
  LONGITUDE_MIN: -180,
  LONGITUDE_MAX: 180,
});

// Order List Configuration
export const ORDER_LIST_CONFIG = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});
