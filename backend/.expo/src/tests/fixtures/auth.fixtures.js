// tests/fixtures/auth.fixtures.js

import { randomUUID } from "node:crypto";
import {
  USER_ROLES,
  ACCOUNT_STATUS,
  OTP_PURPOSES,
} from "../../../src/modules/auth/auth.constants.js";

export function validPhone() {
  return "+233241234567";
}

export function validPhoneLocalFormat() {
  return "0241234567";
}

export function validDevicePayload(overrides = {}) {
  return {
    deviceId: "device-a1b2c3",
    deviceName: "Kwame's Tecno Spark",
    platform: "ANDROID",
    pushToken: "fcm-token-example",
    ...overrides,
  };
}

export function validRegisterPayload(overrides = {}) {
  return {
    phone: validPhone(),
    fullName: "Kwame Mensah",
    role: USER_ROLES.FARMER,
    otpVerificationToken: randomUUID(),
    ...overrides,
  };
}

export function validLoginPayload(overrides = {}) {
  return {
    phone: validPhone(),
    otpVerificationToken: randomUUID(),
    ...overrides,
  };
}

export function fakeUserEntity(overrides = {}) {
  return {
    id: randomUUID(),
    fullName: "Kwame Mensah",
    role: USER_ROLES.FARMER,
    phone: validPhone(),
    phoneVerifiedAt: new Date("2026-06-01T12:00:00.000Z"),
    accountStatus: ACCOUNT_STATUS.ACTIVE,
    lastLoginAt: new Date("2026-07-22T09:00:00.000Z"),
    createdAt: new Date("2026-06-01T12:00:00.000Z"),
    updatedAt: new Date("2026-06-01T12:00:00.000Z"),
    deletedAt: null,
    ...overrides,
  };
}

export const OTP_PURPOSE_REGISTRATION = OTP_PURPOSES.REGISTRATION;
export const OTP_PURPOSE_LOGIN = OTP_PURPOSES.LOGIN;
export const OTP_PURPOSE_CHANGE_PHONE = OTP_PURPOSES.CHANGE_PHONE;
