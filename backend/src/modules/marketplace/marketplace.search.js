import { BUSINESS_RULES } from "./marketplace.constants.js";

const EARTH_RADIUS_M = 6_371_000;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two lat/lng points, in meters. */
export function haversineMeters(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_M * Math.asin(Math.min(1, Math.sqrt(h)));
}

/** A listing is "fresh" if harvested within the last 3 days, or has no harvest date on record. */
export function isFreshListing(listing, now = new Date()) {
  if (!listing.harvestDate) return false;
  const ageMs = now.getTime() - new Date(listing.harvestDate).getTime();
  return ageMs >= 0 && ageMs <= 3 * 24 * 60 * 60 * 1000;
}

// Normalizes query parameters into a structured filter object for searching listings. Handles optional geo filters and boolean flags.
export function normalizeSearchFilters(query) {
  return {
    q: query.q,
    categoryId: query.categoryId,
    farmerId: query.farmerId,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    minQuantity: query.minQuantity,
    maxQuantity: query.maxQuantity,
    createdAfter: query.createdAfter,
    page: query.page,
    pageSize: query.pageSize,
    sortBy: query.sortBy,
    sortOrder: query.sortOrder,
    geo:
      query.lat !== undefined && query.lng !== undefined
        ? {
            lat: query.lat,
            lng: query.lng,
            radiusKm: query.radiusKm ?? BUSINESS_RULES.DEFAULT_SEARCH_RADIUS_KM,
          }
        : null,
    freshOnly: Boolean(query.freshOnly),
  };
}

// Applies in-memory filtering and sorting to a list of listings based on the provided filters. This is used for additional filtering that cannot be done directly in the database query, such as distance calculations and freshness checks.
export function applyInMemoryRefinement(listings, filters) {
  let results = listings;

  if (filters.geo) {
    results = results
      .map((listing) => ({
        listing,
        distanceMeters: haversineMeters(filters.geo, {
          lat: listing.latitude,
          lng: listing.longitude,
        }),
      }))
      .filter((r) => r.distanceMeters <= filters.geo.radiusKm * 1000);
  } else {
    results = results.map((listing) => ({ listing, distanceMeters: null }));
  }

  if (filters.freshOnly) {
    results = results.filter((r) => isFreshListing(r.listing));
  }

  if (filters.sortBy === "distance") {
    results.sort(
      (a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity),
    );
    const start = (filters.page - 1) * filters.pageSize;
    results = results.slice(start, start + filters.pageSize);
  }

  return results;
}
