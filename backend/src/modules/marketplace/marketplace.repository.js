import { prisma } from "../../common/utils/prismaClient.js";

// Listings

export async function createListing(data) {
  return prisma.listing.create({ data });
}

export async function findListingById(id) {
  return prisma.listing.findUnique({ where: { id } });
}

export async function findListingByIdWithFarmer(id) {
  return prisma.listing.findUnique({
    where: { id },
    include: { farmer: true },
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

export async function listListingsByFarmerId(farmerId) {
  return prisma.listing.findMany({
    where: { farmerId },
    orderBy: { createdAt: "desc" },
  });
}

// Search

export async function searchListings(filters) {
  const {
    cropType,
    quantityUnit,
    location,
    minPrice,
    maxPrice,
    status = "ACTIVE",
    skip = 0,
    take = 20,
  } = filters;

  const where = {
    status,
    ...(cropType ? { cropType } : {}),
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
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.listing.findMany({
      where,
      include: { farmer: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.listing.count({ where }),
  ]);

  return { items, totalCount };
}
