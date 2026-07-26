import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";
import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../helpers/expressMocks.js";

jest.unstable_mockModule(
  "../../../modules/marketplace/marketplace.service.js",
  () => ({
    createListing: jest.fn(),
    updateListing: jest.fn(),
    updateListingQuantity: jest.fn(),
    changeListingStatus: jest.fn(),
    getListing: jest.fn(),
    getFarmerListings: jest.fn(),
    searchListings: jest.fn(),
  }),
);

const service =
  await import("../../../modules/marketplace/marketplace.service.js");
const controller =
  await import("../../../modules/marketplace/marketplace.controller.js");
const { ValidationError } = await import("../../../errors/commonErrors.js");

function validListingBody(overrides = {}) {
  return {
    title: "Fresh Tomatoes - Farm Gate",
    cropType: "TOMATO",
    quantity: 25,
    quantityUnit: "CRATE",
    pricePerUnit: 120.5,
    location: "Techiman",
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("createListing", () => {
  test("valid body: derives farmerId from req.user.id (never req.body), calls service, 201", async () => {
    const req = mockRequest({
      body: validListingBody(),
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.createListing.mockResolvedValue({ id: randomUUID() });

    await controller.createListing(req, res, next);

    expect(service.createListing).toHaveBeenCalledWith(
      expect.objectContaining({ ...validListingBody(), farmerId: "farmer-1" }),
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Object),
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("client-supplied farmerId in body is rejected by the real validator (.strict())", async () => {
    const req = mockRequest({
      body: { ...validListingBody(), farmerId: randomUUID() },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createListing(req, res, next);

    expect(service.createListing).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid body (bad cropType enum): forwards ValidationError, service never called", async () => {
    const req = mockRequest({
      body: validListingBody({ cropType: "DURIAN" }),
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createListing(req, res, next);

    expect(service.createListing).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
    expect(res.status).not.toHaveBeenCalled();
  });

  test("service rejection (e.g. DuplicateListingError) propagates via next() unmodified", async () => {
    const req = mockRequest({
      body: validListingBody(),
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("duplicate listing");
    service.createListing.mockRejectedValue(err);

    await controller.createListing(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("updateListing", () => {
  test("valid params + body: calls service with listingId, userId, and updates; 200", async () => {
    const listingId = randomUUID();
    const req = mockRequest({
      params: { listingId },
      body: { pricePerUnit: 99.99 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.updateListing.mockResolvedValue({
      id: listingId,
      pricePerUnit: 99.99,
    });

    await controller.updateListing(req, res, next);

    expect(service.updateListing).toHaveBeenCalledWith({
      listingId,
      userId: "farmer-1",
      updates: { pricePerUnit: 99.99 },
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid listingId param (not a UUID): forwards ValidationError before touching the service", async () => {
    const req = mockRequest({
      params: { listingId: "not-a-uuid" },
      body: {},
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.updateListing(req, res, next);

    expect(service.updateListing).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid body (negative quantity): forwards ValidationError", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: { quantity: -1 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.updateListing(req, res, next);

    expect(service.updateListing).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. UnauthorizedListingAccessError) propagates via next()", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: { pricePerUnit: 50 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("not the owner");
    service.updateListing.mockRejectedValue(err);

    await controller.updateListing(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

// ─────────────────────────────────────────────────────────────
describe("updateListingQuantity", () => {
  test("valid params + body: calls service, 200", async () => {
    const listingId = randomUUID();
    const req = mockRequest({
      params: { listingId },
      body: { quantity: 0 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.updateListingQuantity.mockResolvedValue({
      id: listingId,
      quantity: 0,
      status: "SOLD",
    });

    await controller.updateListingQuantity(req, res, next);

    expect(service.updateListingQuantity).toHaveBeenCalledWith({
      listingId,
      userId: "farmer-1",
      quantity: 0,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid body (missing quantity): forwards ValidationError", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: {},
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.updateListingQuantity(req, res, next);

    expect(service.updateListingQuantity).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection propagates via next()", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: { quantity: 5 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("listing already sold");
    service.updateListingQuantity.mockRejectedValue(err);

    await controller.updateListingQuantity(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

// ─────────────────────────────────────────────────────────────
describe("changeListingStatus", () => {
  test("valid params + body: calls service with status mapped to newStatus, 200", async () => {
    const listingId = randomUUID();
    const req = mockRequest({
      params: { listingId },
      body: { status: "REMOVED" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.changeListingStatus.mockResolvedValue({
      id: listingId,
      status: "REMOVED",
    });

    await controller.changeListingStatus(req, res, next);

    expect(service.changeListingStatus).toHaveBeenCalledWith({
      listingId,
      userId: "farmer-1",
      newStatus: "REMOVED",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid status value: forwards ValidationError", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: { status: "PENDING" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.changeListingStatus(req, res, next);

    expect(service.changeListingStatus).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. InvalidListingStatusTransitionError) propagates via next()", async () => {
    const req = mockRequest({
      params: { listingId: randomUUID() },
      body: { status: "SOLD" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("invalid transition");
    service.changeListingStatus.mockRejectedValue(err);

    await controller.changeListingStatus(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

// ─────────────────────────────────────────────────────────────
describe("getListing", () => {
  test("valid params: 200, no req.user required (public endpoint)", async () => {
    const listingId = randomUUID();
    const req = mockRequest({ params: { listingId } });
    const res = mockResponse();
    const next = mockNext();
    service.getListing.mockResolvedValue({ id: listingId });

    await controller.getListing(req, res, next);

    expect(service.getListing).toHaveBeenCalledWith({ listingId });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid listingId: forwards ValidationError", async () => {
    const req = mockRequest({ params: { listingId: "not-a-uuid" } });
    const res = mockResponse();
    const next = mockNext();

    await controller.getListing(req, res, next);

    expect(service.getListing).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (ListingNotFoundError) propagates via next()", async () => {
    const req = mockRequest({ params: { listingId: randomUUID() } });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("not found");
    service.getListing.mockRejectedValue(err);

    await controller.getListing(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("getFarmerListings", () => {
  test("scopes strictly to req.user.id, 200 with array result, no query/params required", async () => {
    const req = mockRequest({ user: { id: "farmer-1" } });
    const res = mockResponse();
    const next = mockNext();
    service.getFarmerListings.mockResolvedValue([{ id: randomUUID() }]);

    await controller.getFarmerListings(req, res, next);

    expect(service.getFarmerListings).toHaveBeenCalledWith({
      farmerId: "farmer-1",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// ─────────────────────────────────────────────────────────────
describe("searchListings", () => {
  test("valid query: parses filters and calls service, 200, no req.user required", async () => {
    const req = mockRequest({
      query: { cropType: "MAIZE", page: 2, limit: 10 },
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchListings.mockResolvedValue({
      results: [],
      pagination: { page: 2, limit: 10, total: 0, totalPages: 0 },
    });

    await controller.searchListings(req, res, next);

    expect(service.searchListings).toHaveBeenCalledWith(
      expect.objectContaining({ cropType: "MAIZE", page: 2, limit: 10 }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("applies real Zod defaults when page/limit are omitted from the query", async () => {
    const req = mockRequest({ query: {} });
    const res = mockResponse();
    const next = mockNext();
    service.searchListings.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.searchListings(req, res, next);

    expect(service.searchListings).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 20 }),
    );
  });

  test("invalid query (maxPrice < minPrice): forwards ValidationError from the real cross-field refinement", async () => {
    const req = mockRequest({ query: { minPrice: 100, maxPrice: 50 } });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchListings(req, res, next);

    expect(service.searchListings).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("unknown query field (.strict()): forwards ValidationError", async () => {
    const req = mockRequest({ query: { sortBy: "price" } });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchListings(req, res, next);

    expect(service.searchListings).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});
