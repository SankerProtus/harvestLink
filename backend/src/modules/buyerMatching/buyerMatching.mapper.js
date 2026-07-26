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

export function toMatchResultDTO(listing) {
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

export function toMatchResultListDTO(listings) {
  return listings.map(toMatchResultDTO);
}

export function toMatchSearchResponse({ matches, page, limit, total }) {
  return {
    results: toMatchResultListDTO(matches),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
