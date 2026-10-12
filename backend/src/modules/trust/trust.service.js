import { randomInt, timingSafeEqual } from "node:crypto";
import { sha256Hash } from "../../common/utils/crypto.js";
import {
  createCancellationRequest,
  createDispute,
  createHandoverCode,
  createVerificationRecord,
  consumeHandoverCode,
  decideCancellationRequest,
  findHandoverCode,
  findOpenDisputeForOrder,
  findOrder,
  findPendingCancellationForOrder,
  findPendingVerification,
  incrementHandoverAttempts,
  listDisputesForUser,
  listReliabilityMetrics,
  upsertReliabilityMetric,
} from "./trust.repository.js";
import { TrustConflictError, TrustForbiddenError, TrustNotFoundError } from "./trust.errors.js";
import {
  assertEvidenceUrlsAllowed,
  DISPUTE_EVIDENCE_FOLDER,
} from "./evidencePolicy.js";
import { uploadImageBuffer } from "../../common/configs/cloudinary.js";

const HANDOVER_TTL_MS = 30 * 60 * 1000;
const MAX_HANDOVER_ATTEMPTS = 5;

function assertParticipant(order, userId) {
  if (!order || (order.buyerId !== userId && order.farmerId !== userId)) {
    throw new TrustForbiddenError();
  }
}

export async function generateHandoverCode({ orderId, farmerId }) {
  const order = await findOrder(orderId);
  if (!order) throw new TrustNotFoundError("Order not found");
  if (order.farmerId !== farmerId) throw new TrustForbiddenError();
  if (order.status !== "IN_TRANSIT") throw new TrustConflictError("A handover code can only be generated for an in-transit order");

  const code = String(randomInt(100000, 1000000));
  const expiresAt = new Date(Date.now() + HANDOVER_TTL_MS);
  await createHandoverCode({ orderId, codeHash: sha256Hash(code), expiresAt });
  return { orderId, code, expiresAt };
}

export async function verifyHandoverCode({ orderId, buyerId, code }) {
  const order = await findOrder(orderId);
  if (!order) throw new TrustNotFoundError("Order not found");
  if (order.buyerId !== buyerId) throw new TrustForbiddenError();
  if (order.status !== "IN_TRANSIT") throw new TrustConflictError("This order is not awaiting handover");

  const record = await findHandoverCode(orderId);
  if (!record || record.usedAt || record.expiresAt <= new Date()) {
    throw new TrustConflictError("The handover code is missing or expired");
  }
  if (record.attempts >= MAX_HANDOVER_ATTEMPTS) {
    throw new TrustConflictError("The handover code has been locked after too many attempts");
  }

  const expected = Buffer.from(record.codeHash);
  const actual = Buffer.from(sha256Hash(code));
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) {
    await incrementHandoverAttempts(record.id);
    throw new TrustConflictError("The handover code is invalid");
  }

  const consumed = await consumeHandoverCode(orderId, new Date());
  if (!consumed || consumed.count !== 1) {
    throw new TrustConflictError("The order was already handed over or changed");
  }
  return { orderId, status: "DELIVERED", deliveredAt: new Date().toISOString() };
}

export async function requestCancellation({ orderId, requesterId, reason }) {
  const order = await findOrder(orderId);
  assertParticipant(order, requesterId);
  if (order.status !== "CONFIRMED") {
    throw new TrustConflictError("Cancellation requests are only available for confirmed orders");
  }
  const result = await createCancellationRequest({ orderId, requesterId, reason });
  if (!result) throw new TrustConflictError("The order changed before the request could be created");
  if (result.conflict) throw new TrustConflictError("This order already has a pending cancellation request");
  return result.request;
}

export async function decideCancellation({ orderId, requestId, decisionById, decision }) {
  const request = await findPendingCancellationForOrder(orderId);
  if (
    !request ||
    request.id !== requestId ||
    request.requesterId === decisionById
  ) {
    throw new TrustForbiddenError(
      "Only the other order participant can decide a cancellation request",
    );
  }

  const result = await decideCancellationRequest({
    orderId,
    requestId,
    decisionById,
    status: decision === "APPROVE" ? "APPROVED" : "REJECTED",
  });
  if (!result) throw new TrustNotFoundError("Cancellation request not found or you cannot decide it");
  if (decision === "APPROVE") {
    await recordCancellationMetric({ userId: result.request.requesterId });
  }
  return result;
}

export async function openDispute({ orderId, openedById, reason, description, evidenceUrls }) {
  const order = await findOrder(orderId);
  assertParticipant(order, openedById);
  if (!["IN_TRANSIT", "DELIVERED", "DISPUTED"].includes(order.status)) {
    throw new TrustConflictError("Disputes can only be opened after dispatch");
  }
  if (await findOpenDisputeForOrder(orderId)) {
    throw new TrustConflictError("This order already has an open dispute");
  }
  assertEvidenceUrlsAllowed(evidenceUrls);
  return createDispute({ orderId, openedById, reason, description, evidenceUrls });
}

export function getMyDisputes(userId) {
  return listDisputesForUser(userId);
}

export async function getOrderTrustContext({ orderId, userId }) {
  const order = await findOrder(orderId);
  assertParticipant(order, userId);
  const [openDispute, pendingCancellation] = await Promise.all([
    findOpenDisputeForOrder(orderId),
    findPendingCancellationForOrder(orderId),
  ]);
  return { openDispute, pendingCancellation };
}

export async function uploadDisputeEvidence({ userId, fileBuffer }) {
  void userId;
  const url = await uploadImageBuffer(fileBuffer, {
    folder: DISPUTE_EVIDENCE_FOLDER,
    transformation: [{ width: 1600, height: 1600, crop: "limit" }],
  });
  return { url };
}

export async function submitVerification({ userId, ...data }) {
  if (await findPendingVerification(userId)) {
    throw new TrustConflictError("You already have a verification submission under review");
  }
  return createVerificationRecord({ userId, ...data });
}

function monthWindow(date = new Date()) {
  const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));
  const end = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0));
  return { start, end };
}

export async function recordCancellationMetric({ userId }) {
  const { start, end } = monthWindow();
  const { prisma } = await import("../../common/utils/prismaClient.js");
  const [cancelled, total] = await Promise.all([
    prisma.order.count({ where: { OR: [{ buyerId: userId }, { farmerId: userId }], status: "CANCELLED", updatedAt: { gte: start, lte: end } } }),
    prisma.order.count({ where: { OR: [{ buyerId: userId }, { farmerId: userId }], createdAt: { lte: end } } }),
  ]);
  return upsertReliabilityMetric({
    userId,
    metricType: "CANCELLATION_RATE",
    periodStart: start,
    periodEnd: end,
    value: total ? cancelled / total : 0,
    sampleSize: total,
  });
}

export function getReliabilityMetrics(userId) {
  return listReliabilityMetrics(userId);
}
