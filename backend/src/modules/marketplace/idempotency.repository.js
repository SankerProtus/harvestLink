import { prisma } from "../../common/utils/prismaClient.js";
import {
  IDEMPOTENCY_SCOPE,
  IDEMPOTENCY_TTL_MS,
  getRequestHash,
} from "../../common/utils/idempotency.js";

export async function claimListingCreation({ key, userId, request }) {
  const requestHash = getRequestHash(request);
  const existing = await prisma.idempotencyKey.findUnique({
    where: { scope_key: { scope: IDEMPOTENCY_SCOPE, key } },
  });

  if (existing) {
    if (existing.requestHash !== requestHash || existing.userId !== userId) {
      return { status: "conflict" };
    }
    if (existing.status === "COMPLETED") {
      return {
        status: "completed",
        responseCode: existing.responseCode,
        responseBody: existing.responseBody,
      };
    }
    if (
      existing.status === "PROCESSING" &&
      existing.expiresAt > new Date()
    ) {
      return { status: "processing" };
    }
  }

  try {
    const record = await prisma.idempotencyKey.upsert({
      where: { scope_key: { scope: IDEMPOTENCY_SCOPE, key } },
      create: {
        key,
        scope: IDEMPOTENCY_SCOPE,
        userId,
        requestHash,
        status: "PROCESSING",
        expiresAt: new Date(Date.now() + IDEMPOTENCY_TTL_MS),
      },
      update: {
        userId,
        requestHash,
        status: "PROCESSING",
        responseCode: null,
        responseBody: null,
        completedAt: null,
        expiresAt: new Date(Date.now() + IDEMPOTENCY_TTL_MS),
      },
    });
    return { status: "claimed", id: record.id };
  } catch (error) {
    if (error?.code === "P2002") return { status: "processing" };
    throw error;
  }
}

export async function completeListingCreation(id, responseBody) {
  return prisma.idempotencyKey.update({
    where: { id },
    data: {
      status: "COMPLETED",
      responseCode: 201,
      responseBody,
      completedAt: new Date(),
    },
  });
}

export async function failListingCreation(id) {
  return prisma.idempotencyKey.update({
    where: { id },
    data: { status: "FAILED" },
  });
}
