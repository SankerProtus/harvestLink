import { beforeEach, jest, describe, expect, test } from "@jest/globals";

const tx = {
  order: { findUnique: jest.fn() },
  payment: { findFirst: jest.fn(), create: jest.fn() },
};
const prisma = { $transaction: jest.fn((callback) => callback(tx)) };
const provider = { initializeTransaction: jest.fn() };

jest.unstable_mockModule("../../../common/utils/prismaClient.js", () => ({
  prisma,
}));
jest.unstable_mockModule(
  "../../../modules/payments/payment.provider.js",
  () => ({
    createPaymentProviderRegistry: () => ({ get: () => provider }),
  }),
);

const { initializePayment } =
  await import("../../../modules/payments/payment.service.js");

beforeEach(() => {
  jest.clearAllMocks();
});

test("initializes a server-owned payment and returns only checkout URL", async () => {
  tx.order.findUnique.mockResolvedValue({
    id: "order-1",
    buyerId: "buyer-1",
    status: "PENDING",
    quantity: "2",
    pricePerUnitAtOrder: "12.50",
    currency: "GHS",
  });

  tx.payment.findFirst.mockResolvedValue(null);
  tx.payment.create.mockResolvedValue({
    id: "payment-1",
    providerPaymentId: "reference-1",
  });
  provider.initializeTransaction.mockResolvedValue({
    authorization_url: "https://checkout.paystack.com/reference-1",
  });

  await expect(
    initializePayment({
      orderId: "order-1",
      buyerId: "buyer-1",
      email: "buyer@example.com",
    }),
  ).resolves.toEqual({
    checkoutUrl: "https://checkout.paystack.com/reference-1",
  });

  expect(tx.payment.create).toHaveBeenCalledWith({
    data: expect.objectContaining({
      orderId: "order-1",
      buyerId: "buyer-1",
      amount: "2500",
      currency: "GHS",
      status: "INITIATED",
      providerPaymentId: expect.any(String),
    }),
  });
});

test("rejects a second active payment for the same order", async () => {
  tx.order.findUnique.mockResolvedValue({
    id: "order-1",
    buyerId: "buyer-1",
    status: "PENDING",
    quantity: "2",
    pricePerUnitAtOrder: "12.50",
    currency: "GHS",
  });
  tx.payment.findFirst.mockResolvedValue({
    id: "payment-1",
    providerPaymentId: "reference-1",
    status: "PENDING",
    expiresAt: new Date(Date.now() + 60_000),
  });

  await expect(
    initializePayment({
      orderId: "order-1",
      buyerId: "buyer-1",
      email: "buyer@example.com",
    }),
  ).rejects.toMatchObject({ code: "PAYMENT_ALREADY_ACTIVE" });
  expect(provider.initializeTransaction).not.toHaveBeenCalled();
});
