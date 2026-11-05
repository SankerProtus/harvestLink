export function capturePaymentRawBody(req, _res, rawBody) {
  if (req.path === "/api/payments/webhook") {
    req.rawBody = Buffer.from(rawBody);
  }
}
