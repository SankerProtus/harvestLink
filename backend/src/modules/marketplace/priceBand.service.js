import { prisma } from "../../common/utils/prismaClient.js";
import { LISTING_CONFIG } from "./marketplace.constants.js";

/**
 * Returns whether a listing price should be held for admin review based on
 * reference bands (when configured for the crop/region/unit).
 */
export async function evaluatePriceReviewRequired({
  cropId,
  location,
  quantityUnit,
  pricePerUnit,
}) {
  const band = await prisma.marketPrice.findFirst({
    where: {
      cropId,
      quantityUnit,
      OR: [
        { region: { equals: location, mode: "insensitive" } },
        { region: "Ghana" },
      ],
    },
    orderBy: { effectiveFrom: "desc" },
  });

  if (!band) {
    return false;
  }

  const price = Number(pricePerUnit);
  const min = Number(band.referenceMinGhs);
  const max = Number(band.referenceMaxGhs);
  const lowFloor =
    min * (1 - LISTING_CONFIG.PRICE_BAND_LOW_TOLERANCE);
  const highCeiling =
    max * (1 + LISTING_CONFIG.PRICE_BAND_HIGH_TOLERANCE);

  if (price < lowFloor) {
    return true;
  }
  if (price > highCeiling) {
    return true;
  }

  return false;
}
