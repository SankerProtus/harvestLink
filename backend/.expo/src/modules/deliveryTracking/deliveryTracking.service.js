import {
  createOrder as createOrderRepo,
  findOrderById,
  findOrderByIdWithRelations,
  updateOrderStatus as updateOrderStatusRepo,
  updateOrderLocation as updateOrderLocationRepo,
  listOrdersByBuyerId,
  listOrdersByFarmerId,
} from "./deliveryTracking.repository.js";

import {
  OrderNotFoundError,
  UnauthorizedOrderAccessError,
  InvalidOrderStatusTransitionError,
  LocationReportingNotAllowedError,
} from "./deliveryTracking.errors.js";

import {
  createOrderCreatedEvent,
  createOrderConfirmedEvent,
  createOrderInTransitEvent,
  createOrderDeliveredEvent,
  createOrderCancelledEvent,
  createOrderLocationUpdatedEvent,
} from "./deliveryTracking.events.js";

import {
  toOrderDTO,
  toOrderSearchResponse,
  toCreateOrderResponse,
  toUpdateOrderStatusResponse,
  toReportLocationResponse,
} from "./deliveryTracking.mapper.js";

import { ORDER_STATUS } from "./deliveryTracking.constants.js";

// Cross-module: service-to-service only, per the corrected layering.
import {
  getListing,
  confirmListingReservation,
  releaseListingReservation,
} from "../marketplace/marketplace.service.js";
import { createNotification } from "../notifications/notifications.service.js";
import { NOTIFICATION_TYPE } from "../notifications/notifications.constants.js";

// Private helpers

async function requireOrder(orderId) {
  const order = await findOrderById(orderId);
  if (!order) {
    throw new OrderNotFoundError();
  }
  return order;
}

function assertOrderParticipant(order, userId) {
  if (userId !== order.buyerId && userId !== order.farmerId) {
    throw new UnauthorizedOrderAccessError();
  }
}

// Status Transitions
const TRANSITIONS = {
  [`${ORDER_STATUS.PENDING}->${ORDER_STATUS.CONFIRMED}`]: {
    actor: "farmer",
    action: "confirm",
  },
  [`${ORDER_STATUS.CONFIRMED}->${ORDER_STATUS.IN_TRANSIT}`]: {
    actor: "farmer",
    action: null,
  },
  [`${ORDER_STATUS.IN_TRANSIT}->${ORDER_STATUS.DELIVERED}`]: {
    actor: "farmer",
    action: null,
  },
  [`${ORDER_STATUS.PENDING}->${ORDER_STATUS.CANCELLED}`]: {
    actor: "either",
    action: null,
  },
  [`${ORDER_STATUS.CONFIRMED}->${ORDER_STATUS.CANCELLED}`]: {
    actor: "either",
    action: "release",
  },
  [`${ORDER_STATUS.IN_TRANSIT}->${ORDER_STATUS.CANCELLED}`]: {
    actor: "either",
    action: "release",
  },
};

// Public Service Functions
export async function createOrder({ buyerId, listingId, quantity }) {
  const listing = await getListing({ listingId }); // throws ListingNotFoundError if absent

  const order = await createOrderRepo({
    listingId,
    buyerId,
    farmerId: listing.farmerId,
    quantity,
    pricePerUnitAtOrder: listing.pricePerUnit,
    status: ORDER_STATUS.PENDING,
  });

  const event = createOrderCreatedEvent({
    orderId: order.id,
    buyerId: order.buyerId,
    farmerId: order.farmerId,
    listingId: order.listingId,
    quantity: order.quantity,
    pricePerUnitAtOrder: order.pricePerUnitAtOrder,
  });
  // TODO: publish `event` once an event bus exists.

  await createNotification({
    userId: order.farmerId,
    type: NOTIFICATION_TYPE.ORDER_PLACED,
    title: "New order received",
    body: `A buyer requested ${order.quantity} ${listing.quantityUnit} of "${listing.title}".`,
    orderId: order.id,
    listingId: order.listingId,
  });

  return toCreateOrderResponse(order);
}

// Status Transitions
export async function updateOrderStatus({ orderId, userId, newStatus }) {
  const order = await requireOrder(orderId);
  const currentStatus = order.status;

  const rule = TRANSITIONS[`${currentStatus}->${newStatus}`];
  if (!rule) {
    throw new InvalidOrderStatusTransitionError();
  }

  if (rule.actor === "farmer" && userId !== order.farmerId) {
    throw new UnauthorizedOrderAccessError();
  }
  if (
    rule.actor === "either" &&
    userId !== order.buyerId &&
    userId !== order.farmerId
  ) {
    throw new UnauthorizedOrderAccessError();
  }

  if (rule.action === "confirm") {
    await confirmListingReservation({
      listingId: order.listingId,
      quantity: order.quantity,
    });
  } else if (rule.action === "release") {
    await releaseListingReservation({
      listingId: order.listingId,
      quantity: order.quantity,
    });
  }

  const updatedOrder = await updateOrderStatusRepo(orderId, newStatus);

  if (newStatus === ORDER_STATUS.CONFIRMED) {
    const event = createOrderConfirmedEvent({
      orderId,
      buyerId: order.buyerId,
      farmerId: order.farmerId,
    });
    // TODO: publish `event` once an event bus exists.
    await createNotification({
      userId: order.buyerId,
      type: NOTIFICATION_TYPE.ORDER_CONFIRMED,
      title: "Order confirmed",
      body: `Your order for ${order.quantity} unit(s) has been confirmed by the farmer.`,
      orderId,
      listingId: order.listingId,
    });
  } else if (newStatus === ORDER_STATUS.IN_TRANSIT) {
    const event = createOrderInTransitEvent({
      orderId,
      farmerId: order.farmerId,
    });
    // TODO: publish `event` once an event bus exists.
    await createNotification({
      userId: order.buyerId,
      type: NOTIFICATION_TYPE.ORDER_IN_TRANSIT,
      title: "Order on the way",
      body: "Your order is now in transit.",
      orderId,
      listingId: order.listingId,
    });
  } else if (newStatus === ORDER_STATUS.DELIVERED) {
    const event = createOrderDeliveredEvent({
      orderId,
      buyerId: order.buyerId,
      farmerId: order.farmerId,
    });
    // TODO: publish `event` once an event bus exists.
    await createNotification({
      userId: order.buyerId,
      type: NOTIFICATION_TYPE.ORDER_DELIVERED,
      title: "Order delivered",
      body: "Your order has been delivered. Tap to rate your experience.",
      orderId,
      listingId: order.listingId,
    });
  } else if (newStatus === ORDER_STATUS.CANCELLED) {
    const event = createOrderCancelledEvent({
      orderId,
      cancelledBy: userId,
      previousStatus: currentStatus,
    });
    // TODO: publish `event` once an event bus exists.
    const recipientId =
      userId === order.buyerId ? order.farmerId : order.buyerId;
    await createNotification({
      userId: recipientId,
      type: NOTIFICATION_TYPE.ORDER_CANCELLED,
      title: "Order cancelled",
      body: "An order was cancelled.",
      orderId,
      listingId: order.listingId,
    });
  }

  return toUpdateOrderStatusResponse(updatedOrder);
}

// Location Reporting

export async function reportLocation({ orderId, userId, latitude, longitude }) {
  const order = await requireOrder(orderId);

  if (userId !== order.farmerId) {
    throw new UnauthorizedOrderAccessError();
  }
  if (order.status !== ORDER_STATUS.IN_TRANSIT) {
    throw new LocationReportingNotAllowedError();
  }

  const locationReportedAt = new Date();
  const updatedOrder = await updateOrderLocationRepo(orderId, {
    latitude,
    longitude,
    locationReportedAt,
  });

  const event = createOrderLocationUpdatedEvent({
    orderId,
    latitude,
    longitude,
    locationReportedAt: locationReportedAt.toISOString(),
  });
  // TODO: publish `event` once an event bus exists.

  return toReportLocationResponse(updatedOrder);
}

// Reads

export async function getOrder({ orderId, userId }) {
  const order = await findOrderByIdWithRelations(orderId);
  if (!order) {
    throw new OrderNotFoundError();
  }
  assertOrderParticipant(order, userId);
  return toOrderDTO(order);
}

export async function listMyOrdersAsBuyer({ buyerId, filters }) {
  const { page, limit, ...rest } = filters;
  const skip = (page - 1) * limit;
  const take = limit;

  const { items, totalCount } = await listOrdersByBuyerId(buyerId, {
    ...rest,
    skip,
    take,
  });

  return toOrderSearchResponse({
    orders: items,
    page,
    limit,
    total: totalCount,
  });
}

export async function listMyOrdersAsFarmer({ farmerId, filters }) {
  const { page, limit, ...rest } = filters;
  const skip = (page - 1) * limit;
  const take = limit;

  const { items, totalCount } = await listOrdersByFarmerId(farmerId, {
    ...rest,
    skip,
    take,
  });

  return toOrderSearchResponse({
    orders: items,
    page,
    limit,
    total: totalCount,
  });
}
