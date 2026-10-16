import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import {
  ORDER_STATUS,
  ORDER_CONFIG,
  GPS_CONFIG,
  ORDER_LIST_CONFIG,
  CLIENT_SETTABLE_ORDER_STATUSES,
} from "./deliveryTracking.constants.js";

//  Reusable Field Schemas

const orderIdSchema = z.string().uuid("Invalid order ID");

const quantitySchema = z
  .number()
  .positive("Quantity must be greater than zero")
  .max(
    ORDER_CONFIG.MAX_QUANTITY,
    `Quantity must be at most ${ORDER_CONFIG.MAX_QUANTITY}`,
  );

// Statuses a client may request via PATCH /orders/:id/status.
const orderStatusUpdateSchema = z.enum(CLIENT_SETTABLE_ORDER_STATUSES);

// Statuses an order can *be in* (list filter). Derived from ORDER_STATUS so it
// can never drift from the database enum again — previously this list omitted
// CANCELLATION_REQUESTED and DISPUTED, so those filter tabs always returned 422.
const orderStatusEnum = z.enum(Object.values(ORDER_STATUS));

// Accepts one status ("DELIVERED") or a comma-separated group
// ("PENDING,CONFIRMED,IN_TRANSIT") so the app can offer "Active" / "Issues"
// tabs with a single request. Output: a string for one value, an array for
// several, so existing single-status callers are unaffected.
const orderStatusFilterSchema = z
  .string()
  .transform((raw) =>
    [...new Set(raw.split(",").map((s) => s.trim()).filter(Boolean))],
  )
  .pipe(z.array(orderStatusEnum).min(1).max(Object.values(ORDER_STATUS).length))
  .transform((list) => (list.length === 1 ? list[0] : list));

const latitudeSchema = z
  .number()
  .min(
    GPS_CONFIG.LATITUDE_MIN,
    `Latitude must be at least ${GPS_CONFIG.LATITUDE_MIN}`,
  )
  .max(
    GPS_CONFIG.LATITUDE_MAX,
    `Latitude must be at most ${GPS_CONFIG.LATITUDE_MAX}`,
  );

const longitudeSchema = z
  .number()
  .min(
    GPS_CONFIG.LONGITUDE_MIN,
    `Longitude must be at least ${GPS_CONFIG.LONGITUDE_MIN}`,
  )
  .max(
    GPS_CONFIG.LONGITUDE_MAX,
    `Longitude must be at most ${GPS_CONFIG.LONGITUDE_MAX}`,
  );

//  Request Schemas

export const createOrderSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
    quantity: quantitySchema,
  })
  .strict();

export const orderIdParamSchema = z
  .object({
    orderId: orderIdSchema,
  })
  .strict();

export const updateOrderStatusSchema = z
  .object({
    status: orderStatusUpdateSchema,
  })
  .strict();

export const reportLocationSchema = z
  .object({
    latitude: latitudeSchema,
    longitude: longitudeSchema,
  })
  .strict();

export const orderListQuerySchema = z
  .object({
    status: orderStatusFilterSchema.optional(),
    page: z.coerce
      .number()
      .int("page must be an integer")
      .min(1, "page must be at least 1")
      .optional()
      .default(ORDER_LIST_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int("limit must be an integer")
      .min(1, "limit must be at least 1")
      .max(
        ORDER_LIST_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${ORDER_LIST_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(ORDER_LIST_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();

//  Validation Helper

export function parseOrThrow(schema, payload) {
  const result = schema.safeParse(payload);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "(root)",
      message: issue.message,
      code: issue.code,
    }));
    throw new ValidationError("Request validation failed", details);
  }
  return result.data;
}
