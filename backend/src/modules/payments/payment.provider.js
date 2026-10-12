export class PaymentProviderError extends Error {
  constructor(message, { code = "PAYMENT_PROVIDER_ERROR", cause } = {}) {
    super(message, { cause });
    this.name = "PaymentProviderError";
    this.code = code;
  }
}

/**
 * Providers must implement signed webhook verification and settlement calls.
 * Keeping this boundary explicit prevents database state from being mistaken
 * for a real wallet, MoMo, or card settlement.
 */
export class PaymentProviderAdapter {
  verifyWebhookSignature() {
    throw new PaymentProviderError("Payment provider webhook adapter is not configured", {
      code: "PAYMENT_PROVIDER_NOT_CONFIGURED",
    });
  }

  async refund() {
    throw new PaymentProviderError("Payment provider refund adapter is not configured", {
      code: "PAYMENT_PROVIDER_NOT_CONFIGURED",
    });
  }

  async payout() {
    throw new PaymentProviderError("Payment provider payout adapter is not configured", {
      code: "PAYMENT_PROVIDER_NOT_CONFIGURED",
    });
  }
}

export function createPaymentProviderRegistry(adapters = {}) {
  return {
    get(provider) {
      const adapter = adapters[provider];
      if (!adapter) {
        throw new PaymentProviderError(`No adapter configured for ${provider}`, {
          code: "PAYMENT_PROVIDER_NOT_CONFIGURED",
        });
      }
      return adapter;
    },
  };
}
