import { Server as SocketIOServer } from "socket.io";

import { resolveCorsOriginConfig } from "../config/cors.js";
import { verifyAccessToken } from "../utils/jwt.js";
import { logger } from "../utils/logger.js";

let io = null;

function reviewRoom(reviewId) {
  return `review:${reviewId}`;
}

// Socket.IO sits alongside the REST API, not instead of it — every
// comment is still written through the authenticated POST endpoint
// (reviews.service.js keeps the "only the buyer or farmer on this
// review" permission check there, in one place). This module's only
// job is fan-out: once a comment is saved, push it to whoever else
// currently has that review's thread open, so both sides see replies
// appear without polling or refreshing.
export function initSocketServer(httpServer) {
  io = new SocketIOServer(httpServer, {
    cors: {
      origin: resolveCorsOriginConfig(),
    },
  });

  // Reuse the exact same access-token verification as the HTTP auth
  // middleware, so a socket connection has the same trust level as an
  // authenticated API request — no separate/looser auth path.
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) {
        return next(new Error("Missing access token"));
      }
      const claims = verifyAccessToken(token);
      socket.data.userId = claims.userId;
      socket.data.role = claims.role;
      next();
    } catch {
      next(new Error("Invalid or expired access token"));
    }
  });

  io.on("connection", (socket) => {
    logger.info("Socket connected", { userId: socket.data.userId });

    // Joining a review's room only subscribes the socket to future
    // comments on it — reading existing comments still goes through the
    // normal GET endpoint, which is intentionally open to any signed-in
    // user (reviews are public), so no extra permission check is needed
    // here either.
    socket.on("review:join", (reviewId) => {
      if (typeof reviewId === "string" && reviewId) {
        socket.join(reviewRoom(reviewId));
      }
    });

    socket.on("review:leave", (reviewId) => {
      if (typeof reviewId === "string" && reviewId) {
        socket.leave(reviewRoom(reviewId));
      }
    });

    socket.on("disconnect", () => {
      logger.info("Socket disconnected", { userId: socket.data.userId });
    });
  });

  return io;
}

// Called by reviews.service.js right after a comment is persisted.
// No-ops quietly if sockets were never initialized (e.g. in tests),
// since real-time delivery is an enhancement — the REST response to
// the author already succeeded regardless.
export function emitNewReviewComment(reviewId, commentDTO) {
  if (!io) return;
  io.to(reviewRoom(reviewId)).emit("review:comment:new", commentDTO);
}
