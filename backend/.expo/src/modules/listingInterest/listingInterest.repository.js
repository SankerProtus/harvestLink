import { prisma } from "../../common/utils/prismaClient.js";

export async function findListingById(listingId) {
  return prisma.listing.findUnique({ where: { id: listingId } });
}

export async function upsertInterest({ listingId, buyerId }) {
  return prisma.listingInterest.upsert({
    where: { listingId_buyerId: { listingId, buyerId } },
    update: {},
    create: { listingId, buyerId },
  });
}

export async function removeInterest({ listingId, buyerId }) {
  await prisma.listingInterest.deleteMany({ where: { listingId, buyerId } });
}

export async function listInterestForListing({ listingId, skip, take }) {
  const [items, totalCount] = await prisma.$transaction([
    prisma.listingInterest.findMany({
      where: { listingId },
      include: { buyer: true },
      orderBy: { createdAt: "desc" },
      skip,
      take,
    }),
    prisma.listingInterest.count({ where: { listingId } }),
  ]);
  return { items, totalCount };
}

// One row per listing owned by this farmer, with its interest count —
// powers the farmer's "N buyers interested" summary per listing.
export async function listInterestCountsForFarmer(farmerId) {
  return prisma.listing.findMany({
    where: { farmerId },
    select: {
      id: true,
      title: true,
      _count: { select: { interests: true } },
    },
  });
}

export async function listInterestedListingIdsForBuyer(buyerId) {
  const rows = await prisma.listingInterest.findMany({
    where: { buyerId },
    select: { listingId: true },
  });
  return rows.map((row) => row.listingId);
}
