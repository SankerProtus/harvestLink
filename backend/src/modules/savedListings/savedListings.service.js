import {
  findListingById,
  upsertSavedListing,
  removeSavedListing,
  listSavedListingIdsForBuyer,
  listSavedListingsForBuyer
} from "./savedListings.repository.js";
import { ListingNotFoundError } from "./savedListings.errors.js";

async function requireListing(listingId) {
  const listing = await findListingById(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }
  return listing;
}

export async function saveListing({ listingId, buyerId }) {
  await requireListing(listingId);
  await upsertSavedListing({ listingId, buyerId });
}

export async function unsaveListing({ listingId, buyerId }) {
  await requireListing(listingId);
  await removeSavedListing({ listingId, buyerId });
}

export async function getSavedListingIdsForBuyer(buyerId) {
  return listSavedListingIdsForBuyer(buyerId);
}

import { getRatingSummaryForFarmers } from "../reviews/reviews.service.js";
import { toListingSearchResponse } from "../marketplace/marketplace.mapper.js";

export async function getSavedListingsForBuyer({ buyerId, page, limit }) {
  const { items, totalCount } = await listSavedListingsForBuyer(buyerId, {
    skip: (page - 1) * limit,
    take: limit,
  });
  const farmerIds = [...new Set(items.map((listing) => listing.farmerId))];
  const ratingSummaryByFarmerId = await getRatingSummaryForFarmers(farmerIds);
  return toListingSearchResponse({
    listings: items,
    page,
    limit,
    total: totalCount,
    ratingSummaryByFarmerId,
  });
}