//  Date Serialization
function serializeDate(date) {
  if (!date) return null;
  return date instanceof Date
    ? date.toISOString()
    : new Date(date).toISOString();
}

//  Decimal Serialization
function serializeDecimal(value) {
  if (value === null || value === undefined) return null;
  return Number(value);
}

//  Order DTO

export function toOrderDTO(order) {
  return {
    id: order.id,
    listingId: order.listingId,
    buyerId: order.buyerId,
    farmerId: order.farmerId,
    quantity: serializeDecimal(order.quantity),
    pricePerUnitAtOrder: serializeDecimal(order.pricePerUnitAtOrder),
    status: order.status,
    latitude: order.latestLatitude ?? null,
    longitude: order.latestLongitude ?? null,
    locationReportedAt: serializeDate(order.locationReportedAt),
    createdAt: serializeDate(order.createdAt),
    updatedAt: serializeDate(order.updatedAt),
  };
}

// Order List DTO
export function toOrderListDTO(orders) {
  return orders.map(toOrderDTO);
}

//  Search / List Response DTO

export function toOrderSearchResponse({ orders, page, limit, total }) {
  return {
    results: toOrderListDTO(orders),
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

// Create / Update / Report Response DTOs
export function toCreateOrderResponse(order) {
  return toOrderDTO(order);
}

// Update / Report Response DTOs
export function toUpdateOrderStatusResponse(order) {
  return toOrderDTO(order);
}
// Report Location Response DTO
export function toReportLocationResponse(order) {
  return toOrderDTO(order);
}
