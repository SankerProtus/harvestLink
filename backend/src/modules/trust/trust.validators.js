import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";

const orderId = z.object({ orderId: z.string().uuid() }).strict();

export const orderIdParamSchema = orderId;
export const cancellationRequestParamSchema = z.object({
  orderId: z.string().uuid(),
  requestId: z.string().uuid(),
}).strict();

export const cancellationRequestSchema = z.object({
  reason: z.string().trim().min(3).max(500),
}).strict();

export const cancellationDecisionSchema = z.object({
  decision: z.enum(["APPROVE", "REJECT"]),
}).strict();

export const disputeSchema = z.object({
  reason: z.enum(["NON_DELIVERY", "DAMAGED_GOODS", "WRONG_QUANTITY", "OTHER"]),
  description: z.string().trim().min(10).max(1000),
  evidenceUrls: z.array(z.string().url()).max(5).default([]),
}).strict();

export const handoverCodeSchema = z.object({
  code: z.string().regex(/^\d{6}$/, "Handover code must be six digits"),
}).strict();

export const verificationSubmissionSchema = z.object({
  provider: z.enum(["MANUAL", "SMILE_ID", "DOJAH", "OTHER"]).default("MANUAL"),
  providerReference: z.string().trim().max(255).optional(),
  tierRequested: z.number().int().min(1).max(2),
  notes: z.string().trim().max(500).optional(),
}).strict();

export function parseOrThrow(schema, payload) {
  const result = schema.safeParse(payload);
  if (result.success) return result.data;
  throw new ValidationError(
    "Request validation failed",
    result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "(root)",
      message: issue.message,
      code: issue.code,
    })),
  );
}
