import { QueryClient } from "@tanstack/react-query";

function shouldRetry(failureCount, error) {
  const status = error?.status;
  if (typeof status === "number" && status >= 400 && status < 500) {
    return false;
  }
  return failureCount < 2;
}

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: shouldRetry,
      staleTime: 30 * 1000,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 0,
    },
  },
});
