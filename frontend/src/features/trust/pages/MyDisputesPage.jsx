import { View, ScrollView, Pressable, Image } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import {
  LoadingState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useMyDisputes } from "../hooks/trustHooks.js";

const STATUS_COLORS = {
  OPEN: colors.warning,
  UNDER_REVIEW: colors.primary,
  RESOLVED: colors.success,
};

function formatStatus(status) {
  return status.replace(/_/g, " ").toLowerCase();
}

export function MyDisputesPage() {
  const navigation = useNavigation();
  const disputes = useMyDisputes();

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader title="My disputes" leftAction={backAction} />
      {disputes.isLoading ? (
        <LoadingState label="Loading disputes…" />
      ) : disputes.isError ? (
        <ErrorState
          title="Couldn't load disputes"
          message={getErrorMessage(disputes.error)}
          onRetry={() => disputes.refetch()}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
          {(disputes.data ?? []).length === 0 ? (
            <View className="items-center py-16">
              <Feather name="shield" size={32} color={colors.inkFaint} />
              <Text className="text-[14px] text-ink-muted mt-3 text-center">
                You have no disputes yet.
              </Text>
            </View>
          ) : (
            (disputes.data ?? []).map((dispute) => (
              <Card key={dispute.id} className="p-4 mb-3">
                <View className="flex-row justify-between items-start">
                  <View className="flex-1 pr-3">
                    <Text className="text-[14px] font-bold text-ink">
                      {dispute.order?.listing?.title ?? "Order dispute"}
                    </Text>
                    <Text className="text-[12px] text-ink-muted mt-1">
                      {dispute.reason.replace(/_/g, " ")} ·{" "}
                      {new Date(dispute.createdAt).toLocaleDateString()}
                    </Text>
                  </View>
                  <View
                    className="rounded-full px-2.5 py-1"
                    style={{
                      backgroundColor: `${STATUS_COLORS[dispute.status] ?? colors.line}22`,
                    }}
                  >
                    <Text
                      className="text-[10.5px] font-bold capitalize"
                      style={{
                        color: STATUS_COLORS[dispute.status] ?? colors.inkMuted,
                      }}
                    >
                      {formatStatus(dispute.status)}
                    </Text>
                  </View>
                </View>
                <Text className="text-[13px] text-ink mt-3" numberOfLines={3}>
                  {dispute.description}
                </Text>
                {dispute.resolution ? (
                  <Text className="text-[12.5px] text-ink-muted mt-2 italic">
                    Resolution: {dispute.resolution}
                  </Text>
                ) : null}
                {dispute.evidenceUrls?.length ? (
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="mt-3"
                  >
                    {dispute.evidenceUrls.map((url) => (
                      <Image
                        key={url}
                        source={{ uri: url }}
                        className="w-16 h-16 rounded-lg mr-2 bg-line"
                      />
                    ))}
                  </ScrollView>
                ) : null}
              </Card>
            ))
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
