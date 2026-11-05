import {
  updateListing as updateLocalListing,
  getListingByLocalId,
} from "../repositories/ListingRepository.js";

import {
  getPendingOperations,
  incrementRetry,
  markCompleted,
  markFailed,
} from "./SyncQueue.js";

import {
  createListing as createRemoteListing,
  updateListing as updateRemoteListing,
  updateListingQuantity as updateRemoteListingQuantity,
  changeListingStatus as changeRemoteListingStatus,
  uploadListingPhoto,
} from "../../api/marketplace.api.js";
import { normalizeListingImageUrls } from "../../../src/features/marketplace/lib/normalizeListingImageUrls.js";

export const OPERATION_TYPES = Object.freeze({
  CREATE_LISTING: "CREATE_LISTING",
  UPDATE_LISTING: "UPDATE_LISTING",
  UPDATE_LISTING_QUANTITY: "UPDATE_LISTING_QUANTITY",
  CHANGE_LISTING_STATUS: "CHANGE_LISTING_STATUS",
});

const EDITABLE_LISTING_FIELDS = [
  "title",
  "description",
  "cropType",
  "quantityUnit",
  "pricePerUnit",
  "location",
  "images",
];

const MAX_SYNC_RETRIES = 5;

function extractEditableFields(updates) {
  const result = {};
  for (const field of EDITABLE_LISTING_FIELDS) {
    if (updates[field] !== undefined && updates[field] !== null) {
      result[field] = updates[field];
    }
  }
  return result;
}

async function handleCreateListing(operation) {
  // No conflict possible: this listing has never existed remotely.
  const normalizedPayload = {
    ...operation.payload,
    images: await normalizeListingImageUrls(
      operation.payload.images,
      uploadListingPhoto,
    ),
  };

  const remoteListing = await createRemoteListing(normalizedPayload);

  await updateLocalListing(operation.entityLocalId, {
    remoteId: remoteListing.id,
    status: remoteListing.status,
    syncStatus: "synced",
    createdAt: remoteListing.createdAt,
    updatedAt: remoteListing.updatedAt,
  });
}

async function handleUpdateListing(operation) {
  const localListing = await getListingByLocalId(operation.entityLocalId);
  if (!localListing || !localListing.remoteId) {
    throw new Error("Cannot sync an update for a listing with no remoteId");
  }

  const editableFields = extractEditableFields(operation.payload);
  const normalizedEditableFields = {
    ...editableFields,
    images: editableFields.images
      ? await normalizeListingImageUrls(editableFields.images, uploadListingPhoto)
      : editableFields.images,
  };

  const updatedRemoteListing = await updateRemoteListing(
    localListing.remoteId,
    normalizedEditableFields,
  );

  await updateLocalListing(operation.entityLocalId, {
    status: updatedRemoteListing.status,
    syncStatus: "synced",
    updatedAt: updatedRemoteListing.updatedAt,
  });
}

async function handleUpdateListingQuantity(operation) {
  const localListing = await getListingByLocalId(operation.entityLocalId);
  if (!localListing || !localListing.remoteId) {
    throw new Error(
      "Cannot sync a quantity update for a listing with no remoteId",
    );
  }

  const updatedRemoteListing = await updateRemoteListingQuantity(
    localListing.remoteId,
    operation.payload.quantity,
  );

  await updateLocalListing(operation.entityLocalId, {
    quantity: updatedRemoteListing.quantity,
    status: updatedRemoteListing.status,
    syncStatus: "synced",
    updatedAt: updatedRemoteListing.updatedAt,
  });
}

async function handleChangeListingStatus(operation) {
  const localListing = await getListingByLocalId(operation.entityLocalId);
  if (!localListing || !localListing.remoteId) {
    throw new Error(
      "Cannot sync a status change for a listing with no remoteId",
    );
  }

  const updatedRemoteListing = await changeRemoteListingStatus(
    localListing.remoteId,
    operation.payload.status,
  );

  await updateLocalListing(operation.entityLocalId, {
    status: updatedRemoteListing.status,
    syncStatus: "synced",
    updatedAt: updatedRemoteListing.updatedAt,
  });
}

export async function syncOperation(operation) {
  try {
    switch (operation.operationType) {
      case OPERATION_TYPES.CREATE_LISTING:
        await handleCreateListing(operation);
        break;
      case OPERATION_TYPES.UPDATE_LISTING:
        await handleUpdateListing(operation);
        break;
      case OPERATION_TYPES.UPDATE_LISTING_QUANTITY:
        await handleUpdateListingQuantity(operation);
        break;
      case OPERATION_TYPES.CHANGE_LISTING_STATUS:
        await handleChangeListingStatus(operation);
        break;
      default:
        throw new Error(
          `Unrecognized operation type: ${operation.operationType}`,
        );
    }

    await markCompleted(operation.localId);
  } catch (err) {
    const errorMessage = err?.message ?? "Unknown sync error";
    const status = err?.status ?? err?.response?.status;
    const retryCount = operation.retryCount ?? 0;
    const isPermanent = status >= 400 && status < 500 && status !== 408 && status !== 429;

    if (isPermanent || retryCount + 1 >= MAX_SYNC_RETRIES) {
      await markFailed(operation.localId, errorMessage);
    } else {
      await incrementRetry(operation.localId, errorMessage);
    }
  }
}

export async function syncPendingOperations() {
  const pending = await getPendingOperations();

  for (const operation of pending) {
    await syncOperation(operation);
  }
}