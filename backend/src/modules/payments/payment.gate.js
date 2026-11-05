import { AppError } from "../../errors/AppError.js";

export function isPaymentsRequired(env = process.env) {
  return env.PAYMENTS_REQUIRED === "true";
}

export function assertFundedEscrow({ payment, escrow }) {
  if (
    !["CAPTURED", "HELD"].includes(payment?.status) ||
    escrow?.status !== "FUNDED"
  ) {
    throw new AppError(
      "A captured payment and funded escrow are required before fulfillment",
      {
        statusCode: 409,
        code: "PAYMENT_REQUIRED",
        isOperational: true,
      },
    );
  }
}
