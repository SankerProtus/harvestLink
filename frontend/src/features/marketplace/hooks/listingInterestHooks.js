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
    onSuccess: () => {
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
    onSuccess: () => {
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
