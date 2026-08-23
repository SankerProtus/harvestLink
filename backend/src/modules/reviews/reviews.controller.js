import {
  parseOrThrow,
  createReviewSchema,
  orderIdParamSchema,
  farmerIdParamSchema,
  listingIdParamSchema,
  reviewIdParamSchema,
  listReviewsQuerySchema,
  createReviewCommentSchema,
} from "./reviews.validators.js";
import {
  createReview as createReviewService,
  getReviewForOrder as getReviewForOrderService,
  listReviewsForFarmer as listReviewsForFarmerService,
  listReviewsForListing as listReviewsForListingService,
  listReviewComments as listReviewCommentsService,
  addReviewComment as addReviewCommentService,
} from "./reviews.service.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function createReview(req, res, next) {
  try {
    const input = parseOrThrow(createReviewSchema, req.body);
    const result = await createReviewService({
      orderId: input.orderId,
      buyerId: req.user.id,
      rating: input.rating,
      comment: input.comment,
    });
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}

export async function getReviewForOrder(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    const result = await getReviewForOrderService({
      orderId,
      userId: req.user.id,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listFarmerReviews(req, res, next) {
  try {
    const { farmerId } = parseOrThrow(farmerIdParamSchema, req.params);
    const { page, limit } = parseOrThrow(listReviewsQuerySchema, req.query);
    const result = await listReviewsForFarmerService({ farmerId, page, limit });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listListingReviews(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    const { page, limit } = parseOrThrow(listReviewsQuerySchema, req.query);
    const result = await listReviewsForListingService({
      listingId,
      page,
      limit,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listReviewComments(req, res, next) {
  try {
    const { reviewId } = parseOrThrow(reviewIdParamSchema, req.params);
    const result = await listReviewCommentsService(reviewId);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function createReviewComment(req, res, next) {
  try {
    const { reviewId } = parseOrThrow(reviewIdParamSchema, req.params);
    const { body } = parseOrThrow(createReviewCommentSchema, req.body);
    const result = await addReviewCommentService({
      reviewId,
      authorId: req.user.id,
      body,
    });
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}
