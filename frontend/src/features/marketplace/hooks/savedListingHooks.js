import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as savedListingsApi from "../../../api/savedListings.api.js";

export const savedListingQueryKeys = {
  mine: ["savedListings", "mine"],
};

export function useSavedListingIds() {
  return useQuery({
    queryKey: savedListingQueryKeys.mine,
    queryFn: () => savedListingsApi.getMySavedListingIds(),
    select: (data) => new Set(data.listingIds ?? []),
  });
}

export function useSaveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => savedListingsApi.saveListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedListingQueryKeys.mine });
    },
  });
}

export function useUnsaveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => savedListingsApi.unsaveListing(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: savedListingQueryKeys.mine });
    },
  });
}
