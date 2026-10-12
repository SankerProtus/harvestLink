import { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { AuthCard } from "../components/AuthCard.jsx";
import { AuthButton } from "../components/AuthButton.jsx";
import { useSessions, useRevokeSession } from "../hooks/authHooks.js";
import { getDeviceInfo } from "../../../lib/deviceInfo.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";

function formatDate(isoString) {
  if (!isoString) return "—";
  return new Date(isoString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function devicePlatformIcon(platform) {
  const normalized = (platform ?? "").toLowerCase();
  if (normalized.includes("ios") || normalized.includes("android")) {
    return "smartphone";
  }
  if (normalized.includes("web") || normalized.includes("browser")) {
    return "globe";
  }
  return "monitor";
}

function SessionCard({ session, isCurrentDevice, onRevoke, isRevoking }) {
  const platformLabel = session.device?.platform ?? "Unknown device";
  const deviceName = session.device?.deviceName ?? platformLabel;

  return (
    <AuthCard className="mb-3">
      <View className="flex-row items-start">
        <View className="w-11 h-11 rounded-xl2 bg-primary-muted items-center justify-center mr-3">
          <Feather
            name={devicePlatformIcon(platformLabel)}
            size={18}
            color={colors.primary}
          />
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2 flex-wrap">
            <Text className="text-[15px] font-extrabold text-ink tracking-[-0.2px]">
              {deviceName}
            </Text>
            {isCurrentDevice ? (
              <View className="bg-primary-muted rounded-full px-2.5 py-1">
                <Text className="text-[10px] font-bold text-primary uppercase tracking-wide">
                  This device
                </Text>
              </View>
            ) : null}
          </View>
          <Text className="text-[12px] text-ink-muted mt-1.5">
            Signed in {formatDate(session.issuedAt)}
          </Text>
          <Text className="text-[12px] text-ink-faint mt-0.5">
            Expires {formatDate(session.expiresAt)}
          </Text>
        </View>
      </View>

      {!isCurrentDevice ? (
        <>
          <View className="h-4" />
          <AuthButton
            label="Revoke session"
            onPress={() => onRevoke(session.id)}
            variant="danger"
            isLoading={isRevoking}
          />
        </>
      ) : null}
    </AuthCard>
  );
}

export function SessionsPage() {
  const navigation = useNavigation();
  const sessions = useSessions();
  const revokeSession = useRevokeSession();
  const [currentDeviceId, setCurrentDeviceId] = useState(null);
  const [revokingSessionId, setRevokingSessionId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    getDeviceInfo().then(({ deviceId }) => {
      if (isMounted) setCurrentDeviceId(deviceId);
    });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleRevoke(sessionId) {
    setRevokingSessionId(sessionId);
    revokeSession.mutate(sessionId, {
      onSettled: () => setRevokingSessionId(null),
    });
  }

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  if (sessions.isLoading || currentDeviceId === null) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={[]}>
        <ScreenHeader title="Devices & Sessions" leftAction={backAction} />
        <LoadingState label="Loading sessions…" />
      </SafeAreaView>
    );
  }

  if (sessions.isError) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={[]}>
        <ScreenHeader title="Devices & Sessions" leftAction={backAction} />
        <ErrorState
          title="Couldn't load sessions"
          message={getErrorMessage(sessions.error)}
          onRetry={() => sessions.refetch()}
        />
      </SafeAreaView>
    );
  }

  const sessionList = sessions.data ?? [];

  if (sessionList.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={[]}>
        <ScreenHeader title="Devices & Sessions" leftAction={backAction} />
        <EmptyState
          icon="shield"
          title="No active sessions"
          description="Devices where you're signed in will appear here."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader title="Devices & Sessions" leftAction={backAction} />

      {revokeSession.isError ? (
        <View className="px-6 pt-4 pb-2">
          <Text className="text-sm text-danger" accessibilityRole="alert">
            {getErrorMessage(revokeSession.error)}
          </Text>
        </View>
      ) : null}

      <FlatList
        data={sessionList}
        keyExtractor={(session) => session.id}
        contentContainerStyle={{
          paddingHorizontal: 20,
          paddingTop: 16,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <SessionCard
            session={item}
            isCurrentDevice={item.device?.deviceId === currentDeviceId}
            onRevoke={handleRevoke}
            isRevoking={
              revokingSessionId === item.id && revokeSession.isPending
            }
          />
        )}
      />
    </SafeAreaView>
  );
}
