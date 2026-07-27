import { synchronize } from "@nozbe/watermelondb/sync";
import NetInfo from "@react-native-community/netinfo";
import { database } from "./index";
import { apiClient } from "../api/client";

export async function syncWithServer() {
  if (!database) {
    console.warn("[HarvestLink] Sync skipped — database not initialised (Expo Go).");
    return;
  }

  const netState = await NetInfo.fetch();
  if (!netState.isConnected) {
    console.log("Offline — skipping sync, will retry on reconnect");
    return;
  }

  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const res = await apiClient.get("/sync/pull", {
        params: { last_pulled_at: lastPulledAt },
      });
      return {
        changes: res.data.changes,
        timestamp: res.data.timestamp,
      };
    },
    pushChanges: async ({ changes }) => {
      await apiClient.post("/sync/push", { changes });
    },
  });
}

// Call once at app startup; re-fires sync whenever connectivity returns.
export function subscribeToConnectivity() {
  return NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      syncWithServer().catch((err) => console.error("Sync failed:", err));
    }
  });
}
