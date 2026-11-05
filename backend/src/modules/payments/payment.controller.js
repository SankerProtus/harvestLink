import { z } from "zod";
import { parseOrThrow } from "../marketplace/marketplace.validators.js";
import {
  getPaymentProvider,
  initializePayment,
  recordProviderPayment,
} from "./payment.service.js";

const initializePaymentSchema = z
  .object({
    orderId: z.string().uuid(),
    email: z.string().email().max(255),
  })
  .strict();

const legacyWebhookSchema = z
  .object({
    provider: z.enum([
      "STRIPE",
      "PAYSTACK",
      "FLUTTERWAVE",
      "MOBILE_MONEY",
      "BANK_TRANSFER",
      "OTHER",
    ]),
    providerPaymentId: z.string().trim().min(1).max(255),
    orderId: z.string().uuid(),
    buyerId: z.string().uuid(),
    amount: z.union([z.string(), z.number()]),
    currency: z.string().length(3),
    status: z.enum(["CAPTURED", "FAILED", "CANCELLED"]),
    metadata: z.record(z.string(), z.unknown()).optional(),
  })
  .strict();
const paystackWebhookSchema = z
  .object({
    event: z.enum(["charge.success", "charge.failed"]),
    data: z
      .object({
        reference: z.string().trim().min(1).max(255),
      })
      .passthrough(),
  })
  .passthrough();
const webhookSchema = z.union([legacyWebhookSchema, paystackWebhookSchema]);

export async function postPaymentWebhook(req, res, next) {
  try {
    const input = parseOrThrow(webhookSchema, req.body);
    const provider = "provider" in input ? input.provider : "PAYSTACK";
    const providerPaymentId =
      "providerPaymentId" in input
        ? input.providerPaymentId
        : input.data.reference;
    const signature = req.get(
      provider === "PAYSTACK" ? "x-paystack-signature" : "x-provider-signature",
    );
    if (!signature) {
      return res.status(401).json({
        error: {
          code: "PAYMENT_SIGNATURE_REQUIRED",
          message: "Webhook signature is required",
        },
      });
    }
    const paymentProvider = getPaymentProvider(provider);
    const verified = paymentProvider.verifyWebhookSignature({
      rawBody: req.rawBody,
      payload: req.body,
      signature,
      headers: req.headers,
    });
    if (verified !== true) {
      return res.status(401).json({
        error: {
          code: "PAYMENT_SIGNATURE_INVALID",
          message: "Webhook signature is invalid",
        },
      });
    }
    const verifiedPayment = await paymentProvider.verifyTransaction({
      reference: providerPaymentId,
    });
    if (verifiedPayment.reference !== providerPaymentId) {
      return res.status(422).json({
        error: {
          code: "PAYMENT_REFERENCE_MISMATCH",
          message: "Verified payment reference does not match the request",
        },
      });
    }
    const result = await recordProviderPayment({
      provider,
      providerPaymentId,
      orderId: "orderId" in input ? input.orderId : undefined,
      verifiedPayment,
    });
    return res
      .status(result.replayed ? 200 : 201)
      .json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}

export async function initializePaymentCheckout(req, res, next) {
  try {
    const input = parseOrThrow(initializePaymentSchema, req.body);
    const result = await initializePayment({
      ...input,
      buyerId: req.user.id,
    });
    return res.status(200).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
}
