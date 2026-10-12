import { prisma } from "../../common/utils/prismaClient.js";

export async function searchMatches(filters) {
  const {
    cropType,
    requestedQuantity,
    requestedQuantityUnit,
    location,
    maxPrice,
    skip = 0,
    take = 20,
  } = filters;

  const where = {
    status: "ACTIVE",
    crop: { slug: cropType, active: true },
    quantityUnit: requestedQuantityUnit,
    quantity: { gte: requestedQuantity },
    ...(location
      ? { location: { contains: location, mode: "insensitive" } }
      : {}),
    ...(maxPrice !== undefined ? { pricePerUnit: { lte: maxPrice } } : {}),
  };

  const [items, totalCount] = await prisma.$transaction([
    prisma.listing.findMany({
      where,
      include: { farmer: true, crop: true },
      orderBy: [{ pricePerUnit: "asc" }, { createdAt: "desc" }],
      skip,
      take,
    }),
    prisma.listing.count({ where }),
  ]);

  return { items, totalCount };
}
