import { apiClient } from "./client.js";

export function expressInterest(listingId) {
  return apiClient.post("/listing-interest", { listingId });
}

export function withdrawInterest(listingId) {
  return apiClient.delete(`/listing-interest/listings/${listingId}`);
}

export function getInterestForListing(listingId, params) {
  return apiClient.get(`/listing-interest/listings/${listingId}`, { params });
}

export function getInterestSummaryForFarmer() {
  return apiClient.get("/listing-interest/summary/mine");
}

export function getMyExpressedInterestListingIds() {
  return apiClient.get("/listing-interest/mine");
}
