import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import {
  ORDER_STATUS,
  ORDER_CONFIG,
  GPS_CONFIG,
  ORDER_LIST_CONFIG,
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

const orderStatusSchema = z.enum([
  ORDER_STATUS.PENDING,
  ORDER_STATUS.CONFIRMED,
  ORDER_STATUS.IN_TRANSIT,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELLED,
]);

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
    status: orderStatusSchema,
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
    status: orderStatusSchema.optional(),
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
