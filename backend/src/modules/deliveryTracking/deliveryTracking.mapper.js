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

// These sub-objects are only present when the query loaded the relevant
// relation (see repository `include` clauses). Built from real columns
// only — no phone/vehicle fields exist on the schema, so a "driver card"
// with that detail isn't fabricated here.
function serializeListingSummary(listing) {
  if (!listing) return undefined;
  return {
    id: listing.id,
    title: listing.title,
    cropType: listing.crop?.slug ?? listing.cropType ?? null,
    images: listing.images ?? [],
  };
}

function serializePerson(person) {
  if (!person) return undefined;
  return {
    id: person.id,
    name: person.fullName,
    phone: person.phone ?? null,
    avatarUrl: person.profileImageUrl ?? null,
  };
}

// Both helpers return `undefined` when the relation wasn't loaded (so the key
// is omitted from JSON) and `null` when it was loaded but no row exists.
function serializeEscrow(escrow) {
  if (escrow === undefined) return undefined;
  if (escrow === null) return null;
  return {
    status: escrow.status,
    amount: serializeDecimal(escrow.amount),
    currency: escrow.currency,
    fundedAt: serializeDate(escrow.fundedAt),
    releasedAt: serializeDate(escrow.releasedAt),
  };
}

function serializePaymentSummary(payments) {
  if (!Array.isArray(payments)) return undefined;
  const latest = payments[0];
  return latest ? { status: latest.status, provider: latest.provider } : null;
}

export function toOrderDTO(order) {
  return {
    id: order.id,
    listingId: order.listingId,
    buyerId: order.buyerId,
    farmerId: order.farmerId,
    quantity: serializeDecimal(order.quantity),
    pricePerUnitAtOrder: serializeDecimal(order.pricePerUnitAtOrder),
    status: order.status,
    confirmedAt: serializeDate(order.confirmedAt),
    escrow: serializeEscrow(order.escrow),
    payments: serializePaymentSummary(order.payments),
    deliveryVerifiedAt: serializeDate(order.deliveryVerifiedAt),
    protectionEndsAt: serializeDate(order.protectionEndsAt),
    escrow: serializeEscrow(order.escrow),
    payment: serializePaymentSummary(order.payments),
    latitude: order.latestLatitude ?? null,
    longitude: order.latestLongitude ?? null,
    locationReportedAt: serializeDate(order.locationReportedAt),
    listing: serializeListingSummary(order.listing),
    buyer: serializePerson(order.buyer),
    farmer: serializePerson(order.farmer),
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
