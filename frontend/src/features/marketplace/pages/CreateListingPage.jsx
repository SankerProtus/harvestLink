import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
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

  async function handleSubmit(values) {
    try {
      await createListing.mutateAsync(values);
      // "MyListings" is a tab registered inside the nested
      // ProtectedTabNavigator, not a screen on this Stack (ProtectedStack)
      // — navigating to it by name directly fails with "was not handled by
      // any navigator". Target the parent tab navigator explicitly and ask
      // it to switch to that tab.
      navigation.navigate("ProtectedTabs", { screen: "MyListings" });
    } catch {
      // Already captured in createListing.error and rendered below.
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Create New Listing"
        subtitle={STEP_SUBTITLES[step]}
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={handleCancel}
          />
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
