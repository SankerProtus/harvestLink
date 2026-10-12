import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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

export function useInfiniteSavedListings() {
  return useInfiniteQuery({
    queryKey: [...savedListingQueryKeys.mine, "list"],
    queryFn: ({ pageParam }) =>
      savedListingsApi.getMySavedListings({ page: pageParam, limit: 20 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.page < lastPage.pagination.totalPages
        ? lastPage.pagination.page + 1
        : undefined,
  });
}
