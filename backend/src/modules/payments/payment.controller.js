import { z } from "zod";
import { parseOrThrow } from "../marketplace/marketplace.validators.js";
import { getPaymentProvider, recordProviderPayment } from "./payment.service.js";

const webhookSchema = z.object({
  provider: z.enum(["STRIPE", "PAYSTACK", "FLUTTERWAVE", "MOBILE_MONEY", "BANK_TRANSFER", "OTHER"]),
  providerPaymentId: z.string().trim().min(1).max(255),
  orderId: z.string().uuid(),
  buyerId: z.string().uuid(),
  amount: z.union([z.string(), z.number()]),
  currency: z.string().length(3),
  status: z.enum(["CAPTURED", "FAILED", "CANCELLED"]),
  metadata: z.record(z.string(), z.unknown()).optional(),
}).strict();

export async function postPaymentWebhook(req, res, next) {
  try {
    const input = parseOrThrow(webhookSchema, req.body);
    const signature = req.get("x-provider-signature");
    if (!signature) {
      return res.status(401).json({ error: { code: "PAYMENT_SIGNATURE_REQUIRED", message: "Webhook signature is required" } });
    }
    const provider = getPaymentProvider(input.provider);
    provider.verifyWebhookSignature({
      payload: req.body,
      signature,
      headers: req.headers,
    });
    const result = await recordProviderPayment(input);
    return res.status(result.replayed ? 200 : 201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
