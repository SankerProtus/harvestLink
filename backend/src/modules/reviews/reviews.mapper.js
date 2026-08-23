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

function serializeReviewer(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.fullName,
    avatarUrl: user.profileImageUrl ?? null,
  };
}

export function toReviewListItemDTO(review) {
  return {
    id: review.id,
    orderId: review.orderId,
    farmerId: review.farmerId,
    buyerId: review.buyerId,
    buyer: serializeReviewer(review.buyer),
    listing: review.order?.listing
      ? { id: review.order.listing.id, title: review.order.listing.title }
      : null,
    rating: review.rating,
    comment: review.comment ?? null,
    commentCount: review._count?.comments ?? 0,
    createdAt: serializeDate(review.createdAt),
  };
}

export function toReviewListResponse({ reviews, page, limit, total }) {
  return {
    results: reviews.map(toReviewListItemDTO),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function toReviewCommentDTO(comment, review) {
  const isFarmer = comment.authorId === review.farmerId;
  return {
    id: comment.id,
    reviewId: comment.reviewId,
    authorId: comment.authorId,
    authorName: comment.author?.fullName ?? null,
    authorAvatarUrl: comment.author?.profileImageUrl ?? null,
    // Relative to the review, not the account's global role — a farmer
    // could in principle also buy elsewhere in the app, so this reflects
    // "which side of this specific review" they're replying as.
    authorRole: isFarmer ? "FARMER" : "BUYER",
    body: comment.body,
    createdAt: serializeDate(comment.createdAt),
  };
}
