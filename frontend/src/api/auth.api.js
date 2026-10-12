import { apiClient } from "./client.js";

export function requestOtp({ phone, purpose }) {
  return apiClient.post("/auth/otp/request", { phone, purpose });
}

export function verifyOtp({ phone, code, purpose }) {
  return apiClient.post("/auth/otp/verify", { phone, code, purpose });
}

export function resendOtp({ phone, purpose }) {
  return apiClient.post("/auth/otp/resend", { phone, purpose });
}

export function register({
  phone,
  fullName,
  role,
  otpVerificationToken,
  device,
}) {
  return apiClient.post("/auth/register", {
    phone,
    fullName,
    role,
    otpVerificationToken,
    device,
  });
}

export function login({ phone, otpVerificationToken, device }) {
  return apiClient.post("/auth/login", { phone, otpVerificationToken, device });
}

export function refreshSession({ refreshToken }) {
  return apiClient.post("/auth/refresh", { refreshToken });
}

export function logout({ refreshToken, allDevices }) {
  return apiClient.post("/auth/logout", { refreshToken, allDevices });
}

export function listSessions() {
  return apiClient.get("/auth/sessions");
}

export function revokeSession(sessionId) {
  return apiClient.delete(`/auth/sessions/${sessionId}`);
}

export function googleSignIn({ idToken, role, device }) {
  return apiClient.post("/auth/google/signin", { idToken, role, device });
}

export function linkGoogleAccount({ idToken }) {
  return apiClient.post("/auth/google/link", { idToken });
}

export function changePhoneNumber({ newPhone, otpVerificationToken }) {
  return apiClient.patch("/auth/phone", { newPhone, otpVerificationToken });
}

export function getProfile() {
  return apiClient.get("/auth/profile");
}

export function uploadProfilePhoto(imageUri) {
  const formData = new FormData();
  formData.append("photo", {
    uri: imageUri,
    name: "profile-photo.jpg",
    type: "image/jpeg",
  });

  return apiClient.patch("/auth/profile/photo", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function deleteAccount() {
  return apiClient.delete("/auth/account", { data: { confirm: "DELETE" } });
}
