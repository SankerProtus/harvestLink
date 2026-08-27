import { io } from "socket.io-client";

import { env } from "../config/env.js";
import { getAccessToken } from "../api/client.js";

// The REST API is mounted under .../api, but Socket.IO attaches
// directly to the underlying HTTP server at the root — so we connect
// to the origin, not the API base URL.
const SOCKET_URL = new URL(env.API_BASE_URL).origin;

let socket = null;

// Lazily creates one shared socket connection for the whole app. Auth
// is re-read fresh on every (re)connect attempt via the callback form,
// so a token refresh or a fresh login after logout picks up the new
// token automatically instead of reusing a stale one baked in at
// construction time.
export function getSocket() {
  if (socket) return socket;

  socket = io(SOCKET_URL, {
    autoConnect: false,
    transports: ["websocket"],
    auth: (callback) => callback({ token: getAccessToken() }),
  });

  return socket;
}

export function connectSocket() {
  const instance = getSocket();
  if (!instance.connected) {
    instance.connect();
  }
  return instance;
}

export function disconnectSocket() {
  if (socket?.connected) {
    socket.disconnect();
  }
}
