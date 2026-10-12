import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useReportUser } from "../hooks/reportHooks.js";

const REASONS = [
  ["FRAUD", "Fraud or scam"],
  ["HARASSMENT", "Harassment"],
  ["IMPERSONATION", "Impersonation"],
  ["UNSAFE_BEHAVIOR", "Unsafe behavior"],
  ["OTHER", "Other"],
];

export function ReportUserPage() {
  const navigation = useNavigation();
  const { userId, userName } = useRoute().params;
  const { user } = useAuth();
  const report = useReportUser();
  const [reason, setReason] = useState("FRAUD");
  const [description, setDescription] = useState("");
  const [submitError, setSubmitError] = useState(null);

  function submit() {
    setSubmitError(null);
    if (user?.id === userId) {
      setSubmitError("You cannot report your own account.");
      return;
    }
    report.mutate(
      { userId, reason, description: description.trim(), evidenceUrls: [] },
      { onSuccess: () => navigation.goBack() },
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title="Report account"
        subtitle={`Report ${userName ?? "this user"} for review`}
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <KeyboardAvoidingView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
          <Text className="text-[13px] text-ink-muted mb-4">
            Reports are reviewed by HarvestLink administrators. Provide factual
            details; false reports may be dismissed.
          </Text>
          <Text className="text-[12px] font-semibold text-ink-muted uppercase mb-2">
            Reason
          </Text>
          <View className="flex-row flex-wrap gap-2 mb-5">
            {REASONS.map(([value, label]) => (
              <Text
                key={value}
                onPress={() => setReason(value)}
                className={`px-3 py-2 rounded-full border ${reason === value ? "bg-primary border-primary text-white" : "bg-card border-line text-ink"}`}
              >
                {label}
              </Text>
            ))}
          </View>
          <Card className="p-4 mb-4">
            <TextInput
              placeholder="Describe what happened (minimum 10 characters)"
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={1000}
              textAlignVertical="top"
              className="min-h-[150px] text-[13.5px] text-ink"
            />
          </Card>
          {submitError || report.isError ? (
            <Text
              className="text-[12px] text-danger mb-3"
              accessibilityRole="alert"
            >
              {submitError ?? getErrorMessage(report.error)}
            </Text>
          ) : null}
          <Button
            label="Submit report"
            isLoading={report.isPending}
            disabled={description.trim().length < 10}
            onPress={submit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
