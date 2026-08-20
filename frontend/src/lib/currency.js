// Centralized money formatting.
//
// Production apps (Stripe, Paystack, banking apps) never render a currency
// amount as a bare integer -- "GHS 25" reads like a typo, not a price.
// They always show exactly two decimal places and thousands separators:
// "GHS 25.00", "GHS 1,250.50". This was previously done ad hoc across the
// app with plain `amount.toLocaleString()` calls (which drop decimals for
// whole numbers) or raw string interpolation with no formatting at all.
// Route every price display through these helpers instead.

export function formatMoney(amount) {
  const value = typeof amount === "number" ? amount : Number(amount);
  if (!Number.isFinite(value)) return String(amount);
  return value.toLocaleString("en-GH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatCurrency(amount, currency = "GHS") {
  return `${currency} ${formatMoney(amount)}`;
}

export function formatMoneyParts(amount) {
  const formatted = formatMoney(amount);
  const separatorIndex = formatted.lastIndexOf(".");
  if (separatorIndex === -1) {
    return { whole: formatted, decimals: "00" };
  }
  return {
    whole: formatted.slice(0, separatorIndex),
    decimals: formatted.slice(separatorIndex + 1),
  };
}