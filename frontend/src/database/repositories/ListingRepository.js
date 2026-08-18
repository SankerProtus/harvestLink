import { Q } from "@nozbe/watermelondb";
import database from "../index.js";

const listingsCollection = database.collections.get("listings");


function toDTO(record) {
  let images = [];
  try {
    images = JSON.parse(record.imagesJson || "[]");
  } catch {
    images = [];
  }

  return {
    localId: record.id,
    remoteId: record.remoteId,
    farmerId: record.farmerId,
    title: record.title,
    description: record.description,
    cropType: record.cropType,
    quantity: record.quantity,
    quantityUnit: record.quantityUnit,
    pricePerUnit: record.pricePerUnit,
    location: record.location,
    images,
    status: record.status,
    syncStatus: record.syncStatus,
    createdAt: record.remoteCreatedAt ?? null,
    updatedAt: record.remoteUpdatedAt ?? null,
  };
}

export async function createListing(listing) {
  const record = await database.write(async () => {
    return listingsCollection.create((record) => {
      record.remoteId = listing.remoteId ?? null;
      record.farmerId = listing.farmerId;
      record.title = listing.title;
      record.description = listing.description ?? null;
      record.cropType = listing.cropType;
      record.quantity = listing.quantity;
      record.quantityUnit = listing.quantityUnit;
      record.pricePerUnit = listing.pricePerUnit;
      record.location = listing.location;
      record.imagesJson = JSON.stringify(listing.images ?? []);
      record.status = listing.status;
      record.syncStatus = listing.syncStatus ?? "pending";
      record.remoteCreatedAt = listing.createdAt ?? null;
      record.remoteUpdatedAt = listing.updatedAt ?? null;
    });
  });

  return toDTO(record);
}

export async function updateListing(localId, updates) {
  const record = await listingsCollection.find(localId);

  const updatedRecord = await database.write(async () => {
    return record.update((record) => {
      if (updates.remoteId !== undefined) record.remoteId = updates.remoteId;
      if (updates.title !== undefined) record.title = updates.title;
      if (updates.description !== undefined)
        record.description = updates.description;
      if (updates.cropType !== undefined) record.cropType = updates.cropType;
      if (updates.quantity !== undefined) record.quantity = updates.quantity;
      if (updates.quantityUnit !== undefined)
        record.quantityUnit = updates.quantityUnit;
      if (updates.pricePerUnit !== undefined)
        record.pricePerUnit = updates.pricePerUnit;
      if (updates.location !== undefined) record.location = updates.location;
      if (updates.images !== undefined)
        record.imagesJson = JSON.stringify(updates.images);
      if (updates.status !== undefined) record.status = updates.status;
      if (updates.syncStatus !== undefined)
        record.syncStatus = updates.syncStatus;
      if (updates.createdAt !== undefined)
        record.remoteCreatedAt = updates.createdAt;
      if (updates.updatedAt !== undefined)
        record.remoteUpdatedAt = updates.updatedAt;
    });
  });

  return toDTO(updatedRecord);
}

export async function getListingByLocalId(localId) {
  try {
    const record = await listingsCollection.find(localId);
    return toDTO(record);
  } catch {
    return null;
  }
}

export async function getListingByRemoteId(remoteId) {
  const results = await listingsCollection
    .query(Q.where("remote_id", remoteId))
    .fetch();
  return results.length > 0 ? toDTO(results[0]) : null;
}

export async function getAllListings() {
  const records = await listingsCollection.query().fetch();
  return records.map(toDTO);
}

export async function getPendingListings() {
  const records = await listingsCollection
    .query(Q.where("sync_status", "pending"))
    .fetch();
  return records.map(toDTO);
}

export async function deleteListing(localId) {
  const record = await listingsCollection.find(localId);
  await database.write(async () => {
    await record.destroyPermanently();
  });
}
