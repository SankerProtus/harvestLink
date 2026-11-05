import { createHmac } from "node:crypto";
import { describe, expect, jest, test } from "@jest/globals";
import {
  verifyPaystackWebhookSignature,
  verifyPaystackTransaction,
} from "../../../modules/payments/paystack.provider.js";

const secret = "paystack-test-secret";
const rawBody = Buffer.from(
  '{"event":"charge.success","data":{"reference":"ref-1"}}',
);

function signatureFor(body = rawBody) {
  return createHmac("sha512", secret).update(body).digest("hex");
}

describe("Paystack webhook signature verification", () => {
  test("accepts a valid signature over the raw body", () => {
    expect(
      verifyPaystackWebhookSignature({
        rawBody,
        signature: signatureFor(),
        secret,
      }),
    ).toBe(true);
  });

  describe("Paystack transaction verification", () => {
    test("queries the provider by reference and returns verified data", async () => {
      const response = {
        status: true,
        data: {
          reference: "ref-1",
          status: "success",
          amount: 2500,
          currency: "GHS",
          metadata: { buyerId: "buyer-1" },
        },
      };
      const fetchMock = jest
        .spyOn(globalThis, "fetch")
        .mockResolvedValue({ ok: true, json: async () => response });

      await expect(
        verifyPaystackTransaction({ reference: "ref-1", secret }),
      ).resolves.toEqual({
        ...response.data,
        buyerId: "buyer-1",
      });
      expect(fetchMock).toHaveBeenCalledWith(
        "https://api.paystack.co/transaction/verify/ref-1",
        expect.objectContaining({
          headers: { Authorization: `Bearer ${secret}` },
        }),
      );
      fetchMock.mockRestore();
    });
  });

  test.each([
    ["missing signature", undefined],
    ["malformed signature", "not-a-sha512-digest"],
    ["wrong signature", "a".repeat(128)],
  ])("rejects %s", (_label, signature) => {
    expect(verifyPaystackWebhookSignature({ rawBody, signature, secret })).toBe(
      false,
    );
  });

  test("rejects a signature calculated over a different body", () => {
    expect(
      verifyPaystackWebhookSignature({
        rawBody,
        signature: signatureFor(Buffer.from('{"event":"charge.failed"}')),
        secret,
      }),
    ).toBe(false);
  });
});
