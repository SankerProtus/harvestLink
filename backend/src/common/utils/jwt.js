import jwt from "jsonwebtoken";
import { TOKEN_CONFIG } from "../../modules/auth/auth.constants.js";

// Token types
const TOKEN_TYPE = Object.freeze({
  ACCESS: "access",
  REFRESH: "refresh",
});

// Secret retrieval
function getAccessTokenSecret() {
  const secret = process.env.JWT_ACCESS_SECRET;
  if (!secret) {
    throw new Error("JWT_ACCESS_SECRET environment variable is not set");
  }
  return secret;
}

function getRefreshTokenSecret() {
  const secret = process.env.JWT_REFRESH_SECRET;
  if (!secret) {
    throw new Error("JWT_REFRESH_SECRET environment variable is not set");
  }
  return secret;
}

// Signing and verification options

const baseSignOptions = Object.freeze({
  algorithm: TOKEN_CONFIG.ALGORITHM,
  issuer: TOKEN_CONFIG.ISSUER,
  audience: TOKEN_CONFIG.AUDIENCE,
});

const baseVerifyOptions = Object.freeze({
  algorithms: [TOKEN_CONFIG.ALGORITHM],
  issuer: TOKEN_CONFIG.ISSUER,
  audience: TOKEN_CONFIG.AUDIENCE,
});

// Duration units in milliseconds

const DURATION_UNIT_MS = Object.freeze({
  s: 1000,
  m: 60 * 1000,
  h: 60 * 60 * 1000,
  d: 24 * 60 * 60 * 1000,
});

// Parses a duration string like "15m" or "1h" into milliseconds. Throws an error for unsupported formats. Used for computing token expiries.
function parseDurationToMs(duration) {
  const match = /^(\d+)([smhd])$/.exec(duration);
  if (!match) {
    throw new Error(`Unsupported duration format: "${duration}"`);
  }
  const [, amount, unit] = match;
  return Number(amount) * DURATION_UNIT_MS[unit];
}

// Signing
export function signAccessToken({ userId, role }) {
  return jwt.sign(
    { sub: userId, role, type: TOKEN_TYPE.ACCESS },
    getAccessTokenSecret(),
    { ...baseSignOptions, expiresIn: TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY },
  );
}

// Signs a refresh token.
export function signRefreshToken({ userId, family }) {
  return jwt.sign(
    { sub: userId, family, type: TOKEN_TYPE.REFRESH },
    getRefreshTokenSecret(),
    {
      ...baseSignOptions,
      expiresIn: `${TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS}d`,
    },
  );
}

// Verifying
export function verifyAccessToken(token) {
  const decoded = jwt.verify(token, getAccessTokenSecret(), baseVerifyOptions);

  if (decoded.type !== TOKEN_TYPE.ACCESS) {
    throw new jwt.JsonWebTokenError(
      "Token type mismatch: expected access token",
    );
  }

  return extractClaims(decoded);
}

// Verifies a refresh token and returns its claims. Throws an error if the token is invalid or expired.
export function verifyRefreshToken(token) {
  const decoded = jwt.verify(token, getRefreshTokenSecret(), baseVerifyOptions);

  if (decoded.type !== TOKEN_TYPE.REFRESH) {
    throw new jwt.JsonWebTokenError(
      "Token type mismatch: expected refresh token",
    );
  }

  return extractClaims(decoded);
}

// Decoding (unsafe, no signature verification)
export function decodeTokenUnsafe(token) {
  return jwt.decode(token, { complete: true });
}

// Extracts claims from a decoded JWT payload. Returns an object with userId, role, family, type, issuedAt, and expiresAt.
export function extractClaims(payload) {
  return {
    userId: payload.sub,
    role: payload.role ?? null,
    family: payload.family ?? null,
    type: payload.type,
    issuedAt: new Date(payload.iat * 1000),
    expiresAt: new Date(payload.exp * 1000),
  };
}

// Computes the expiry date for an access token based on the current time and the configured expiry duration.
export function computeAccessTokenExpiry(now = new Date()) {
  return new Date(
    now.getTime() + parseDurationToMs(TOKEN_CONFIG.ACCESS_TOKEN_EXPIRY),
  );
}

export function computeRefreshTokenExpiry(now = new Date()) {
  return new Date(
    now.getTime() + TOKEN_CONFIG.REFRESH_TOKEN_EXPIRY_DAYS * DURATION_UNIT_MS.d,
  );
}
