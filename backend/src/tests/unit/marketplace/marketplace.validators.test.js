import { describe, test, expect } from "@jest/globals";
import {
  parseOrThrow,
  createListingSchema,
  updateListingSchema,
  listingIdParamSchema,
  updateListingQuantitySchema,
  changeListingStatusSchema,
  listingSearchSchema,
} from "../../../modules/marketplace/marketplace.validators.js";
import { ValidationError } from "../../../errors/commonErrors.js";
import {
  LISTING_CONFIG,
  SEARCH_CONFIG,
} from "../../../modules/marketplace/marketplace.constants.js";
import { validCreateListingPayload } from "../../fixtures/marketplace.fixtures.js";
import { randomUUID } from "node:crypto";

describe("marketplace.validators", () => {
  // ─── parseOrThrow ─────────────────────────────────────────
  describe("parseOrThrow", () => {
    test("returns parsed data on valid input", () => {
      const result = parseOrThrow(listingIdParamSchema, {
        listingId: randomUUID(),
      });
      expect(result.listingId).toBeDefined();
    });

    test("throws ValidationError on invalid input", () => {
      expect(() =>
        parseOrThrow(listingIdParamSchema, { listingId: "not-a-uuid" }),
      ).toThrow(ValidationError);
    });
  });

  // ─── createListingSchema ──────────────────────────────────
  describe("createListingSchema", () => {
    test("accepts a fully valid payload", () => {
      const result = createListingSchema.safeParse(validCreateListingPayload());
      expect(result.success).toBe(true);
    });

    test("accepts a minimal payload (no description, no images)", () => {
      const { description, images, ...minimal } = validCreateListingPayload();
      const result = createListingSchema.safeParse(minimal);
      expect(result.success).toBe(true);
    });

    test("rejects missing title", () => {
      const { title, ...rest } = validCreateListingPayload();
      const result = createListingSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("title: rejects below minimum length (2 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ title: "ab" }),
      );
      expect(result.success).toBe(false);
    });

    test("title: accepts exactly at minimum length (3 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ title: "abc" }),
      );
      expect(result.success).toBe(true);
    });

    test("title: accepts exactly at maximum length (100 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ title: "a".repeat(100) }),
      );
      expect(result.success).toBe(true);
    });

    test("title: accepts exactly at maximum length", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({
          title: "a".repeat(LISTING_CONFIG.TITLE_MAX_LENGTH),
        }),
      );

      expect(result.success).toBe(true);
    });

    test("title: trims surrounding whitespace", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ title: "  Fresh Tomatoes  " }),
      );
      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Fresh Tomatoes");
    });

    test("description: accepts exactly at maximum length (1000 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ description: "a".repeat(1000) }),
      );
      expect(result.success).toBe(true);
    });

    test("description: rejects above maximum length (1001 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ description: "a".repeat(1001) }),
      );
      expect(result.success).toBe(false);
    });

    test("cropType: rejects an invalid enum value", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ cropType: "DURIAN" }),
      );
      expect(result.success).toBe(false);
    });

    test("cropType: accepts every defined enum value", () => {
      const cropTypes = [
        "TOMATO",
        "MAIZE",
        "CASSAVA",
        "PLANTAIN",
        "YAM",
        "PEPPER",
        "ONION",
        "RICE",
        "GROUNDNUT",
        "COCOA",
      ];
      for (const cropType of cropTypes) {
        const result = createListingSchema.safeParse(
          validCreateListingPayload({ cropType }),
        );
        expect(result.success).toBe(true);
      }
    });

    test("quantity: rejects zero (creation requires strictly positive)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ quantity: 0 }),
      );
      expect(result.success).toBe(false);
    });

    test("quantity: rejects a negative value", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ quantity: -5 }),
      );
      expect(result.success).toBe(false);
    });

    test("quantity: accepts exactly at maximum (LISTING_CONFIG.MAX_QUANTITY)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ quantity: LISTING_CONFIG.MAX_QUANTITY }),
      );
      expect(result.success).toBe(true);
    });

    test("quantity: rejects above maximum", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({
          quantity: LISTING_CONFIG.MAX_QUANTITY + 1,
        }),
      );
      expect(result.success).toBe(false);
    });

    test("quantityUnit: rejects an invalid enum value", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ quantityUnit: "TON" }),
      );
      expect(result.success).toBe(false);
    });

    test("quantityUnit: accepts every defined enum value", () => {
      const units = [
        "KILOGRAM",
        "BAG",
        "CRATE",
        "SACK",
        "BUNCH",
        "PIECE",
        "BASKET",
      ];
      for (const quantityUnit of units) {
        const result = createListingSchema.safeParse(
          validCreateListingPayload({ quantityUnit }),
        );
        expect(result.success).toBe(true);
      }
    });

    test("pricePerUnit: rejects zero", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ pricePerUnit: 0 }),
      );
      expect(result.success).toBe(false);
    });

    test("pricePerUnit: accepts exactly at maximum (1,000,000)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ pricePerUnit: 1000000 }),
      );
      expect(result.success).toBe(true);
    });

    test("pricePerUnit: rejects above maximum", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ pricePerUnit: 1000001 }),
      );
      expect(result.success).toBe(false);
    });

    test("location: rejects an empty string", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ location: "" }),
      );
      expect(result.success).toBe(false);
    });

    test("location: rejects above maximum length (121 chars)", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ location: "a".repeat(121) }),
      );
      expect(result.success).toBe(false);
    });

    test("images: accepts exactly 5 valid URLs", () => {
      const images = Array.from(
        { length: 5 },
        (_, i) => `https://cdn.example.com/img${i}.jpg`,
      );
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ images }),
      );
      expect(result.success).toBe(true);
    });

    test("images: rejects 6 URLs (exceeds max of 5)", () => {
      const images = Array.from(
        { length: 6 },
        (_, i) => `https://cdn.example.com/img${i}.jpg`,
      );
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ images }),
      );
      expect(result.success).toBe(false);
    });

    test("images: rejects a non-URL string", () => {
      const result = createListingSchema.safeParse(
        validCreateListingPayload({ images: ["not-a-url"] }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict()) — e.g. client-supplied farmerId", () => {
      const result = createListingSchema.safeParse({
        ...validCreateListingPayload(),
        farmerId: randomUUID(),
      });
      expect(result.success).toBe(false);
    });

    test("rejects a client-supplied status field", () => {
      const result = createListingSchema.safeParse({
        ...validCreateListingPayload(),
        status: "ACTIVE",
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── updateListingSchema ──────────────────────────────────
  describe("updateListingSchema", () => {
    test("accepts an empty object (all fields optional)", () => {
      const result = updateListingSchema.safeParse({});
      expect(result.success).toBe(true);
    });

    test("accepts a partial update (single field)", () => {
      const result = updateListingSchema.safeParse({ pricePerUnit: 99.99 });
      expect(result.success).toBe(true);
    });

    test("quantity: accepts exactly zero (business rule — triggers auto-SOLD in the service layer)", () => {
      const result = updateListingSchema.safeParse({ quantity: 0 });
      expect(result.success).toBe(true);
    });

    test("quantity: rejects a negative value", () => {
      const result = updateListingSchema.safeParse({ quantity: -1 });
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict())", () => {
      const result = updateListingSchema.safeParse({
        pricePerUnit: 50,
        farmerId: randomUUID(),
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── listingIdParamSchema ─────────────────────────────────
  describe("listingIdParamSchema", () => {
    test("accepts a valid UUID", () => {
      const result = listingIdParamSchema.safeParse({
        listingId: randomUUID(),
      });
      expect(result.success).toBe(true);
    });

    test("rejects a non-UUID string", () => {
      const result = listingIdParamSchema.safeParse({ listingId: "12345" });
      expect(result.success).toBe(false);
    });

    test("rejects a missing listingId", () => {
      const result = listingIdParamSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  // ─── updateListingQuantitySchema ─────────────────────────
  describe("updateListingQuantitySchema", () => {
    test("accepts exactly zero (unblocks the auto-SOLD business rule)", () => {
      const result = updateListingQuantitySchema.safeParse({ quantity: 0 });
      expect(result.success).toBe(true);
    });

    test("accepts a positive value", () => {
      const result = updateListingQuantitySchema.safeParse({ quantity: 15 });
      expect(result.success).toBe(true);
    });

    test("rejects a negative value", () => {
      const result = updateListingQuantitySchema.safeParse({ quantity: -1 });
      expect(result.success).toBe(false);
    });

    test("rejects a missing quantity (required, unlike updateListingSchema)", () => {
      const result = updateListingQuantitySchema.safeParse({});
      expect(result.success).toBe(false);
    });

    test("rejects above maximum", () => {
      const result = updateListingQuantitySchema.safeParse({
        quantity: LISTING_CONFIG.MAX_QUANTITY + 1,
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── changeListingStatusSchema ────────────────────────────
  describe("changeListingStatusSchema", () => {
    test("accepts ACTIVE, SOLD, and REMOVED", () => {
      for (const status of ["ACTIVE", "SOLD", "REMOVED"]) {
        const result = changeListingStatusSchema.safeParse({ status });
        expect(result.success).toBe(true);
      }
    });

    test("rejects CANCELLED (superseded terminology — REMOVED is frozen)", () => {
      const result = changeListingStatusSchema.safeParse({
        status: "CANCELLED",
      });
      expect(result.success).toBe(false);
    });

    test("rejects an arbitrary invalid string", () => {
      const result = changeListingStatusSchema.safeParse({ status: "PENDING" });
      expect(result.success).toBe(false);
    });
  });

  // ─── listingSearchSchema ──────────────────────────────────
  describe("listingSearchSchema", () => {
    test("accepts an empty object and applies defaults", () => {
      const result = listingSearchSchema.safeParse({});
      expect(result.success).toBe(true);
      expect(result.data.page).toBe(1);
      expect(result.data.limit).toBe(SEARCH_CONFIG.DEFAULT_PAGE_SIZE);
    });

    test("accepts a fully populated query", () => {
      const result = listingSearchSchema.safeParse({
        cropType: "MAIZE",
        quantityUnit: "BAG",
        location: "Kumasi",
        minPrice: 10,
        maxPrice: 100,
        page: 2,
        limit: 10,
      });
      expect(result.success).toBe(true);
    });

    test("page: rejects zero (must be >= 1)", () => {
      const result = listingSearchSchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });

    test("limit: accepts exactly the maximum (100)", () => {
      const result = listingSearchSchema.safeParse({
        limit: SEARCH_CONFIG.MAX_PAGE_SIZE,
      });
      expect(result.success).toBe(true);
    });

    test("limit: rejects above maximum (101)", () => {
      const result = listingSearchSchema.safeParse({
        limit: SEARCH_CONFIG.MAX_PAGE_SIZE + 1,
      });
      expect(result.success).toBe(false);
    });

    test("cross-field refinement: accepts maxPrice equal to minPrice", () => {
      const result = listingSearchSchema.safeParse({
        minPrice: 50,
        maxPrice: 50,
      });
      expect(result.success).toBe(true);
    });

    test("cross-field refinement: rejects maxPrice below minPrice", () => {
      const result = listingSearchSchema.safeParse({
        minPrice: 100,
        maxPrice: 50,
      });
      expect(result.success).toBe(false);
    });

    test("cross-field refinement: does not fire when only one bound is supplied", () => {
      const resultMinOnly = listingSearchSchema.safeParse({ minPrice: 100 });
      const resultMaxOnly = listingSearchSchema.safeParse({ maxPrice: 5 });
      expect(resultMinOnly.success).toBe(true);
      expect(resultMaxOnly.success).toBe(true);
    });

    test("rejects an unknown field (.strict())", () => {
      const result = listingSearchSchema.safeParse({ sortBy: "price" });
      expect(result.success).toBe(false);
    });
  });
});
