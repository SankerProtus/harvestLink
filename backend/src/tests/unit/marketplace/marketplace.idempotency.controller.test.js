import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { mockRequest, mockResponse, mockNext } from "../../helpers/expressMocks.js";

jest.unstable_mockModule(
  "../../../modules/marketplace/marketplace.service.js",
  () => ({
    createListing: jest.fn(),
    updateListing: jest.fn(),
    updateListingQuantity: jest.fn(),
    changeListingStatus: jest.fn(),
    getListing: jest.fn(),
    getFarmerListings: jest.fn(),
    searchListings: jest.fn(),
    listCrops: jest.fn(),
    uploadListingPhoto: jest.fn(),
  }),
);

jest.unstable_mockModule(
  "../../../modules/marketplace/idempotency.repository.js",
  () => ({
    claimListingCreation: jest.fn(),
    completeListingCreation: jest.fn(),
    failListingCreation: jest.fn(),
  }),
);

const service =
  await import("../../../modules/marketplace/marketplace.service.js");
const repository =
  await import("../../../modules/marketplace/idempotency.repository.js");
const controller =
  await import("../../../modules/marketplace/marketplace.controller.js");

const requestBody = {
  title: "Fresh Tomatoes",
  cropType: "TOMATO",
  quantity: 10,
  quantityUnit: "CRATE",
  pricePerUnit: 120,
  location: "Techiman",
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("createListing idempotency", () => {
  test("replays a completed response without calling the service", async () => {
    const responseBody = { success: true, data: { id: "listing-1" } };
    repository.claimListingCreation.mockResolvedValue({
      status: "completed",
      responseCode: 201,
      responseBody,
    });
    const req = mockRequest({
      body: requestBody,
      user: { id: "farmer-1" },
      headers: { "Idempotency-Key": "listing-create-key-1" },
    });
    const res = mockResponse();

    await controller.createListing(req, res, mockNext());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(responseBody);
    expect(service.createListing).not.toHaveBeenCalled();
    expect(repository.completeListingCreation).not.toHaveBeenCalled();
  });

  test("forwards a conflict without creating a listing", async () => {
    repository.claimListingCreation.mockResolvedValue({ status: "conflict" });
    const req = mockRequest({
      body: requestBody,
      user: { id: "farmer-1" },
      headers: { "Idempotency-Key": "listing-create-key-2" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.createListing(req, res, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      message: "Idempotency key was used with different request data",
    }));
    expect(service.createListing).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });
});
