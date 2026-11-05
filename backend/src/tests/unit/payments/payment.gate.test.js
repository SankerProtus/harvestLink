import { describe, expect, test } from "@jest/globals";
import {
  isPaymentsRequired,
  assertFundedEscrow,
} from "../../../modules/payments/payment.gate.js";

describe("payment fulfillment gate", () => {
  test("is disabled by default", () => {
    expect(isPaymentsRequired({})).toBe(false);
  });

  test("is enabled only when explicitly configured", () => {
    expect(isPaymentsRequired({ PAYMENTS_REQUIRED: "true" })).toBe(true);
    expect(isPaymentsRequired({ PAYMENTS_REQUIRED: "false" })).toBe(false);
  });

  test("requires a captured payment and funded escrow", () => {
    expect(() =>
      assertFundedEscrow({
        payment: { status: "INITIATED" },
        escrow: { status: "PENDING" },
      }),
    ).toThrow(/captured payment and funded escrow/);
  });

  test("accepts a captured payment with funded escrow", () => {
    expect(() =>
      assertFundedEscrow({
        payment: { status: "CAPTURED" },
        escrow: { status: "FUNDED" },
      }),
    ).not.toThrow();
  });
});
