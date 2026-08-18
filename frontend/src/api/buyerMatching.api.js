import { apiClient } from "./client.js";

export function searchMatches(filters) {
  return apiClient.get("/buyer-matching/matches", { params: filters });
}
