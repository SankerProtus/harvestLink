function freezeTransitions(transitions) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(transitions).map(([state, nextStates]) => [
        state,
        Object.freeze([...nextStates]),
      ]),
    ),
  );
}

export const PAYMENT_TRANSITIONS = freezeTransitions({
  INITIATED: ["PENDING", "CANCELLED"],
  PENDING: ["CAPTURED", "FAILED", "EXPIRED", "CANCELLED"],
  CAPTURED: ["REFUND_PENDING"],
  REFUND_PENDING: ["REFUNDED", "FAILED"],
  FAILED: [],
  EXPIRED: [],
  CANCELLED: [],
  REFUNDED: [],
});

export const ESCROW_TRANSITIONS = freezeTransitions({
  PENDING: ["FUNDED", "FAILED"],
  FUNDED: ["FROZEN", "RELEASED", "REFUNDED"],
  FROZEN: ["RELEASED", "REFUNDED"],
  RELEASED: [],
  REFUNDED: [],
  FAILED: [],
});

export const REFUND_TRANSITIONS = freezeTransitions({
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SUCCEEDED", "FAILED"],
  FAILED: ["PROCESSING", "CANCELLED"],
  SUCCEEDED: [],
  CANCELLED: [],
});

export const PAYOUT_TRANSITIONS = freezeTransitions({
  PENDING: ["PROCESSING", "CANCELLED"],
  PROCESSING: ["SUCCEEDED", "FAILED"],
  FAILED: ["PROCESSING", "CANCELLED"],
  SUCCEEDED: [],
  CANCELLED: [],
});

export function canTransition(transitions, from, to) {
  return transitions[from]?.includes(to) ?? false;
}
