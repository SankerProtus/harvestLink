import { apiClient } from "./client.js";

export function getMySavedListingIds() {
  return apiClient.get("/saved-listings/mine");
}

export function saveListing(listingId) {
  return apiClient.post(`/saved-listings/listings/${listingId}`);
}

export function unsaveListing(listingId) {
  return apiClient.delete(`/saved-listings/listings/${listingId}`);
}
