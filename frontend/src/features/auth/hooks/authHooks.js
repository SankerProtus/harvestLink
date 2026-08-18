import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as authApi from "../../../api/auth.api.js";
import { useAuth } from "../../../context/AuthContext.jsx";

// Query keys
export const authQueryKeys = {
  profile: ["auth", "profile"],
  sessions: ["auth", "sessions"],
};

// OTP flow hooks
export function useRequestOtp() {
  return useMutation({
    mutationFn: authApi.requestOtp,
  });
}

export function useVerifyOtp() {
  const { verifyOtp } = useAuth();
  return useMutation({
    mutationFn: verifyOtp,
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: authApi.resendOtp,
  });
}

// Registration / Login
export function useRegister() {
  const { register } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
}

export function useLogin() {
  const { login } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
}

// Google Sign-In
export function useGoogleSignIn() {
  const { establishSession } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ idToken, role, device }) => {
      const result = await authApi.googleSignIn({ idToken, role, device });
      await establishSession({
        user: result.user,
        accessToken: result.accessToken.accessToken,
        refreshToken: result.refreshToken.refreshToken,
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
}

// Logout — delegates entirely to AuthContext.
export function useLogout() {
  const { logout } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

// Profile
export function useProfile() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authQueryKeys.profile,
    queryFn: authApi.getProfile,
    enabled: isAuthenticated,
  });
}

// Sessions — list + revoke.
export function useSessions() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: authQueryKeys.sessions,
    queryFn: authApi.listSessions,
    enabled: isAuthenticated,
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.revokeSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.sessions });
    },
  });
}

// Google account linking
export function useLinkGoogleAccount() {
  return useMutation({
    mutationFn: authApi.linkGoogleAccount,
  });
}

// Change phone number
export function useChangePhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.changePhoneNumber,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
    },
  });
}

export function useUploadProfilePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.uploadProfilePhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authQueryKeys.profile });
      queryClient.invalidateQueries({ queryKey: ["marketplace"] });
      queryClient.invalidateQueries({ queryKey: ["deliveryTracking"] });
      queryClient.invalidateQueries({ queryKey: ["buyerMatching"] });
    },
  });
}