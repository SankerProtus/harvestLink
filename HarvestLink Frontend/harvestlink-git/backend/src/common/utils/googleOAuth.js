import { OAuth2Client } from "google-auth-library";
import { AUTH_PROVIDERS } from "../../modules/auth/auth.constants.js";

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
  const client = getOAuthClient();

  const ticket = await client.verifyIdToken({
    idToken,
    audience: getClientId(),
  });

  return ticket.getPayload();
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
