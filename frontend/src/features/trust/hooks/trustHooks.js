import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as trustApi from "../../../api/trust.api.js";

export const trustQueryKeys = {
  myDisputes: ["trust", "disputes"],
  orderContext: (orderId) => ["trust", "orderContext", orderId],
};

export function useOrderTrustContext(orderId) {
  return useQuery({
    queryKey: trustQueryKeys.orderContext(orderId),
    queryFn: () => trustApi.getOrderTrustContext(orderId),
    enabled: Boolean(orderId),
  });
}

export function useMyDisputes() {
  return useQuery({
    queryKey: trustQueryKeys.myDisputes,
    queryFn: () => trustApi.listMyDisputes(),
  });
}

export function useUploadDisputeEvidence() {
  return useMutation({
    mutationFn: (imageUri) => trustApi.uploadDisputeEvidence(imageUri),
  });
}

export function useOpenDispute() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, ...payload }) =>
      trustApi.openDispute(orderId, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: trustQueryKeys.orderContext(variables.orderId),
      });
      queryClient.invalidateQueries({ queryKey: trustQueryKeys.myDisputes });
    },
  });
}

export function useRequestCancellation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, reason }) =>
      trustApi.requestCancellation(orderId, reason),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: trustQueryKeys.orderContext(variables.orderId),
      });
    },
  });
}

export function useDecideCancellation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, requestId, decision }) =>
      trustApi.decideCancellation(orderId, requestId, decision),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: trustQueryKeys.orderContext(variables.orderId),
      });
    },
  });
}

export function useGenerateHandoverCode() {
  return useMutation({
    mutationFn: (orderId) => trustApi.generateHandoverCode(orderId),
  });
}

export function useVerifyHandoverCode() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, code }) =>
      trustApi.verifyHandoverCode(orderId, code),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["delivery", "order", variables.orderId] });
    },
  });
}

export function useSubmitVerificationRequest() {
  return useMutation({
    mutationFn: (payload) => trustApi.submitVerificationRequest(payload),
  });
}
