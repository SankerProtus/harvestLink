import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";
import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../helpers/expressMocks.js";

jest.unstable_mockModule(
  "../../../modules/deliveryTracking/deliveryTracking.service.js",
  () => ({
    createOrder: jest.fn(),
    updateOrderStatus: jest.fn(),
    reportLocation: jest.fn(),
    getOrder: jest.fn(),
    listMyOrdersAsBuyer: jest.fn(),
    listMyOrdersAsFarmer: jest.fn(),
  }),
);

const service =
  await import("../../../modules/deliveryTracking/deliveryTracking.service.js");
const controller =
  await import("../../../modules/deliveryTracking/deliveryTracking.controller.js");
const { ValidationError } = await import("../../../errors/commonErrors.js");

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("createOrder", () => {
  test("valid body: derives buyerId from req.user.id, calls service, 201", async () => {
    const listingId = randomUUID();
    const req = mockRequest({
      body: { listingId, quantity: 10 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.createOrder.mockResolvedValue({
      id: randomUUID(),
      status: "PENDING",
    });

    await controller.createOrder(req, res, next);

    expect(service.createOrder).toHaveBeenCalledWith({
      listingId,
      quantity: 10,
      buyerId: "buyer-1",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(next).not.toHaveBeenCalled();
  });

  test("client-supplied buyerId in body is rejected by the real validator (.strict())", async () => {
    const req = mockRequest({
      body: { listingId: randomUUID(), quantity: 10, buyerId: randomUUID() },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createOrder(req, res, next);

    expect(service.createOrder).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid body (quantity zero — not allowed at creation): forwards ValidationError", async () => {
    const req = mockRequest({
      body: { listingId: randomUUID(), quantity: 0 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createOrder(req, res, next);

    expect(service.createOrder).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid body (non-UUID listingId): forwards ValidationError", async () => {
    const req = mockRequest({
      body: { listingId: "not-a-uuid", quantity: 10 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createOrder(req, res, next);

    expect(service.createOrder).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. MARKETPLACE_LISTING_NOT_FOUND) propagates via next() unmodified", async () => {
    const req = mockRequest({
      body: { listingId: randomUUID(), quantity: 10 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("listing not found");
    service.createOrder.mockRejectedValue(err);

    await controller.createOrder(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("updateOrderStatus", () => {
  test("valid params + body: maps status → newStatus, passes req.user.id, 200", async () => {
    const orderId = randomUUID();
    const req = mockRequest({
      params: { orderId },
      body: { status: "CONFIRMED" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.updateOrderStatus.mockResolvedValue({
      id: orderId,
      status: "CONFIRMED",
    });

    await controller.updateOrderStatus(req, res, next);

    expect(service.updateOrderStatus).toHaveBeenCalledWith({
      orderId,
      userId: "farmer-1",
      newStatus: "CONFIRMED",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid orderId param: forwards ValidationError before touching the service", async () => {
    const req = mockRequest({
      params: { orderId: "bad" },
      body: { status: "CONFIRMED" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.updateOrderStatus(req, res, next);

    expect(service.updateOrderStatus).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("invalid status value: forwards ValidationError", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      body: { status: "SHIPPED" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.updateOrderStatus(req, res, next);

    expect(service.updateOrderStatus).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. DELIVERY_INVALID_STATUS_TRANSITION or a Marketplace error) propagates via next()", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      body: { status: "CONFIRMED" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("invalid transition");
    service.updateOrderStatus.mockRejectedValue(err);

    await controller.updateOrderStatus(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("reportLocation", () => {
  test("valid params + body: passes coordinates and req.user.id, 200", async () => {
    const orderId = randomUUID();
    const req = mockRequest({
      params: { orderId },
      body: { latitude: 7.5647, longitude: -2.0117 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.reportLocation.mockResolvedValue({
      id: orderId,
      latitude: 7.5647,
      longitude: -2.0117,
    });

    await controller.reportLocation(req, res, next);

    expect(service.reportLocation).toHaveBeenCalledWith({
      orderId,
      userId: "farmer-1",
      latitude: 7.5647,
      longitude: -2.0117,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid body (latitude out of range): forwards ValidationError", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      body: { latitude: 200, longitude: -2.0117 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.reportLocation(req, res, next);

    expect(service.reportLocation).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("unknown field in body (e.g. an ETA field): forwards ValidationError (.strict())", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      body: { latitude: 7.5, longitude: -2.0, estimatedDeliveryMinutes: 30 },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.reportLocation(req, res, next);

    expect(service.reportLocation).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. DELIVERY_LOCATION_REPORTING_NOT_ALLOWED or unauthorized) propagates via next()", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      body: { latitude: 7.5, longitude: -2.0 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("not allowed");
    service.reportLocation.mockRejectedValue(err);

    await controller.reportLocation(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("getOrder", () => {
  test("valid params + req.user.id: 200 with order data", async () => {
    const orderId = randomUUID();
    const req = mockRequest({ params: { orderId }, user: { id: "buyer-1" } });
    const res = mockResponse();
    const next = mockNext();
    service.getOrder.mockResolvedValue({ id: orderId, status: "PENDING" });

    await controller.getOrder(req, res, next);

    expect(service.getOrder).toHaveBeenCalledWith({
      orderId,
      userId: "buyer-1",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid orderId param: forwards ValidationError", async () => {
    const req = mockRequest({
      params: { orderId: "bad" },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.getOrder(req, res, next);

    expect(service.getOrder).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. UnauthorizedOrderAccessError for a non-participant) propagates via next()", async () => {
    const req = mockRequest({
      params: { orderId: randomUUID() },
      user: { id: "stranger" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("not a participant");
    service.getOrder.mockRejectedValue(err);

    await controller.getOrder(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("listMyOrdersAsBuyer", () => {
  test("scopes to req.user.id as buyerId, parses query filters, 200", async () => {
    const req = mockRequest({
      query: { status: "IN_TRANSIT", page: 1, limit: 10 },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.listMyOrdersAsBuyer.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 10, total: 0, totalPages: 0 },
    });

    await controller.listMyOrdersAsBuyer(req, res, next);

    expect(service.listMyOrdersAsBuyer).toHaveBeenCalledWith({
      buyerId: "buyer-1",
      filters: expect.objectContaining({
        status: "IN_TRANSIT",
        page: 1,
        limit: 10,
      }),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("applies real Zod defaults for page/limit when the query is empty", async () => {
    const req = mockRequest({ query: {}, user: { id: "buyer-1" } });
    const res = mockResponse();
    const next = mockNext();
    service.listMyOrdersAsBuyer.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.listMyOrdersAsBuyer(req, res, next);

    expect(service.listMyOrdersAsBuyer).toHaveBeenCalledWith({
      buyerId: "buyer-1",
      filters: expect.objectContaining({ page: 1, limit: 20 }),
    });
  });

  test("invalid status filter value: forwards ValidationError", async () => {
    const req = mockRequest({
      query: { status: "SHIPPED" },
      user: { id: "buyer-1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.listMyOrdersAsBuyer(req, res, next);

    expect(service.listMyOrdersAsBuyer).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});

// ─────────────────────────────────────────────────────────────
describe("listMyOrdersAsFarmer", () => {
  test("scopes to req.user.id as farmerId, parses query filters, 200", async () => {
    const req = mockRequest({
      query: { status: "PENDING" },
      user: { id: "farmer-1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.listMyOrdersAsFarmer.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.listMyOrdersAsFarmer(req, res, next);

    expect(service.listMyOrdersAsFarmer).toHaveBeenCalledWith({
      farmerId: "farmer-1",
      filters: expect.objectContaining({ status: "PENDING" }),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("is a distinct call path from listMyOrdersAsBuyer — never invokes the buyer service function", async () => {
    const req = mockRequest({ query: {}, user: { id: "farmer-1" } });
    const res = mockResponse();
    const next = mockNext();
    service.listMyOrdersAsFarmer.mockResolvedValue({
      results: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
    });

    await controller.listMyOrdersAsFarmer(req, res, next);

    expect(service.listMyOrdersAsBuyer).not.toHaveBeenCalled();
  });

  test("service rejection propagates via next()", async () => {
    const req = mockRequest({ query: {}, user: { id: "farmer-1" } });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("database unavailable");
    service.listMyOrdersAsFarmer.mockRejectedValue(err);

    await controller.listMyOrdersAsFarmer(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});
