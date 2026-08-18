import {
  findListingById,
  upsertInterest,
  removeInterest,
  listInterestForListing,
  listInterestCountsForFarmer,
  listInterestedListingIdsForBuyer,
} from "./listingInterest.repository.js";
import {
  toInterestDTO,
  toInterestListResponse,
  toFarmerInterestSummaryDTO,
} from "./listingInterest.mapper.js";
import {
  ListingNotFoundError,
  CannotExpressInterestInOwnListingError,
  NotListingOwnerError,
} from "./listingInterest.errors.js";
import { createNotification } from "../notifications/notifications.service.js";
import { NOTIFICATION_TYPE } from "../notifications/notifications.constants.js";

async function requireListing(listingId) {
  const listing = await findListingById(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }
  return listing;
}

export async function expressInterest({ listingId, buyerId }) {
  const listing = await requireListing(listingId);
  if (listing.farmerId === buyerId) {
    throw new CannotExpressInterestInOwnListingError();
  }
  const interest = await upsertInterest({ listingId, buyerId });

  await createNotification({
    userId: listing.farmerId,
    type: NOTIFICATION_TYPE.LISTING_INTEREST,
    title: "New buyer interest",
    body: `A buyer expressed interest in "${listing.title}".`,
    listingId: listing.id,
  });

  return toInterestDTO(interest);
}

export async function withdrawInterest({ listingId, buyerId }) {
  await requireListing(listingId);
  await removeInterest({ listingId, buyerId });
}

export async function getInterestForListing({
  listingId,
  farmerId,
  page,
  limit,
}) {
  const listing = await requireListing(listingId);
  if (listing.farmerId !== farmerId) {
    throw new NotListingOwnerError();
  }
  const skip = (page - 1) * limit;
  const { items, totalCount } = await listInterestForListing({
    listingId,
    skip,
    take: limit,
  });
  return toInterestListResponse({
    interests: items,
    page,
    limit,
    total: totalCount,
  });
}

export async function getInterestSummaryForFarmer(farmerId) {
  const listings = await listInterestCountsForFarmer(farmerId);
  return toFarmerInterestSummaryDTO(listings);
}

export async function getInterestedListingIdsForBuyer(buyerId) {
  return listInterestedListingIdsForBuyer(buyerId);
}
