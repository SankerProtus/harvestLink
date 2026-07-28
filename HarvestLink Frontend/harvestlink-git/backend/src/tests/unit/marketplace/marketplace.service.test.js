import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";

// ─── Mock repository + events BEFORE importing the service ───

jest.unstable_mockModule(
  "../../../modules/marketplace/marketplace.repository.js",
  () => ({
    createListing: jest.fn(),
    findListingById: jest.fn(),
    findListingByIdWithFarmer: jest.fn(),
    findListingByFarmerAndTitle: jest.fn(),
    updateListing: jest.fn(),
    updateListingQuantity: jest.fn(),
    updateListingStatus: jest.fn(),
    listListingsByFarmerId: jest.fn(),
    searchListings: jest.fn(),
  }),
);

jest.unstable_mockModule(
  "../../../modules/marketplace/marketplace.events.js",
  () => ({
    createListingCreatedEvent: jest.fn(() => ({
      eventType: "listing.created",
    })),
    createListingUpdatedEvent: jest.fn(() => ({
      eventType: "listing.updated",
    })),
    createListingQuantityUpdatedEvent: jest.fn(() => ({
      eventType: "listing.quantity_updated",
    })),
    createListingStatusChangedEvent: jest.fn(() => ({
      eventType: "listing.status_changed",
    })),
    createListingRemovedEvent: jest.fn(() => ({
      eventType: "listing.removed",
    })),
    createListingSoldEvent: jest.fn(() => ({ eventType: "listing.sold" })),
    createListingViewedEvent: jest.fn(),
    createListingContactedEvent: jest.fn(),
  }),
);

const repo =
  await import("../../../modules/marketplace/marketplace.repository.js");
const events =
  await import("../../../modules/marketplace/marketplace.events.js");
const service =
  await import("../../../modules/marketplace/marketplace.service.js");
const marketplaceErrors =
  await import("../../../modules/marketplace/marketplace.errors.js");
const { LISTING_STATUS, CROP_TYPES, QUANTITY_UNITS } =
  await import("../../../modules/marketplace/marketplace.constants.js");

// ─── Fixtures ───

/**
 * Simulates a Prisma Decimal.js instance's real behavior: valueOf()
 * returns a STRING representation, not a number, and does NOT throw.
 * This is what actually makes naive comparisons unsafe — if two such
 * values are compared with `<`/`>` and BOTH sides are Decimal-like,
 * JS falls back to lexicographic string comparison (e.g. "9" > "10"
 * is true as strings), unless explicitly converted via Number(...).
 */
function fakeDecimal(value) {
  return {
    valueOf: () => String(value),
    toString: () => String(value),
  };
}

function fakeListing(overrides = {}) {
  return {
    id: randomUUID(),
    farmerId: "farmer-1",
    title: "Fresh Tomatoes",
    description: null,
    cropType: CROP_TYPES.TOMATO,
    quantity: 25,
    quantityUnit: QUANTITY_UNITS.CRATE,
    pricePerUnit: 120.5,
    location: "Techiman",
    images: [],
    status: LISTING_STATUS.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("createListing", () => {
  test("throws DuplicateListingError only when an ACTIVE duplicate exists", async () => {
    repo.findListingByFarmerAndTitle.mockResolvedValue(
      fakeListing({ status: LISTING_STATUS.ACTIVE }),
    );

    await expect(
      service.createListing({
        farmerId: "farmer-1",
        title: "Fresh Tomatoes",
        cropType: CROP_TYPES.TOMATO,
        quantity: 10,
        quantityUnit: QUANTITY_UNITS.CRATE,
        pricePerUnit: 100,
        location: "Techiman",
      }),
    ).rejects.toBeInstanceOf(marketplaceErrors.DuplicateListingError);
  });

  test("does NOT block creation when the same-title match is SOLD (not ACTIVE)", async () => {
    // Repository is passed status: ACTIVE explicitly (per the fix), so a
    // SOLD/REMOVED match should never even be returned — asserting the
    // repository call itself received the ACTIVE filter.
    repo.findListingByFarmerAndTitle.mockResolvedValue(null);
    repo.createListing.mockResolvedValue(fakeListing());

    await service.createListing({
      farmerId: "farmer-1",
      title: "Fresh Tomatoes",
      cropType: CROP_TYPES.TOMATO,
      quantity: 10,
      quantityUnit: QUANTITY_UNITS.CRATE,
      pricePerUnit: 100,
      location: "Techiman",
    });

    expect(repo.findListingByFarmerAndTitle).toHaveBeenCalledWith(
      "farmer-1",
      "Fresh Tomatoes",
      LISTING_STATUS.ACTIVE,
    );
  });

  test("on success: creates with ACTIVE status and emits ListingCreatedEvent", async () => {
    repo.findListingByFarmerAndTitle.mockResolvedValue(null);
    repo.createListing.mockResolvedValue(fakeListing());

    const result = await service.createListing({
      farmerId: "farmer-1",
      title: "Fresh Tomatoes",
      cropType: CROP_TYPES.TOMATO,
      quantity: 10,
      quantityUnit: QUANTITY_UNITS.CRATE,
      pricePerUnit: 100,
      location: "Techiman",
    });

    expect(repo.createListing).toHaveBeenCalledWith(
      expect.objectContaining({ status: LISTING_STATUS.ACTIVE }),
    );
    expect(events.createListingCreatedEvent).toHaveBeenCalled();
    expect(result).toHaveProperty("id");
  });
});

// ─────────────────────────────────────────────────────────────
describe("updateListing", () => {
  test("throws ListingNotFoundError when the listing does not exist", async () => {
    repo.findListingById.mockResolvedValue(null);
    await expect(
      service.updateListing({ listingId: "x", userId: "u1", updates: {} }),
    ).rejects.toBeInstanceOf(marketplaceErrors.ListingNotFoundError);
  });

  test("throws UnauthorizedListingAccessError when the caller is not the owner", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "someone-else" }),
    );
    await expect(
      service.updateListing({ listingId: "x", userId: "u1", updates: {} }),
    ).rejects.toBeInstanceOf(marketplaceErrors.UnauthorizedListingAccessError);
  });

  test("throws ListingAlreadySoldError for a SOLD listing", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: LISTING_STATUS.SOLD }),
    );
    await expect(
      service.updateListing({ listingId: "x", userId: "u1", updates: {} }),
    ).rejects.toBeInstanceOf(marketplaceErrors.ListingAlreadySoldError);
  });

  test("throws ListingUnavailableError for a REMOVED listing", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: LISTING_STATUS.REMOVED }),
    );
    await expect(
      service.updateListing({ listingId: "x", userId: "u1", updates: {} }),
    ).rejects.toBeInstanceOf(marketplaceErrors.ListingUnavailableError);
  });

  test("normal field update (no quantity to zero) emits ListingUpdatedEvent, not ListingSoldEvent", async () => {
    repo.findListingById.mockResolvedValue(fakeListing({ farmerId: "u1" }));
    repo.updateListing.mockResolvedValue(
      fakeListing({ farmerId: "u1", pricePerUnit: 99 }),
    );

    await service.updateListing({
      listingId: "x",
      userId: "u1",
      updates: { pricePerUnit: 99 },
    });

    expect(repo.updateListing).toHaveBeenCalledWith("x", { pricePerUnit: 99 });
    expect(events.createListingUpdatedEvent).toHaveBeenCalled();
    expect(events.createListingSoldEvent).not.toHaveBeenCalled();
  });

  test("quantity set to exactly 0: single atomic write includes status SOLD, emits ListingSoldEvent", async () => {
    repo.findListingById.mockResolvedValue(fakeListing({ farmerId: "u1" }));
    repo.updateListing.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 0, status: LISTING_STATUS.SOLD }),
    );

    await service.updateListing({
      listingId: "x",
      userId: "u1",
      updates: { quantity: 0 },
    });

    // Atomicity: exactly one repository call combining quantity + status
    expect(repo.updateListing).toHaveBeenCalledTimes(1);
    expect(repo.updateListing).toHaveBeenCalledWith("x", {
      quantity: 0,
      status: LISTING_STATUS.SOLD,
    });
    expect(events.createListingSoldEvent).toHaveBeenCalled();
    expect(events.createListingUpdatedEvent).not.toHaveBeenCalled();
  });

  test("quantity set to a positive value does NOT trigger SOLD", async () => {
    repo.findListingById.mockResolvedValue(fakeListing({ farmerId: "u1" }));
    repo.updateListing.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 5 }),
    );

    await service.updateListing({
      listingId: "x",
      userId: "u1",
      updates: { quantity: 5 },
    });

    expect(repo.updateListing).toHaveBeenCalledWith("x", { quantity: 5 });
    expect(events.createListingSoldEvent).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("updateListingQuantity", () => {
  test("throws ListingNotFoundError / UnauthorizedListingAccessError / editability errors identically to updateListing", async () => {
    repo.findListingById.mockResolvedValue(null);
    await expect(
      service.updateListingQuantity({
        listingId: "x",
        userId: "u1",
        quantity: 5,
      }),
    ).rejects.toBeInstanceOf(marketplaceErrors.ListingNotFoundError);
  });

  test("quantity > 0: uses the dedicated quantity-only repository call, emits only QuantityUpdatedEvent", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 25 }),
    );
    repo.updateListingQuantity.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 10 }),
    );

    await service.updateListingQuantity({
      listingId: "x",
      userId: "u1",
      quantity: 10,
    });

    expect(repo.updateListingQuantity).toHaveBeenCalledWith("x", 10);
    expect(repo.updateListing).not.toHaveBeenCalled();
    expect(events.createListingQuantityUpdatedEvent).toHaveBeenCalled();
    expect(events.createListingSoldEvent).not.toHaveBeenCalled();
  });

  test("quantity === 0: single atomic combined write (generic updateListing, not the dedicated quantity method), emits both events", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 10 }),
    );
    repo.updateListing.mockResolvedValue(
      fakeListing({ farmerId: "u1", quantity: 0, status: LISTING_STATUS.SOLD }),
    );

    await service.updateListingQuantity({
      listingId: "x",
      userId: "u1",
      quantity: 0,
    });

    expect(repo.updateListing).toHaveBeenCalledWith("x", {
      quantity: 0,
      status: LISTING_STATUS.SOLD,
    });
    expect(repo.updateListingQuantity).not.toHaveBeenCalled();
    expect(events.createListingQuantityUpdatedEvent).toHaveBeenCalled();
    expect(events.createListingSoldEvent).toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("changeListingStatus", () => {
  test.each([
    ["ACTIVE", "REMOVED"],
    ["ACTIVE", "SOLD"],
  ])("allows %s → %s", async (from, to) => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: from }),
    );
    repo.updateListingStatus.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: to }),
    );

    await service.changeListingStatus({
      listingId: "x",
      userId: "u1",
      newStatus: to,
    });

    expect(repo.updateListingStatus).toHaveBeenCalledWith("x", to);
    expect(events.createListingStatusChangedEvent).toHaveBeenCalled();
  });

  test.each([
    ["ACTIVE", "ACTIVE"],
    ["SOLD", "ACTIVE"],
    ["SOLD", "REMOVED"],
    ["REMOVED", "ACTIVE"],
    ["REMOVED", "SOLD"],
  ])(
    "rejects %s → %s with InvalidListingStatusTransitionError",
    async (from, to) => {
      repo.findListingById.mockResolvedValue(
        fakeListing({ farmerId: "u1", status: from }),
      );

      await expect(
        service.changeListingStatus({
          listingId: "x",
          userId: "u1",
          newStatus: to,
        }),
      ).rejects.toBeInstanceOf(
        marketplaceErrors.InvalidListingStatusTransitionError,
      );
      expect(repo.updateListingStatus).not.toHaveBeenCalled();
    },
  );

  test("enforces ownership before evaluating the transition", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "someone-else", status: "ACTIVE" }),
    );

    await expect(
      service.changeListingStatus({
        listingId: "x",
        userId: "u1",
        newStatus: "REMOVED",
      }),
    ).rejects.toBeInstanceOf(marketplaceErrors.UnauthorizedListingAccessError);
  });

  test("ACTIVE → REMOVED emits ListingRemovedEvent, not ListingSoldEvent", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: "ACTIVE" }),
    );
    repo.updateListingStatus.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: "REMOVED" }),
    );

    await service.changeListingStatus({
      listingId: "x",
      userId: "u1",
      newStatus: "REMOVED",
    });

    expect(events.createListingRemovedEvent).toHaveBeenCalled();
    expect(events.createListingSoldEvent).not.toHaveBeenCalled();
  });

  test("ACTIVE → SOLD emits ListingSoldEvent, not ListingRemovedEvent", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: "ACTIVE" }),
    );
    repo.updateListingStatus.mockResolvedValue(
      fakeListing({ farmerId: "u1", status: "SOLD" }),
    );

    await service.changeListingStatus({
      listingId: "x",
      userId: "u1",
      newStatus: "SOLD",
    });

    expect(events.createListingSoldEvent).toHaveBeenCalled();
    expect(events.createListingRemovedEvent).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("getListing", () => {
  test("throws ListingNotFoundError when absent", async () => {
    repo.findListingById.mockResolvedValue(null);
    await expect(service.getListing({ listingId: "x" })).rejects.toBeInstanceOf(
      marketplaceErrors.ListingNotFoundError,
    );
  });

  test("returns a mapped DTO on success", async () => {
    repo.findListingById.mockResolvedValue(fakeListing());
    const result = await service.getListing({ listingId: "x" });
    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("status");
  });
});

// ─────────────────────────────────────────────────────────────
describe("getFarmerListings", () => {
  test("applies no ownership restriction at the service layer (controller-enforced instead)", async () => {
    repo.listListingsByFarmerId.mockResolvedValue([
      fakeListing({ farmerId: "any-farmer" }),
    ]);

    const result = await service.getFarmerListings({ farmerId: "any-farmer" });

    expect(repo.listListingsByFarmerId).toHaveBeenCalledWith("any-farmer");
    expect(result).toHaveLength(1);
  });
});

// ─────────────────────────────────────────────────────────────
describe("searchListings", () => {
  test("converts page/limit into skip/take before calling the repository", async () => {
    repo.searchListings.mockResolvedValue({
      items: [fakeListing()],
      totalCount: 1,
    });

    await service.searchListings({
      page: 3,
      limit: 10,
      cropType: CROP_TYPES.MAIZE,
    });

    expect(repo.searchListings).toHaveBeenCalledWith(
      expect.objectContaining({
        skip: 20,
        take: 10,
        cropType: CROP_TYPES.MAIZE,
      }),
    );
  });

  test("returns a paginated search response with correct totalPages", async () => {
    repo.searchListings.mockResolvedValue({
      items: [fakeListing(), fakeListing()],
      totalCount: 22,
    });

    const result = await service.searchListings({ page: 1, limit: 10 });

    expect(result.pagination).toEqual({
      page: 1,
      limit: 10,
      total: 22,
      totalPages: 3,
    });
    expect(result.results).toHaveLength(2);
  });
});

// ─────────────────────────────────────────────────────────────
describe("confirmListingReservation (internal, Marketplace-only API)", () => {
  test("has no HTTP/userId concerns — accepts only { listingId, quantity }", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: 25 }),
    );
    repo.updateListing.mockResolvedValue(fakeListing({ quantity: 15 }));

    // No userId passed anywhere — confirms this is a trusted internal
    // call, not a controller-facing, ownership-checked endpoint.
    await expect(
      service.confirmListingReservation({ listingId: "x", quantity: 10 }),
    ).resolves.toBeDefined();
  });

  test("throws InsufficientListingQuantityError when requested exceeds available", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: 5 }),
    );

    await expect(
      service.confirmListingReservation({ listingId: "x", quantity: 10 }),
    ).rejects.toBeInstanceOf(
      marketplaceErrors.InsufficientListingQuantityError,
    );
    expect(repo.updateListing).not.toHaveBeenCalled();
  });

  test("throws ListingAlreadySoldError / ListingUnavailableError for non-ACTIVE listings, same as updateListing", async () => {
    repo.findListingById.mockResolvedValue(fakeListing({ status: "SOLD" }));
    await expect(
      service.confirmListingReservation({ listingId: "x", quantity: 1 }),
    ).rejects.toBeInstanceOf(marketplaceErrors.ListingAlreadySoldError);
  });

  test("decrements quantity and does NOT transition to SOLD when remainder is positive", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: 25 }),
    );
    repo.updateListing.mockResolvedValue(fakeListing({ quantity: 15 }));

    await service.confirmListingReservation({ listingId: "x", quantity: 10 });

    expect(repo.updateListing).toHaveBeenCalledWith("x", { quantity: 15 });
  });

  test("atomically decrements to zero AND transitions to SOLD in one write", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: 10 }),
    );
    repo.updateListing.mockResolvedValue(
      fakeListing({ quantity: 0, status: "SOLD" }),
    );

    await service.confirmListingReservation({ listingId: "x", quantity: 10 });

    expect(repo.updateListing).toHaveBeenCalledTimes(1);
    expect(repo.updateListing).toHaveBeenCalledWith("x", {
      quantity: 0,
      status: LISTING_STATUS.SOLD,
    });
    expect(events.createListingSoldEvent).toHaveBeenCalled();
  });

  test("REGRESSION: correctly compares Decimal-like values numerically, not lexicographically (available=10, requested=9 must succeed)", async () => {
    // Lexicographic string comparison of "10" vs "9" would incorrectly
    // conclude "10" < "9" (since '1' < '9' as characters), which would
    // wrongly throw InsufficientListingQuantityError. The fixed
    // implementation must convert both to Number before comparing.
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: fakeDecimal("10") }),
    );
    repo.updateListing.mockResolvedValue(fakeListing({ quantity: 1 }));

    await expect(
      service.confirmListingReservation({
        listingId: "x",
        quantity: fakeDecimal("9"),
      }),
    ).resolves.toBeDefined();

    expect(repo.updateListing).toHaveBeenCalledWith("x", { quantity: 1 });
  });
});

// ─────────────────────────────────────────────────────────────
describe("releaseListingReservation (internal, Marketplace-only API)", () => {
  test("restores quantity without reactivating a listing that was already ACTIVE", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "ACTIVE", quantity: 5 }),
    );
    repo.updateListing.mockResolvedValue(fakeListing({ quantity: 15 }));

    await service.releaseListingReservation({ listingId: "x", quantity: 10 });

    expect(repo.updateListing).toHaveBeenCalledWith("x", { quantity: 15 });
    expect(events.createListingStatusChangedEvent).not.toHaveBeenCalled();
  });

  test("reactivates SOLD → ACTIVE when quantity is restored", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "SOLD", quantity: 0 }),
    );
    repo.updateListing.mockResolvedValue(
      fakeListing({ quantity: 10, status: "ACTIVE" }),
    );

    await service.releaseListingReservation({ listingId: "x", quantity: 10 });

    expect(repo.updateListing).toHaveBeenCalledWith("x", {
      quantity: 10,
      status: LISTING_STATUS.ACTIVE,
    });
    expect(events.createListingStatusChangedEvent).toHaveBeenCalledWith(
      expect.objectContaining({ previousStatus: "SOLD", newStatus: "ACTIVE" }),
    );
  });

  test("does NOT reactivate a REMOVED listing — quantity restored but status stays REMOVED", async () => {
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "REMOVED", quantity: 0 }),
    );
    repo.updateListing.mockResolvedValue(
      fakeListing({ quantity: 5, status: "REMOVED" }),
    );

    await service.releaseListingReservation({ listingId: "x", quantity: 5 });

    expect(repo.updateListing).toHaveBeenCalledWith("x", { quantity: 5 });
    expect(events.createListingStatusChangedEvent).not.toHaveBeenCalled();
  });

  test("REGRESSION: correctly adds Decimal-like values numerically (not string-concatenated)", async () => {
    // Naive `+` on two Decimal-like objects whose valueOf() returns a
    // string would string-concatenate ("15" + "10" = "1510") if both
    // sides are strings after ToPrimitive. Number() conversion prevents this.
    repo.findListingById.mockResolvedValue(
      fakeListing({ status: "SOLD", quantity: fakeDecimal("0") }),
    );
    repo.updateListing.mockResolvedValue(
      fakeListing({ quantity: 10, status: "ACTIVE" }),
    );

    await service.releaseListingReservation({
      listingId: "x",
      quantity: fakeDecimal("10"),
    });

    expect(repo.updateListing).toHaveBeenCalledWith("x", {
      quantity: 10,
      status: LISTING_STATUS.ACTIVE,
    });
  });
});
