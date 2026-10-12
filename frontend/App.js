import "./global.css";
import { useEffect, useRef } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { queryClient } from "./src/lib/queryClient.js";
import { AuthProvider, useAuth } from "./src/context/AuthContext.jsx";
import { AppNavigator } from "./src/navigation/AppNavigator.jsx";
import {
  isOnline,
  subscribeToNetworkChanges,
} from "./src/lib/networkMonitor.js";
import { syncPendingOperations } from "./src/database/sync/SyncEngine.js";
import { AppAlert } from "./src/components/ui/AppAlert.jsx";
import * as SplashScreen from "expo-splash-screen";
import { AppErrorBoundary } from "./src/components/ui/AppErrorBoundary.jsx";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
} from "@expo-google-fonts/inter";

SplashScreen.preventAutoHideAsync().catch(() => {});

function OfflineSyncBridge() {
  const { isAuthenticated } = useAuth();
  const isSyncingRef = useRef(false);

  async function runSyncIfSafe() {
    if (isSyncingRef.current) return; // prevent overlapping sync runs
    if (!isAuthenticated) return;

    const online = await isOnline();
    if (!online) return;

    isSyncingRef.current = true;
    try {
      await syncPendingOperations();
    } finally {
      isSyncingRef.current = false;
    }
  }

  useEffect(() => {
    // Run a sync attempt immediately on mount if the user is authenticated and online.
    runSyncIfSafe();

    // Attempt again on every future transition to "online."
    const unsubscribe = subscribeToNetworkChanges((online) => {
      if (online) {
        runSyncIfSafe();
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  return null;
}

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  if (!fontsLoaded && !fontError) return null;

  return (
    <AppErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <AuthProvider>
            <OfflineSyncBridge />
            <AppNavigator />
            <AppAlert />
          </AuthProvider>
        </SafeAreaProvider>
      </QueryClientProvider>
    </AppErrorBoundary>
  );
}