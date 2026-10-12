import { useState } from "react";
import {
  View,
  ScrollView,
  Image,
  Linking,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import {
  LoadingState,
  ErrorState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useAdminDispute,
  useStartDisputeReview,
  useResolveDispute,
} from "../hooks/adminHooks.js";
import { Alert } from "../../../lib/alert.js";

export function AdminDisputeDetailPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { disputeId } = route.params;

  const dispute = useAdminDispute(disputeId);
  const startReview = useStartDisputeReview();
  const resolve = useResolveDispute();
  const [resolution, setResolution] = useState("");
  const [outcome, setOutcome] = useState("BUYER");

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  if (dispute.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
        <ScreenHeader title="Dispute" leftAction={backAction} />
        <LoadingState label="Loading dispute…" />
      </SafeAreaView>
    );
  }

  if (dispute.isError || !dispute.data) {
    return (
      <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
        <ScreenHeader title="Dispute" leftAction={backAction} />
        <ErrorState
          message={getErrorMessage(dispute.error)}
          onRetry={() => dispute.refetch()}
        />
      </SafeAreaView>
    );
  }

  const data = dispute.data;
  const isResolved = data.status === "RESOLVED";

  function handleResolve() {
    resolve.mutate(
      { disputeId, outcome, resolution: resolution.trim() },
      {
        onSuccess: () => {
          Alert.alert("Resolved", "The dispute has been closed.", [
            { text: "OK", onPress: () => navigation.goBack() },
          ]);
        },
      },
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader title="Resolve dispute" leftAction={backAction} />
      <KeyboardAvoidingView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
          <Card className="p-4 mb-4">
            <Text className="text-[12px] text-ink-muted uppercase font-semibold">
              Order
            </Text>
            <Text className="text-[15px] font-bold text-ink mt-1">
              {data.order?.listing?.title ?? "—"}
            </Text>
            <Text className="text-[12.5px] text-ink-muted mt-2">
              Buyer: {data.order?.buyer?.fullName} · Farmer:{" "}
              {data.order?.farmer?.fullName}
            </Text>
            <Text className="text-[12.5px] text-ink-muted">
              Status: {data.status.replace(/_/g, " ")} · Reason:{" "}
              {data.reason.replace(/_/g, " ")}
            </Text>
          </Card>

          <Card className="p-4 mb-4">
            <Text className="text-[13px] font-semibold text-ink mb-2">
              Complainant
            </Text>
            <Text className="text-[13.5px] text-ink">
              {data.openedBy?.fullName} ({data.openedBy?.role})
            </Text>
            <Text className="text-[13px] text-ink mt-3 leading-[19px]">
              {data.description}
            </Text>
          </Card>

          {data.evidenceUrls?.length ? (
            <View className="mb-4">
              <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
                Evidence
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {data.evidenceUrls.map((url) => (
                  <PressableImage key={url} url={url} />
                ))}
              </ScrollView>
              <Text className="text-[11.5px] text-ink-muted mt-2">
                Evidence is served from approved platform storage. Do not
                download or share it outside this case review.
              </Text>
            </View>
          ) : (
            <Text className="text-[12.5px] text-ink-muted mb-4">
              No photos attached.
            </Text>
          )}

          {data.resolution ? (
            <Card className="p-4 mb-4 bg-primary-muted/30">
              <Text className="text-[12px] font-semibold text-primary mb-1">
                Resolution on record
              </Text>
              <Text className="text-[13px] text-ink">{data.resolution}</Text>
            </Card>
          ) : null}

          {!isResolved ? (
            <>
              {data.status === "OPEN" ? (
                <Button
                  label="Mark under review"
                  variant="secondary"
                  className="mb-4"
                  isLoading={startReview.isPending}
                  onPress={() => startReview.mutate(disputeId)}
                />
              ) : null}

              <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
                Resolution outcome
              </Text>
              <View className="flex-row gap-2 mb-4">
                {[
                  ["BUYER", "Buyer wins · refund"],
                  ["FARMER", "Farmer wins · release eligible"],
                ].map(([value, label]) => (
                  <Pressable
                    key={value}
                    onPress={() => setOutcome(value)}
                    className={`flex-1 rounded-xl2 border px-3 py-3 ${
                      outcome === value
                        ? "border-primary bg-primary-muted/30"
                        : "border-line/50 bg-card"
                    }`}
                  >
                    <Text className="text-[12px] font-semibold text-ink">
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
                Resolution notes
              </Text>
              <TextInput
                placeholder="Explain the outcome for both parties (min. 10 characters)"
                placeholderTextColor={colors.inkFaint}
                value={resolution}
                onChangeText={setResolution}
                multiline
                maxLength={1000}
                className="rounded-xl2 bg-card border border-line/50 px-4 py-3 text-[13.5px] text-ink min-h-[120px] mb-3"
                textAlignVertical="top"
              />
              {resolve.isError ? (
                <Text className="text-[12px] text-danger mb-2">
                  {getErrorMessage(resolve.error)}
                </Text>
              ) : null}
              <Button
                label="Close dispute"
                isLoading={resolve.isPending}
                disabled={resolution.trim().length < 10}
                onPress={handleResolve}
              />
              {resolution.trim().length < 10 ? (
                <Text className="text-[12px] text-ink-muted mt-2 text-center">
                  Add at least 10 characters explaining the decision.
                </Text>
              ) : null}
            </>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function PressableImage({ url }) {
  return (
    <Pressable
      onPress={() => Linking.openURL(url)}
      accessibilityRole="imagebutton"
      accessibilityLabel="View evidence photo"
    >
      <Image
        source={{ uri: url }}
        className="w-24 h-24 rounded-xl mr-2 bg-line"
      />
    </Pressable>
  );
}
