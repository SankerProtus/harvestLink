import { describe, test, expect } from "@jest/globals";
import {
  parseOrThrow,
  createOrderSchema,
  orderIdParamSchema,
  updateOrderStatusSchema,
  reportLocationSchema,
  orderListQuerySchema,
} from "../../../modules/deliveryTracking/deliveryTracking.validators.js";
import { ValidationError } from "../../../errors/commonErrors.js";
import {
  ORDER_CONFIG,
  GPS_CONFIG,
  ORDER_LIST_CONFIG,
} from "../../../modules/deliveryTracking/deliveryTracking.constants.js";
import {
  validCreateOrderPayload,
  validReportLocationPayload,
} from "../../fixtures/deliveryTracking.fixtures.js";
import { randomUUID } from "node:crypto";

describe("deliveryTracking.validators", () => {
  describe("parseOrThrow", () => {
    test("returns parsed data on valid input", () => {
      const result = parseOrThrow(orderIdParamSchema, {
        orderId: randomUUID(),
      });
      expect(result.orderId).toBeDefined();
    });

    test("throws ValidationError on invalid input", () => {
      expect(() =>
        parseOrThrow(orderIdParamSchema, { orderId: "bad" }),
      ).toThrow(ValidationError);
    });
  });

  // ─── createOrderSchema ────────────────────────────────────
  describe("createOrderSchema", () => {
    test("accepts a valid payload", () => {
      const result = createOrderSchema.safeParse(validCreateOrderPayload());
      expect(result.success).toBe(true);
    });

    test("rejects a missing listingId", () => {
      const { listingId, ...rest } = validCreateOrderPayload();
      const result = createOrderSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("rejects a non-UUID listingId", () => {
      const result = createOrderSchema.safeParse(
        validCreateOrderPayload({ listingId: "not-a-uuid" }),
      );
      expect(result.success).toBe(false);
    });

    test("quantity: rejects zero (an order cannot be created for nothing)", () => {
      const result = createOrderSchema.safeParse(
        validCreateOrderPayload({ quantity: 0 }),
      );
      expect(result.success).toBe(false);
    });

    test("quantity: rejects a negative value", () => {
      const result = createOrderSchema.safeParse(
        validCreateOrderPayload({ quantity: -1 }),
      );
      expect(result.success).toBe(false);
    });

    test("quantity: accepts exactly at maximum (ORDER_CONFIG.MAX_QUANTITY)", () => {
      const result = createOrderSchema.safeParse(
        validCreateOrderPayload({ quantity: ORDER_CONFIG.MAX_QUANTITY }),
      );
      expect(result.success).toBe(true);
    });

    test("quantity: rejects above maximum", () => {
      const result = createOrderSchema.safeParse(
        validCreateOrderPayload({ quantity: ORDER_CONFIG.MAX_QUANTITY + 1 }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict()) — e.g. client-supplied buyerId", () => {
      const result = createOrderSchema.safeParse({
        ...validCreateOrderPayload(),
        buyerId: randomUUID(),
      });
      expect(result.success).toBe(false);
    });

    test("rejects a client-supplied status field", () => {
      const result = createOrderSchema.safeParse({
        ...validCreateOrderPayload(),
        status: "CONFIRMED",
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── orderIdParamSchema ───────────────────────────────────
  describe("orderIdParamSchema", () => {
    test("accepts a valid UUID", () => {
      const result = orderIdParamSchema.safeParse({ orderId: randomUUID() });
      expect(result.success).toBe(true);
    });

    test("rejects a non-UUID string", () => {
      const result = orderIdParamSchema.safeParse({ orderId: "12345" });
      expect(result.success).toBe(false);
    });
  });

  // ─── updateOrderStatusSchema ──────────────────────────────
  describe("updateOrderStatusSchema", () => {
    test("accepts every defined ORDER_STATUS value at the schema level", () => {
      // Note: schema-level acceptance only — the service layer restricts
      // which transitions are actually legal from a given current status.
      for (const status of [
        "PENDING",
        "CONFIRMED",
        "IN_TRANSIT",
        "DELIVERED",
        "CANCELLED",
      ]) {
        const result = updateOrderStatusSchema.safeParse({ status });
        expect(result.success).toBe(true);
      }
    });

    test("rejects an invalid status string", () => {
      const result = updateOrderStatusSchema.safeParse({ status: "SHIPPED" });
      expect(result.success).toBe(false);
    });

    test("rejects a missing status", () => {
      const result = updateOrderStatusSchema.safeParse({});
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict())", () => {
      const result = updateOrderStatusSchema.safeParse({
        status: "CONFIRMED",
        reason: "accepted",
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── reportLocationSchema ─────────────────────────────────
  describe("reportLocationSchema", () => {
    test("accepts valid coordinates", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload(),
      );
      expect(result.success).toBe(true);
    });

    test("latitude: accepts exactly at minimum (-90)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ latitude: GPS_CONFIG.LATITUDE_MIN }),
      );
      expect(result.success).toBe(true);
    });

    test("latitude: accepts exactly at maximum (90)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ latitude: GPS_CONFIG.LATITUDE_MAX }),
      );
      expect(result.success).toBe(true);
    });

    test("latitude: rejects below minimum (-90.1)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ latitude: -90.1 }),
      );
      expect(result.success).toBe(false);
    });

    test("latitude: rejects above maximum (90.1)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ latitude: 90.1 }),
      );
      expect(result.success).toBe(false);
    });

    test("longitude: accepts exactly at minimum (-180)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ longitude: GPS_CONFIG.LONGITUDE_MIN }),
      );
      expect(result.success).toBe(true);
    });

    test("longitude: accepts exactly at maximum (180)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ longitude: GPS_CONFIG.LONGITUDE_MAX }),
      );
      expect(result.success).toBe(true);
    });

    test("longitude: rejects below minimum (-180.1)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ longitude: -180.1 }),
      );
      expect(result.success).toBe(false);
    });

    test("longitude: rejects above maximum (180.1)", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ longitude: 180.1 }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects a missing latitude", () => {
      const { latitude, ...rest } = validReportLocationPayload();
      const result = reportLocationSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("rejects a missing longitude", () => {
      const { longitude, ...rest } = validReportLocationPayload();
      const result = reportLocationSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });

    test("rejects a non-numeric latitude", () => {
      const result = reportLocationSchema.safeParse(
        validReportLocationPayload({ latitude: "north" }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict()) — e.g. an ETA field", () => {
      const result = reportLocationSchema.safeParse({
        ...validReportLocationPayload(),
        estimatedDeliveryMinutes: 30,
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── orderListQuerySchema ─────────────────────────────────
  describe("orderListQuerySchema", () => {
    test("accepts an empty object and applies defaults", () => {
      const result = orderListQuerySchema.safeParse({});
      expect(result.success).toBe(true);
      expect(result.data.page).toBe(ORDER_LIST_CONFIG.DEFAULT_PAGE);
      expect(result.data.limit).toBe(ORDER_LIST_CONFIG.DEFAULT_PAGE_SIZE);
    });

    test("accepts a valid status filter", () => {
      const result = orderListQuerySchema.safeParse({ status: "IN_TRANSIT" });
      expect(result.success).toBe(true);
    });

    test("rejects an invalid status filter value", () => {
      const result = orderListQuerySchema.safeParse({ status: "SHIPPED" });
      expect(result.success).toBe(false);
    });

    test("limit: accepts exactly the maximum", () => {
      const result = orderListQuerySchema.safeParse({
        limit: ORDER_LIST_CONFIG.MAX_PAGE_SIZE,
      });
      expect(result.success).toBe(true);
    });

    test("limit: rejects above maximum", () => {
      const result = orderListQuerySchema.safeParse({
        limit: ORDER_LIST_CONFIG.MAX_PAGE_SIZE + 1,
      });
      expect(result.success).toBe(false);
    });

    test("page: rejects zero", () => {
      const result = orderListQuerySchema.safeParse({ page: 0 });
      expect(result.success).toBe(false);
    });

    test("rejects an unknown field (.strict())", () => {
      const result = orderListQuerySchema.safeParse({ sortBy: "createdAt" });
      expect(result.success).toBe(false);
    });
  });
});
