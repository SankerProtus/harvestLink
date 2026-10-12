import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as adminApi from "../../../api/admin.api.js";

export const adminQueryKeys = {
  overview: ["admin", "overview"],
  verificationQueue: ["admin", "verificationQueue"],
  priceReviewQueue: ["admin", "priceReviewQueue"],
  disputeQueue: ["admin", "disputeQueue"],
  dispute: (id) => ["admin", "dispute", id],
  users: ["admin", "users"],
  listings: ["admin", "listings"],
  orders: ["admin", "orders"],
  payments: ["admin", "payments"],
  auditLogs: ["admin", "auditLogs"],
};

export function useAdminOverview({ enabled = true } = {}) {
  return useQuery({
    queryKey: adminQueryKeys.overview,
    queryFn: () => adminApi.getOverview(),
    refetchInterval: 60000,
    enabled,
  });
}

export function useSetUserStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, ...payload }) => adminApi.setUserStatus(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.users });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.overview });
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.auditLogs });
    },
  });
}

function useAdminList(key, queryFn) {
  return useQuery({ queryKey: key, queryFn });
}

export const useAdminUsers = () => useAdminList(adminQueryKeys.users, adminApi.getUsers);
export const useAdminListings = () => useAdminList(adminQueryKeys.listings, adminApi.getListings);
export const useAdminOrders = () => useAdminList(adminQueryKeys.orders, adminApi.getOrders);
export const useAdminPayments = () => useAdminList(adminQueryKeys.payments, adminApi.getPayments);
export const useAdminAuditLogs = () => useAdminList(adminQueryKeys.auditLogs, adminApi.getAuditLogs);

export function useVerificationQueue() {
  return useQuery({
    queryKey: adminQueryKeys.verificationQueue,
    queryFn: () => adminApi.getVerificationQueue(),
  });
}

export function useVerificationDecision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ recordId, ...payload }) =>
      adminApi.decideVerification(recordId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.verificationQueue,
      });
    },
  });
}

export function usePriceReviewQueue() {
  return useQuery({
    queryKey: adminQueryKeys.priceReviewQueue,
    queryFn: () => adminApi.getPriceReviewQueue(),
  });
}

export function useClearPriceReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (listingId) => adminApi.clearPriceReview(listingId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.priceReviewQueue,
      });
    },
  });
}

export function useDisputeQueue() {
  return useQuery({
    queryKey: adminQueryKeys.disputeQueue,
    queryFn: () => adminApi.getDisputeQueue(),
  });
}

export function useAdminDispute(disputeId) {
  return useQuery({
    queryKey: adminQueryKeys.dispute(disputeId),
    queryFn: () => adminApi.getDisputeDetail(disputeId),
    enabled: Boolean(disputeId),
  });
}

export function useStartDisputeReview() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (disputeId) => adminApi.startDisputeReview(disputeId),
    onSuccess: (_data, disputeId) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.disputeQueue });
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.dispute(disputeId),
      });
    },
  });
}

export function useResolveDispute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ disputeId, outcome, resolution }) =>
      adminApi.resolveDispute(disputeId, { outcome, resolution }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: adminQueryKeys.disputeQueue });
      queryClient.invalidateQueries({
        queryKey: adminQueryKeys.dispute(variables.disputeId),
      });
    },
  });
}
