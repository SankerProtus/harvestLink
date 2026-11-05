import { describe, expect, test } from "@jest/globals";
import { capturePaymentRawBody } from "../../../modules/payments/payment.raw-body.js";

test("captures webhook bytes before JSON parsing", () => {
  const rawBody = Buffer.from('{"event":"charge.success"}');
  const req = { path: "/api/payments/webhook" };

  capturePaymentRawBody(req, {}, rawBody);

  expect(req.rawBody).toEqual(rawBody);
  expect(req.rawBody).not.toBe(rawBody);
});

test("does not capture non-webhook request bodies", () => {
  const req = { path: "/api/payments/initialize" };

  capturePaymentRawBody(req, {}, Buffer.from("{}"));

  expect(req.rawBody).toBeUndefined();
});
