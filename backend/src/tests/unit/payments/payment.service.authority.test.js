import { jest, describe, expect, test } from "@jest/globals";

const tx = {
  order: { findUnique: jest.fn() },
  payment: { findFirst: jest.fn(), updateMany: jest.fn() },
  escrow: { create: jest.fn() },
};

const prisma = {
  $transaction: jest.fn((callback) => callback(tx)),
};

jest.unstable_mockModule("../../../common/utils/prismaClient.js", () => ({
  prisma,
}));

const { recordProviderPayment } =
  await import("../../../modules/payments/payment.service.js");

test("records verified provider data using buyer, amount, and currency from the order", async () => {
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
    orderId: "order-1",
    status: "INITIATED",
  });
  tx.payment.updateMany.mockResolvedValue({ count: 1 });

  await recordProviderPayment({
    provider: "PAYSTACK",
    providerPaymentId: "ref-1",
    orderId: "order-1",
    amount: 1,
    buyerId: "attacker",
    currency: "USD",
    verifiedPayment: {
      amount: 2500,
      currency: "GHS",
      buyerId: "buyer-1",
      status: "success",
    },
  });

  expect(tx.payment.updateMany).toHaveBeenCalledWith({
    where: { id: "payment-1", status: { in: ["INITIATED", "PENDING"] } },
    data: expect.objectContaining({
      buyerId: "buyer-1",
      amount: "2500",
      currency: "GHS",
      status: "CAPTURED",
    }),
  });
});

test("treats a concurrent provider-reference unique violation as a replay", async () => {
  const existing = { id: "payment-1", orderId: "order-1", amount: "2500" };
  prisma.$transaction.mockRejectedValueOnce({ code: "P2002" });
  prisma.payment = { findFirst: jest.fn().mockResolvedValue(existing) };

  await expect(
    recordProviderPayment({
      provider: "PAYSTACK",
      providerPaymentId: "ref-1",
      orderId: "order-1",
      verifiedPayment: {
        amount: 2500,
        currency: "GHS",
        buyerId: "buyer-1",
        status: "success",
      },
    }),
  ).resolves.toEqual({ payment: existing, replayed: true });
});
