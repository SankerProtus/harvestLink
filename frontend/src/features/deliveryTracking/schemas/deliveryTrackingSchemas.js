import { z } from "zod";

const ORDER_CONFIG = Object.freeze({
  MIN_QUANTITY: 1,
  MAX_QUANTITY: 100000,
});

const GPS_CONFIG = Object.freeze({
  LATITUDE_MIN: -90,
  LATITUDE_MAX: 90,
  LONGITUDE_MIN: -180,
  LONGITUDE_MAX: 180,
});

const ORDER_LIST_CONFIG = Object.freeze({
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
});

export const ORDER_STATUS = Object.freeze({
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  IN_TRANSIT: "IN_TRANSIT",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
});

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
    page: z
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(ORDER_LIST_CONFIG.DEFAULT_PAGE),
    limit: z
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        ORDER_LIST_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${ORDER_LIST_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(ORDER_LIST_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();
