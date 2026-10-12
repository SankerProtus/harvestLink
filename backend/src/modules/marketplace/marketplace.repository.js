import { Prisma } from "../../generated/client/index.js";
import { prisma } from "../../common/utils/prismaClient.js";
import { LISTING_STATUS } from "./marketplace.constants.js";

function toDecimal(value) {
  return new Prisma.Decimal(String(value));
}

// Listings

export async function createListing(data) {
  return prisma.listing.create({
    data,
    include: { crop: true },
  });
}

export async function findListingById(id) {
  return prisma.listing.findUnique({
    where: { id },
    include: { crop: true },
  });
}

export async function findListingByIdWithFarmer(id) {
  return prisma.listing.findUnique({
    where: { id },
    include: { farmer: true, crop: true },
  });
}

export async function findListingByFarmerAndTitle(farmerId, title, status) {
  return prisma.listing.findFirst({
    where: {
      farmerId,
      title,
      ...(status ? { status } : {}),
    },
  });
}

export async function updateListing(id, data) {
  return prisma.listing.update({
    where: { id },
    data,
    include: { crop: true },
  });
}

export async function updateListingQuantity(id, quantity) {
  return prisma.listing.update({
    where: { id },
    data: { quantity },
  });
}

export async function updateListingStatus(id, status) {
  return prisma.listing.update({
    where: { id },
    data: { status },
  });
}

/**
 * Atomically decrements quantity for an ACTIVE listing when enough stock exists.
 * Marks the listing SOLD when quantity reaches zero. Uses the provided tx when given.
 */
export async function decrementListingQuantityActive(
  listingId,
  requestedQuantity,
  tx = prisma,
) {
  const requested = toDecimal(requestedQuantity);

  const updated = await tx.listing.updateMany({
    where: {
      id: listingId,
      status: LISTING_STATUS.ACTIVE,
      quantity: { gte: requested },
    },
    data: {
      quantity: { decrement: requested },
    },
  });

  if (updated.count === 0) {
    return null;
  }

  let listing = await tx.listing.findUnique({ where: { id: listingId } });
  if (listing && Number(listing.quantity) === 0) {
    listing = await tx.listing.update({
      where: { id: listingId },
      data: { status: LISTING_STATUS.SOLD },
    });
  }

  return listing;
}

/**
 * Restores quantity after a cancelled order; reactivates SOLD listings when needed.
 */
export async function incrementListingQuantity(
  listingId,
  quantityToRestore,
  tx = prisma,
) {
  const increment = toDecimal(quantityToRestore);
  const listing = await tx.listing.findUnique({ where: { id: listingId } });
  if (!listing) {
    return null;
  }

  const reactivates = listing.status === LISTING_STATUS.SOLD;

  return tx.listing.update({
    where: { id: listingId },
    data: {
      quantity: { increment },
      ...(reactivates ? { status: LISTING_STATUS.ACTIVE } : {}),
    },
  });
}

export async function listListingsByFarmerId(farmerId) {
  return prisma.listing.findMany({
    where: { farmerId },
    include: { crop: true },
    orderBy: { createdAt: "desc" },
  });
}

// Search

const SORT_ORDER = {
  newest: [{ createdAt: "desc" }],
  price_asc: [{ pricePerUnit: "asc" }, { createdAt: "desc" }],
  price_desc: [{ pricePerUnit: "desc" }, { createdAt: "desc" }],
};

export async function searchListings(filters) {
  const {
    cropType,
    quantityUnit,
    location,
    minPrice,
    maxPrice,
    q,
    sort = "newest",
    status = "ACTIVE",
    skip = 0,
    take = 20,
  } = filters;

  const where = {
    status,
    ...(cropType ? { crop: { slug: cropType, active: true } } : {}),
    ...(quantityUnit ? { quantityUnit } : {}),
    ...(location
      ? { location: { contains: location, mode: "insensitive" } }
      : {}),
    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          pricePerUnit: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { description: { contains: q, mode: "insensitive" } },
            { customCropName: { contains: q, mode: "insensitive" } },
            { crop: { name: { contains: q, mode: "insensitive" } } },
            { location: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.listing.findMany({
      where,
      include: { farmer: true, crop: true },
      orderBy: SORT_ORDER[sort] ?? SORT_ORDER.newest,
      skip,
      take,
    }),
    prisma.listing.count({ where }),
  ]);

  return { items, totalCount };
}
