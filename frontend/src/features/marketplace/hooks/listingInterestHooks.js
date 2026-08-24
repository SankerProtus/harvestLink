import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as listingInterestApi from "../../../api/listingInterest.api.js";

export const listingInterestQueryKeys = {
  forListing: (listingId) => ["listingInterest", "listing", listingId],
  summaryMine: ["listingInterest", "summary", "mine"],
  mine: ["listingInterest", "mine"],
};

export function useExpressedInterestIds() {
  return useQuery({
    queryKey: listingInterestQueryKeys.mine,
    queryFn: () => listingInterestApi.getMyExpressedInterestListingIds(),
    select: (data) => new Set(data.listingIds ?? []),
  });
}

export function useExpressInterest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => listingInterestApi.expressInterest(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: listingInterestQueryKeys.mine });
      const previous = queryClient.getQueryData(listingInterestQueryKeys.mine);

      queryClient.setQueryData(listingInterestQueryKeys.mine, (current) => {
        const ids = new Set(current?.listingIds ?? []);
        ids.add(listingId);
        return { ...current, listingIds: Array.from(ids) };
      });

      return { previous };
    },
    onError: (_error, _listingId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listingInterestQueryKeys.mine, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: listingInterestQueryKeys.mine,
      });
      queryClient.invalidateQueries({
        queryKey: listingInterestQueryKeys.summaryMine,
      });
    },
  });
}

export function useWithdrawInterest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => listingInterestApi.withdrawInterest(listingId),
    onMutate: async (listingId) => {
      await queryClient.cancelQueries({ queryKey: listingInterestQueryKeys.mine });
      const previous = queryClient.getQueryData(listingInterestQueryKeys.mine);

      queryClient.setQueryData(listingInterestQueryKeys.mine, (current) => {
        const ids = new Set(current?.listingIds ?? []);
        ids.delete(listingId);
        return { ...current, listingIds: Array.from(ids) };
      });

      return { previous };
    },
    onError: (_error, _listingId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(listingInterestQueryKeys.mine, context.previous);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: listingInterestQueryKeys.mine,
      });
      queryClient.invalidateQueries({
        queryKey: listingInterestQueryKeys.summaryMine,
      });
    },
  });
}

export function useInterestSummaryForFarmer() {
  return useQuery({
    queryKey: listingInterestQueryKeys.summaryMine,
    queryFn: () => listingInterestApi.getInterestSummaryForFarmer(),
  });
}

export function useInterestForListing(listingId, params) {
  return useQuery({
    queryKey: [...listingInterestQueryKeys.forListing(listingId), params],
    queryFn: () => listingInterestApi.getInterestForListing(listingId, params),
    enabled: Boolean(listingId),
  });
}