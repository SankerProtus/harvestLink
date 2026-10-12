import { useState } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { SegmentedControl } from "../../../components/ui/SegmentedControl.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSubmitVerificationRequest } from "../hooks/trustHooks.js";
import { Alert } from "../../../lib/alert.js";

export function VerificationRequestPage() {
  const navigation = useNavigation();
  const submit = useSubmitVerificationRequest();

  const [tier, setTier] = useState(1);
  const [providerReference, setProviderReference] = useState("");
  const [notes, setNotes] = useState("");

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  function handleSubmit() {
    submit.mutate(
      {
        provider: "MANUAL",
        tierRequested: tier,
        providerReference: providerReference.trim() || undefined,
        notes: notes.trim() || undefined,
      },
      {
        onSuccess: () => {
          Alert.alert(
            "Submitted",
            "An admin will review your verification request.",
            [{ text: "OK", onPress: () => navigation.goBack() }],
          );
        },
      },
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title="Request verification"
        subtitle="Identity documents are not stored in-app"
        leftAction={backAction}
      />
      <KeyboardAvoidingView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
          <Text className="text-[13px] text-ink-muted mb-5">
            Tier 1 is identity verification. Tier 2 adds farmer-specific trust.
            Provide a reference number or notes for manual review — do not
            upload ID images here.
          </Text>

          <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Tier requested
          </Text>
          <SegmentedControl
            options={[
              { value: 1, label: "Tier 1" },
              { value: 2, label: "Tier 2" },
            ]}
            value={tier}
            onChange={setTier}
          />

          <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mt-6 mb-2">
            Provider reference (optional)
          </Text>
          <TextInput
            placeholder="KYC reference or cooperative ID"
            placeholderTextColor={colors.inkFaint}
            value={providerReference}
            onChangeText={setProviderReference}
            maxLength={255}
            className="rounded-xl2 bg-card border border-line/50 px-4 py-3 text-[13.5px] text-ink mb-4"
          />

          <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
            Notes for reviewer
          </Text>
          <TextInput
            placeholder="How can we verify you?"
            placeholderTextColor={colors.inkFaint}
            value={notes}
            onChangeText={setNotes}
            multiline
            maxLength={500}
            className="rounded-xl2 bg-card border border-line/50 px-4 py-3 text-[13.5px] text-ink min-h-[100px] mb-4"
            textAlignVertical="top"
          />

          {submit.isError ? (
            <Text className="text-[12.5px] text-danger mb-3">
              {getErrorMessage(submit.error)}
            </Text>
          ) : null}

          <Button
            label="Submit for review"
            isLoading={submit.isPending}
            onPress={handleSubmit}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
