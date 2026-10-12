import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as reportsApi from "../../../api/reports.api.js";

export const reportKeys = { admin: ["reports", "admin"] };

export function useReportUser() {
  return useMutation({ mutationFn: ({ userId, ...payload }) => reportsApi.reportUser(userId, payload) });
}

export function useAdminReports() {
  return useQuery({ queryKey: reportKeys.admin, queryFn: reportsApi.getAdminReports });
}

export function useReviewAdminReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ reportId, ...payload }) => reportsApi.reviewAdminReport(reportId, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: reportKeys.admin }),
  });
}
