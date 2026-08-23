function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

function serializeBuyer(buyer) {
  if (!buyer) return undefined;
  return {
    id: buyer.id,
    name: buyer.fullName,
    phone: buyer.phone ?? null,
    avatarUrl: buyer.profileImageUrl ?? null,
  };
}

export function toInterestDTO(interest) {
  return {
    id: interest.id,
    listingId: interest.listingId,
    buyerId: interest.buyerId,
    buyer: serializeBuyer(interest.buyer),
    createdAt: serializeDate(interest.createdAt),
  };
}

export function toInterestListResponse({ interests, page, limit, total }) {
  return {
    results: interests.map(toInterestDTO),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export function toFarmerInterestSummaryDTO(listings) {
  return listings.map((listing) => ({
    listingId: listing.id,
    title: listing.title,
    interestCount: listing._count.interests,
  }));
}