import { apiClient } from "./client.js";


export function searchListings(filters) {
  return apiClient.get("/marketplace/listings", { params: filters });
}

export function getListing(listingId) {
  return apiClient.get(`/marketplace/listings/${listingId}`);
}

export function getMyListings() {
  return apiClient.get("/marketplace/listings/mine");
}

export function createListing(payload) {
  return apiClient.post("/marketplace/listings", payload);
}

export function updateListing(listingId, updates) {
  return apiClient.patch(`/marketplace/listings/${listingId}`, updates);
}

export function updateListingQuantity(listingId, quantity) {
  return apiClient.patch(`/marketplace/listings/${listingId}/quantity`, {
    quantity,
  });
}

export function changeListingStatus(listingId, status) {
  return apiClient.patch(`/marketplace/listings/${listingId}/status`, {
    status,
  });
}

export function uploadListingPhoto(imageUri) {
  const formData = new FormData();
  formData.append("photo", {
    uri: imageUri,
    name: `listing-photo-${Date.now()}.jpg`,
    type: "image/jpeg",
  });

  return apiClient.post("/marketplace/listings/photos", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}