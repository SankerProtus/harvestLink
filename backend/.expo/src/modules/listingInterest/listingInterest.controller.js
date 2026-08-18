import {
  parseOrThrow,
  expressInterestSchema,
  listingIdParamSchema,
  listInterestQuerySchema,
} from "./listingInterest.validators.js";
import {
  expressInterest as expressInterestService,
  withdrawInterest as withdrawInterestService,
  getInterestForListing as getInterestForListingService,
  getInterestSummaryForFarmer as getInterestSummaryForFarmerService,
  getInterestedListingIdsForBuyer as getInterestedListingIdsForBuyerService,
} from "./listingInterest.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function expressInterest(req, res, next) {
  try {
    const input = parseOrThrow(expressInterestSchema, req.body);
    const result = await expressInterestService({
      listingId: input.listingId,
      buyerId: req.user.id,
    });
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}

export async function withdrawInterest(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    await withdrawInterestService({ listingId, buyerId: req.user.id });
    return sendSuccess(res, 200, { listingId });
  } catch (err) {
    next(err);
  }
}

export async function getInterestForListing(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    const { page, limit } = parseOrThrow(listInterestQuerySchema, req.query);
    const result = await getInterestForListingService({
      listingId,
      farmerId: req.user.id,
      page,
      limit,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getInterestSummaryForFarmer(req, res, next) {
  try {
    const result = await getInterestSummaryForFarmerService(req.user.id);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getInterestedListingIdsForBuyer(req, res, next) {
  try {
    const result = await getInterestedListingIdsForBuyerService(req.user.id);
    return sendSuccess(res, 200, { listingIds: result });
  } catch (err) {
    next(err);
  }
}
