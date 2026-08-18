const EDITABLE_FIELDS = [
  "title",
  "description",
  "cropType",
  "quantity",
  "quantityUnit",
  "pricePerUnit",
  "location",
  "images",
];

const NON_EDITABLE_FIELDS = [
  "localId",
  "remoteId",
  "farmerId",
  "status",
  "createdAt",
  "updatedAt",
  "remoteCreatedAt",
  "remoteUpdatedAt",
  "syncStatus",
];

function isLocalNewer(localListing, remoteListing) {
  const localTime = new Date(localListing.updatedAt).getTime();
  const remoteTime = new Date(remoteListing.updatedAt).getTime();
  return localTime > remoteTime;
}

export function resolve(localListing, remoteListing) {
  if (isLocalNewer(localListing, remoteListing)) {
    const merged = { ...remoteListing };
    for (const field of EDITABLE_FIELDS) {
      merged[field] = localListing[field];
    }
    return merged;
  }

  return { ...remoteListing };
}
