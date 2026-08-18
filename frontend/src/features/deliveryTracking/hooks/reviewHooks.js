import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reviewsApi from "../../../api/reviews.api.js";

export const reviewQueryKeys = {
  forOrder: (orderId) => ["reviews", "order", orderId],
};

export function useReviewForOrder(orderId, { enabled = true } = {}) {
  return useQuery({
    queryKey: reviewQueryKeys.forOrder(orderId),
    queryFn: () => reviewsApi.getReviewForOrder(orderId),
    enabled: Boolean(orderId) && enabled,
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
