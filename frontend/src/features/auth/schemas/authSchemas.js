import { z } from "zod";

const PHONE_CONFIG = Object.freeze({
  SUPPORTED_COUNTRY_CODE: "+233",
  E164_REGEX: /^\+233\d{9}$/,
});

export const OTP_CONFIG = Object.freeze({
  CODE_LENGTH: 6,
});

export const USER_ROLES = Object.freeze({
  FARMER: "FARMER",
  BUYER: "BUYER",
});

export const OTP_PURPOSES = Object.freeze({
  REGISTRATION: "REGISTRATION",
  LOGIN: "LOGIN",
  CHANGE_PHONE: "CHANGE_PHONE",
});

const DEVICE_PLATFORMS = Object.freeze({
  ANDROID: "ANDROID",
  IOS: "IOS",
  WEB: "WEB",
});

// Normalization helper
function normalizePhone(value) {
  if (typeof value !== "string") return value;
  let v = value.trim().replace(/[\s-]/g, "");
  if (v.startsWith("0") && v.length === 10) {
    v = `${PHONE_CONFIG.SUPPORTED_COUNTRY_CODE}${v.slice(1)}`;
  }
  return v;
}

// Reusable field schemas — same shape and messages as the backend
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

const roleSchema = z.enum([USER_ROLES.FARMER, USER_ROLES.BUYER]);

const otpPurposeSchema = z.enum([
  OTP_PURPOSES.REGISTRATION,
  OTP_PURPOSES.LOGIN,
  OTP_PURPOSES.CHANGE_PHONE,
]);

const verificationTokenSchema = z
  .string()
  .uuid("Invalid or malformed verification token");

const opaqueTokenSchema = (label) =>
  z.string().trim().min(20, `${label} appears malformed`);

export const deviceInfoSchema = z
  .object({
    deviceId: z.string().trim().min(1).max(255),
    deviceName: z.string().trim().min(1).max(255).optional(),
    platform: z.enum([
      DEVICE_PLATFORMS.ANDROID,
      DEVICE_PLATFORMS.IOS,
      DEVICE_PLATFORMS.WEB,
    ]),
    pushToken: z.string().trim().min(1).optional(),
  })
  .strict();

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

export const sessionIdParamSchema = z
  .object({
    sessionId: z.string().uuid("Invalid session ID"),
  })
  .strict();
