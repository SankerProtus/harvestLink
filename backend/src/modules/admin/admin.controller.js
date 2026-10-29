import { z } from "zod";
import { parseOrThrow } from "../marketplace/marketplace.validators.js";
import {
  listPendingVerificationRecords,
  resolveVerificationRecord,
  listListingsPendingPriceReview,
  clearListingPriceReview,
  listOpenDisputes,
  getDisputeForAdmin,
  startDisputeReview,
  resolveAdminDispute,
  getAdminOverview,
  listAdminUsers,
  listAdminListings,
  listAdminOrders,
  listAdminPayments,
  listAdminAuditLogs,
  getAdminOrderDetail,
  getAdminPaymentDetail,
  getAdminListingDetail,
  getAdminAuditEventDetail,
  setUserAccountStatus,
} from "./admin.service.js";

const resolveVerificationSchema = z
  .object({
    decision: z.enum(["APPROVE", "REJECT"]),
    notes: z.string().trim().max(500).optional(),
  })
  .strict();

const listingIdParamSchema = z
  .object({
    listingId: z.string().uuid(),
  })
  .strict();

const disputeIdParamSchema = z
  .object({
    disputeId: z.string().uuid(),
  })
  .strict();

const resolveDisputeSchema = z
  .object({
    outcome: z.enum(["BUYER", "FARMER"]).default("BUYER"),
    resolution: z.string().trim().min(10).max(1000),
  })
  .strict();

const userIdParamSchema = z.object({ userId: z.string().uuid() }).strict();

const userStatusSchema = z
  .object({
    status: z.enum(["SUSPENDED", "ACTIVE"]),
    reason: z.string().trim().min(10).max(500),
  })
  .strict();

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function getVerificationQueue(req, res, next) {
  try {
    const data = await listPendingVerificationRecords();
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}

export async function getOverview(req, res, next) {
  try {
    return sendSuccess(res, 200, await getAdminOverview());
  } catch (err) {
    next(err);
  }
}

export async function getUsers(req, res, next) {
  try { return sendSuccess(res, 200, await listAdminUsers()); }
  catch (err) { next(err); }
}

export async function postUserStatus(req, res, next) {
  try {
    const { userId } = parseOrThrow(userIdParamSchema, req.params);
    const input = parseOrThrow(userStatusSchema, req.body);
    const data = await setUserAccountStatus({
      userId,
      adminId: req.user.id,
      status: input.status,
      reason: input.reason,
    });
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}

export async function getListings(req, res, next) {
  try { return sendSuccess(res, 200, await listAdminListings()); }
  catch (err) { next(err); }
}

export async function getOrders(req, res, next) {
  try { return sendSuccess(res, 200, await listAdminOrders()); }
  catch (err) { next(err); }
}

export async function getPayments(req, res, next) {
  try { return sendSuccess(res, 200, await listAdminPayments()); }
  catch (err) { next(err); }
}

export async function getAuditLogs(req, res, next) {
  try { return sendSuccess(res, 200, await listAdminAuditLogs()); }
  catch (err) { next(err); }
}

const orderIdParamSchema = z.object({ orderId: z.string().uuid() }).strict();
const paymentIdParamSchema = z.object({ paymentId: z.string().uuid() }).strict();
const eventIdParamSchema = z.object({ eventId: z.string().uuid() }).strict();

export async function getOrderDetail(req, res, next) {
  try {
    const { orderId } = parseOrThrow(orderIdParamSchema, req.params);
    return sendSuccess(res, 200, await getAdminOrderDetail(orderId));
  } catch (err) { next(err); }
}

export async function getPaymentDetail(req, res, next) {
  try {
    const { paymentId } = parseOrThrow(paymentIdParamSchema, req.params);
    return sendSuccess(res, 200, await getAdminPaymentDetail(paymentId));
  } catch (err) { next(err); }
}

export async function getListingDetail(req, res, next) {
  try {
    const { listingId } = parseOrThrow(listingIdParamSchema, req.params);
    return sendSuccess(res, 200, await getAdminListingDetail(listingId));
  } catch (err) { next(err); }
}

export async function getAuditEventDetail(req, res, next) {
  try {
    const { eventId } = parseOrThrow(eventIdParamSchema, req.params);
    return sendSuccess(res, 200, await getAdminAuditEventDetail(eventId));
  } catch (err) { next(err); }
}

export async function postVerificationDecision(req, res, next) {
  try {
    const { recordId } = req.params;
    const input = parseOrThrow(resolveVerificationSchema, req.body);
    const data = await resolveVerificationRecord({
      recordId,
      adminId: req.user.id,
      decision: input.decision,
      notes: input.notes,
    });
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}

export async function getPriceReviewQueue(req, res, next) {
  try {
    const data = await listListingsPendingPriceReview();
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}

export async function postClearPriceReview(req, res, next) {
  try {
    const params = parseOrThrow(listingIdParamSchema, req.params);
    const data = await clearListingPriceReview({
      listingId: params.listingId,
      adminId: req.user.id,
    });
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}

export async function getDisputeQueue(req, res, next) {
  try {
    return sendSuccess(res, 200, await listOpenDisputes());
  } catch (err) {
    next(err);
  }
}

export async function getDisputeDetail(req, res, next) {
  try {
    const { disputeId } = parseOrThrow(disputeIdParamSchema, req.params);
    return sendSuccess(res, 200, await getDisputeForAdmin(disputeId));
  } catch (err) {
    next(err);
  }
}

export async function postStartDisputeReview(req, res, next) {
  try {
    const { disputeId } = parseOrThrow(disputeIdParamSchema, req.params);
    return sendSuccess(res, 200, await startDisputeReview({ disputeId }));
  } catch (err) {
    next(err);
  }
}

export async function postResolveDispute(req, res, next) {
  try {
    const { disputeId } = parseOrThrow(disputeIdParamSchema, req.params);
    const input = parseOrThrow(resolveDisputeSchema, req.body);
    const data = await resolveAdminDispute({
      disputeId,
      adminId: req.user.id,
      outcome: input.outcome,
      resolution: input.resolution,
    });
    return sendSuccess(res, 200, data);
  } catch (err) {
    next(err);
  }
}
