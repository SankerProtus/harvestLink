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
