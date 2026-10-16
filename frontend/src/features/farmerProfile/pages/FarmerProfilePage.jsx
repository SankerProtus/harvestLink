import { View, FlatList } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { TopBar, TopBarButton } from "../../../components/ui/TopBar.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { RatingStars } from "../../../components/ui/RatingStars.jsx";
import { ReviewCard } from "../../../components/ui/ReviewCard.jsx";
import { getErrorMessage } from "../../../../src/lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { useFarmerReviews } from "../../deliveryTracking/hooks/reviewHooks.js";

// Identity + reputation in one block: who they are, and the number buyers
// actually decide on. Reporting lives in the top bar (a deliberate but quiet
// action) instead of a full-width button that competed with the reviews.
function FarmerSummary({ farmer, reviewCount }) {
  const hasRating = farmer.rating != null;
  const count = farmer.reviewCount ?? reviewCount ?? 0;

  return (
    <View className="mb-6">
      <View className="flex-row items-center">
        <Avatar uri={farmer.avatarUrl} name={farmer.name} size="hero" />
        <View className="flex-1 ml-4 min-w-0">
          <View className="flex-row items-center">
            <Text
              className="text-[21px] leading-[26px] font-extrabold text-ink tracking-[-0.4px] shrink"
              numberOfLines={2}
            >
              {farmer.name}
            </Text>
            {farmer.isVerified ? (
              <Ionicons
                name="shield-checkmark"
                size={18}
                color={colors.primary}
                style={{ marginLeft: 6 }}
                accessibilityLabel="Verified farmer"
              />
            ) : null}
          </View>
          <Text className="text-[13.5px] text-ink-muted mt-0.5">Farmer</Text>
        </View>
      </View>

      <View
        className="flex-row items-center bg-white rounded-2xl border border-line/60 mt-5 px-4 py-3.5"
        style={shadows.card}
      >
        <Text
          className="text-[34px] leading-[38px] font-extrabold text-ink tracking-[-1px]"
          style={TABULAR_NUMS}
        >
          {hasRating ? Number(farmer.rating).toFixed(1) : "–"}
        </Text>
        <View className="ml-3.5">
          <RatingStars
            rating={farmer.rating}
            size={16}
            showValue={false}
            emptyLabel="No ratings yet"
          />
          <Text className="text-[12.5px] text-ink-muted mt-1">
            {count > 0
              ? `${count} review${count === 1 ? "" : "s"} from buyers`
              : "No reviews yet"}
          </Text>
        </View>
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
      <TopBar
        title="Farmer profile"
        onBack={() => navigation.goBack()}
        right={
          farmer ? (
            <TopBarButton
              icon="flag"
              accessibilityLabel="Report this account"
              onPress={() =>
                navigation.navigate("ReportUser", {
                  userId: farmer.id,
                  userName: farmer.name,
                })
              }
            />
          ) : null
        }
      />

      <KeyboardAvoider className="flex-1">
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
              paddingBottom: 32,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              farmer ? (
                <>
                  <FarmerSummary farmer={farmer} reviewCount={results.length} />
                  {results.length > 0 ? (
                    <Text
                      accessibilityRole="header"
                      className="text-[17px] font-extrabold text-ink tracking-[-0.2px] mb-3"
                    >
                      Reviews
                    </Text>
                  ) : null}
                </>
              ) : null
            }
            ListEmptyComponent={
              <EmptyState
                icon="star"
                title="No reviews yet"
                description="Reviews appear here after a buyer's order is delivered and rated."
              />
            }
            renderItem={({ item }) => (
              <ReviewCard review={item} showListingTitle />
            )}
          />
        )}
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
