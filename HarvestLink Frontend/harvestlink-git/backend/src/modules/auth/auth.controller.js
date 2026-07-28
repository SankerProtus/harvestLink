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
  sessionIdParamSchema,
} from "./auth.validators.js";

import {
  requestOtp as requestOtpService,
  verifyOtp as verifyOtpService,
  registerWithPhone,
  loginWithPhone,
  refreshSession,
  logout as logoutService,
  resendOtp as resendOtpService,
  signInWithGoogle,
  linkGoogleAccount as linkGoogleAccountService,
  changePhoneNumber as changePhoneNumberService,
  getUserProfile,
  listSessions as listSessionsService,
  revokeSession as revokeSessionService,
} from "./auth.service.js";

// Transport helper — pure response shaping, not business logic.

function sendSuccess(res, statusCode, data) {
  return res.status(statusCode).json({ success: true, data });
}

// OTP Endpoints

export async function requestOtp(req, res, next) {
  try {
    const input = parseOrThrow(requestOtpSchema, req.body);
    const result = await requestOtpService({ ...input, ipAddress: req.ip });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function verifyOtp(req, res, next) {
  try {
    const input = parseOrThrow(verifyOtpSchema, req.body);
    const result = await verifyOtpService(input);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function resendOtp(req, res, next) {
  try {
    const input = parseOrThrow(resendOtpSchema, req.body);
    const result = await resendOtpService(input);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

// Registration / Login

export async function register(req, res, next) {
  try {
    const input = parseOrThrow(registerSchema, req.body);
    const result = await registerWithPhone(input);
    return sendSuccess(res, 201, result);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const input = parseOrThrow(loginSchema, req.body);
    const result = await loginWithPhone({ ...input, ipAddress: req.ip });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}


// Session / Token Management

export async function refresh(req, res, next) {
  try {
    const input = parseOrThrow(refreshTokenSchema, req.body);
    const result = await refreshSession(input);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res, next) {
  try {
    const input = parseOrThrow(logoutSchema, req.body);
    const result = await logoutService(input);
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function listSessions(req, res, next) {
  try {
    const result = await listSessionsService({ userId: req.user.id });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function revokeSession(req, res, next) {
  try {
    const params = parseOrThrow(sessionIdParamSchema, req.params);
    await revokeSessionService({
      userId: req.user.id,
      refreshTokenId: params.sessionId,
    });
    return res.status(204).send();
  } catch (err) {
    next(err);
  }
}


// Google OAuth

export async function googleSignIn(req, res, next) {
  try {
    const input = parseOrThrow(googleSignInSchema, req.body);
    const result = await signInWithGoogle({ ...input, ipAddress: req.ip });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function linkGoogleAccount(req, res, next) {
  try {
    const input = parseOrThrow(linkGoogleAccountSchema, req.body);
    const result = await linkGoogleAccountService({
      userId: req.user.id,
      ...input,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

// Profile / Phone Management

export async function changePhoneNumber(req, res, next) {
  try {
    const input = parseOrThrow(changePhoneNumberSchema, req.body);
    const result = await changePhoneNumberService({
      userId: req.user.id,
      ...input,
    });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const result = await getUserProfile({ userId: req.user.id });
    return sendSuccess(res, 200, result);
  } catch (err) {
    next(err);
  }
}
