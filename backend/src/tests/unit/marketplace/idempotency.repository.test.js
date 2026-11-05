import { jest, describe, test, expect, beforeEach } from "@jest/globals";

const prisma = {
  idempotencyKey: {
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
  },
};

jest.unstable_mockModule(
  "../../../common/utils/prismaClient.js",
  () => ({ prisma }),
);

const {
  claimListingCreation,
  completeListingCreation,
  failListingCreation,
} = await import("../../../modules/marketplace/idempotency.repository.js");

const request = {
  title: "Fresh Tomatoes",
  cropType: "TOMATO",
  quantity: 10,
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("listing idempotency repository", () => {
  test("replays a completed request without claiming it again", async () => {
    const responseBody = { success: true, data: { id: "listing-1" } };
    prisma.idempotencyKey.findUnique.mockResolvedValue({
      requestHash: "e6f4",
      userId: "farmer-1",
      status: "COMPLETED",
      responseCode: 201,
      responseBody,
    });

    const firstHash = await import("../../../common/utils/idempotency.js");
    prisma.idempotencyKey.findUnique.mockResolvedValue({
      requestHash: firstHash.getRequestHash(request),
      userId: "farmer-1",
      status: "COMPLETED",
      responseCode: 201,
      responseBody,
    });

    await expect(
      claimListingCreation({ key: "listing-create-key-1", userId: "farmer-1", request }),
    ).resolves.toEqual({
      status: "completed",
      responseCode: 201,
      responseBody,
    });
    expect(prisma.idempotencyKey.upsert).not.toHaveBeenCalled();
  });

  test("rejects reuse with a different payload or user", async () => {
    prisma.idempotencyKey.findUnique.mockResolvedValue({
      requestHash: "different-hash",
      userId: "farmer-1",
      status: "COMPLETED",
    });

    await expect(
      claimListingCreation({ key: "listing-create-key-2", userId: "farmer-1", request }),
    ).resolves.toEqual({ status: "conflict" });
    expect(prisma.idempotencyKey.upsert).not.toHaveBeenCalled();
  });

  test("blocks a still-processing request", async () => {
    prisma.idempotencyKey.findUnique.mockResolvedValue({
      requestHash: (await import("../../../common/utils/idempotency.js")).getRequestHash(
        request,
      ),
      userId: "farmer-1",
      status: "PROCESSING",
      expiresAt: new Date(Date.now() + 60_000),
    });

    await expect(
      claimListingCreation({ key: "listing-create-key-3", userId: "farmer-1", request }),
    ).resolves.toEqual({ status: "processing" });
    expect(prisma.idempotencyKey.upsert).not.toHaveBeenCalled();
  });

  test("reclaims a failed request and supports completion", async () => {
    prisma.idempotencyKey.findUnique.mockResolvedValue({
      requestHash: (await import("../../../common/utils/idempotency.js")).getRequestHash(
        request,
      ),
      userId: "farmer-1",
      status: "FAILED",
      expiresAt: new Date(Date.now() + 60_000),
    });
    prisma.idempotencyKey.upsert.mockResolvedValue({ id: "record-1" });

    await expect(
      claimListingCreation({ key: "listing-create-key-4", userId: "farmer-1", request }),
    ).resolves.toEqual({ status: "claimed", id: "record-1" });

    const responseBody = { success: true, data: { id: "listing-1" } };
    await completeListingCreation("record-1", responseBody);
    await failListingCreation("record-1");

    expect(prisma.idempotencyKey.update).toHaveBeenNthCalledWith(1, {
      where: { id: "record-1" },
      data: expect.objectContaining({
        status: "COMPLETED",
        responseCode: 201,
        responseBody,
      }),
    });
    expect(prisma.idempotencyKey.update).toHaveBeenNthCalledWith(2, {
      where: { id: "record-1" },
      data: { status: "FAILED" },
    });
  });
});
