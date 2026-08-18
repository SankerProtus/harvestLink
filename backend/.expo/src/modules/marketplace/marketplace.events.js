function buildEvent(eventType, listingId, extra = {}) {
  return Object.freeze({
    eventId: crypto.randomUUID(),
    eventType,
    occurredAt: new Date().toISOString(),
    listingId,
    ...extra,
  });
}

export function createListingCreatedEvent({
  listingId,
  farmerId,
  cropType,
  quantity,
  quantityUnit,
  pricePerUnit,
}) {
  return buildEvent("marketplace.listing.created", listingId, {
    farmerId,
    cropType,
    quantity,
    quantityUnit,
    pricePerUnit,
  });
}

export function createListingUpdatedEvent({
  listingId,
  farmerId,
  changedFields,
}) {
  return buildEvent("marketplace.listing.updated", listingId, {
    farmerId,
    changedFields,
  });
}

export function createListingQuantityUpdatedEvent({
  listingId,
  previousQuantity,
  newQuantity,
}) {
  return buildEvent("marketplace.listing.quantity_updated", listingId, {
    previousQuantity,
    newQuantity,
  });
}

export function createListingStatusChangedEvent({
  listingId,
  previousStatus,
  newStatus,
}) {
  return buildEvent("marketplace.listing.status_changed", listingId, {
    previousStatus,
    newStatus,
  });
}

export function createListingRemovedEvent({ listingId, farmerId }) {
  return buildEvent("marketplace.listing.removed", listingId, {
    farmerId,
  });
}

export function createListingSoldEvent({ listingId, farmerId }) {
  return buildEvent("marketplace.listing.sold", listingId, {
    farmerId,
  });
}

export function createListingViewedEvent({
  listingId,
  viewerId = null,
  anonymous,
}) {
  return buildEvent("marketplace.listing.viewed", listingId, {
    viewerId,
    anonymous,
  });
}

export function createListingContactedEvent({ listingId, buyerId, farmerId }) {
  return buildEvent("marketplace.listing.contacted", listingId, {
    buyerId,
    farmerId,
  });
}
