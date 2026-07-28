// tests/fixtures/marketplace.fixtures.js

import { randomUUID } from "node:crypto";
import {
  CROP_TYPES,
  QUANTITY_UNITS,
  LISTING_STATUS,
} from "../../modules/marketplace/marketplace.constants.js";

export function validCreateListingPayload(overrides = {}) {
  return {
    title: "Fresh Tomatoes - Farm Gate",
    description: "Ripe Roma tomatoes, harvested this week.",
    cropType: CROP_TYPES.TOMATO,
    quantity: 25,
    quantityUnit: QUANTITY_UNITS.CRATE,
    pricePerUnit: 120.5,
    location: "Techiman, Bono East",
    images: [
      "https://plus.unsplash.com/premium_photo-1661811820259-2575b82101bf?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dG9tYXRvfGVufDB8fDB8fHww",
    ],
    ...overrides,
  };
}

export function fakeListingEntity(overrides = {}) {
  return {
    id: randomUUID(),
    farmerId: randomUUID(),
    title: "Fresh Tomatoes - Farm Gate",
    description: "Ripe Roma tomatoes, harvested this week.",
    cropType: CROP_TYPES.TOMATO,
    quantity: 25,
    quantityUnit: QUANTITY_UNITS.CRATE,
    pricePerUnit: 120.5,
    location: "Techiman, Bono East",
    images: [],
    status: LISTING_STATUS.ACTIVE,
    createdAt: new Date("2026-07-20T08:00:00.000Z"),
    updatedAt: new Date("2026-07-20T08:00:00.000Z"),
    ...overrides,
  };
}
