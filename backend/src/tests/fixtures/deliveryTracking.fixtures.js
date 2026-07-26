import { randomUUID } from "node:crypto";
import { ORDER_STATUS } from "../../modules/deliveryTracking/deliveryTracking.constants.js";

export function validCreateOrderPayload(overrides = {}) {
  return {
    listingId: randomUUID(),
    quantity: 10,
    ...overrides,
  };
}

export function validReportLocationPayload(overrides = {}) {
  return {
    latitude: 7.5647,
    longitude: -2.0117,
    ...overrides,
  };
}

export function fakeOrderEntity(overrides = {}) {
  return {
    id: randomUUID(),
    listingId: randomUUID(),
    buyerId: randomUUID(),
    farmerId: randomUUID(),
    quantity: 10,
    pricePerUnitAtOrder: 120.5,
    status: ORDER_STATUS.PENDING,
    latestLatitude: null,
    latestLongitude: null,
    locationReportedAt: null,
    createdAt: new Date("2026-07-22T11:00:00.000Z"),
    updatedAt: new Date("2026-07-22T11:00:00.000Z"),
    ...overrides,
  };
}
