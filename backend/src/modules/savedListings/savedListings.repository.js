import { prisma } from "../../common/utils/prismaClient.js";

export async function findListingById(listingId) {
  return prisma.listing.findUnique({ where: { id: listingId } });
}

export async function upsertSavedListing({ listingId, buyerId }) {
  return prisma.savedListing.upsert({
    where: { buyerId_listingId: { buyerId, listingId } },
    update: {},
    create: { listingId, buyerId },
  });
}

export async function removeSavedListing({ listingId, buyerId }) {
  await prisma.savedListing.deleteMany({ where: { listingId, buyerId } });
}

export async function listSavedListingIdsForBuyer(buyerId) {
  const rows = await prisma.savedListing.findMany({
    where: { buyerId },
    select: { listingId: true },
  });
  return rows.map((row) => row.listingId);
}

export async function listSavedListingsForBuyer(buyerId, { skip = 0, take = 20 }) {
  const where = { buyerId };
  const [rows, totalCount] = await prisma.$transaction([
    prisma.savedListing.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      include: { listing: { include: { farmer: true, crop: true } } },
    }),
    prisma.savedListing.count({ where }),
  ]);
  return { items: rows.map((row) => row.listing), totalCount };
}