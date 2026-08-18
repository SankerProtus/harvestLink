import {
  createListing as createListingRepo,
  findListingById,
  findListingByIdWithFarmer,
  findListingByFarmerAndTitle,
  updateListing as updateListingRepo,
  updateListingQuantity as updateListingQuantityRepo,
  updateListingStatus as updateListingStatusRepo,
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

import { LISTING_STATUS } from "./marketplace.constants.js";


// Private helpers

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


// Create Listing

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

  const listing = await createListingRepo({
    farmerId,
    title,
    description: description ?? null,
    cropType,
    quantity,
    quantityUnit,
    pricePerUnit,
    location,
    harvestDate: harvestDate ?? null,
    images: images ?? [],
    status: LISTING_STATUS.ACTIVE,
  });

  const event = createListingCreatedEvent({
    listingId: listing.id,
    farmerId: listing.farmerId,
    cropType: listing.cropType,
    quantity: listing.quantity,
    quantityUnit: listing.quantityUnit,
    pricePerUnit: listing.pricePerUnit,
  });
  // TODO: publish `event` once an event bus exists.

  return toCreateListingResponse(listing);
}

// Update Listing (general field edit)

export async function updateListing({ listingId, userId, updates }) {
  const listing = await requireListing(listingId);
  assertOwnership(listing, userId);
  assertListingEditable(listing);

  const becomesZeroQuantity =
    updates.quantity !== undefined && updates.quantity === 0;

  const data = becomesZeroQuantity
    ? { ...updates, status: LISTING_STATUS.SOLD }
    : { ...updates };

  const updatedListing = await updateListingRepo(listingId, data);

  if (becomesZeroQuantity) {
    const soldEvent = createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
    // TODO: publish `soldEvent` once an event bus exists.
  } else {
    const updatedEvent = createListingUpdatedEvent({
      listingId,
      farmerId: listing.farmerId,
      changedFields: Object.keys(updates),
    });
    // TODO: publish `updatedEvent` once an event bus exists.
  }

  return toUpdateListingResponse(updatedListing);
}

// Update Quantity (dedicated endpoint)

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

  const quantityEvent = createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity,
    newQuantity: quantity,
  });
  // TODO: publish `quantityEvent` once an event bus exists.

  if (quantity === 0) {
    const soldEvent = createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
    // TODO: publish `soldEvent` once an event bus exists.
  }

  return toUpdateListingQuantityResponse(updatedListing);
}

// Status Change (ACTIVE → REMOVED or ACTIVE → SOLD only)

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

  const statusChangedEvent = createListingStatusChangedEvent({
    listingId,
    previousStatus,
    newStatus,
  });
  // TODO: publish `statusChangedEvent` once an event bus exists.

  if (newStatus === LISTING_STATUS.REMOVED) {
    const removedEvent = createListingRemovedEvent({
      listingId,
      farmerId: listing.farmerId,
    });
    // TODO: publish `removedEvent` once an event bus exists.
  } else if (newStatus === LISTING_STATUS.SOLD) {
    const soldEvent = createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
    // TODO: publish `soldEvent` once an event bus exists.
  }

  return toChangeListingStatusResponse(updatedListing);
}

// Reservation / Inventory Management
export async function confirmListingReservation({ listingId, quantity }) {
  const listing = await requireListing(listingId);
  assertListingEditable(listing);

  const availableQuantity = Number(listing.quantity);
  const requestedQuantity = Number(quantity);

  if (availableQuantity < requestedQuantity) {
    throw new InsufficientListingQuantityError();
  }

  const remainingQuantity = availableQuantity - requestedQuantity;
  const becomesZero = remainingQuantity === 0;

  const data = becomesZero
    ? { quantity: remainingQuantity, status: LISTING_STATUS.SOLD }
    : { quantity: remainingQuantity };

  const updatedListing = await updateListingRepo(listingId, data);

  const quantityEvent = createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity: availableQuantity,
    newQuantity: remainingQuantity,
  });
  // TODO: publish `quantityEvent` once an event bus exists.

  if (becomesZero) {
    const soldEvent = createListingSoldEvent({
      listingId,
      farmerId: listing.farmerId,
    });
    // TODO: publish `soldEvent` once an event bus exists.
  }

  return toListingDTO(updatedListing);
}

export async function releaseListingReservation({ listingId, quantity }) {
  const listing = await requireListing(listingId);

  const currentQuantity = Number(listing.quantity);
  const restoredQuantity = currentQuantity + Number(quantity);
  const reactivates = listing.status === LISTING_STATUS.SOLD;

  const data = reactivates
    ? { quantity: restoredQuantity, status: LISTING_STATUS.ACTIVE }
    : { quantity: restoredQuantity };

  const updatedListing = await updateListingRepo(listingId, data);

  const quantityEvent = createListingQuantityUpdatedEvent({
    listingId,
    previousQuantity: currentQuantity,
    newQuantity: restoredQuantity,
  });
  // TODO: publish `quantityEvent` once an event bus exists.

  if (reactivates) {
    const statusEvent = createListingStatusChangedEvent({
      listingId,
      previousStatus: LISTING_STATUS.SOLD,
      newStatus: LISTING_STATUS.ACTIVE,
    });
    // TODO: publish `statusEvent` once an event bus exists.
  }

  return toListingDTO(updatedListing);
}

// Reads

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