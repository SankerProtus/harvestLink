export function formatUnit(unit) {
  if (!unit) return "";
  return unit.charAt(0) + unit.slice(1).toLowerCase();
}

export function formatDate(isoString, short = false) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString(
    "en-GB",
    short
      ? { day: "numeric", month: "short" }
      : { year: "numeric", month: "long", day: "numeric" },
  );
}

// Only returns a label for a real past harvest date within the last week.
// A future date is a planned harvest and is deliberately not called "fresh".
export function harvestLabel(isoString) {
  if (!isoString) return null;
  const days = Math.floor((Date.now() - new Date(isoString).getTime()) / 86400000);
  if (days < 0) return null;
  if (days === 0) return "Harvested today";
  if (days === 1) return "Harvested yesterday";
  if (days < 8) return `Harvested ${days} days ago`;
  return null;
}