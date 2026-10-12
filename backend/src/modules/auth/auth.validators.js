import { z } from "zod";
import { ValidationError } from "../../errors/commonErrors.js";
import {
  USER_ROLES,
  PHONE_CONFIG,
  OTP_CONFIG,
  OTP_PURPOSES,
} from "./auth.constants.js";

const DEVICE_PLATFORMS = ["ANDROID", "IOS", "WEB"];

// Normalization Helpers
function normalizePhone(value) {
  if (typeof value !== "string") return value;
  let v = value.trim().replace(/[\s-]/g, "");
  if (v.startsWith("0") && v.length === 10) {
    v = `${PHONE_CONFIG.SUPPORTED_COUNTRY_CODE}${v.slice(1)}`;
  }
  return v;
}

//  Reusable Field Schemas

const phoneSchema = z.preprocess(
  normalizePhone,
  z
    .string()
    .regex(
      PHONE_CONFIG.E164_REGEX,
      "Phone number must be a valid Ghanaian number (e.g. +233241234567)",
    ),
);

const otpCodeSchema = z
  .string()
  .trim()
  .length(
    OTP_CONFIG.CODE_LENGTH,
    `OTP must be exactly ${OTP_CONFIG.CODE_LENGTH} digits`,
  )
  .regex(/^\d+$/, "OTP must contain only digits");

// Public self-registration only allows FARMER or BUYER; ADMIN is provisioned internally.
const roleSchema = z.enum([USER_ROLES.FARMER, USER_ROLES.BUYER]);

const otpPurposeSchema = z.enum([
  OTP_PURPOSES.REGISTRATION,
  OTP_PURPOSES.LOGIN,
  OTP_PURPOSES.CHANGE_PHONE,
]);

const verificationTokenSchema = z
  .string()
  .uuid("Invalid or malformed verification token");

export const sessionIdParamSchema = z
  .object({
    sessionId: z.string().uuid("Invalid session ID"),
  })
  .strict();

const opaqueTokenSchema = (label) =>
  z.string().trim().min(20, `${label} appears malformed`);

export const deviceInfoSchema = z
  .object({
    deviceId: z.string().trim().min(1).max(255),
    deviceName: z.string().trim().min(1).max(255).optional(),
    platform: z.enum(DEVICE_PLATFORMS),
    pushToken: z.string().trim().min(1).optional(),
  })
  .strict();

//  Request Schemas

export const requestOtpSchema = z
  .object({
    phone: phoneSchema,
    purpose: otpPurposeSchema,
  })
  .strict();

export const verifyOtpSchema = z
  .object({
    phone: phoneSchema,
    code: otpCodeSchema,
    purpose: otpPurposeSchema,
  })
  .strict();

export const resendOtpSchema = z
  .object({
    phone: phoneSchema,
    purpose: otpPurposeSchema,
  })
  .strict();

export const registerSchema = z
  .object({
    phone: phoneSchema,
    fullName: z.string().trim().min(2, "Full name is too short").max(120),
    role: roleSchema,
    otpVerificationToken: verificationTokenSchema,
    device: deviceInfoSchema.optional(),
  })
  .strict();

export const loginSchema = z
  .object({
    phone: phoneSchema,
    otpVerificationToken: verificationTokenSchema,
    device: deviceInfoSchema.optional(),
  })
  .strict();

export const refreshTokenSchema = z
  .object({
    refreshToken: opaqueTokenSchema("Refresh token"),
  })
  .strict();

export const logoutSchema = z
  .object({
    refreshToken: opaqueTokenSchema("Refresh token"),
    allDevices: z.boolean().optional().default(false),
  })
  .strict();

export const googleSignInSchema = z
  .object({
    idToken: opaqueTokenSchema("Google ID token"),
    // Required only on first-time sign-up via Google; ignored on existing-account sign-in.
    role: roleSchema.optional(),
    device: deviceInfoSchema.optional(),
  })
  .strict();

export const linkGoogleAccountSchema = z
  .object({
    idToken: opaqueTokenSchema("Google ID token"),
  })
  .strict();

export const changePhoneNumberSchema = z
  .object({
    newPhone: phoneSchema,
    otpVerificationToken: verificationTokenSchema,
  })
  .strict();

export const verifyAccessTokenSchema = z
  .object({
    accessToken: opaqueTokenSchema("Access token"),
  })
  .strict();

//  Validation Helper

export function parseOrThrow(schema, payload) {
  const result = schema.safeParse(payload);
  if (!result.success) {
    const details = result.error.issues.map((issue) => ({
      field: issue.path.join(".") || "(root)",
      message: issue.message,
      code: issue.code,
    }));
    throw new ValidationError("Request validation failed", details);
  }
  return result.data;
}

export const deleteAccountSchema = z.object({ confirm: z.literal("DELETE") }).strict();