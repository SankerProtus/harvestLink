import { Q } from "@nozbe/watermelondb";
import database from "../index.js";

const queueCollection = database.collections.get("pending_sync_operations");

function toDTO(record) {
  let payload = {};
  try {
    payload = JSON.parse(record.payloadJson || "{}");
  } catch {
    payload = {};
  }

  return {
    localId: record.id,
    operationType: record.operationType,
    entityType: record.entityType,
    entityLocalId: record.entityLocalId,
    payload,
    syncStatus: record.syncStatus,
    retryCount: record.retryCount,
    lastError: record.lastError,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
  };
}

export async function enqueue(operation) {
  const record = await database.write(async () => {
    return queueCollection.create((record) => {
      record.operationType = operation.operationType;
      record.entityType = operation.entityType;
      record.entityLocalId = operation.entityLocalId;
      record.payloadJson = JSON.stringify(operation.payload ?? {});
      record.syncStatus = "pending";
      record.retryCount = 0;
      record.lastError = null;
    });
  });

  return toDTO(record);
}

export async function dequeue(localOperationId) {
  const record = await queueCollection.find(localOperationId);
  await database.write(async () => {
    await record.destroyPermanently();
  });
}

export async function getPendingOperations() {
  const records = await queueCollection
    .query(Q.where("sync_status", "pending"))
    .fetch();
  return records.map(toDTO);
}

export async function getOperationsByStatus(syncStatus) {
  const records = await queueCollection
    .query(Q.where("sync_status", syncStatus))
    .fetch();
  return records.map(toDTO);
}

export async function incrementRetry(localOperationId, errorMessage) {
  const record = await queueCollection.find(localOperationId);

  const updatedRecord = await database.write(async () => {
    return record.update((record) => {
      record.retryCount = record.retryCount + 1;
      record.lastError = errorMessage ?? null;
    });
  });

  return toDTO(updatedRecord);
}

export async function markCompleted(localOperationId) {
  const record = await queueCollection.find(localOperationId);

  const updatedRecord = await database.write(async () => {
    return record.update((record) => {
      record.syncStatus = "completed";
      record.lastError = null;
    });
  });

  return toDTO(updatedRecord);
}

export async function markFailed(localOperationId, errorMessage) {
  const record = await queueCollection.find(localOperationId);

  const updatedRecord = await database.write(async () => {
    return record.update((record) => {
      record.syncStatus = "failed";
      record.lastError = errorMessage ?? null;
    });
  });

  return toDTO(updatedRecord);
}

export async function clearCompleted() {
  const records = await queueCollection
    .query(Q.where("sync_status", "completed"))
    .fetch();

  await database.write(async () => {
    await Promise.all(records.map((record) => record.destroyPermanently()));
  });
}
