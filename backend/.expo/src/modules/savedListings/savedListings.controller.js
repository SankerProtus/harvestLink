import {
  parseOrThrow,
  listingIdParamSchema,
} from "./savedListings.validators.js";
import {
  saveListing as saveListingService,
  unsaveListing as unsaveListingService,
  getSavedListingIdsForBuyer as getSavedListingIdsForBuyerService,
} from "./savedListings.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function saveListing(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    await saveListingService({ listingId, buyerId: req.user.id });
    return sendSuccess(res, 201, { listingId });
  } catch (err) {
    next(err);
  }
}

export async function unsaveListing(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    await unsaveListingService({ listingId, buyerId: req.user.id });
    return sendSuccess(res, 200, { listingId });
  } catch (err) {
    next(err);
  }
}

export async function getMySavedListingIds(req, res, next) {
  try {
    const result = await getSavedListingIdsForBuyerService(req.user.id);
    return sendSuccess(res, 200, { listingIds: result });
  } catch (err) {
    next(err);
  }
}
