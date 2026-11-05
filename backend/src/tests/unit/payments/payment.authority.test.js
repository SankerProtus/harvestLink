import { describe, expect, test } from "@jest/globals";
import { assertProviderPaymentMatchesOrder } from "../../../modules/payments/payment.service.js";

const order = {
  buyerId: "buyer-1",
  status: "CONFIRMED",
  quantity: "2",
  pricePerUnitAtOrder: "12.50",
  currency: "GHS",
};

describe("provider payment authority checks", () => {
  test("accepts a provider result matching the stored order", () => {
    expect(() =>
      assertProviderPaymentMatchesOrder({
        order,
        providerPayment: {
          amount: 2500,
          currency: "GHS",
          buyerId: "buyer-1",
          status: "success",
        },
      }),
    ).not.toThrow();
  });

  test.each([
    ["amount", { amount: 2400 }],
    ["currency", { currency: "USD" }],
    ["buyer", { buyerId: "buyer-2" }],
  ])("rejects a provider %s mismatch", (_field, override) => {
    expect(() =>
      assertProviderPaymentMatchesOrder({
        order,
        providerPayment: {
          amount: 2500,
          currency: "GHS",
          buyerId: "buyer-1",
          status: "success",
          ...override,
        },
      }),
    ).toThrow(/does not match the order/);
  });

  test("rejects payment capture for a cancelled order", () => {
    expect(() =>
      assertProviderPaymentMatchesOrder({
        order: { ...order, status: "CANCELLED" },
        providerPayment: {
          amount: 2500,
          currency: "GHS",
          buyerId: "buyer-1",
          status: "success",
        },
      }),
    ).toThrow(/order status/);
  });
});
