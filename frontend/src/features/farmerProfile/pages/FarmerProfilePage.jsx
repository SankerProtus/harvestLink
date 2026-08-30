import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { RatingStars } from "../../../components/ui/RatingStars.jsx";
import { ReviewCard } from "../../../components/ui/ReviewCard.jsx";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { useFarmerReviews } from "../../deliveryTracking/hooks/reviewHooks.js";

function FarmerSummaryHeader({ farmer }) {
  return (
    <View className="items-center pt-2 pb-5">
      <Avatar uri={farmer.avatarUrl} name={farmer.name} size="lg" />
      <Text className="text-[19px] font-extrabold text-ink mt-3 tracking-[-0.3px]">
        {farmer.name}
      </Text>
      <View className="mt-1.5">
        <RatingStars
          rating={farmer.rating}
          reviewCount={farmer.reviewCount}
          size={15}
          showValue={farmer.rating != null}
          emptyLabel="No ratings yet"
        />
      </View>
    </View>
  );
}

export function FarmerProfilePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { farmerId } = route.params;

  const reviews = useFarmerReviews(farmerId, { page: 1, limit: 30 });
  const results = reviews.data?.results ?? [];
  const farmer = reviews.data?.farmer;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Farmer Profile"
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {reviews.isLoading ? (
          <LoadingState label="Loading profile…" />
        ) : reviews.isError ? (
          <ErrorState
            title="Couldn't load this profile"
            message={getErrorMessage(reviews.error)}
            onRetry={() => reviews.refetch()}
          />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 8,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              farmer ? <FarmerSummaryHeader farmer={farmer} /> : null
            }
            ListEmptyComponent={
              <EmptyState
                icon="star"
                title="No reviews yet"
                description="Reviews from buyers will show up here once orders are delivered and rated."
              />
            }
            renderItem={({ item }) => (
              <ReviewCard review={item} showListingTitle />
            )}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
