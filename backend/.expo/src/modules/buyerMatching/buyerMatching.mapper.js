function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

function serializeDecimal(value) {
  if (value === null || value === undefined) return null;
  return Number(value);
}

// `ratingSummary` (rating + reviewCount) comes from a real groupBy
// aggregate over the Review table, passed in by the service — when a
// farmer has no reviews yet, ratingSummary is undefined and
// rating/reviewCount are simply omitted rather than showing a
// fabricated number.
function serializeFarmer(farmer, ratingSummary) {
  if (!farmer) return undefined;
  return {
    id: farmer.id,
    name: farmer.fullName,
    isVerified: Boolean(farmer.phoneVerifiedAt),
    avatarUrl: farmer.profileImageUrl ?? null,
    rating: ratingSummary?.rating != null ? Number(ratingSummary.rating) : null,
    reviewCount: ratingSummary?.reviewCount ?? null,
  };
}

export function toMatchResultDTO(listing, ratingSummaryByFarmerId) {
  const ratingSummary = ratingSummaryByFarmerId?.get(listing.farmerId);
  return {
    id: listing.id,
    farmerId: listing.farmerId,
    title: listing.title,
    description: listing.description ?? null,
    cropType: listing.cropType,
    quantity: serializeDecimal(listing.quantity),
    quantityUnit: listing.quantityUnit,
    pricePerUnit: serializeDecimal(listing.pricePerUnit),
    location: listing.location,
    images: listing.images ?? [],
    status: listing.status,
    farmer: serializeFarmer(listing.farmer, ratingSummary),
    createdAt: serializeDate(listing.createdAt),
    updatedAt: serializeDate(listing.updatedAt),
  };
}

export function toMatchResultListDTO(listings, ratingSummaryByFarmerId) {
  return listings.map((listing) =>
    toMatchResultDTO(listing, ratingSummaryByFarmerId),
  );
}

export function toMatchSearchResponse({
  matches,
  page,
  limit,
  total,
  ratingSummaryByFarmerId,
}) {
  return {
    results: toMatchResultListDTO(matches, ratingSummaryByFarmerId),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
