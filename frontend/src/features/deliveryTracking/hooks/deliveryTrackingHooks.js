import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as deliveryTrackingApi from "../../../api/deliveryTracking.api.js";

export const deliveryTrackingQueryKeys = {
  order: (orderId) => ["deliveryTracking", "order", orderId],
  buyerOrders: (filters) => ["deliveryTracking", "myOrders", "buyer", filters],
  farmerOrders: (filters) => [
    "deliveryTracking",
    "myOrders",
    "farmer",
    filters,
  ],
};

export function useOrder(orderId) {
  return useQuery({
    queryKey: deliveryTrackingQueryKeys.order(orderId),
    queryFn: () => deliveryTrackingApi.getOrder(orderId),
    enabled: Boolean(orderId),
  });
}

export function useBuyerOrders(filters) {
  return useQuery({
    queryKey: deliveryTrackingQueryKeys.buyerOrders(filters),
    queryFn: () => deliveryTrackingApi.getMyOrdersAsBuyer(filters),
  });
}

export function useFarmerOrders(filters) {
  return useQuery({
    queryKey: deliveryTrackingQueryKeys.farmerOrders(filters),
    queryFn: () => deliveryTrackingApi.getMyOrdersAsFarmer(filters),
  });
}

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deliveryTrackingApi.createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["deliveryTracking", "myOrders", "buyer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["deliveryTracking", "myOrders", "farmer"],
      });
    },
  });
}

export function useUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, status }) =>
      deliveryTrackingApi.updateOrderStatus(orderId, status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: deliveryTrackingQueryKeys.order(variables.orderId),
      });
      queryClient.invalidateQueries({
        queryKey: ["deliveryTracking", "myOrders", "buyer"],
      });
      queryClient.invalidateQueries({
        queryKey: ["deliveryTracking", "myOrders", "farmer"],
      });
    },
    onError: (error, variables) => {
      if (error?.status === 409) {
        queryClient.invalidateQueries({
          queryKey: deliveryTrackingQueryKeys.order(variables.orderId),
        });
        queryClient.invalidateQueries({
          queryKey: ["deliveryTracking", "myOrders"],
        });
      }
    },
  });
}

export function useReportLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ orderId, latitude, longitude }) =>
      deliveryTrackingApi.reportLocation(orderId, { latitude, longitude }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: deliveryTrackingQueryKeys.order(variables.orderId),
      });
    },
  });
}

export function useFarmerSummary({ enabled = true } = {}) {
  return useQuery({
    queryKey: ["deliveryTracking", "myOrders", "farmer", "summary"],
    queryFn: () => deliveryTrackingApi.getFarmerSummary(),
    enabled,
  });
}

function nextOrderPage(lastPage) {
  return lastPage.pagination.page < lastPage.pagination.totalPages
    ? lastPage.pagination.page + 1
    : undefined;
}

export function useInfiniteBuyerOrders(filters, { enabled = true } = {}) {
  return useInfiniteQuery({
    queryKey: ["deliveryTracking", "myOrders", "buyer", "infinite", filters],
    queryFn: ({ pageParam }) =>
      deliveryTrackingApi.getMyOrdersAsBuyer({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: nextOrderPage,
    enabled,
  });
}

export function useInfiniteFarmerOrders(filters, { enabled = true } = {}) {
  return useInfiniteQuery({
    queryKey: ["deliveryTracking", "myOrders", "farmer", "infinite", filters],
    queryFn: ({ pageParam }) =>
      deliveryTrackingApi.getMyOrdersAsFarmer({ ...filters, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: nextOrderPage,
    enabled,
  });
}
