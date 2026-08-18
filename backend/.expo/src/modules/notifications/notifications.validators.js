import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import { NOTIFICATION_CONFIG } from "./notifications.constants.js";

export const listNotificationsQuerySchema = z
  .object({
    page: z.coerce
      .number()
      .int()
      .min(1, "page must be at least 1")
      .optional()
      .default(NOTIFICATION_CONFIG.DEFAULT_PAGE),
    limit: z.coerce
      .number()
      .int()
      .min(1, "limit must be at least 1")
      .max(
        NOTIFICATION_CONFIG.MAX_PAGE_SIZE,
        `limit must be at most ${NOTIFICATION_CONFIG.MAX_PAGE_SIZE}`,
      )
      .optional()
      .default(NOTIFICATION_CONFIG.DEFAULT_PAGE_SIZE),
  })
  .strict();

export const notificationIdParamSchema = z
  .object({
    notificationId: z.string().uuid("Invalid notification ID"),
  })
  .strict();

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
