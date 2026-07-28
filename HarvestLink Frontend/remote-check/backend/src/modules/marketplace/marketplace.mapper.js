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

export function toListingDTO(listing) {
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
    createdAt: serializeDate(listing.createdAt),
    updatedAt: serializeDate(listing.updatedAt),
  };
}

export function toListingListDTO(listings) {
  return listings.map(toListingDTO);
}

//  Search / List Response DTO

export function toListingSearchResponse({ listings, page, limit, total }) {
  return {
    results: toListingListDTO(listings),
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
