import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  onAuthFailure,
  setTokens,
  clearTokens,
  loadPersistedRefreshToken,
} from "../api/client.js";
import * as authApi from "../api/auth.api.js";
import { connectSocket, disconnectSocket } from "../lib/socket.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const [securityLogoutMessage, setSecurityLogoutMessage] = useState(null);

  const isMountedRef = useRef(true);

  //  Session restore on launch
  useEffect(() => {
    isMountedRef.current = true;

    async function restoreSession() {
      try {
        const persistedRefreshToken = await loadPersistedRefreshToken();
        if (!persistedRefreshToken) {
          return; // no prior session — normal logged-out start
        }

        const { accessToken, refreshToken } = await authApi.refreshSession({
          refreshToken: persistedRefreshToken,
        });
        await setTokens({
          accessToken: accessToken.accessToken,
          refreshToken: refreshToken.refreshToken,
        });

        const profile = await authApi.getProfile();
        if (isMountedRef.current) {
          setUser(profile);
        }
      } catch {
        await clearTokens();
        if (isMountedRef.current) {
          setUser(null);
        }
      } finally {
        if (isMountedRef.current) {
          setIsInitializing(false);
        }
      }
    }

    restoreSession();

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  //  Subscribe to forced-logout events from client.js
  useEffect(() => {
    const unsubscribe = onAuthFailure((error) => {
      if (!isMountedRef.current) return;
      setUser(null);
      setSecurityLogoutMessage(
        error?.isSecurityLogout
          ? "For your security, you've been logged out of all devices."
          : "Your session has expired. Please log in again.",
      );
    });

    return unsubscribe;
  }, []);

  //  Keep the realtime socket connection in step with auth state — one
  //  connection per signed-in session, torn down on logout so a stale
  //  socket never lingers with an old user's identity.
  useEffect(() => {
    if (user?.id) {
      connectSocket();
    } else {
      disconnectSocket();
    }
  }, [user?.id]);

  //  Actions

  const applySessionResult = useCallback(
    async ({ user: sessionUser, accessToken, refreshToken }) => {
      await setTokens({ accessToken, refreshToken });
      setUser(sessionUser);
    },
    [],
  );

  const login = useCallback(
    async ({ phone, otpVerificationToken, device }) => {
      const result = await authApi.login({
        phone,
        otpVerificationToken,
        device,
      });
      await applySessionResult({
        user: result.user,
        accessToken: result.accessToken.accessToken,
        refreshToken: result.refreshToken.refreshToken,
      });
    },
    [applySessionResult],
  );

  const register = useCallback(
    async ({ phone, fullName, role, otpVerificationToken, device }) => {
      const result = await authApi.register({
        phone,
        fullName,
        role,
        otpVerificationToken,
        device,
      });
      await applySessionResult({
        user: result.user,
        accessToken: result.accessToken.accessToken,
        refreshToken: result.refreshToken.refreshToken,
      });
    },
    [applySessionResult],
  );

  const establishSession = useCallback(
    ({ user: sessionUser, accessToken, refreshToken }) =>
      applySessionResult({ user: sessionUser, accessToken, refreshToken }),
    [applySessionResult],
  );

  const verifyOtp = useCallback(({ phone, code, purpose }) => {
    return authApi.verifyOtp({ phone, code, purpose });
  }, []);

  const logout = useCallback(async ({ allDevices = false } = {}) => {
    try {
      const persistedRefreshToken = await loadPersistedRefreshToken();
      if (persistedRefreshToken) {
        await authApi.logout({
          refreshToken: persistedRefreshToken,
          allDevices,
        });
      }
    } catch {
      // Intentionally swallowed — refresh token may already be invalid/expired.
    } finally {
      await clearTokens();
      setUser(null);
    }
  }, []);

  const dismissSecurityLogoutMessage = useCallback(() => {
    setSecurityLogoutMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing,
      securityLogoutMessage,
      login,
      register,
      verifyOtp,
      logout,
      establishSession,
      dismissSecurityLogoutMessage,
    }),
    [
      user,
      isInitializing,
      securityLogoutMessage,
      login,
      register,
      verifyOtp,
      logout,
      establishSession,
      dismissSecurityLogoutMessage,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth() must be used within an AuthProvider");
  }
  return context;
}
