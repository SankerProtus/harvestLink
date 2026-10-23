import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { env } from "../config/env.js";
import { isRefreshTokenReuseError } from "../../src/lib/errorMap.js";

const REFRESH_TOKEN_STORAGE_KEY = "harvestlink_refresh_token";

let accessToken = null;
let refreshTokenValue = null;

export async function setTokens({
  accessToken: newAccessToken,
  refreshToken: newRefreshToken,
}) {
  accessToken = newAccessToken ?? accessToken;
  if (newRefreshToken) {
    refreshTokenValue = newRefreshToken;
    await SecureStore.setItemAsync(REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);
  }
}

export async function clearTokens() {
  accessToken = null;
  refreshTokenValue = null;
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_STORAGE_KEY);
}

export async function loadPersistedRefreshToken() {
  const stored = await SecureStore.getItemAsync(REFRESH_TOKEN_STORAGE_KEY);
  refreshTokenValue = stored ?? null;
  return refreshTokenValue;
}

export function getAccessToken() {
  return accessToken;
}

function getRefreshTokenValue() {
  return refreshTokenValue;
}

// Auth-failure subscription
const authFailureListeners = new Set();

export function onAuthFailure(listener) {
  authFailureListeners.add(listener);
  return () => authFailureListeners.delete(listener);
}

function notifyAuthFailure(error) {
  authFailureListeners.forEach((listener) => listener(error));
}

// Error normalization
function normalizeError(error) {
  const backendError = error?.response?.data?.error;
  if (backendError) {
    return {
      code: backendError.code,
      message: backendError.message,
      details: backendError.details ?? null,
      status: error.response.status,
    };
  }

  if (error?.request && !error?.response) {
    // Request was made, no response received — genuinely offline or
    // the server is unreachable, distinct from a server-side error.
    return {
      code: "NETWORK_ERROR",
      message: "Network request failed",
      details: null,
      status: null,
    };
  }

  return {
    code: "INTERNAL_SERVER_ERROR",
    message: error?.message ?? "An unexpected error occurred",
    details: null,
    status: error?.response?.status ?? null,
  };
}

const refreshClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 60000,
});

// Main API client
export const apiClient = axios.create({
  baseURL: env.API_BASE_URL,
  timeout: 60000,
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use((response) => {
  const payload = response.data;
  if (payload && typeof payload === "object" && "data" in payload) {
    return payload.data;
  }
  // 204 No Content (e.g. revokeSession) has no body to unwrap.
  return payload;
});

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(callback) {
  refreshSubscribers.push(callback);
}

function onTokenRefreshed(newAccessToken) {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
}

apiClient.interceptors.response.use(undefined, async (error) => {
  const originalRequest = error.config;
  const status = error?.response?.status;

  const isAuthEndpoint = originalRequest?.url?.includes("/auth/refresh");

  if (status === 401 && !originalRequest._retry && !isAuthEndpoint) {
    if (isRefreshing) {
      // Another request already triggered a refresh — wait for it.
      return new Promise((resolve, reject) => {
        subscribeTokenRefresh((newAccessToken) => {
          if (!newAccessToken) {
            reject(normalizeError(error));
            return;
          }
          originalRequest._retry = true;
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const currentRefreshToken = getRefreshTokenValue();
      if (!currentRefreshToken) {
        throw new Error("No refresh token available");
      }

      const refreshResult = await refreshClient.post("/auth/refresh", {
        refreshToken: currentRefreshToken,
      });
      // Bare client has no envelope-unwrapping interceptor, so unwrap manually here.
      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        refreshResult.data.data;

      await setTokens({
        accessToken: newAccessToken.accessToken,
        refreshToken: newRefreshToken.refreshToken,
      });

      isRefreshing = false;
      onTokenRefreshed(newAccessToken.accessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken.accessToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      isRefreshing = false;
      onTokenRefreshed(null); // wake up any waiting requests with failure
      await clearTokens();

      const normalized = normalizeError(refreshError);
      notifyAuthFailure(
        isRefreshTokenReuseError(normalized)
          ? { ...normalized, isSecurityLogout: true }
          : normalized,
      );
      return Promise.reject(normalized);
    }
  }

  return Promise.reject(normalizeError(error));
});