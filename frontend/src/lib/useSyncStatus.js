import { useEffect, useState, useCallback } from "react";
import {
  getPendingOperations,
  getOperationsByStatus,
} from "../database/sync/SyncQueue.js";
import { isOnline, subscribeToNetworkChanges } from "./networkMonitor.js";
import database from "../database/index.js";

const POLL_INTERVAL_MS = 5000;
const RECENT_LOG_LIMIT = 8;

function byMostRecentFirst(a, b) {
  const aTime = a.updatedAt?.getTime?.() ?? 0;
  const bTime = b.updatedAt?.getTime?.() ?? 0;
  return bTime - aTime;
}

export function useSyncStatus() {
  const [pendingCount, setPendingCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [recentOperations, setRecentOperations] = useState([]);
  const [online, setOnline] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [pending, failed, completed, connected] = await Promise.all([
        getPendingOperations(),
        getOperationsByStatus("failed"),
        getOperationsByStatus("completed"),
        isOnline(),
      ]);
      setPendingCount(pending.length);
      setFailedCount(failed.length);
      setOnline(connected);
      setRecentOperations(
        [...pending, ...failed, ...completed]
          .sort(byMostRecentFirst)
          .slice(0, RECENT_LOG_LIMIT),
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, POLL_INTERVAL_MS);
    const unsubscribe = subscribeToNetworkChanges((connected) => {
      setOnline(connected);
      refresh();
    });
    return () => {
      clearInterval(interval);
      unsubscribe();
    };
  }, [refresh]);

  // A real check, not a simulated one: confirms the on-device WatermelonDB
  // instance can actually be queried right now (both tables it manages).
  const checkDatabaseHealth = useCallback(async () => {
    try {
      const [listingCount, queueCount] = await Promise.all([
        database.collections.get("listings").query().fetchCount(),
        database.collections.get("pending_sync_operations").query().fetchCount(),
      ]);
      return {
        ok: true,
        message: `Database reachable — ${listingCount} listing(s), ${queueCount} queued operation(s).`,
      };
    } catch (error) {
      return {
        ok: false,
        message: error?.message ?? "Local database could not be queried.",
      };
    }
  }, []);

  return {
    pendingCount,
    failedCount,
    recentOperations,
    isOnline: online,
    isLoading,
    refresh,
    checkDatabaseHealth,
  };
}
