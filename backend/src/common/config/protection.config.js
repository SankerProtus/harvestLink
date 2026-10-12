const DEFAULT_PROTECTION_HOURS = 48;

function positiveHours(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_PROTECTION_HOURS;
}

export function getBuyerProtectionWindowMs() {
  return positiveHours(process.env.BUYER_PROTECTION_WINDOW_HOURS) * 60 * 60 * 1000;
}
