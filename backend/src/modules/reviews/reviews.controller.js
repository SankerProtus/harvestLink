import {
  parseOrThrow,
  createReviewSchema,
  orderIdParamSchema,
} from "./reviews.validators.js";
import {
  createReview as createReviewService,
  getReviewForOrder as getReviewForOrderService,
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
