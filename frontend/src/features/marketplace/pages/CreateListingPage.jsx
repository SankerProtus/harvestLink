import { useCallback, useRef, useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { ListingForm } from "../components/ListingForm.jsx";
import { useCreateListing } from "../hooks/marketplaceHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  HeaderActionButton,
  ScreenHeader,
  StepIndicator,
} from "../../../components/ui/ScreenHeader.jsx";

const STEP_SUBTITLES = {
  1: "Step 1 of 2 · Produce details",
  2: "Step 2 of 2 · Photos",
};

export function CreateListingPage() {
  const navigation = useNavigation();
  const createListing = useCreateListing();
  const [step, setStep] = useState(1);

  const [formKey, setFormKey] = useState(0);
  const hasMountedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      if (!hasMountedRef.current) {
        // Skip the very first focus (initial mount already gives us a
        // fresh form) so we don't remount it twice on first load.
        hasMountedRef.current = true;
        return;
      }
      setFormKey((k) => k + 1);
      setStep(1);
    }, []),
  );

  async function handleSubmit(values) {
    try {
      await createListing.mutateAsync(values);
      navigation.navigate("ProtectedTabs", { screen: "Listings" });
    } catch {
      // Already captured in createListing.error and rendered below.
    }
  }

  const canGoBack = navigation.canGoBack();

  function handleCancel() {
    if (canGoBack) {
      navigation.goBack();
      return;
    }
    navigation.navigate("ProtectedTabs", { screen: "Home" });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title={canGoBack ? "Create New Listing" : "Sell Your Harvest"}
        subtitle={STEP_SUBTITLES[step]}
        leftAction={
          canGoBack ? (
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={handleCancel}
            />
          ) : null
        }
        rightAction={<StepIndicator current={step} total={2} />}
      />

      {createListing.isError ? (
        <View className="mx-5 mt-4 rounded-2xl bg-danger/10 border border-danger/20 px-4 py-3 flex-row items-center gap-2.5">
          <Feather name="alert-circle" size={16} color="#EF4444" />
          <Text
            className="text-[13px] text-danger flex-1 leading-[18px]"
            accessibilityRole="alert"
          >
            {getErrorMessage(createListing.error)}
          </Text>
        </View>
      ) : null}

      <View className="px-5 flex-1 pt-5">
        <ListingForm
          key={formKey}
          mode="create"
          stepped
          onStepChange={setStep}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={createListing.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
