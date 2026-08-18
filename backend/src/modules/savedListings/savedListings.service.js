import {
  findListingById,
  upsertSavedListing,
  removeSavedListing,
  listSavedListingIdsForBuyer,
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
