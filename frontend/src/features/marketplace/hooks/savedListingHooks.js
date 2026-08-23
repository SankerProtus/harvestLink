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

// Toggling the heart previously waited on the network twice before the
// icon changed at all: once for the save/unsave request itself, then
// again for the invalidateQueries()-triggered refetch of the saved-ids
// list, since that refetch was the only thing that ever updated the
// cache. On a slow connection that's a very noticeable delay for what
// should feel instant. These now update the cached id list immediately
// in onMutate (optimistic update — the standard pattern for a like/heart
// button), roll back on failure, and only reconcile with the server
// quietly in the background via onSettled.
export function useSaveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => savedListingsApi.saveListing(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: savedListingQueryKeys.mine });
      const previous = queryClient.getQueryData(savedListingQueryKeys.mine);

      queryClient.setQueryData(savedListingQueryKeys.mine, (current) => {
        const ids = new Set(current?.listingIds ?? []);
        ids.add(listingId);
        return { ...current, listingIds: Array.from(ids) };
      });

      return { previous };
    },
    onError: (_error, _listingId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(savedListingQueryKeys.mine, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedListingQueryKeys.mine });
    },
  });
}

export function useUnsaveListing() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => savedListingsApi.unsaveListing(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: savedListingQueryKeys.mine });
      const previous = queryClient.getQueryData(savedListingQueryKeys.mine);

      queryClient.setQueryData(savedListingQueryKeys.mine, (current) => {
        const ids = new Set(current?.listingIds ?? []);
        ids.delete(listingId);
        return { ...current, listingIds: Array.from(ids) };
      });

      return { previous };
    },
    onError: (_error, _listingId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(savedListingQueryKeys.mine, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: savedListingQueryKeys.mine });
    },
  });
}