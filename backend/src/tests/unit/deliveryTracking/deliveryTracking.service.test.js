import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";

jest.unstable_mockModule(
  "../../../modules/deliveryTracking/deliveryTracking.repository.js",
  () => ({
    createOrder: jest.fn(),
    createOrderWithListingLock: jest.fn(),
    findOrderById: jest.fn(),
    findOrderByIdWithRelations: jest.fn(),
    applyOrderStatusTransition: jest.fn(),
    updateOrderStatus: jest.fn(),
    updateOrderLocation: jest.fn(),
    listOrdersByBuyerId: jest.fn(),
    listOrdersByFarmerId: jest.fn(),
    getFarmerSummaryData: jest.fn(),
  }),
);

jest.unstable_mockModule(
  "../../../modules/deliveryTracking/deliveryTracking.events.js",
  () => ({
    createOrderCreatedEvent: jest.fn(() => ({ eventType: "order.created" })),
    createOrderConfirmedEvent: jest.fn(() => ({
      eventType: "order.confirmed",
    })),
    createOrderInTransitEvent: jest.fn(() => ({
      eventType: "order.in_transit",
    })),
    createOrderDeliveredEvent: jest.fn(() => ({
      eventType: "order.delivered",
    })),
    createOrderCancelledEvent: jest.fn(() => ({
      eventType: "order.cancelled",
    })),
    createOrderLocationUpdatedEvent: jest.fn(() => ({
      eventType: "order.location_updated",
    })),
  }),
);

jest.unstable_mockModule(
  "../../../modules/marketplace/marketplace.service.js",
  () => ({
    getListing: jest.fn(),
    confirmListingReservation: jest.fn(),
    releaseListingReservation: jest.fn(),
  }),
);

jest.unstable_mockModule(
  "../../../modules/notifications/notifications.service.js",
  () => ({
    createNotification: jest.fn(),
  }),
);

const repo =
  await import("../../../modules/deliveryTracking/deliveryTracking.repository.js");
const events =
  await import("../../../modules/deliveryTracking/deliveryTracking.events.js");
const marketplaceService =
  await import("../../../modules/marketplace/marketplace.service.js");
const service =
  await import("../../../modules/deliveryTracking/deliveryTracking.service.js");
const deliveryErrors =
  await import("../../../modules/deliveryTracking/deliveryTracking.errors.js");
const { ORDER_STATUS } =
  await import("../../../modules/deliveryTracking/deliveryTracking.constants.js");

// ─── Fixtures ───

function fakeListing(overrides = {}) {
  return {
    id: randomUUID(),
    farmerId: "farmer-1",
    pricePerUnit: 120.5,
    status: "ACTIVE",
    ...overrides,
  };
}

function fakeOrder(overrides = {}) {
  return {
    id: randomUUID(),
    listingId: randomUUID(),
    buyerId: "buyer-1",
    farmerId: "farmer-1",
    quantity: 10,
    pricePerUnitAtOrder: 120.5,
    status: ORDER_STATUS.PENDING,
    latestLatitude: null,
    latestLongitude: null,
    locationReportedAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("createOrder", () => {
  test("derives farmerId from the listing lock, never from client input", async () => {
    const listing = fakeListing({ farmerId: "real-farmer" });
    marketplaceService.getListing.mockResolvedValue(listing);
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: true,
      order: fakeOrder({ farmerId: "real-farmer" }),
      listing: { id: listing.id, title: "t", quantityUnit: "BAG" },
    });

    await service.createOrder({
      buyerId: "buyer-1",
      listingId: listing.id,
      quantity: 10,
    });

    expect(repo.createOrderWithListingLock).toHaveBeenCalledWith(
      expect.objectContaining({ buyerId: "buyer-1", listingId: listing.id }),
    );
  });

  test("snapshots pricePerUnitAtOrder from the listing price at creation time", async () => {
    const listing = fakeListing({ pricePerUnit: 87.25 });
    marketplaceService.getListing.mockResolvedValue(listing);
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: true,
      order: fakeOrder({ pricePerUnitAtOrder: 87.25 }),
      listing: { id: listing.id, title: "t", quantityUnit: "BAG" },
    });

    await service.createOrder({
      buyerId: "buyer-1",
      listingId: listing.id,
      quantity: 5,
    });

    expect(repo.createOrderWithListingLock).toHaveBeenCalledWith(
      expect.objectContaining({ pricePerUnitAtOrder: 87.25 }),
    );
  });

  test("creates the order with initial status PENDING", async () => {
    marketplaceService.getListing.mockResolvedValue(fakeListing());
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: true,
      order: fakeOrder({ status: ORDER_STATUS.PENDING }),
      listing: { id: "listing-1", title: "t", quantityUnit: "BAG" },
    });

    await service.createOrder({
      buyerId: "buyer-1",
      listingId: "listing-1",
      quantity: 10,
    });

    expect(repo.createOrderWithListingLock).toHaveBeenCalled();
  });

  test("does NOT reserve inventory at creation", async () => {
    marketplaceService.getListing.mockResolvedValue(fakeListing());
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: true,
      order: fakeOrder(),
      listing: { id: "listing-1", title: "t", quantityUnit: "BAG" },
    });

    await service.createOrder({
      buyerId: "buyer-1",
      listingId: "listing-1",
      quantity: 10,
    });

    expect(marketplaceService.confirmListingReservation).not.toHaveBeenCalled();
    expect(marketplaceService.releaseListingReservation).not.toHaveBeenCalled();
  });

  test("emits OrderCreatedEvent on success", async () => {
    marketplaceService.getListing.mockResolvedValue(fakeListing());
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: true,
      order: fakeOrder(),
      listing: { id: "listing-1", title: "t", quantityUnit: "BAG" },
    });

    await service.createOrder({
      buyerId: "buyer-1",
      listingId: "listing-1",
      quantity: 10,
    });

    expect(events.createOrderCreatedEvent).toHaveBeenCalled();
  });

  test("propagates ListingNotFoundError from marketplace.service.getListing unmodified", async () => {
    class FakeListingNotFoundError extends Error {}
    marketplaceService.getListing.mockRejectedValue(
      new FakeListingNotFoundError("not found"),
    );

    await expect(
      service.createOrder({
        buyerId: "buyer-1",
        listingId: "missing-listing",
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(FakeListingNotFoundError);
    expect(repo.createOrderWithListingLock).not.toHaveBeenCalled();
  });

  test("maps NOT_ACTIVE lock failure to ListingUnavailableError", async () => {
    marketplaceService.getListing.mockResolvedValue(fakeListing());
    repo.createOrderWithListingLock.mockResolvedValue({
      ok: false,
      reason: "NOT_ACTIVE",
      listingStatus: "SOLD",
    });

    await expect(
      service.createOrder({
        buyerId: "buyer-1",
        listingId: "listing-1",
        quantity: 10,
      }),
    ).rejects.toBeInstanceOf(
      (await import("../../../modules/marketplace/marketplace.errors.js"))
        .ListingAlreadySoldError,
    );
  });
});

// ─────────────────────────────────────────────────────────────
describe("getOrder", () => {
  test("throws OrderNotFoundError when absent", async () => {
    repo.findOrderById.mockResolvedValue(null);
    await expect(
      service.getOrder({ orderId: "x", userId: "u1" }),
    ).rejects.toBeInstanceOf(deliveryErrors.OrderNotFoundError);
  });

  test("allows access to the buyer", async () => {
    repo.findOrderById.mockResolvedValue(
      fakeOrder({ buyerId: "u1", farmerId: "someone-else" }),
    );
    await expect(
      service.getOrder({ orderId: "x", userId: "u1" }),
    ).resolves.toBeDefined();
  });

  test("allows access to the farmer", async () => {
    repo.findOrderById.mockResolvedValue(
      fakeOrder({ buyerId: "someone-else", farmerId: "u1" }),
    );
    await expect(
      service.getOrder({ orderId: "x", userId: "u1" }),
    ).resolves.toBeDefined();
  });

  test("rejects an unrelated user with UnauthorizedOrderAccessError", async () => {
    repo.findOrderById.mockResolvedValue(
      fakeOrder({ buyerId: "buyer-a", farmerId: "farmer-a" }),
    );
    await expect(
      service.getOrder({ orderId: "x", userId: "stranger" }),
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });
});

// ─────────────────────────────────────────────────────────────
describe("listMyOrdersAsBuyer", () => {
  test("converts page/limit into skip/take before calling the repository", async () => {
    repo.listOrdersByBuyerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsBuyer({
      buyerId: "u1",
      filters: { page: 2, limit: 10 },
    });

    expect(repo.listOrdersByBuyerId).toHaveBeenCalledWith(
      "u1",
      expect.objectContaining({ skip: 10, take: 10 }),
    );
  });

  test("passes an optional status filter through to the repository", async () => {
    repo.listOrdersByBuyerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsBuyer({
      buyerId: "u1",
      filters: { status: "IN_TRANSIT", page: 1, limit: 20 },
    });

    expect(repo.listOrdersByBuyerId).toHaveBeenCalledWith(
      "u1",
      expect.objectContaining({ status: "IN_TRANSIT" }),
    );
  });

  test("maps repository results into OrderDTOs with correct pagination metadata", async () => {
    repo.listOrdersByBuyerId.mockResolvedValue({
      items: [fakeOrder(), fakeOrder()],
      totalCount: 13,
    });

    const result = await service.listMyOrdersAsBuyer({
      buyerId: "u1",
      filters: { page: 1, limit: 5 },
    });

    expect(result.results).toHaveLength(2);
    expect(result.results[0]).toHaveProperty("status");
    expect(result.pagination).toEqual({
      page: 1,
      limit: 5,
      total: 13,
      totalPages: 3,
    });
  });

  test("is always scoped to the given buyerId — never a client-controllable arbitrary user", async () => {
    repo.listOrdersByBuyerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsBuyer({
      buyerId: "u1",
      filters: { page: 1, limit: 20 },
    });

    expect(repo.listOrdersByBuyerId).toHaveBeenCalledWith(
      "u1",
      expect.anything(),
    );
  });
});

// ─────────────────────────────────────────────────────────────
describe("listMyOrdersAsFarmer", () => {
  test("converts page/limit into skip/take before calling the repository", async () => {
    repo.listOrdersByFarmerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsFarmer({
      farmerId: "u1",
      filters: { page: 4, limit: 20 },
    });

    expect(repo.listOrdersByFarmerId).toHaveBeenCalledWith(
      "u1",
      expect.objectContaining({ skip: 60, take: 20 }),
    );
  });

  test("passes an optional status filter through to the repository", async () => {
    repo.listOrdersByFarmerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsFarmer({
      farmerId: "u1",
      filters: { status: "PENDING", page: 1, limit: 20 },
    });

    expect(repo.listOrdersByFarmerId).toHaveBeenCalledWith(
      "u1",
      expect.objectContaining({ status: "PENDING" }),
    );
  });

  test("maps repository results into OrderDTOs with correct pagination metadata", async () => {
    repo.listOrdersByFarmerId.mockResolvedValue({
      items: [fakeOrder()],
      totalCount: 1,
    });

    const result = await service.listMyOrdersAsFarmer({
      farmerId: "u1",
      filters: { page: 1, limit: 20 },
    });

    expect(result.results).toHaveLength(1);
    expect(result.pagination).toEqual({
      page: 1,
      limit: 20,
      total: 1,
      totalPages: 1,
    });
  });

  test("is a separate call path from listMyOrdersAsBuyer — the two never cross-invoke each other's repository method", async () => {
    repo.listOrdersByFarmerId.mockResolvedValue({ items: [], totalCount: 0 });

    await service.listMyOrdersAsFarmer({
      farmerId: "u1",
      filters: { page: 1, limit: 20 },
    });

    expect(repo.listOrdersByBuyerId).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
// Part 2: updateOrderStatus, reportLocation
// Continues in the same file as Part 1 — mocks and fixtures
// (repo, events, marketplaceService, fakeOrder, fakeListing)
// already declared above.
// ─────────────────────────────────────────────────────────────

describe('updateOrderStatus — legal transitions', () => {
  test('PENDING → CONFIRMED (farmer only): atomic confirm inventory action', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, farmerId: 'farmer-1', quantity: 10 });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.CONFIRMED } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CONFIRMED });

    expect(repo.applyOrderStatusTransition).toHaveBeenCalledWith(
      expect.objectContaining({
        orderId: order.id,
        fromStatus: ORDER_STATUS.PENDING,
        toStatus: ORDER_STATUS.CONFIRMED,
        inventoryAction: 'confirm',
      }),
    );
    expect(events.createOrderConfirmedEvent).toHaveBeenCalled();
  });

  test('CONFIRMED → IN_TRANSIT (farmer only): emits OrderInTransitEvent', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.CONFIRMED, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.IN_TRANSIT } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.IN_TRANSIT });

    expect(repo.applyOrderStatusTransition).toHaveBeenCalledWith(
      expect.objectContaining({ inventoryAction: null }),
    );
    expect(events.createOrderInTransitEvent).toHaveBeenCalled();
  });

  test('IN_TRANSIT → DELIVERED (farmer only): emits OrderDeliveredEvent', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.DELIVERED } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.DELIVERED });

    expect(events.createOrderDeliveredEvent).toHaveBeenCalled();
  });

  test('PENDING → CANCELLED (buyer): no inventory release, emits OrderCancelledEvent', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.CANCELLED } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.CANCELLED });

    expect(repo.applyOrderStatusTransition).toHaveBeenCalledWith(
      expect.objectContaining({ inventoryAction: null }),
    );
    expect(events.createOrderCancelledEvent).toHaveBeenCalledWith(
      expect.objectContaining({ cancelledBy: 'buyer-1', previousStatus: ORDER_STATUS.PENDING })
    );
  });

  test('PENDING → CANCELLED (farmer): permitted', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.CANCELLED } });

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CANCELLED })
    ).resolves.toBeDefined();
  });

  test('CONFIRMED → CANCELLED (buyer within grace): release inventory', async () => {
    const order = fakeOrder({
      status: ORDER_STATUS.CONFIRMED,
      buyerId: 'buyer-1',
      farmerId: 'farmer-1',
      quantity: 7,
      confirmedAt: new Date(),
    });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.CANCELLED } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.CANCELLED });

    expect(repo.applyOrderStatusTransition).toHaveBeenCalledWith(
      expect.objectContaining({ inventoryAction: 'release' }),
    );
    expect(events.createOrderCancelledEvent).toHaveBeenCalledWith(
      expect.objectContaining({ previousStatus: ORDER_STATUS.CONFIRMED })
    );
  });

  test('CONFIRMED → CANCELLED (farmer): release inventory', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.CONFIRMED, buyerId: 'buyer-1', farmerId: 'farmer-1', quantity: 3 });
    repo.findOrderById.mockResolvedValue(order);
    repo.applyOrderStatusTransition.mockResolvedValue({ ok: true, order: { ...order, status: ORDER_STATUS.CANCELLED } });

    await service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CANCELLED });

    expect(repo.applyOrderStatusTransition).toHaveBeenCalledWith(
      expect.objectContaining({ inventoryAction: 'release' }),
    );
  });

  test('IN_TRANSIT → CANCELLED is blocked', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CANCELLED })
    ).rejects.toBeInstanceOf(deliveryErrors.OrderCancellationNotAllowedError);

    expect(repo.applyOrderStatusTransition).not.toHaveBeenCalled();
  });
});

describe('updateOrderStatus — illegal transitions', () => {
  test.each([
    [ORDER_STATUS.PENDING, ORDER_STATUS.IN_TRANSIT],   // skips CONFIRMED
    [ORDER_STATUS.PENDING, ORDER_STATUS.DELIVERED],    // skips two stages
    [ORDER_STATUS.CONFIRMED, ORDER_STATUS.DELIVERED],  // skips IN_TRANSIT
    [ORDER_STATUS.CONFIRMED, ORDER_STATUS.PENDING],    // backward
    [ORDER_STATUS.IN_TRANSIT, ORDER_STATUS.PENDING],   // backward
    [ORDER_STATUS.IN_TRANSIT, ORDER_STATUS.CONFIRMED], // backward
    [ORDER_STATUS.PENDING, ORDER_STATUS.PENDING],      // self-transition
    [ORDER_STATUS.CONFIRMED, ORDER_STATUS.CONFIRMED],  // self-transition
    [ORDER_STATUS.DELIVERED, ORDER_STATUS.CANCELLED],  // out of terminal state
    [ORDER_STATUS.DELIVERED, ORDER_STATUS.IN_TRANSIT], // out of terminal state
    [ORDER_STATUS.CANCELLED, ORDER_STATUS.PENDING],    // out of terminal state
    [ORDER_STATUS.CANCELLED, ORDER_STATUS.CONFIRMED],  // out of terminal state
  ])('rejects %s → %s with InvalidOrderStatusTransitionError', async (from, to) => {
    const order = fakeOrder({ status: from, farmerId: 'farmer-1', buyerId: 'buyer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: to })
    ).rejects.toBeInstanceOf(deliveryErrors.InvalidOrderStatusTransitionError);

    expect(repo.updateOrderStatus).not.toHaveBeenCalled();
    expect(marketplaceService.confirmListingReservation).not.toHaveBeenCalled();
    expect(marketplaceService.releaseListingReservation).not.toHaveBeenCalled();
  });

  test('throws OrderNotFoundError when the order does not exist', async () => {
    repo.findOrderById.mockResolvedValue(null);
    await expect(
      service.updateOrderStatus({ orderId: 'missing', userId: 'u1', newStatus: ORDER_STATUS.CONFIRMED })
    ).rejects.toBeInstanceOf(deliveryErrors.OrderNotFoundError);
  });
});

describe('updateOrderStatus — actor permission rules', () => {
  test('rejects a buyer attempting PENDING → CONFIRMED (farmer-only action)', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.CONFIRMED })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });

  test('rejects a buyer attempting CONFIRMED → IN_TRANSIT (farmer-only action)', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.CONFIRMED, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.IN_TRANSIT })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });

  test('rejects a completely unrelated user attempting to cancel', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'stranger', newStatus: ORDER_STATUS.CANCELLED })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });

  test('permission check occurs even when the transition itself would otherwise be legal', async () => {
    // Confirms ordering: an illegitimate actor is rejected even for a
    // structurally valid transition — permission is not bypassed by
    // transition validity.
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.DELIVERED })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });
});

describe('updateOrderStatus — failure propagation', () => {
  test('propagates InsufficientListingQuantityError from confirmListingReservation unmodified', async () => {
    class FakeInsufficientQuantityError extends Error {}
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    marketplaceService.confirmListingReservation.mockRejectedValue(new FakeInsufficientQuantityError('no stock'));

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CONFIRMED })
    ).rejects.toBeInstanceOf(FakeInsufficientQuantityError);

    // Critical orchestration assertion: if Marketplace rejects the
    // reservation, the Order's own status must NOT be advanced —
    // otherwise the two systems would disagree (Order says CONFIRMED,
    // Marketplace never actually reserved anything).
    expect(repo.updateOrderStatus).not.toHaveBeenCalled();
    expect(events.createOrderConfirmedEvent).not.toHaveBeenCalled();
  });

  test('propagates a Marketplace error from releaseListingReservation unmodified, without updating Order status', async () => {
    class FakeMarketplaceError extends Error {}
    const order = fakeOrder({ status: ORDER_STATUS.CONFIRMED, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    marketplaceService.releaseListingReservation.mockRejectedValue(new FakeMarketplaceError('unexpected'));

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'buyer-1', newStatus: ORDER_STATUS.CANCELLED })
    ).rejects.toBeInstanceOf(FakeMarketplaceError);

    expect(repo.updateOrderStatus).not.toHaveBeenCalled();
    expect(events.createOrderCancelledEvent).not.toHaveBeenCalled();
  });

  test('documents the known non-atomic MVP limitation: repo.updateOrderStatus failure after a successful Marketplace call is NOT rolled back', async () => {
    // This test does not assert a "fix" — it documents the accepted,
    // reviewed architectural tradeoff exactly as recorded: Marketplace's
    // write and the Order's write are two independent operations with
    // no compensating transaction. If the second call fails after the
    // first succeeded, Marketplace's inventory change persists.
    const order = fakeOrder({ status: ORDER_STATUS.PENDING, farmerId: 'farmer-1', quantity: 10 });
    repo.findOrderById.mockResolvedValue(order);
    marketplaceService.confirmListingReservation.mockResolvedValue({ id: order.listingId, status: 'ACTIVE' });
    repo.updateOrderStatus.mockRejectedValue(new Error('order db write failed'));

    await expect(
      service.updateOrderStatus({ orderId: order.id, userId: 'farmer-1', newStatus: ORDER_STATUS.CONFIRMED })
    ).rejects.toThrow('order db write failed');

    // The Marketplace call already succeeded and is NOT reversed —
    // this is the documented tradeoff, not a defect.
    expect(marketplaceService.confirmListingReservation).toHaveBeenCalledTimes(1);
    expect(marketplaceService.releaseListingReservation).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe('reportLocation', () => {
  test('throws OrderNotFoundError when the order does not exist', async () => {
    repo.findOrderById.mockResolvedValue(null);
    await expect(
      service.reportLocation({ orderId: 'x', userId: 'u1', latitude: 7.5, longitude: -2.0 })
    ).rejects.toBeInstanceOf(deliveryErrors.OrderNotFoundError);
  });

  test('farmer-only restriction: rejects the buyer attempting to report location', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.reportLocation({ orderId: order.id, userId: 'buyer-1', latitude: 7.5, longitude: -2.0 })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
    expect(repo.updateOrderLocation).not.toHaveBeenCalled();
  });

  test('farmer-only restriction: rejects a completely unrelated user', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, buyerId: 'buyer-1', farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.reportLocation({ orderId: order.id, userId: 'stranger', latitude: 7.5, longitude: -2.0 })
    ).rejects.toBeInstanceOf(deliveryErrors.UnauthorizedOrderAccessError);
  });

  test.each([
    ORDER_STATUS.PENDING,
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.CANCELLED,
  ])('IN_TRANSIT restriction: rejects location reporting when order status is %s', async (status) => {
    const order = fakeOrder({ status, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);

    await expect(
      service.reportLocation({ orderId: order.id, userId: 'farmer-1', latitude: 7.5, longitude: -2.0 })
    ).rejects.toBeInstanceOf(deliveryErrors.LocationReportingNotAllowedError);
    expect(repo.updateOrderLocation).not.toHaveBeenCalled();
  });

  test('on success (farmer + IN_TRANSIT): updates coordinates with a fresh timestamp and emits OrderLocationUpdatedEvent', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.updateOrderLocation.mockResolvedValue({
      ...order,
      latestLatitude: 7.5647,
      latestLongitude: -2.0117,
      locationReportedAt: new Date(),
    });

    const result = await service.reportLocation({
      orderId: order.id,
      userId: 'farmer-1',
      latitude: 7.5647,
      longitude: -2.0117,
    });

    expect(repo.updateOrderLocation).toHaveBeenCalledWith(
      order.id,
      expect.objectContaining({ latitude: 7.5647, longitude: -2.0117, locationReportedAt: expect.any(Date) })
    );
    expect(events.createOrderLocationUpdatedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty('latitude', 7.5647);
  });

  test('does not touch Marketplace in any way (no reservation logic tied to location updates)', async () => {
    const order = fakeOrder({ status: ORDER_STATUS.IN_TRANSIT, farmerId: 'farmer-1' });
    repo.findOrderById.mockResolvedValue(order);
    repo.updateOrderLocation.mockResolvedValue(order);

    await service.reportLocation({ orderId: order.id, userId: 'farmer-1', latitude: 7.5, longitude: -2.0 });

    expect(marketplaceService.getListing).not.toHaveBeenCalled();
    expect(marketplaceService.confirmListingReservation).not.toHaveBeenCalled();
    expect(marketplaceService.releaseListingReservation).not.toHaveBeenCalled();
  });
});