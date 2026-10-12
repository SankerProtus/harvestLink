function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

// Serialize decimal values (e.g., quantity, price) to numbers. Returns null for null or undefined values.
function serializeDecimal(value) {
  if (value === null || value === undefined) return null;
  return Number(value);
}

//  Listing DTO

// Only present when the query loaded the `farmer` relation (e.g. search /
// single-listing reads). `ratingSummary` (rating + reviewCount) comes from
// a real groupBy aggregate over the Review table, passed in by the
// service — when a farmer has no reviews yet, ratingSummary is undefined
// and rating/reviewCount are simply omitted rather than showing a
// fabricated number.
function serializeFarmer(farmer, ratingSummary) {
  if (!farmer) return undefined;
  const verificationLevel = farmer.verificationLevel ?? 0;
  return {
    id: farmer.id,
    name: farmer.fullName,
    isVerified: verificationLevel >= 1 || Boolean(farmer.phoneVerifiedAt),
    verificationLevel,
    avatarUrl: farmer.profileImageUrl ?? null,
    rating: ratingSummary?.rating != null ? Number(ratingSummary.rating) : null,
    reviewCount: ratingSummary?.reviewCount ?? null,
  };
}

function listingCropSlug(listing) {
  if (listing.crop?.slug) return listing.crop.slug;
  return listing.cropType ?? null;
}

export function toListingDTO(listing, ratingSummaryByFarmerId) {
  const ratingSummary = ratingSummaryByFarmerId?.get(listing.farmerId);
  return {
    id: listing.id,
    farmerId: listing.farmerId,
    title: listing.title,
    description: listing.description ?? null,
    cropType: listingCropSlug(listing),
    cropId: listing.cropId ?? listing.crop?.id ?? null,
    cropName: listing.crop?.name ?? listing.customCropName ?? null,
    priceReviewRequired: Boolean(listing.priceReviewRequired),
    quantity: serializeDecimal(listing.quantity),
    quantityUnit: listing.quantityUnit,
    pricePerUnit: serializeDecimal(listing.pricePerUnit),
    location: listing.location,
    harvestDate: listing.harvestDate
      ? serializeDate(listing.harvestDate)
      : null,
    images: listing.images ?? [],
    status: listing.status,
    farmer: serializeFarmer(listing.farmer, ratingSummary),
    createdAt: serializeDate(listing.createdAt),
    updatedAt: serializeDate(listing.updatedAt),
  };
}

export function toListingListDTO(listings, ratingSummaryByFarmerId) {
  return listings.map((listing) =>
    toListingDTO(listing, ratingSummaryByFarmerId),
  );
}

//  Search / List Response DTO

export function toListingSearchResponse({
  listings,
  page,
  limit,
  total,
  ratingSummaryByFarmerId,
}) {
  return {
    results: toListingListDTO(listings, ratingSummaryByFarmerId),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Create / Update Response DTOs
export function toCreateListingResponse(listing) {
  return toListingDTO(listing);
}

export function toUpdateListingResponse(listing) {
  return toListingDTO(listing);
}

export function toUpdateListingQuantityResponse(listing) {
  return toListingDTO(listing);
}

export function toChangeListingStatusResponse(listing) {
  return toListingDTO(listing);
}
