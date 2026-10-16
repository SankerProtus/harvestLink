// Delivery Tracking Events
function buildEvent(eventType, orderId, extra = {}) {
  return Object.freeze({
    eventId: crypto.randomUUID(),
    eventType,
    occurredAt: new Date().toISOString(),
    orderId,
    ...extra,
  });
}

export function createOrderCreatedEvent({
  orderId,
  buyerId,
  farmerId,
  listingId,
  quantity,
  pricePerUnitAtOrder,
}) {
  return buildEvent("deliveryTracking.order.created", orderId, {
    buyerId,
    farmerId,
    listingId,
    quantity,
    pricePerUnitAtOrder,
  });
}

export function createOrderConfirmedEvent({ orderId, buyerId, farmerId }) {
  return buildEvent("deliveryTracking.order.confirmed", orderId, {
    buyerId,
    farmerId,
  });
}

export function createOrderInTransitEvent({ orderId, farmerId }) {
  return buildEvent("deliveryTracking.order.in_transit", orderId, {
    farmerId,
  });
}

export function createOrderDeliveredEvent({ orderId, buyerId, farmerId }) {
  return buildEvent("deliveryTracking.order.delivered", orderId, {
    buyerId,
    farmerId,
  });
}

export function createOrderCancelledEvent({
  orderId,
  cancelledBy,
  previousStatus,
}) {
  return buildEvent("deliveryTracking.order.cancelled", orderId, {
    cancelledBy,
    previousStatus,
  });
}

export function createOrderLocationUpdatedEvent({
  orderId,
  latitude,
  longitude,
  locationReportedAt,
}) {
  return buildEvent("deliveryTracking.order.location_updated", orderId, {
    latitude,
    longitude,
    locationReportedAt,
  });
}