import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { TopBar } from "../../../components/ui/TopBar.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useSubmitVerificationRequest } from "../hooks/trustHooks.js";
import { useProfile } from "../../auth/hooks/authHooks.js";

const NOTES_MAX = 500;
const REFERENCE_MAX = 255;

const TIERS = {
  1: {
    title: "Identity check",
    description: "Confirms you are who you say you are.",
    icon: "user-check",
  },
  2: {
    title: "Trusted farmer",
    description: "Adds farm-specific trust on top of your identity check.",
    icon: "award",
  },
};

function TierCard({ tier, selected, onPress }) {
  const info = TIERS[tier];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      accessibilityLabel={`Tier ${tier}: ${info.title}. ${info.description}`}
      style={({ pressed }) => ({ opacity: pressed ? 0.9 : 1, ...shadows.sm })}
      className={`flex-row items-center rounded-2xl p-4 mb-3 border-[1.5px] ${
        selected ? "border-primary bg-primary-light" : "border-line bg-white"
      }`}
    >
      <View
        className="items-center justify-center"
        style={{
          width: 42,
          height: 42,
          borderRadius: 21,
          backgroundColor: selected ? colors.primary : colors.primaryLight,
        }}
      >
        <Feather
          name={info.icon}
          size={19}
          color={selected ? colors.white : colors.primary}
        />
      </View>
      <View className="flex-1 ml-3.5">
        <Text className="text-[15px] font-extrabold text-ink">
          Tier {tier} · {info.title}
        </Text>
        <Text className="text-[13px] text-ink-secondary mt-0.5 leading-[18px]">
          {info.description}
        </Text>
      </View>
      <View
        className="items-center justify-center ml-2"
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          borderWidth: selected ? 0 : 1.5,
          borderColor: colors.lineStrong,
          backgroundColor: selected ? colors.primary : "transparent",
        }}
      >
        {selected ? (
          <Feather name="check" size={13} color={colors.white} />
        ) : null}
      </View>
    </Pressable>
  );
}

function FieldLabel({ children, optional }) {
  return (
    <View className="flex-row items-baseline mb-2">
      <Text className="text-[14px] font-bold text-ink">{children}</Text>
      {optional ? (
        <Text className="text-[12.5px] text-ink-muted ml-2">optional</Text>
      ) : null}
    </View>
  );
}

function StatusScreen({ icon, title, body, actionLabel, onAction }) {
  return (
    <View className="flex-1 items-center justify-center px-8">
      <View
        className="items-center justify-center mb-5"
        style={{
          width: 76,
          height: 76,
          borderRadius: 38,
          backgroundColor: colors.primaryLight,
        }}
      >
        <Feather name={icon} size={32} color={colors.primary} />
      </View>
      <Text
        accessibilityRole="header"
        className="text-[22px] font-extrabold text-ink text-center tracking-[-0.4px]"
      >
        {title}
      </Text>
      <Text className="text-[14.5px] text-ink-secondary text-center mt-2 leading-[22px]">
        {body}
      </Text>
      <View className="self-stretch mt-8">
        <Button label={actionLabel} size="lg" onPress={onAction} />
      </View>
    </View>
  );
}

export function VerificationRequestPage() {
  const navigation = useNavigation();
  const submit = useSubmitVerificationRequest();
  const profile = useProfile();

  const isFarmer = profile.data?.role === "FARMER";
  const level = profile.data?.verificationLevel ?? 0;

  // Only offer what the person can actually ask for: buyers get Tier 1; farmers
  // who already passed Tier 1 are moved on to Tier 2 instead of re-requesting it.
  const availableTiers = isFarmer ? (level >= 1 ? [2] : [1, 2]) : [1];
  const alreadyMaxed = isFarmer ? level >= 2 : level >= 1;
  const defaultTier = availableTiers[0];

  const [chosenTier, setChosenTier] = useState(null);
  const [providerReference, setProviderReference] = useState("");
  const [notes, setNotes] = useState("");
  const [needsDetails, setNeedsDetails] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const tier = availableTiers.includes(chosenTier) ? chosenTier : defaultTier;
  const hasDetails = providerReference.trim() || notes.trim();

  function handleSubmit() {
    // A request with nothing in it gives the reviewer nothing to check.
    if (!hasDetails) {
      setNeedsDetails(true);
      return;
    }
    setNeedsDetails(false);
    submit.mutate(
      {
        provider: "MANUAL",
        tierRequested: tier,
        providerReference: providerReference.trim() || undefined,
        notes: notes.trim() || undefined,
      },
      { onSuccess: () => setSubmitted(true) },
    );
  }

  const goBack = () => navigation.goBack();

  return (
    <SafeAreaView
      className="flex-1 bg-surface"
      edges={["top", "bottom", "left", "right"]}
    >
      <TopBar
        title="Get verified"
        subtitle="Reviewed by the HarvestLink team"
        onBack={goBack}
      />

      {submitted ? (
        <StatusScreen
          icon="check"
          title="Request sent"
          body="Our team will review your request. Your verification tier updates once a decision is made."
          actionLabel="Done"
          onAction={goBack}
        />
      ) : alreadyMaxed ? (
        <StatusScreen
          icon="shield"
          title="You're fully verified"
          body="Your account is already at the highest verification tier available to you."
          actionLabel="Back to profile"
          onAction={goBack}
        />
      ) : (
        <KeyboardAvoider className="flex-1">
          <ScrollView
            contentContainerStyle={{
              padding: 20,
              paddingTop: 8,
              paddingBottom: 24,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View
              className="flex-row rounded-2xl p-4 mb-6"
              style={{ backgroundColor: colors.infoMuted }}
              accessible
              accessibilityLabel="Privacy note. Identity documents are not stored in the app. Share a reference number or notes only."
            >
              <Feather
                name="lock"
                size={18}
                color={colors.info}
                style={{ marginTop: 1 }}
              />
              <View className="flex-1 ml-3">
                <Text className="text-[14px] font-bold text-ink">
                  Don't upload ID photos here
                </Text>
                <Text className="text-[13px] text-ink-secondary mt-0.5 leading-[19px]">
                  We don't store identity documents in the app. Share a
                  reference number or a short note and a reviewer will follow
                  up.
                </Text>
              </View>
            </View>

            {availableTiers.length > 1 ? (
              <>
                <FieldLabel>What would you like verified?</FieldLabel>
                <View accessibilityRole="radiogroup">
                  {availableTiers.map((t) => (
                    <TierCard
                      key={t}
                      tier={t}
                      selected={tier === t}
                      onPress={() => setChosenTier(t)}
                    />
                  ))}
                </View>
              </>
            ) : (
              <View className="mb-1">
                <FieldLabel>Requesting</FieldLabel>
                <TierCard tier={tier} selected onPress={() => {}} />
              </View>
            )}

            <View className="mt-3">
              <FieldLabel optional>Reference number</FieldLabel>
              <TextInput
                placeholder="KYC reference or cooperative ID"
                placeholderTextColor={colors.inkFaint}
                value={providerReference}
                onChangeText={(v) => {
                  setProviderReference(v);
                  if (v.trim()) setNeedsDetails(false);
                }}
                maxLength={REFERENCE_MAX}
                autoCapitalize="characters"
                autoCorrect={false}
                returnKeyType="next"
                accessibilityLabel="Reference number, optional"
                className="rounded-xl2 bg-white border-[1.5px] border-line px-4 py-3.5 text-[15px] text-ink min-h-[52px]"
              />
            </View>

            <View className="mt-5">
              <View className="flex-row items-baseline justify-between">
                <FieldLabel optional>Note for the reviewer</FieldLabel>
                <Text
                  className="text-[12px] text-ink-faint mb-2"
                  accessibilityLabel={`${notes.length} of ${NOTES_MAX} characters`}
                >
                  {notes.length}/{NOTES_MAX}
                </Text>
              </View>
              <TextInput
                placeholder="Tell us how we can confirm who you are, e.g. your cooperative, farm location, or a contact who can vouch for you."
                placeholderTextColor={colors.inkFaint}
                value={notes}
                onChangeText={(v) => {
                  setNotes(v);
                  if (v.trim()) setNeedsDetails(false);
                }}
                multiline
                maxLength={NOTES_MAX}
                textAlignVertical="top"
                accessibilityLabel="Note for the reviewer, optional"
                className={`rounded-xl2 bg-white border-[1.5px] px-4 py-3.5 text-[15px] text-ink min-h-[130px] ${
                  needsDetails ? "border-danger" : "border-line"
                }`}
              />
              {needsDetails ? (
                <Text
                  className="text-[12.5px] text-danger mt-2"
                  accessibilityRole="alert"
                >
                  Add a reference number or a note so the reviewer knows how to
                  verify you.
                </Text>
              ) : null}
            </View>

            {submit.isError ? (
              <View
                className="flex-row items-center rounded-xl p-3 mt-5"
                style={{ backgroundColor: colors.dangerMuted }}
                accessibilityRole="alert"
              >
                <Feather name="alert-circle" size={16} color={colors.danger} />
                <Text className="flex-1 ml-2.5 text-[13px] text-danger">
                  {getErrorMessage(submit.error)}
                </Text>
              </View>
            ) : null}
          </ScrollView>

          <View
            className="bg-white border-t border-line/60 px-5 pt-3 pb-3"
            style={shadows.md}
          >
            <Button
              label="Submit for review"
              icon="send"
              size="lg"
              isLoading={submit.isPending}
              onPress={handleSubmit}
            />
          </View>
        </KeyboardAvoider>
      )}
    </SafeAreaView>
  );
}
