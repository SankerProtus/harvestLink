import {
  parseOrThrow,
  createListingSchema,
  updateListingSchema,
  listingIdParamSchema,
  updateListingQuantitySchema,
  changeListingStatusSchema,
  listingSearchSchema,
} from "./marketplace.validators.js";

import {
  createListing as createListingService,
  updateListing as updateListingService,
  updateListingQuantity as updateListingQuantityService,
  changeListingStatus as changeListingStatusService,
  getListing as getListingService,
  getFarmerListings as getFarmerListingsService,
  searchListings as searchListingsService,
  listCrops as listCropsService,
  uploadListingPhoto as uploadListingPhotoService,
} from "./marketplace.service.js";

import { BadRequestError } from "../../errors/commonErrors.js";

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

export async function createListing(req, res, next) {
  try {
    const input = parseOrThrow(createListingSchema, req.body);
    const result = await createListingService({
      ...input,
      farmerId: req.user.id,
    });
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}

export async function uploadListingPhoto(req, res, next) {
  try {
    if (!req.file) {
      throw new BadRequestError("No photo file was provided");
    }
    const result = await uploadListingPhotoService({
      fileBuffer: req.file.buffer,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function updateListing(req, res, next) {
  try {
    const params = parseOrThrow(listingIdParamSchema, req.params);
    const updates = parseOrThrow(updateListingSchema, req.body);
    const result = await updateListingService({
      listingId: params.listingId,
      userId: req.user.id,
      updates,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function updateListingQuantity(req, res, next) {
  try {
    const params = parseOrThrow(listingIdParamSchema, req.params);
    const input = parseOrThrow(updateListingQuantitySchema, req.body);
    const result = await updateListingQuantityService({
      listingId: params.listingId,
      userId: req.user.id,
      quantity: input.quantity,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function changeListingStatus(req, res, next) {
  try {
    const params = parseOrThrow(listingIdParamSchema, req.params);
    const input = parseOrThrow(changeListingStatusSchema, req.body);
    const result = await changeListingStatusService({
      listingId: params.listingId,
      userId: req.user.id,
      newStatus: input.status,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getListing(req, res, next) {
  try {
    const params = parseOrThrow(listingIdParamSchema, req.params);
    const result = await getListingService({ listingId: params.listingId });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getFarmerListings(req, res, next) {
  try {
    const result = await getFarmerListingsService({ farmerId: req.user.id });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function searchListings(req, res, next) {
  try {
    const filters = parseOrThrow(listingSearchSchema, req.query);
    const result = await searchListingsService(filters);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listCrops(req, res, next) {
  try {
    const search =
      typeof req.query.search === "string" ? req.query.search : undefined;
    const result = await listCropsService({ search });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}