import {
  createListing as createListingRepo,
  findListingById,
  findListingByIdWithFarmer,
  findListingByFarmerAndTitle,
  updateListing as updateListingRepo,
  updateListingQuantity as updateListingQuantityRepo,
  updateListingStatus as updateListingStatusRepo,
  decrementListingQuantityActive,
  incrementListingQuantity,
  listListingsByFarmerId,
  searchListings as searchListingsRepo,
} from "./marketplace.repository.js";

import { getRatingSummaryForFarmers } from "../reviews/reviews.service.js";
import { uploadImageBuffer } from "../../common/configs/cloudinary.js";

import {
  toListingDTO,
  toListingListDTO,
  toListingSearchResponse,
  toCreateListingResponse,
  toUpdateListingResponse,
  toUpdateListingQuantityResponse,
  toChangeListingStatusResponse,
} from "./marketplace.mapper.js";

import {
  ListingNotFoundError,
  ListingUnavailableError,
  ListingAlreadySoldError,
  UnauthorizedListingAccessError,
  InvalidListingStatusTransitionError,
  InsufficientListingQuantityError,
  DuplicateListingError,
} from "./marketplace.errors.js";

import {
  createListingCreatedEvent,
  createListingUpdatedEvent,
  createListingQuantityUpdatedEvent,
  createListingStatusChangedEvent,
  createListingRemovedEvent,
  createListingSoldEvent,
} from "./marketplace.events.js";

import { LISTING_STATUS, LISTING_VERIFICATION_MIN_TIER } from "./marketplace.constants.js";
import { findActiveCropBySlug, listActiveCrops } from "./crops.repository.js";
import { evaluatePriceReviewRequired } from "./priceBand.service.js";
import { prisma } from "../../common/utils/prismaClient.js";
import { InvalidCropTypeError } from "./marketplace.errors.js";


async function requireListing(listingId) {
  const listing = await findListingById(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }
  return listing;
}

function assertOwnership(listing, userId) {
  if (listing.farmerId !== userId) {
    throw new UnauthorizedListingAccessError();
  }
}

function assertListingEditable(listing) {
  if (listing.status === LISTING_STATUS.SOLD) {
    throw new ListingAlreadySoldError();
  }
  if (listing.status === LISTING_STATUS.REMOVED) {
    throw new ListingUnavailableError();
  }
}

async function resolveCropId(cropTypeSlug) {
  const crop = await findActiveCropBySlug(cropTypeSlug);
  if (!crop) {
    throw new InvalidCropTypeError();
  }
  return crop;
}

async function mapListingCropUpdates(updates) {
  if (updates.cropType === undefined) {
    return updates;
  }
  const crop = await resolveCropId(updates.cropType);
  const { cropType: _drop, ...rest } = updates;
  return { ...rest, cropId: crop.id };
}


export async function createListing({
  farmerId,
  title,
  description,
  cropType,
  quantity,
  quantityUnit,
  pricePerUnit,
  location,
  harvestDate,
  images,
}) {
  const existing = await findListingByFarmerAndTitle(
    farmerId,
    title,
    LISTING_STATUS.ACTIVE,
  );
  if (existing) {
    throw new DuplicateListingError();
  }

  const farmer = await prisma.user.findUnique({ where: { id: farmerId } });
  if (
    !farmer ||
    (farmer.verificationLevel ?? 0) < LISTING_VERIFICATION_MIN_TIER
  ) {
    throw new ListingUnavailableError(
      "Complete verification before creating listings",
    );
  }

  const crop = await resolveCropId(cropType);

  const priceReviewRequired = await evaluatePriceReviewRequired({
    cropId: crop.id,
    location,
    quantityUnit,
    pricePerUnit,
  });

  const listing = await createListingRepo({
    farmerId,
    title,
    description: description ?? null,
    cropId: crop.id,
    quantity,
    quantityUnit,
    pricePerUnit,
    location,
    harvestDate: harvestDate ?? null,
    images: images ?? [],
    status: LISTING_STATUS.ACTIVE,
    priceReviewRequired,
  });

  createListingCreatedEvent({
    listingId: listing.id,
    farmerId: listing.farmerId,
    cropType: crop.slug,
    quantity: listing.quantity,
    quantityUnit: listing.quantityUnit,
    pricePerUnit: listing.pricePerUnit,
  });
  return toCreateListingResponse(listing);
}

export async function updateListing({ listingId, userId, updates }) {
  const listing = await requireListing(listingId);
  assertOwnership(listing, userId);
  assertListingEditable(listing);

  const becomesZeroQuantity =
    updates.quantity !== undefined && updates.quantity === 0;

  const mappedUpdates = await mapListingCropUpdates(updates);

  if (mappedUpdates.pricePerUnit !== undefined) {
    const cropId = mappedUpdates.cropId ?? listing.cropId;
    const quantityUnit = mappedUpdates.quantityUnit ?? listing.quantityUnit;
    const location = mappedUpdates.location ?? listing.location;
    mappedUpdates.priceReviewRequired = await evaluatePriceReviewRequired({
      cropId,
      location,
      quantityUnit,
      pricePerUnit: mappedUpdates.pricePerUnit,
    });
  }

  const data = becomesZeroQuantity
    ? { ...mappedUpdates, status: LISTING_STATUS.SOLD }
    : { ...mappedUpdates };

  const updatedListing = await updateListingRepo(listingId, data);

  if (becomesZeroQuantity) {
    createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
  } else {
    createListingUpdatedEvent({
      listingId,
      farmerId: listing.farmerId,
      changedFields: Object.keys(updates),
    });
  }

  return toUpdateListingResponse(updatedListing);
}

export async function updateListingQuantity({ listingId, userId, quantity }) {
  const listing = await requireListing(listingId);
  assertOwnership(listing, userId);
  assertListingEditable(listing);

  const previousQuantity = listing.quantity;

  let updatedListing;
  if (quantity === 0) {
    // Combined single write — quantity and status must change together
    // atomically, so this uses the generic repository method rather
    // than two separate single-field calls.
    updatedListing = await updateListingRepo(listingId, {
      quantity,
      status: LISTING_STATUS.SOLD,
    });
  } else {
    updatedListing = await updateListingQuantityRepo(listingId, quantity);
  }

  createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity,
    newQuantity: quantity,
  });
  if (quantity === 0) {
    createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
  }

  return toUpdateListingQuantityResponse(updatedListing);
}

export async function changeListingStatus({ listingId, userId, newStatus }) {
  const listing = await requireListing(listingId);
  assertOwnership(listing, userId);

  const isValidTransition =
    listing.status === LISTING_STATUS.ACTIVE &&
    (newStatus === LISTING_STATUS.REMOVED || newStatus === LISTING_STATUS.SOLD);

  if (!isValidTransition) {
    throw new InvalidListingStatusTransitionError();
  }

  const previousStatus = listing.status;
  const updatedListing = await updateListingStatusRepo(listingId, newStatus);

  createListingStatusChangedEvent({
    listingId,
    previousStatus,
    newStatus,
  });
  if (newStatus === LISTING_STATUS.REMOVED) {
    createListingRemovedEvent({
      listingId,
      farmerId: listing.farmerId,
    });
  } else if (newStatus === LISTING_STATUS.SOLD) {
    createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
  }

  return toChangeListingStatusResponse(updatedListing);
}

async function resolveReservationFailure(listingId) {
  const listing = await findListingById(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }
  if (listing.status === LISTING_STATUS.SOLD) {
    throw new ListingAlreadySoldError();
  }
  if (listing.status === LISTING_STATUS.REMOVED) {
    throw new ListingUnavailableError();
  }
  throw new InsufficientListingQuantityError();
}

export async function confirmListingReservation({ listingId, quantity }) {
  const before = await requireListing(listingId);
  const previousQuantity = Number(before.quantity);

  const updatedListing = await decrementListingQuantityActive(
    listingId,
    quantity,
  );
  if (!updatedListing) {
    await resolveReservationFailure(listingId);
  }

  const newQuantity = Number(updatedListing.quantity);
  createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity,
    newQuantity,
  });
  if (updatedListing.status === LISTING_STATUS.SOLD) {
    createListingSoldEvent({
      listingId,
      farmerId: updatedListing.farmerId,
    });
  }

  return toListingDTO(updatedListing);
}

export async function releaseListingReservation({ listingId, quantity }) {
  const before = await requireListing(listingId);
  const previousQuantity = Number(before.quantity);
  const reactivates = before.status === LISTING_STATUS.SOLD;

  const updatedListing = await incrementListingQuantity(listingId, quantity);
  if (!updatedListing) {
    throw new ListingNotFoundError();
  }

  const newQuantity = Number(updatedListing.quantity);
  createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity,
    newQuantity,
  });
  if (reactivates) {
    createListingStatusChangedEvent({
      listingId,
      previousStatus: LISTING_STATUS.SOLD,
      newStatus: LISTING_STATUS.ACTIVE,
    });
  }

  return toListingDTO(updatedListing);
}

export async function getListing({ listingId }) {
  const listing = await findListingByIdWithFarmer(listingId);
  if (!listing) {
    throw new ListingNotFoundError();
  }
  const ratingSummaryByFarmerId = await getRatingSummaryForFarmers([
    listing.farmerId,
  ]);
  return toListingDTO(listing, ratingSummaryByFarmerId);
}

export async function getFarmerListings({ farmerId }) {
  const listings = await listListingsByFarmerId(farmerId);
  const ratingSummaryByFarmerId = await getRatingSummaryForFarmers([
    farmerId,
  ]);
  return toListingListDTO(listings, ratingSummaryByFarmerId);
}

export async function searchListings(filters) {
  const { page, limit, ...rest } = filters;
  const skip = (page - 1) * limit;
  const take = limit;

  const { items, totalCount } = await searchListingsRepo({
    ...rest,
    skip,
    take,
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

export async function listCrops({ search } = {}) {
  const crops = await listActiveCrops({ search });
  return crops.map((crop) => ({
    id: crop.id,
    name: crop.name,
    slug: crop.slug,
    category: crop.category,
    localNames: crop.localNames ?? null,
    defaultUnit: crop.defaultUnit,
  }));
}

export async function uploadListingPhoto({ fileBuffer }) {
  const imageUrl = await uploadImageBuffer(fileBuffer, {
    folder: "harvestlink/listings",
    // No face-gravity crop here (that's an avatar-specific transform) —
    // just cap dimensions so oversized photos don't balloon storage,
    // preserving aspect ratio via "limit" (never upscales, never crops).
    transformation: [
      { width: 1600, height: 1600, crop: "limit" },
    ],
  });
  return { url: imageUrl };
}