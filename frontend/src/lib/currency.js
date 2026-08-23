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