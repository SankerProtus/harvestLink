import { jest, describe, test, expect, beforeEach } from "@jest/globals";
import { randomUUID } from "node:crypto";
import {
  mockRequest,
  mockResponse,
  mockNext,
} from "../../helpers/expressMocks.js";

jest.unstable_mockModule("../../../modules/auth/auth.service.js", () => ({
  requestOtp: jest.fn(),
  verifyOtp: jest.fn(),
  registerWithPhone: jest.fn(),
  loginWithPhone: jest.fn(),
  refreshSession: jest.fn(),
  logout: jest.fn(),
  resendOtp: jest.fn(),
  signInWithGoogle: jest.fn(),
  linkGoogleAccount: jest.fn(),
  changePhoneNumber: jest.fn(),
  getUserProfile: jest.fn(),
  listSessions: jest.fn(),
  revokeSession: jest.fn(),
}));

const service = await import("../../../modules/auth/auth.service.js");
const controller = await import("../../../modules/auth/auth.controller.js");
const { ValidationError } = await import("../../../errors/commonErrors.js");

beforeEach(() => {
  jest.clearAllMocks();
});

// ─────────────────────────────────────────────────────────────
describe("requestOtp", () => {
  test("valid body: calls the service with body + ipAddress, responds 200", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", purpose: "LOGIN" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.requestOtp.mockResolvedValue({
      phone: "+233241234567",
      purpose: "LOGIN",
    });

    await controller.requestOtp(req, res, next);

    expect(service.requestOtp).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "+233241234567",
        purpose: "LOGIN",
        ipAddress: req.ip,
      }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: expect.any(Object),
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("invalid body: forwards a real ValidationError via next(), service never called", async () => {
    const req = mockRequest({ body: { phone: "not-a-phone" } });
    const res = mockResponse();
    const next = mockNext();

    await controller.requestOtp(req, res, next);

    expect(service.requestOtp).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection propagates via next(), unmodified", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", purpose: "LOGIN" },
    });
    const res = mockResponse();
    const next = mockNext();
    const serviceError = new Error("rate limited");
    service.requestOtp.mockRejectedValue(serviceError);

    await controller.requestOtp(req, res, next);

    expect(next).toHaveBeenCalledWith(serviceError);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("verifyOtp", () => {
  test("valid body: 200 with service result", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", code: "483921", purpose: "LOGIN" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.verifyOtp.mockResolvedValue({ verificationToken: randomUUID() });

    await controller.verifyOtp(req, res, next);

    expect(service.verifyOtp).toHaveBeenCalledWith({
      phone: "+233241234567",
      code: "483921",
      purpose: "LOGIN",
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid body (bad code length): forwards ValidationError", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", code: "12", purpose: "LOGIN" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.verifyOtp(req, res, next);

    expect(service.verifyOtp).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});

// ─────────────────────────────────────────────────────────────
describe("resendOtp", () => {
  test("valid body: 200 with service result", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", purpose: "REGISTRATION" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.resendOtp.mockResolvedValue({ phone: "+233241234567" });

    await controller.resendOtp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("service rejection propagates via next()", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", purpose: "REGISTRATION" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("cooldown active");
    service.resendOtp.mockRejectedValue(err);

    await controller.resendOtp(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

// ─────────────────────────────────────────────────────────────
describe("register", () => {
  test("valid body: 201, no req.user reference (public endpoint)", async () => {
    const req = mockRequest({
      body: {
        phone: "+233241234567",
        fullName: "Kwame Mensah",
        role: "FARMER",
        otpVerificationToken: randomUUID(),
      },
    });
    const res = mockResponse();
    const next = mockNext();
    service.registerWithPhone.mockResolvedValue({
      user: { id: "u1" },
      isNewUser: true,
    });

    await controller.register(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(service.registerWithPhone).toHaveBeenCalledWith(
      expect.objectContaining({
        phone: "+233241234567",
        fullName: "Kwame Mensah",
      }),
    );
  });

  test("invalid body (role ADMIN): forwards ValidationError", async () => {
    const req = mockRequest({
      body: {
        phone: "+233241234567",
        fullName: "Kwame Mensah",
        role: "ADMIN",
        otpVerificationToken: randomUUID(),
      },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.register(req, res, next);

    expect(service.registerWithPhone).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});

// ─────────────────────────────────────────────────────────────
describe("login", () => {
  test("valid body: 200, passes ipAddress through", async () => {
    const req = mockRequest({
      body: { phone: "+233241234567", otpVerificationToken: randomUUID() },
    });
    const res = mockResponse();
    const next = mockNext();
    service.loginWithPhone.mockResolvedValue({ isNewUser: false });

    await controller.login(req, res, next);

    expect(service.loginWithPhone).toHaveBeenCalledWith(
      expect.objectContaining({ ipAddress: req.ip }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// ─────────────────────────────────────────────────────────────
describe("refresh", () => {
  test("valid body: 200 with service result", async () => {
    const req = mockRequest({ body: { refreshToken: "a".repeat(30) } });
    const res = mockResponse();
    const next = mockNext();
    service.refreshSession.mockResolvedValue({ accessToken: {} });

    await controller.refresh(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("invalid body (short token): forwards ValidationError", async () => {
    const req = mockRequest({ body: { refreshToken: "short" } });
    const res = mockResponse();
    const next = mockNext();

    await controller.refresh(req, res, next);

    expect(service.refreshSession).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });
});

// ─────────────────────────────────────────────────────────────
describe("logout", () => {
  test("valid body: 200, does NOT reference req.user (scoped by the refresh token itself)", async () => {
    const req = mockRequest({
      body: { refreshToken: "a".repeat(30) },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.logout.mockResolvedValue({ success: true });

    await controller.logout(req, res, next);

    expect(service.logout).toHaveBeenCalledWith({
      refreshToken: "a".repeat(30),
      allDevices: false,
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("allDevices: true is passed through unchanged", async () => {
    const req = mockRequest({
      body: { refreshToken: "a".repeat(30), allDevices: true },
    });
    const res = mockResponse();
    const next = mockNext();
    service.logout.mockResolvedValue({ success: true });

    await controller.logout(req, res, next);

    expect(service.logout).toHaveBeenCalledWith(
      expect.objectContaining({ allDevices: true }),
    );
  });
});

// ─────────────────────────────────────────────────────────────
describe("listSessions", () => {
  test("scopes to req.user.id, 200 with array result", async () => {
    const req = mockRequest({ user: { id: "u1" } });
    const res = mockResponse();
    const next = mockNext();
    service.listSessions.mockResolvedValue([{ id: "session-1" }]);

    await controller.listSessions(req, res, next);

    expect(service.listSessions).toHaveBeenCalledWith({ userId: "u1" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: [{ id: "session-1" }],
    });
  });
});

// ─────────────────────────────────────────────────────────────
describe("revokeSession", () => {
  test("valid params + req.user.id: 204 with no body", async () => {
    const sessionId = randomUUID();
    const req = mockRequest({ params: { sessionId }, user: { id: "u1" } });
    const res = mockResponse();
    const next = mockNext();
    service.revokeSession.mockResolvedValue({ success: true });

    await controller.revokeSession(req, res, next);

    expect(service.revokeSession).toHaveBeenCalledWith({
      userId: "u1",
      refreshTokenId: sessionId,
    });
    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalledWith();
    expect(res.json).not.toHaveBeenCalled();
  });

  test("invalid sessionId (not a UUID): forwards ValidationError", async () => {
    const req = mockRequest({
      params: { sessionId: "not-a-uuid" },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();

    await controller.revokeSession(req, res, next);

    expect(service.revokeSession).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(ValidationError));
  });

  test("service rejection (e.g. NotFoundError) propagates via next()", async () => {
    const req = mockRequest({
      params: { sessionId: randomUUID() },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("session not found");
    service.revokeSession.mockRejectedValue(err);

    await controller.revokeSession(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});

// ─────────────────────────────────────────────────────────────
describe("googleSignIn", () => {
  test("valid body: 200, passes ipAddress through, no req.user (public)", async () => {
    const req = mockRequest({ body: { idToken: "a".repeat(30) } });
    const res = mockResponse();
    const next = mockNext();
    service.signInWithGoogle.mockResolvedValue({ isNewUser: false });

    await controller.googleSignIn(req, res, next);

    expect(service.signInWithGoogle).toHaveBeenCalledWith(
      expect.objectContaining({ ipAddress: req.ip }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// ─────────────────────────────────────────────────────────────
describe("linkGoogleAccount", () => {
  test("valid body + req.user.id: 200", async () => {
    const req = mockRequest({
      body: { idToken: "a".repeat(30) },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.linkGoogleAccount.mockResolvedValue({ provider: "GOOGLE" });

    await controller.linkGoogleAccount(req, res, next);

    expect(service.linkGoogleAccount).toHaveBeenCalledWith({
      userId: "u1",
      idToken: "a".repeat(30),
    });
    expect(res.status).toHaveBeenCalledWith(200);
  });

  test("service rejection (e.g. GoogleAccountAlreadyLinkedError) propagates via next()", async () => {
    const req = mockRequest({
      body: { idToken: "a".repeat(30) },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("already linked");
    service.linkGoogleAccount.mockRejectedValue(err);

    await controller.linkGoogleAccount(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
  });
});

// ─────────────────────────────────────────────────────────────
describe("changePhoneNumber", () => {
  test("valid body + req.user.id: 200", async () => {
    const req = mockRequest({
      body: { newPhone: "+233551234567", otpVerificationToken: randomUUID() },
      user: { id: "u1" },
    });
    const res = mockResponse();
    const next = mockNext();
    service.changePhoneNumber.mockResolvedValue({ phone: "+233551234567" });

    await controller.changePhoneNumber(req, res, next);

    expect(service.changePhoneNumber).toHaveBeenCalledWith(
      expect.objectContaining({ userId: "u1", newPhone: "+233551234567" }),
    );
    expect(res.status).toHaveBeenCalledWith(200);
  });
});

// ─────────────────────────────────────────────────────────────
describe("getProfile", () => {
  test("scopes to req.user.id, 200 with profile data", async () => {
    const req = mockRequest({ user: { id: "u1" } });
    const res = mockResponse();
    const next = mockNext();
    service.getUserProfile.mockResolvedValue({
      id: "u1",
      fullName: "Kwame Mensah",
    });

    await controller.getProfile(req, res, next);

    expect(service.getUserProfile).toHaveBeenCalledWith({ userId: "u1" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: { id: "u1", fullName: "Kwame Mensah" },
    });
  });

  test("service rejection (e.g. NotFoundError) propagates via next()", async () => {
    const req = mockRequest({ user: { id: "u1" } });
    const res = mockResponse();
    const next = mockNext();
    const err = new Error("user not found");
    service.getUserProfile.mockRejectedValue(err);

    await controller.getProfile(req, res, next);

    expect(next).toHaveBeenCalledWith(err);
    expect(res.status).not.toHaveBeenCalled();
  });
});
