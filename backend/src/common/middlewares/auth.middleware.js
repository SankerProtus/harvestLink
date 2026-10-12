import { verifyAccessToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../../errors/commonErrors.js";
import { prisma } from "../utils/prismaClient.js";

const BEARER_PREFIX = "Bearer ";

export async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith(BEARER_PREFIX)) {
      throw new UnauthorizedError("Missing or malformed Authorization header", {
        reason: "MISSING_TOKEN",
      });
    }

    const token = authHeader.slice(BEARER_PREFIX.length).trim();

    if (!token) {
      throw new UnauthorizedError("Missing access token", {
        reason: "MISSING_TOKEN",
      });
    }

    let claims;
    try {
      claims = verifyAccessToken(token);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        throw new UnauthorizedError("Access token has expired", {
          reason: "TOKEN_EXPIRED",
        });
      }
      // Covers JsonWebTokenError (bad signature, malformed token,
      // wrong issuer/audience, type mismatch) and NotBeforeError.
      throw new UnauthorizedError("Access token is invalid", {
        reason: "INVALID_TOKEN",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: claims.userId },
      select: { id: true, role: true, accountStatus: true },
    });
    if (!user || user.accountStatus === "DELETED") {
      throw new UnauthorizedError("Account is not available", { reason: "ACCOUNT_UNAVAILABLE" });
    }
    if (user.accountStatus === "SUSPENDED") {
      throw new UnauthorizedError("This account has been blocked", { reason: "ACCOUNT_SUSPENDED" });
    }

    req.user = {
      id: user.id,
      role: user.role,
    };

    next();
  } catch (err) {
    next(err);
  }
}
