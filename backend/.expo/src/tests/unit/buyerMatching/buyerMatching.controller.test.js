import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../helpers/expressMocks.js";

jest.unstable_mockModule(
  "../../../modules/buyerMatching/buyerMatching.service.js",
  () => ({
    searchMatches: jest.fn(),
  }),
);

const service =
  await import("../../../modules/buyerMatching/buyerMatching.service.js");
const controller =
  await import("../../../modules/buyerMatching/buyerMatching.controller.js");
const { ValidationError } = await import("../../../errors/commonErrors.js");

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("searchMatches", () => {
  test("valid query: parses filters, calls the service, responds 200", async () => {
    const req = mockRequest({
      query: {
        cropType: "MAIZE",
        requestedQuantity: 20,
        requestedQuantityUnit: "BAG",
      },
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchMatches.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({
        cropType: "MAIZE",
        requestedQuantity: 20,
        requestedQuantityUnit: "BAG",
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        results: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("no req.user reference anywhere — confirms this is genuinely a public endpoint", async () => {
    const req = mockRequest({
      query: {
        cropType: "TOMATO",
        requestedQuantity: 5,
        requestedQuantityUnit: "CRATE",
      },
      user: null, // explicitly absent, unlike every Marketplace mutating/owned endpoint
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchMatches.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await expect(
      controller.searchMatches(req, res, next),
    ).resolves.not.toThrow();
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("applies real Zod defaults for page/limit when omitted", async () => {
    const req = mockRequest({
      query: {
        cropType: "CASSAVA",
        requestedQuantity: 10,
        requestedQuantityUnit: "SACK",
      },
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchMatches.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ page: 1, limit: 20 }),
    );
  });

  test("passes optional location and maxPrice through when supplied", async () => {
    const req = mockRequest({
      query: {
        cropType: "ONION",
        requestedQuantity: 3,
        requestedQuantityUnit: "BAG",
        location: "Sunyani",
        maxPrice: 200,
      },
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchMatches.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).toHaveBeenCalledWith(
      expect.objectContaining({ location: "Sunyani", maxPrice: 200 }),
    );
  });

  test("empty result set: still 200, not treated as an error", async () => {
    const req = mockRequest({
      query: {
        cropType: "COCOA",
        requestedQuantity: 100,
        requestedQuantityUnit: "SACK",
      },
    });
    const res = mockResponse();
    const next = mockNext();
    service.searchMatches.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.searchMatches(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(next).not.toHaveBeenCalled();
  });

  test("missing required cropType: forwards a real ValidationError, service never called", async () => {
    const req = mockRequest({
      query: { requestedQuantity: 20, requestedQuantityUnit: "BAG" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("missing required requestedQuantityUnit: forwards ValidationError (unit-match business rule cannot be validated without it)", async () => {
    const req = mockRequest({
      query: { cropType: "MAIZE", requestedQuantity: 20 },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid cropType enum value: forwards ValidationError", async () => {
    const req = mockRequest({
      query: {
        cropType: "DURIAN",
        requestedQuantity: 20,
        requestedQuantityUnit: "BAG",
      },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("unknown query field (.strict()): forwards ValidationError", async () => {
    const req = mockRequest({
      query: {
        cropType: "MAIZE",
        requestedQuantity: 20,
        requestedQuantityUnit: "BAG",
        sortBy: "relevance",
      },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.searchMatches(req, res, next);

    expect(service.searchMatches).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection propagates via next() unmodified", async () => {
    const req = mockRequest({
      query: {
        cropType: "MAIZE",
        requestedQuantity: 20,
        requestedQuantityUnit: "BAG",
      },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("database unavailable");
    service.searchMatches.mockRejectedValue(err);

    await controller.searchMatches(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});
