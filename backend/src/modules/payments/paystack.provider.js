import { createHmac, timingSafeEqual } from "node:crypto";

export function verifyPaystackWebhookSignature({
  rawBody,
  signature,
  secret = process.env.PAYSTACK_SECRET_KEY,
}) {
  if (!Buffer.isBuffer(rawBody) || typeof signature !== "string" || !secret) {
    return false;
  }

  if (!/^[0-9a-f]{128}$/i.test(signature)) {
    return false;
  }

  const expected = createHmac("sha512", secret).update(rawBody).digest();
  const received = Buffer.from(signature, "hex");
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

export async function verifyPaystackTransaction({
  reference,
  secret = process.env.PAYSTACK_SECRET_KEY,
}) {
  if (typeof reference !== "string" || !reference || !secret) {
    throw new Error("Paystack transaction verification is not configured");
  }

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    {
      headers: {
        Authorization: `Bearer ${secret}`,
      },
    },
  );
  const body = await response.json();
  if (!response.ok || body?.status !== true || !body.data) {
    throw new Error("Paystack transaction verification failed");
  }
  return {
    ...body.data,
    buyerId: body.data.metadata?.buyerId,
  };
}

export async function initializePaystackTransaction({
  reference,
  amount,
  currency,
  email,
  metadata,
  secret = process.env.PAYSTACK_SECRET_KEY,
}) {
  if (!secret || !email) {
    throw new Error("Paystack payment initialization is not configured");
  }

  const response = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reference, amount, currency, email, metadata }),
    },
  );
  const body = await response.json();
  if (!response.ok || body?.status !== true || !body.data?.authorization_url) {
    throw new Error("Paystack payment initialization failed");
  }
  return body.data;
}
