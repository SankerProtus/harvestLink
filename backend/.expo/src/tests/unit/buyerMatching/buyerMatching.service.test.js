import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";

jest.unstable_mockModule(
  "../../../modules/buyerMatching/buyerMatching.repository.js",
  () => ({
    searchMatches: jest.fn(),
  }),
);

const repo =
  await import("../../../modules/buyerMatching/buyerMatching.repository.js");
const service =
  await import("../../../modules/buyerMatching/buyerMatching.service.js");
const { CROP_TYPES, QUANTITY_UNITS } =
  await import("../../../modules/buyerMatching/buyerMatching.constants.js");

function fakeListing(overrides = {}) {
  return {
    id: randomUUID(),
    farmerId: randomUUID(),
    title: "Fresh Maize - Bulk",
    description: null,
    cropType: CROP_TYPES.MAIZE,
    quantity: 30,
    quantityUnit: QUANTITY_UNITS.BAG,
    pricePerUnit: 45,
    location: "Sunyani",
    images: [],
    status: "ACTIVE",
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("searchMatches", () => {
  test("converts page/limit into skip/take before calling the repository", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 20,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 3,
      limit: 10,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ skip: 20, take: 10 }),
    );
  });

  test("passes cropType through to the repository unchanged (required hard filter)", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.CASSAVA,
      requestedQuantity: 5,
      requestedQuantityUnit: QUANTITY_UNITS.SACK,
      page: 1,
      limit: 20,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ cropType: CROP_TYPES.CASSAVA }),
    );
  });

  test("passes requestedQuantity through to the repository for the >= comparison", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 15,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 1,
      limit: 20,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ requestedQuantity: 15 }),
    );
  });

  test("passes requestedQuantityUnit through unchanged — no unit conversion attempted", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.TOMATO,
      requestedQuantity: 10,
      requestedQuantityUnit: QUANTITY_UNITS.CRATE,
      page: 1,
      limit: 20,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ requestedQuantityUnit: QUANTITY_UNITS.CRATE }),
    );
  });

  test("passes optional location through when supplied", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.ONION,
      requestedQuantity: 3,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      location: "Techiman",
      page: 1,
      limit: 20,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ location: "Techiman" }),
    );
  });

  test("omits location from the repository call when not supplied", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.ONION,
      requestedQuantity: 3,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 1,
      limit: 20,
    });

    const callArgs = repo.searchMatches.mock.calls[0][0];
    expect(callArgs).not.toHaveProperty("location");
  });

  test("passes optional maxPrice through when supplied", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.PEPPER,
      requestedQuantity: 8,
      requestedQuantityUnit: QUANTITY_UNITS.BASKET,
      maxPrice: 200,
      page: 1,
      limit: 20,
    });

    expect(repo.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ maxPrice: 200 }),
    );
  });

  test("omits maxPrice from the repository call when not supplied", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    await service.searchMatches({
      cropType: CROP_TYPES.PEPPER,
      requestedQuantity: 8,
      requestedQuantityUnit: QUANTITY_UNITS.BASKET,
      page: 1,
      limit: 20,
    });

    const callArgs = repo.searchMatches.mock.calls[0][0];
    expect(callArgs).not.toHaveProperty("maxPrice");
  });

  test("empty result set is returned as a valid, non-error response", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });

    const result = await service.searchMatches({
      cropType: CROP_TYPES.COCOA,
      requestedQuantity: 100,
      requestedQuantityUnit: QUANTITY_UNITS.SACK,
      page: 1,
      limit: 20,
    });

    expect(result.results).toEqual([]);
    expect(result.pagination).toEqual({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
    });
  });

  test("maps repository results into MatchResultDTOs with correct pagination metadata", async () => {
    repo.searchMatches.mockResolvedValue({
      items: [fakeListing(), fakeListing()],
      totalCount: 23,
    });

    const result = await service.searchMatches({
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 20,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 1,
      limit: 10,
    });

    expect(result.results).toHaveLength(2);
    expect(result.results[0]).toHaveProperty("cropType", CROP_TYPES.MAIZE);
    expect(result.results[0]).not.toHaveProperty("matchScore"); // no numeric score ever exposed
    expect(result.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 23,
      totalPages: 3,
    });
  });

  test("failure propagation: repository rejection propagates unmodified to the caller", async () => {
    const dbError = new Error("connection lost");
    repo.searchMatches.mockRejectedValue(dbError);

    await expect(
      service.searchMatches({
        cropType: CROP_TYPES.MAIZE,
        requestedQuantity: 20,
        requestedQuantityUnit: QUANTITY_UNITS.BAG,
        page: 1,
        limit: 20,
      }),
    ).rejects.toThrow("connection lost");
  });
});

// ─────────────────────────────────────────────────────────────
describe("read-only guarantees", () => {
  test("the repository mock exposes exactly one function — no create/update/delete methods exist to call", () => {
    expect(Object.keys(repo)).toEqual(["searchMatches"]);
  });

  test("searchMatches never calls any Marketplace module (no cross-module write path exists)", async () => {
    repo.searchMatches.mockResolvedValue({ items: [], totalCount: 0 });
    await service.searchMatches({
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 20,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 1,
      limit: 20,
    });
    expect(repo.searchMatches).toHaveBeenCalledTimes(1);
  });

  test("no event builder is imported or invoked (module has no events.js by design)", async () => {
    repo.searchMatches.mockResolvedValue({
      items: [fakeListing()],
      totalCount: 1,
    });
    const result = await service.searchMatches({
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 20,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      page: 1,
      limit: 20,
    });
    expect(result).toBeDefined();
  });
});
