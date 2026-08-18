import { describe, test, expect } from "@jest/globals";
import {
  parseOrThrow,
  matchSearchSchema,
} from "../../../modules/buyerMatching/buyerMatching.validators.js";
import { ValidationError } from "../../../errors/commonErrors.js";
import {
  MATCH_SEARCH_CONFIG,
  MATCH_CONFIG,
} from "../../../modules/buyerMatching/buyerMatching.constants.js";

function validSearchPayload(overrides = {}) {
  return {
    cropType: "MAIZE",
    requestedQuantity: 20,
    requestedQuantityUnit: "BAG",
    ...overrides,
  };
}

describe("buyerMatching.validators", () => {
  describe("parseOrThrow", () => {
    test("returns parsed data on valid input", () => {
      const result = parseOrThrow(matchSearchSchema, validSearchPayload());
      expect(result.cropType).toBe("MAIZE");
    });

    test("throws ValidationError on invalid input", () => {
      expect(() => parseOrThrow(matchSearchSchema, {})).toThrow(
        ValidationError,
      );
    });
  });

  describe("matchSearchSchema", () => {
    // ─── Happy path ───────────────────────────────────────
    test("accepts a minimal valid payload (required fields only)", () => {
      const result = matchSearchSchema.safeParse(validSearchPayload());
      expect(result.success).toBe(true);
    });

    test("accepts a fully populated payload", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({
          location: "Techiman",
          maxPrice: 150,
          page: 2,
          limit: 10,
        }),
      );
      expect(result.success).toBe(true);
    });

    // ─── Required fields ──────────────────────────────────
    test("rejects a missing cropType", () => {
      const { cropType, ...rest } = validSearchPayload();
      const result = matchSearchSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("rejects a missing requestedQuantity", () => {
      const { requestedQuantity, ...rest } = validSearchPayload();
      const result = matchSearchSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("rejects a missing requestedQuantityUnit", () => {
      const { requestedQuantityUnit, ...rest } = validSearchPayload();
      const result = matchSearchSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    // ─── cropType enum ────────────────────────────────────
    test("rejects an invalid cropType enum value", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ cropType: "WHEAT" }),
      );
      expect(result.success).toBe(false);
    });

    test("accepts every defined cropType enum value", () => {
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
        const result = matchSearchSchema.safeParse(
          validSearchPayload({ cropType }),
        );
        expect(result.success).toBe(true);
      }
    });

    // ─── requestedQuantityUnit enum ───────────────────────
    test("rejects an invalid requestedQuantityUnit enum value", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ requestedQuantityUnit: "TON" }),
      );
      expect(result.success).toBe(false);
    });

    test("accepts every defined requestedQuantityUnit enum value", () => {
      const units = [
        "KILOGRAM",
        "BAG",
        "CRATE",
        "SACK",
        "BUNCH",
        "PIECE",
        "BASKET",
      ];
      for (const requestedQuantityUnit of units) {
        const result = matchSearchSchema.safeParse(
          validSearchPayload({ requestedQuantityUnit }),
        );
        expect(result.success).toBe(true);
      }
    });

    // ─── requestedQuantity boundaries ─────────────────────
    test("rejects a requestedQuantity of zero (min is 1)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ requestedQuantity: 0 }),
      );
      expect(result.success).toBe(false);
    });

    test("accepts requestedQuantity exactly at MATCH_CONFIG.MIN_REQUESTED_QUANTITY", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({
          requestedQuantity: MATCH_CONFIG.MIN_REQUESTED_QUANTITY,
        }),
      );
      expect(result.success).toBe(true);
    });

    test("rejects a negative requestedQuantity", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ requestedQuantity: -5 }),
      );
      expect(result.success).toBe(false);
    });

    // ─── location (optional) ──────────────────────────────
    test("accepts a payload without location", () => {
      const result = matchSearchSchema.safeParse(validSearchPayload());
      expect(result.success).toBe(true);
      expect(result.data.location).toBeUndefined();
    });

    test("location: accepts exactly at maximum length (120 chars)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({
          location: "a".repeat(MATCH_CONFIG.LOCATION_MAX_LENGTH),
        }),
      );
      expect(result.success).toBe(true);
    });

    test("location: rejects above maximum length (121 chars)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({
          location: "a".repeat(MATCH_CONFIG.LOCATION_MAX_LENGTH + 1),
        }),
      );
      expect(result.success).toBe(false);
    });

    test("location: trims surrounding whitespace", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ location: "  Kumasi  " }),
      );
      expect(result.success).toBe(true);
      expect(result.data.location).toBe("Kumasi");
    });

    // ─── maxPrice (optional) ──────────────────────────────
    test("accepts a payload without maxPrice", () => {
      const result = matchSearchSchema.safeParse(validSearchPayload());
      expect(result.success).toBe(true);
      expect(result.data.maxPrice).toBeUndefined();
    });

    test("maxPrice: accepts exactly at MATCH_CONFIG.MIN_MAX_PRICE (0.01)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ maxPrice: MATCH_CONFIG.MIN_MAX_PRICE }),
      );
      expect(result.success).toBe(true);
    });

    test("maxPrice: rejects zero", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ maxPrice: 0 }),
      );
      expect(result.success).toBe(false);
    });

    // ─── Pagination defaults & boundaries ─────────────────
    test("applies default page and limit when omitted", () => {
      const result = matchSearchSchema.safeParse(validSearchPayload());
      expect(result.success).toBe(true);
      expect(result.data.page).toBe(MATCH_SEARCH_CONFIG.DEFAULT_PAGE);
      expect(result.data.limit).toBe(MATCH_SEARCH_CONFIG.DEFAULT_PAGE_SIZE);
    });

    test("page: rejects zero", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ page: 0 }),
      );
      expect(result.success).toBe(false);
    });

    test("page: rejects a non-integer", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ page: 1.5 }),
      );
      expect(result.success).toBe(false);
    });

    test("limit: accepts exactly the maximum (MATCH_SEARCH_CONFIG.MAX_PAGE_SIZE)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ limit: MATCH_SEARCH_CONFIG.MAX_PAGE_SIZE }),
      );
      expect(result.success).toBe(true);
    });

    test("limit: rejects above maximum", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ limit: MATCH_SEARCH_CONFIG.MAX_PAGE_SIZE + 1 }),
      );
      expect(result.success).toBe(false);
    });

    test("limit: rejects zero", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ limit: 0 }),
      );
      expect(result.success).toBe(false);
    });

    // ─── .strict() ─────────────────────────────────────────
    test("rejects an unknown field (.strict())", () => {
      const result = matchSearchSchema.safeParse({
        ...validSearchPayload(),
        sortBy: "relevance",
      });
      expect(result.success).toBe(false);
    });

    // ─── Invalid types ─────────────────────────────────────
    test("rejects a numeric cropType (wrong type)", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ cropType: 123 }),
      );
      expect(result.success).toBe(false);
    });

    test("coerces a numeric string requestedQuantity into a number", () => {
      const result = matchSearchSchema.safeParse(
        validSearchPayload({ requestedQuantity: "20" }),
      );

      expect(result.success).toBe(true);
      expect(result.data.requestedQuantity).toBe(20);
    });
  });
});
