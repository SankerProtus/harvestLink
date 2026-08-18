import { useQuery } from "@tanstack/react-query";
import * as buyerMatchingApi from "../../../api/buyerMatching.api.js";

export const buyerMatchingQueryKeys = {
  all: ["buyerMatching"],
  matches: (filters) => ["buyerMatching", "matches", filters],
};

export function useSearchMatches(filters) {
  return useQuery({
    queryKey: buyerMatchingQueryKeys.matches(filters),
    queryFn: () => buyerMatchingApi.searchMatches(filters),
  });
}
