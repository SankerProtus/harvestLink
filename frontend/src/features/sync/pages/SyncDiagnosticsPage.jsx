import { useState } from "react";
import { View, Text, ScrollView, Share } from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";

const STATUS_STYLES = {
  pending: { bg: "bg-warning/15", text: "text-[#8A5A00]", label: "Pending" },
  failed: { bg: "bg-danger/10", text: "text-danger", label: "Failed" },
  completed: { bg: "bg-success/10", text: "text-[#15803D]", label: "Synced" },
};

function formatTime(date) {
  if (!date) return "—";
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Best-effort, honest summary of what a queued operation actually carries —
// counts real array fields on the payload rather than showing a fake number.
function describePayload(op) {
  const images = op.payload?.images;
  if (Array.isArray(images) && images.length > 0) {
    return `${images.length} Photo${images.length === 1 ? "" : "s"}`;
  }
  return "1 Record";
}

function StatRow({ label, value, valueColor = "text-ink", trailing }) {
  return (
    <View className="flex-row items-center justify-between py-3.5 border-b border-line/70">
      <Text className="text-[13.5px] text-ink-muted font-medium">{label}</Text>
      <View className="flex-row items-center gap-2">
        {trailing}
        <Text className={`text-[15px] font-extrabold ${valueColor}`}>
          {value}
        </Text>
      </View>
    </View>
  );
}

function LogHeaderRow() {
  return (
    <View className="flex-row items-center pb-2.5 mb-1 border-b border-line">
      <Text className="w-12 text-[11px] font-bold text-ink-muted uppercase tracking-wide">
        Time
      </Text>
      <Text className="flex-1 text-[11px] font-bold text-ink-muted uppercase tracking-wide">
        Event
      </Text>
      <Text className="w-16 text-[11px] font-bold text-ink-muted uppercase tracking-wide">
        Payload
      </Text>
      <Text className="w-16 text-[11px] font-bold text-ink-muted uppercase tracking-wide text-right">
        Status
      </Text>
    </View>
  );
}

function LogRow({ op }) {
  const statusStyle = STATUS_STYLES[op.syncStatus] ?? STATUS_STYLES.pending;
  return (
    <View className="flex-row items-center py-3 border-b border-line/60">
      <Text className="w-12 text-[12px] font-semibold text-ink-muted">
        {formatTime(op.updatedAt)}
      </Text>
      <View className="flex-1 pr-2">
        <Text className="text-[13px] font-bold text-ink" numberOfLines={1}>
          {op.operationType?.replace(/_/g, " ") ?? "—"}
        </Text>
        <Text className="text-[11px] text-ink-muted mt-0.5" numberOfLines={1}>
          {op.entityType} · {op.retryCount} retr
          {op.retryCount === 1 ? "y" : "ies"}
        </Text>
      </View>
      <Text className="w-16 text-[12px] font-medium text-ink-muted">
        {describePayload(op)}
      </Text>
      <View className="w-16 items-end">
        <View className={`rounded-full px-2.5 py-1 ${statusStyle.bg}`}>
          <Text className={`text-[11px] font-bold ${statusStyle.text}`}>
            {statusStyle.label}
          </Text>
        </View>
      </View>
    </View>
  );
}

export function SyncDiagnosticsPage() {
  const navigation = useNavigation();
  const {
    pendingCount,
    failedCount,
    recentOperations,
    isOnline,
    isLoading,
    refresh,
    checkDatabaseHealth,
  } = useSyncStatus();

  const [isChecking, setIsChecking] = useState(false);

  async function handleHealthCheckPress() {
    setIsChecking(true);
    try {
      const result = await checkDatabaseHealth();
      Alert.alert(
        result.ok ? "Database Healthy" : "Health Check Failed",
        result.message,
      );
    } finally {
      setIsChecking(false);
    }
  }

  async function handleExportPress() {
    if (recentOperations.length === 0) {
      Alert.alert(
        "Nothing to export",
        "There are no logged sync operations yet.",
      );
      return;
    }
    const payload = recentOperations.map((op) => ({
      time: op.updatedAt?.toISOString(),
      operationType: op.operationType,
      entityType: op.entityType,
      status: op.syncStatus,
      retryCount: op.retryCount,
      lastError: op.lastError,
    }));
    try {
      await Share.share({
        message: JSON.stringify(payload, null, 2),
        title: "HarvestLink Sync Logs",
      });
    } catch {
      // User dismissed the share sheet — nothing to do.
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Sync & System Diagnostics"
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
        rightAction={
          <HeaderActionButton
            icon="refresh-cw"
            size={18}
            accessibilityLabel="Refresh"
            onPress={refresh}
          />
        }
      />

      <ScrollView
        className="flex-1 px-5 pt-5"
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <Card className="p-5">
          <StatRow
            label="Backend Status"
            value={isOnline ? "Connected" : "Offline"}
            valueColor={isOnline ? "text-success" : "text-danger"}
            trailing={
              <View
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isOnline ? "#22C55E" : "#EF4444" }}
              />
            }
          />
          <StatRow label="Local Queue" value={`${pendingCount} Pending`} />
          <View className="flex-row items-center justify-between pt-3.5">
            <Text className="text-[13.5px] text-ink-muted font-medium">
              Failed Operations
            </Text>
            <Text
              className={`text-[15px] font-extrabold ${failedCount > 0 ? "text-danger" : "text-ink"}`}
            >
              {failedCount}
            </Text>
          </View>
        </Card>

        <View className="h-6" />

        <Text className="text-[16px] font-extrabold text-ink mb-3 tracking-[-0.2px]">
          Recent Sync Logs
        </Text>
        <Card className="p-5">
          {isLoading ? (
            <Text className="text-[13.5px] text-ink-muted py-2">
              Loading sync activity…
            </Text>
          ) : recentOperations.length === 0 ? (
            <View className="items-center py-5">
              <View className="w-12 h-12 rounded-full bg-success/10 items-center justify-center mb-3">
                <Feather name="check-circle" size={22} color="#22C55E" />
              </View>
              <Text className="text-[13.5px] text-ink-muted text-center">
                No pending, failed, or recent sync activity.
              </Text>
            </View>
          ) : (
            <>
              <LogHeaderRow />
              {recentOperations.map((op) => (
                <LogRow key={op.localId} op={op} />
              ))}
            </>
          )}
        </Card>

        <View className="h-7" />

        <Button
          label="Run Database Health Check"
          icon="database"
          onPress={handleHealthCheckPress}
          variant="primary"
          isLoading={isChecking}
        />
        <View className="h-3" />
        <Button
          label="Export Logs"
          icon="download"
          onPress={handleExportPress}
          variant="secondary"
        />
      </ScrollView>
    </SafeAreaView>
  );
}
