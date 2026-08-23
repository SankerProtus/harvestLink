import {
  updateListing as updateLocalListing,
  getListingByLocalId,
} from "../repositories/ListingRepository.js";

import {
  getPendingOperations,
  incrementRetry,
  markCompleted,
} from "./SyncQueue.js";

import { resolve as resolveConflict } from "./ConflictResolver.js";

import {
  createListing as createRemoteListing,
  updateListing as updateRemoteListing,
  updateListingQuantity as updateRemoteListingQuantity,
  changeListingStatus as changeRemoteListingStatus,
  getListing as getRemoteListing,
} from "../../api/marketplace.api.js";

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
  "quantity",
  "quantityUnit",
  "pricePerUnit",
  "location",
  "images",
];

function extractEditableFields(listing) {
  const result = {};
  for (const field of EDITABLE_LISTING_FIELDS) {
    if (listing[field] !== undefined) result[field] = listing[field];
  }
  return result;
}

async function handleCreateListing(operation) {
  // No conflict possible: this listing has never existed remotely.
  const remoteListing = await createRemoteListing(operation.payload);

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

  const remoteListing = await getRemoteListing(localListing.remoteId);

  const merged = resolveConflict(localListing, remoteListing);

  const updatedRemoteListing = await updateRemoteListing(
    localListing.remoteId,
    extractEditableFields(merged),
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
    await incrementRetry(
      operation.localId,
      err?.message ?? "Unknown sync error",
    );
  }
}

export async function syncPendingOperations() {
  const pending = await getPendingOperations();

  for (const operation of pending) {
    await syncOperation(operation);
  }
}