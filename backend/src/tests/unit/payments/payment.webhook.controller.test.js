import { jest, describe, expect, test, beforeEach } from "@jest/globals";
import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../helpers/expressMocks.js";

jest.unstable_mockModule(
  "../../../modules/payments/payment.service.js",
  () => ({
    getPaymentProvider: jest.fn(),
    initializePayment: jest.fn(),
    recordProviderPayment: jest.fn(),
  }),
);

const service = await import("../../../modules/payments/payment.service.js");
const controller =
  await import("../../../modules/payments/payment.controller.js");

const body = {
  provider: "PAYSTACK",
  providerPaymentId: "ref-1",
  orderId: "11111111-1111-4111-8111-111111111111",
  buyerId: "22222222-2222-4222-8222-222222222222",
  amount: "1000",
  currency: "GHS",
  status: "CAPTURED",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("payment webhook signature gate", () => {
  test("rejects when provider signature verification returns false", async () => {
    service.getPaymentProvider.mockReturnValue({
      verifyWebhookSignature: jest.fn().mockReturnValue(false),
    });
    const req = mockRequest({
      body,
      headers: {
        "x-paystack-signature": "bad",
      },
    });
    req.rawBody = Buffer.from(JSON.stringify(body));
    const res = mockResponse();
    const next = mockNext();

    await controller.postPaymentWebhook(req, res, next);

    expect(service.recordProviderPayment).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("verifies the provider transaction before recording it", async () => {
    const provider = {
      verifyWebhookSignature: jest.fn().mockReturnValue(true),
      verifyTransaction: jest.fn().mockResolvedValue({
        reference: "ref-1",
        status: "success",
        amount: 2500,
        currency: "GHS",
        metadata: { buyerId: "buyer-1" },
      }),
    };
    service.getPaymentProvider.mockReturnValue(provider);
    service.recordProviderPayment.mockResolvedValue({
      payment: { id: "payment-1" },
      replayed: false,
    });
    const req = mockRequest({
      body,
      headers: { "x-paystack-signature": "valid" },
    });
    req.rawBody = Buffer.from(JSON.stringify(body));
    const res = mockResponse();

    await controller.postPaymentWebhook(req, res, mockNext());

    expect(provider.verifyTransaction).toHaveBeenCalledWith({
      reference: "ref-1",
    });
    expect(service.recordProviderPayment).toHaveBeenCalledWith({
      provider: "PAYSTACK",
      providerPaymentId: "ref-1",
      orderId: body.orderId,
      verifiedPayment: expect.objectContaining({ reference: "ref-1" }),
    });
  });

  test("accepts Paystack charge.success payloads and derives only the reference", async () => {
    const provider = {
      verifyWebhookSignature: jest.fn().mockReturnValue(true),
      verifyTransaction: jest.fn().mockResolvedValue({
        reference: "ref-1",
        status: "success",
        amount: 2500,
        currency: "GHS",
        metadata: { buyerId: "buyer-1" },
      }),
    };
    service.getPaymentProvider.mockReturnValue(provider);
    service.recordProviderPayment.mockResolvedValue({
      payment: { id: "payment-1" },
      replayed: true,
    });
    const paystackBody = {
      event: "charge.success",
      data: { reference: "ref-1", amount: 999, currency: "USD" },
    };
    const req = mockRequest({
      body: paystackBody,
      headers: { "x-paystack-signature": "valid" },
    });
    req.rawBody = Buffer.from(JSON.stringify(paystackBody));
    const res = mockResponse();

    await controller.postPaymentWebhook(req, res, mockNext());

    expect(service.recordProviderPayment).toHaveBeenCalledWith({
      provider: "PAYSTACK",
      providerPaymentId: "ref-1",
      orderId: undefined,
      verifiedPayment: expect.objectContaining({ reference: "ref-1" }),
    });
  });
});
