// Computes a transparent "fit" score from real listing + request fields.
// This is NOT a persisted/AI-generated score — the backend doesn't have
// one — it's a deterministic calculation from data we actually have, so
// the breakdown is shown alongside the number rather than hiding it.

export function computeMatchFit({ listing, requestedQuantity, maxPrice }) {
  const quantity = Number(listing?.quantity ?? 0);
  const price = Number(listing?.pricePerUnit ?? 0);

  let quantityScore = 100;
  if (requestedQuantity) {
    quantityScore = Math.max(
      0,
      Math.min(100, Math.round((quantity / Number(requestedQuantity)) * 100)),
    );
  }

  let priceScore = 100;
  if (maxPrice) {
    const ratio = price / Number(maxPrice);
    priceScore =
      ratio <= 1
        ? Math.round(100 - ratio * 35) // cheaper relative to budget scores higher
        : Math.max(0, Math.round(100 - (ratio - 1) * 150)); // over budget, drops fast
  }

  const overall = Math.round((quantityScore + priceScore) / 2);

  return {
    overall: Math.max(0, Math.min(100, overall)),
    quantityScore,
    priceScore,
    meetsQuantity: !requestedQuantity || quantity >= Number(requestedQuantity),
    withinBudget: !maxPrice || price <= Number(maxPrice),
  };
}
