import { describe, expect, test } from "@jest/globals";
import {
  PAYMENT_TRANSITIONS,
  ESCROW_TRANSITIONS,
  REFUND_TRANSITIONS,
  PAYOUT_TRANSITIONS,
  canTransition,
} from "../../../modules/payments/payment.transitions.js";

describe("payment lifecycle transitions", () => {
  test.each([
    ["INITIATED", "PENDING"],
    ["PENDING", "CAPTURED"],
    ["PENDING", "FAILED"],
    ["PENDING", "EXPIRED"],
    ["PENDING", "CANCELLED"],
    ["CAPTURED", "REFUND_PENDING"],
    ["REFUND_PENDING", "REFUNDED"],
  ])("allows payment %s -> %s", (from, to) => {
    expect(canTransition(PAYMENT_TRANSITIONS, from, to)).toBe(true);
  });

  test.each([
    ["CAPTURED", "FAILED"],
    ["CAPTURED", "CANCELLED"],
    ["FAILED", "CAPTURED"],
    ["REFUNDED", "CAPTURED"],
  ])("rejects illegal payment %s -> %s", (from, to) => {
    expect(canTransition(PAYMENT_TRANSITIONS, from, to)).toBe(false);
  });

  test.each([
    ["PENDING", "FUNDED"],
    ["FUNDED", "FROZEN"],
    ["FUNDED", "RELEASED"],
    ["FUNDED", "REFUNDED"],
    ["FROZEN", "RELEASED"],
    ["FROZEN", "REFUNDED"],
  ])("allows escrow %s -> %s", (from, to) => {
    expect(canTransition(ESCROW_TRANSITIONS, from, to)).toBe(true);
  });

  test.each([
    ["RELEASED", "FUNDED"],
    ["REFUNDED", "RELEASED"],
    ["FUNDED", "PENDING"],
  ])("rejects illegal escrow %s -> %s", (from, to) => {
    expect(canTransition(ESCROW_TRANSITIONS, from, to)).toBe(false);
  });

  test.each([
    ["PENDING", "PROCESSING"],
    ["PROCESSING", "SUCCEEDED"],
    ["PROCESSING", "FAILED"],
    ["FAILED", "PROCESSING"],
  ])("allows refund %s -> %s", (from, to) => {
    expect(canTransition(REFUND_TRANSITIONS, from, to)).toBe(true);
  });

  test.each([
    ["SUCCEEDED", "PROCESSING"],
    ["CANCELLED", "SUCCEEDED"],
  ])("rejects illegal refund %s -> %s", (from, to) => {
    expect(canTransition(REFUND_TRANSITIONS, from, to)).toBe(false);
  });

  test.each([
    ["PENDING", "PROCESSING"],
    ["PROCESSING", "SUCCEEDED"],
    ["PROCESSING", "FAILED"],
    ["FAILED", "PROCESSING"],
  ])("allows payout %s -> %s", (from, to) => {
    expect(canTransition(PAYOUT_TRANSITIONS, from, to)).toBe(true);
  });

  test.each([
    ["SUCCEEDED", "PROCESSING"],
    ["CANCELLED", "SUCCEEDED"],
  ])("rejects illegal payout %s -> %s", (from, to) => {
    expect(canTransition(PAYOUT_TRANSITIONS, from, to)).toBe(false);
  });
});
