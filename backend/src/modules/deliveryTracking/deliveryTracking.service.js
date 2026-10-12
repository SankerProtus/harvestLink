import {
  createOrderWithListingLock,
  findOrderById,
  findOrderByIdWithRelations,
  applyOrderStatusTransition,
  updateOrderLocation as updateOrderLocationRepo,
  listOrdersByBuyerId,
  listOrdersByFarmerId,
  getFarmerSummaryData
} from "./deliveryTracking.repository.js";

import {
  OrderNotFoundError,
  UnauthorizedOrderAccessError,
  InvalidOrderStatusTransitionError,
  OrderCancellationNotAllowedError,
  LocationReportingNotAllowedError,
  SelfOrderNotAllowedError,
} from "./deliveryTracking.errors.js";

import {
  ListingNotFoundError,
  ListingUnavailableError,
  ListingAlreadySoldError,
  InsufficientListingQuantityError,
} from "../marketplace/marketplace.errors.js";
import { LISTING_STATUS } from "../marketplace/marketplace.constants.js";

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

import { ORDER_STATUS, ORDER_CONFIG } from "./deliveryTracking.constants.js";

import { getListing } from "../marketplace/marketplace.service.js";
import { createNotification } from "../notifications/notifications.service.js";
import { NOTIFICATION_TYPE } from "../notifications/notifications.constants.js";
import { recordCancellationMetric } from "../trust/trust.service.js";

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
};

function resolveCancellationRule(currentStatus, userId, order) {
  if (currentStatus === ORDER_STATUS.PENDING) {
    return { actor: "either", action: null };
  }

  if (currentStatus === ORDER_STATUS.CONFIRMED) {
    if (userId === order.farmerId) {
      return { actor: "farmer", action: "release" };
    }
    if (userId === order.buyerId) {
      const anchor =
        order.confirmedAt ?? order.updatedAt ?? order.createdAt ?? new Date(0);
      const confirmedMs =
        anchor instanceof Date ? anchor.getTime() : new Date(anchor).getTime();
      const withinGrace =
        Date.now() - confirmedMs <= ORDER_CONFIG.BUYER_CANCEL_GRACE_MS;
      if (!withinGrace) {
        throw new OrderCancellationNotAllowedError(
          "Confirmed orders can only be cancelled by the buyer within 30 minutes, or with farmer approval (coming soon)",
        );
      }
      return { actor: "buyer", action: "release" };
    }
    return null;
  }

  return null;
}

// Public Service Functions
export async function createOrder({ buyerId, listingId, quantity }) {
  const listingPreview = await getListing({ listingId });

  const result = await createOrderWithListingLock({
    listingId,
    buyerId,
    quantity,
    pricePerUnitAtOrder: listingPreview.pricePerUnit,
  });

  if (!result.ok) {
    switch (result.reason) {
      case "NOT_FOUND":
        throw new ListingNotFoundError();
      case "SELF_ORDER":
        throw new SelfOrderNotAllowedError();
      case "NOT_ACTIVE":
        if (result.listingStatus === LISTING_STATUS.SOLD) {
          throw new ListingAlreadySoldError();
        }
        throw new ListingUnavailableError();
      case "INSUFFICIENT":
        throw new InsufficientListingQuantityError();
      default:
        throw new InvalidOrderStatusTransitionError();
    }
  }

  const { order, listing } = result;

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

  let rule;
  if (newStatus === ORDER_STATUS.CANCELLED) {
    if (
      currentStatus === ORDER_STATUS.DELIVERED ||
      currentStatus === ORDER_STATUS.CANCELLED
    ) {
      throw new InvalidOrderStatusTransitionError();
    }
    rule = resolveCancellationRule(currentStatus, userId, order);
    if (!rule) {
      throw new OrderCancellationNotAllowedError();
    }
  } else {
    if (newStatus === ORDER_STATUS.DELIVERED) {
      throw new InvalidOrderStatusTransitionError(
        "Delivery must be verified with the buyer handover code",
      );
    }
    rule = TRANSITIONS[`${currentStatus}->${newStatus}`];
    if (!rule) {
      throw new InvalidOrderStatusTransitionError();
    }
  }

  if (rule.actor === "farmer" && userId !== order.farmerId) {
    throw new UnauthorizedOrderAccessError();
  }
  if (rule.actor === "buyer" && userId !== order.buyerId) {
    throw new UnauthorizedOrderAccessError();
  }
  if (
    rule.actor === "either" &&
    userId !== order.buyerId &&
    userId !== order.farmerId
  ) {
    throw new UnauthorizedOrderAccessError();
  }

  const transitionResult = await applyOrderStatusTransition({
    orderId,
    fromStatus: currentStatus,
    toStatus: newStatus,
    inventoryAction: rule.action,
  });

  if (!transitionResult.ok) {
    if (transitionResult.reason === "INVALID_TRANSITION") {
      throw new InvalidOrderStatusTransitionError();
    }
    if (transitionResult.reason === "INSUFFICIENT") {
      throw new InsufficientListingQuantityError();
    }
    if (transitionResult.reason === "LISTING_NOT_FOUND") {
      throw new ListingNotFoundError();
    }
    throw new InvalidOrderStatusTransitionError();
  }

  const updatedOrder = transitionResult.order;

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
    await recordCancellationMetric({ userId });
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

export async function getFarmerSummary({ farmerId }) {
  const { statusRows, payoutRows, escrowRows } =
    await getFarmerSummaryData(farmerId);

  const statusCounts = {};
  for (const row of statusRows) statusCounts[row.status] = row._count._all;

  const byCurrency = {};
  const bucket = (currency) =>
    (byCurrency[currency] ??= {
      currency,
      paidOut: 0,
      payoutPending: 0,
      inProtection: 0,
    });

  for (const row of payoutRows) {
    const amount = Number(row._sum.amount ?? 0);
    if (row.status === "SUCCEEDED") bucket(row.currency).paidOut += amount;
    else if (row.status === "PENDING" || row.status === "PROCESSING")
      bucket(row.currency).payoutPending += amount;
  }
  for (const row of escrowRows) {
    bucket(row.currency).inProtection += Number(row._sum.amount ?? 0);
  }

  return { statusCounts, money: Object.values(byCurrency) };
}
