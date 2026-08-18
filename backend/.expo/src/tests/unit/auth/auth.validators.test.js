import { describe, test, expect } from "@jest/globals";
import {
  parseOrThrow,
  requestOtpSchema,
  verifyOtpSchema,
  resendOtpSchema,
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  logoutSchema,
  googleSignInSchema,
  linkGoogleAccountSchema,
  changePhoneNumberSchema,
  verifyAccessTokenSchema,
  sessionIdParamSchema,
  deviceInfoSchema,
} from "../../../modules/auth/auth.validators.js";
import { ValidationError } from "../../../errors/commonErrors.js";
import {
  validPhone,
  validPhoneLocalFormat,
  validDevicePayload,
  validRegisterPayload,
  validLoginPayload,
} from "../../fixtures/auth.fixtures.js";
import { randomUUID } from "node:crypto";

describe("auth.validators", () => {
  // ─── parseOrThrow ─────────────────────────────────────────
  describe("parseOrThrow", () => {
    test("returns parsed data on valid input", () => {
      const result = parseOrThrow(requestOtpSchema, {
        phone: validPhone(),
        purpose: "LOGIN",
      });
      expect(result.phone).toBe(validPhone());
      expect(result.purpose).toBe("LOGIN");
    });

    test("throws ValidationError on invalid input", () => {
      expect(() =>
        parseOrThrow(requestOtpSchema, { phone: "not-a-phone" }),
      ).toThrow(ValidationError);
    });

    test("ValidationError carries field-level details", () => {
      try {
        parseOrThrow(requestOtpSchema, { phone: "bad", purpose: "INVALID" });
        throw new Error("should have thrown");
      } catch (err) {
        expect(err).toBeInstanceOf(ValidationError);
        expect(Array.isArray(err.details)).toBe(true);
        expect(err.details.length).toBeGreaterThan(0);
        expect(err.details[0]).toHaveProperty("field");
        expect(err.details[0]).toHaveProperty("message");
      }
    });
  });

  // ─── Phone normalization (requestOtpSchema as representative) ──
  describe("phone normalization", () => {
    test("accepts E.164 format directly", () => {
      const result = requestOtpSchema.safeParse({
        phone: "+233241234567",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(true);
    });

    test("normalizes local 0XXXXXXXXX format to +233XXXXXXXXX", () => {
      const result = requestOtpSchema.safeParse({
        phone: validPhoneLocalFormat(),
        purpose: "LOGIN",
      });
      expect(result.success).toBe(true);
      expect(result.data.phone).toBe("+233241234567");
    });

    test("rejects a non-Ghanaian country code", () => {
      const result = requestOtpSchema.safeParse({
        phone: "+14155552671",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(false);
    });

    test("rejects a malformed phone (too short)", () => {
      const result = requestOtpSchema.safeParse({
        phone: "+23324123",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── requestOtpSchema / resendOtpSchema ─────────────────────
  describe("requestOtpSchema", () => {
    test("rejects an invalid purpose enum value", () => {
      const result = requestOtpSchema.safeParse({
        phone: validPhone(),
        purpose: "NOT_A_PURPOSE",
      });
      expect(result.success).toBe(false);
    });

    test("rejects unknown fields (.strict())", () => {
      const result = requestOtpSchema.safeParse({
        phone: validPhone(),
        purpose: "LOGIN",
        extra: "field",
      });
      expect(result.success).toBe(false);
    });

    test("rejects missing required fields", () => {
      const result = requestOtpSchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });

  describe("resendOtpSchema", () => {
    test("accepts the same shape as requestOtpSchema", () => {
      const result = resendOtpSchema.safeParse({
        phone: validPhone(),
        purpose: "REGISTRATION",
      });
      expect(result.success).toBe(true);
    });
  });

  // ─── verifyOtpSchema ──────────────────────────────────────
  describe("verifyOtpSchema", () => {
    test("accepts a valid 4-digit code", () => {
      const result = verifyOtpSchema.safeParse({
        phone: validPhone(),
        code: "4839",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(true);
    });

    test("rejects a code shorter than 6 digits", () => {
      const result = verifyOtpSchema.safeParse({
        phone: validPhone(),
        code: "4839",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(false);
    });

    test("rejects a code longer than 6 digits", () => {
      const result = verifyOtpSchema.safeParse({
        phone: validPhone(),
        code: "48392112",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(false);
    });

    test("rejects a non-numeric code", () => {
      const result = verifyOtpSchema.safeParse({
        phone: validPhone(),
        code: "abcdef",
        purpose: "LOGIN",
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── deviceInfoSchema ─────────────────────────────────────
  describe("deviceInfoSchema", () => {
    test("accepts a full valid device payload", () => {
      const result = deviceInfoSchema.safeParse(validDevicePayload());
      expect(result.success).toBe(true);
    });

    test("accepts a device payload with only required fields", () => {
      const result = deviceInfoSchema.safeParse({
        deviceId: "device-1",
        platform: "IOS",
      });
      expect(result.success).toBe(true);
    });

    test("rejects an invalid platform enum value", () => {
      const result = deviceInfoSchema.safeParse({
        deviceId: "device-1",
        platform: "WINDOWS_PHONE",
      });
      expect(result.success).toBe(false);
    });

    test("rejects a missing deviceId", () => {
      const result = deviceInfoSchema.safeParse({ platform: "ANDROID" });
      expect(result.success).toBe(false);
    });
  });

  // ─── registerSchema ───────────────────────────────────────
  describe("registerSchema", () => {
    test("accepts a valid minimal payload", () => {
      const result = registerSchema.safeParse(validRegisterPayload());
      expect(result.success).toBe(true);
    });

    test("accepts a valid payload with device info", () => {
      const result = registerSchema.safeParse(
        validRegisterPayload({ device: validDevicePayload() }),
      );
      expect(result.success).toBe(true);
    });

    test("rejects role ADMIN (not publicly selectable)", () => {
      const result = registerSchema.safeParse(
        validRegisterPayload({ role: "ADMIN" }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects fullName shorter than 2 characters", () => {
      const result = registerSchema.safeParse(
        validRegisterPayload({ fullName: "K" }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects a non-UUID otpVerificationToken", () => {
      const result = registerSchema.safeParse(
        validRegisterPayload({ otpVerificationToken: "not-a-uuid" }),
      );
      expect(result.success).toBe(false);
    });

    test("rejects an unknown top-level field (.strict())", () => {
      const result = registerSchema.safeParse({
        ...validRegisterPayload(),
        farmerId: randomUUID(),
      });
      expect(result.success).toBe(false);
    });

    test("trims whitespace from fullName", () => {
      const result = registerSchema.safeParse(
        validRegisterPayload({ fullName: "  Kwame Mensah  " }),
      );
      expect(result.success).toBe(true);
      expect(result.data.fullName).toBe("Kwame Mensah");
    });
  });

  // ─── loginSchema ──────────────────────────────────────────
  describe("loginSchema", () => {
    test("accepts a valid payload", () => {
      const result = loginSchema.safeParse(validLoginPayload());
      expect(result.success).toBe(true);
    });

    test("rejects a missing otpVerificationToken", () => {
      const { otpVerificationToken, ...rest } = validLoginPayload();
      const result = loginSchema.safeParse(rest);
      expect(result.success).toBe(false);
    });
  });

  // ─── refreshTokenSchema / logoutSchema ───────────────────
  describe("refreshTokenSchema", () => {
    test("accepts a token of at least 20 characters", () => {
      const result = refreshTokenSchema.safeParse({
        refreshToken: "a".repeat(20),
      });
      expect(result.success).toBe(true);
    });

    test("rejects a token shorter than 20 characters", () => {
      const result = refreshTokenSchema.safeParse({ refreshToken: "short" });
      expect(result.success).toBe(false);
    });
  });

  describe("logoutSchema", () => {
    test("defaults allDevices to false when omitted", () => {
      const result = logoutSchema.safeParse({ refreshToken: "a".repeat(20) });
      expect(result.success).toBe(true);
      expect(result.data.allDevices).toBe(false);
    });

    test("accepts an explicit allDevices: true", () => {
      const result = logoutSchema.safeParse({
        refreshToken: "a".repeat(20),
        allDevices: true,
      });
      expect(result.success).toBe(true);
      expect(result.data.allDevices).toBe(true);
    });
  });

  // ─── googleSignInSchema / linkGoogleAccountSchema ────────
  describe("googleSignInSchema", () => {
    test("accepts idToken alone (existing-account sign-in)", () => {
      const result = googleSignInSchema.safeParse({ idToken: "a".repeat(30) });
      expect(result.success).toBe(true);
    });

    test("accepts idToken + role (first-time sign-in)", () => {
      const result = googleSignInSchema.safeParse({
        idToken: "a".repeat(30),
        role: "BUYER",
      });
      expect(result.success).toBe(true);
    });

    test("rejects role ADMIN", () => {
      const result = googleSignInSchema.safeParse({
        idToken: "a".repeat(30),
        role: "ADMIN",
      });
      expect(result.success).toBe(false);
    });
  });

  describe("linkGoogleAccountSchema", () => {
    test("accepts a valid idToken", () => {
      const result = linkGoogleAccountSchema.safeParse({
        idToken: "a".repeat(30),
      });
      expect(result.success).toBe(true);
    });

    test("rejects an idToken shorter than 20 characters", () => {
      const result = linkGoogleAccountSchema.safeParse({ idToken: "short" });
      expect(result.success).toBe(false);
    });
  });

  // ─── changePhoneNumberSchema ──────────────────────────────
  describe("changePhoneNumberSchema", () => {
    test("accepts a valid payload", () => {
      const result = changePhoneNumberSchema.safeParse({
        newPhone: validPhone(),
        otpVerificationToken: randomUUID(),
      });
      expect(result.success).toBe(true);
    });

    test("rejects an invalid newPhone", () => {
      const result = changePhoneNumberSchema.safeParse({
        newPhone: "not-a-phone",
        otpVerificationToken: randomUUID(),
      });
      expect(result.success).toBe(false);
    });
  });

  // ─── verifyAccessTokenSchema / sessionIdParamSchema ──────
  describe("verifyAccessTokenSchema", () => {
    test("accepts a plausible access token string", () => {
      const result = verifyAccessTokenSchema.safeParse({
        accessToken: "a".repeat(25),
      });
      expect(result.success).toBe(true);
    });
  });

  describe("sessionIdParamSchema", () => {
    test("accepts a valid UUID", () => {
      const result = sessionIdParamSchema.safeParse({
        sessionId: randomUUID(),
      });
      expect(result.success).toBe(true);
    });

    test("rejects a non-UUID sessionId", () => {
      const result = sessionIdParamSchema.safeParse({
        sessionId: "not-a-uuid",
      });
      expect(result.success).toBe(false);
    });
  });
});
