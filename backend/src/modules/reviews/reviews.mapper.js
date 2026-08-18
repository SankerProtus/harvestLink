function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

export function toReviewDTO(review) {
  return {
    id: review.id,
    orderId: review.orderId,
    farmerId: review.farmerId,
    buyerId: review.buyerId,
    rating: review.rating,
    comment: review.comment ?? null,
    createdAt: serializeDate(review.createdAt),
  };
}
