import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsApi from "../../../api/reviews.api.js";
import { useAuth } from "../../../context/AuthContext.jsx";

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

// Sending a reply used to wait on a full network round trip before the
// sender's own message appeared at all — the same lag the heart/interest
// buttons had. This shows the reply immediately (optimistic), rolls back
// if the request actually fails, and reconciles with the server's
// definitive copy once it responds — without disturbing anything the
// live socket connection may have already spliced in.
export function useAddReviewComment() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ reviewId, body }) =>
      reviewsApi.createReviewComment({ reviewId, body }),
    onMutate: async ({ reviewId, body, authorRole }) => {
      await queryClient.cancelQueries({
        queryKey: reviewQueryKeys.comments(reviewId),
      });
      const previous = queryClient.getQueryData(
        reviewQueryKeys.comments(reviewId),
      );

      const optimisticComment = {
        id: `optimistic-${Date.now()}`,
        reviewId,
        authorId: user?.id,
        authorName: user?.fullName ?? "You",
        authorAvatarUrl: user?.profileImageUrl ?? null,
        authorRole,
        body,
        createdAt: new Date().toISOString(),
        _isOptimistic: true,
      };

      queryClient.setQueryData(reviewQueryKeys.comments(reviewId), (old) =>
        old ? [...old, optimisticComment] : [optimisticComment],
      );

      return { previous, reviewId };
    },
    onError: (_error, _variables, context) => {
      if (context?.previous !== undefined) {
        queryClient.setQueryData(
          reviewQueryKeys.comments(context.reviewId),
          context.previous,
        );
      }
    },
    onSuccess: (createdComment, { reviewId }) => {
      queryClient.setQueryData(reviewQueryKeys.comments(reviewId), (old) => {
        const withoutOptimistic = (old ?? []).filter(
          (comment) => !comment._isOptimistic,
        );
        if (withoutOptimistic.some((comment) => comment.id === createdComment.id)) {
          return withoutOptimistic;
        }
        return [...withoutOptimistic, createdComment];
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