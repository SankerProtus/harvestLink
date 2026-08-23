import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsApi from "../../../api/reviews.api.js";

export const reviewQueryKeys = {
  forOrder: (orderId) => ["reviews", "order", orderId],
  forFarmer: (farmerId) => ["reviews", "farmer", farmerId],
  forListing: (listingId) => ["reviews", "listing", listingId],
  comments: (reviewId) => ["reviews", reviewId, "comments"],
};

export function useReviewForOrder(orderId, { enabled = true } = {}) {
  return useQuery({
    queryKey: reviewQueryKeys.forOrder(orderId),
    queryFn: () => reviewsApi.getReviewForOrder(orderId),
    enabled: Boolean(orderId) && enabled,
  });
}

export function useFarmerReviews(farmerId, { page = 1, limit = 20 } = {}) {
  return useQuery({
    queryKey: [...reviewQueryKeys.forFarmer(farmerId), page, limit],
    queryFn: () => reviewsApi.getFarmerReviews({ farmerId, page, limit }),
    enabled: Boolean(farmerId),
  });
}

export function useListingReviews(listingId, { page = 1, limit = 5 } = {}) {
  return useQuery({
    queryKey: [...reviewQueryKeys.forListing(listingId), page, limit],
    queryFn: () => reviewsApi.getListingReviews({ listingId, page, limit }),
    enabled: Boolean(listingId),
  });
}

export function useReviewComments(reviewId, { enabled = true } = {}) {
  return useQuery({
    queryKey: reviewQueryKeys.comments(reviewId),
    queryFn: () => reviewsApi.getReviewComments(reviewId),
    enabled: Boolean(reviewId) && enabled,
  });
}

export function useAddReviewComment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reviewId, body }) =>
      reviewsApi.createReviewComment({ reviewId, body }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.comments(variables.reviewId),
      });
    },
  });
}

export function useCreateReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, rating, comment }) =>
      reviewsApi.createReview({ orderId, rating, comment }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: reviewQueryKeys.forOrder(variables.orderId),
      });
      // A farmer's real rating/reviewCount is embedded in listing search
      // results, so refresh those once a new review lands.
      queryClient.invalidateQueries({ queryKey: ["marketplace", "listings"] });
      queryClient.invalidateQueries({ queryKey: ["buyerMatching"] });
    },
  });
}
