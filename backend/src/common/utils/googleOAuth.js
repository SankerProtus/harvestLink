import { OAuth2Client } from "google-auth-library";
import { AUTH_PROVIDERS } from "../../modules/auth/auth.constants.js";
import { GoogleTokenVerificationError } from "../../modules/auth/auth.errors.js";
import { logger } from "./logger.js";

// Client creation

function getClientId() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    throw new Error("GOOGLE_CLIENT_ID environment variable is not set");
  }
  return clientId;
}

function getOAuthClient() {
  return new OAuth2Client(getClientId());
}

// Verification

export async function verifyGoogleIdToken(idToken) {
  if (!idToken) {
    throw new GoogleTokenVerificationError("Missing Google ID token");
  }

  const client = getOAuthClient();

  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: getClientId(),
    });

    return ticket.getPayload();
  } catch (err) {
    // google-auth-library throws plain Errors for every failure mode
    // (expired token, audience/client-id mismatch, malformed token,
    // signature verification failure, etc). None of those should ever
    // surface as a raw 500 — normalize them into our own AppError so
    // the client gets a proper AUTH_GOOGLE_TOKEN_INVALID response.
    logger.warn("Google ID token verification failed", {
      message: err?.message,
    });
    throw new GoogleTokenVerificationError();
  }
}

// Normalization

export function normalizeGoogleIdentity(payload) {
  return {
    provider: AUTH_PROVIDERS.GOOGLE,
    providerUserId: payload.sub,
    email: payload.email ?? null,
    emailVerified: payload.email_verified ?? false,
    givenName: payload.given_name ?? null,
    familyName: payload.family_name ?? null,
    fullName: payload.name ?? null,
    avatarUrl: payload.picture ?? null,
  };
}

// Composite convenience function

export async function verifyAndNormalizeGoogleIdentity(idToken) {
  const payload = await verifyGoogleIdToken(idToken);
  return normalizeGoogleIdentity(payload);
}