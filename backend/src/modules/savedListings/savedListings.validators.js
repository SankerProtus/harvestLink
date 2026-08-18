import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";

export const listingIdParamSchema = z
  .object({
    listingId: z.string().uuid("Invalid listing ID"),
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
