import { BadRequestError } from "../../errors/commonErrors.js";
import {
  decideCancellation,
  generateHandoverCode,
  getMyDisputes,
  getOrderTrustContext,
  getReliabilityMetrics,
  openDispute,
  requestCancellation,
  submitVerification,
  uploadDisputeEvidence,
  verifyHandoverCode,
} from "./trust.service.js";
import {
  cancellationDecisionSchema,
  cancellationRequestParamSchema,
  cancellationRequestSchema,
  disputeSchema,
  handoverCodeSchema,
  orderIdParamSchema,
  parseOrThrow,
  verificationSubmissionSchema,
} from "./trust.validators.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function postGenerateHandoverCode(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    return sendSuccess(res, 201, await generateHandoverCode({ orderId, farmerId: req.user.id }));
  } catch (err) { next(err); }
}

export async function postVerifyHandoverCode(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    const { code } = parseOrThrow(handoverCodeSchema, req.body);
    return sendSuccess(res, 200, await verifyHandoverCode({ orderId, buyerId: req.user.id, code }));
  } catch (err) { next(err); }
}

export async function postCancellationRequest(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    const { reason } = parseOrThrow(cancellationRequestSchema, req.body);
    return sendSuccess(res, 201, await requestCancellation({ orderId, requesterId: req.user.id, reason }));
  } catch (err) { next(err); }
}

export async function postCancellationDecision(req, res, next) {
  try {
    const params = parseOrThrow(cancellationRequestParamSchema, req.params);
    const { decision } = parseOrThrow(cancellationDecisionSchema, req.body);
    return sendSuccess(res, 200, await decideCancellation({ ...params, decisionById: req.user.id, decision }));
  } catch (err) { next(err); }
}

export async function postDispute(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    const input = parseOrThrow(disputeSchema, req.body);
    return sendSuccess(res, 201, await openDispute({ orderId, openedById: req.user.id, ...input }));
  } catch (err) { next(err); }
}

export async function listDisputes(req, res, next) {
  try { return sendSuccess(res, 200, await getMyDisputes(req.user.id)); }
  catch (err) { next(err); }
}

export async function getOrderTrustState(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    return sendSuccess(
      res,
      200,
      await getOrderTrustContext({ orderId, userId: req.user.id }),
    );
  } catch (err) {
    next(err);
  }
}

export async function postDisputeEvidence(req, res, next) {
  try {
    if (!req.file?.buffer) {
      return next(new BadRequestError("Photo is required"));
    }
    return sendSuccess(
      res,
      201,
      await uploadDisputeEvidence({
        userId: req.user.id,
        fileBuffer: req.file.buffer,
      }),
    );
  } catch (err) {
    next(err);
  }
}

export async function postVerificationSubmission(req, res, next) {
  try {
    const input = parseOrThrow(verificationSubmissionSchema, req.body);
    return sendSuccess(res, 201, await submitVerification({ userId: req.user.id, ...input }));
  } catch (err) { next(err); }
}

export async function listReliabilityMetrics(req, res, next) {
  try { return sendSuccess(res, 200, await getReliabilityMetrics(req.user.id)); }
  catch (err) { next(err); }
}
