import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Avatar } from "../../../components/ui/Avatar.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { useInterestForListing } from "../hooks/listingInterestHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";

function BuyerRow({ interest }) {
  const buyerName = interest.buyer?.name ?? "Unknown buyer";

  return (
    <Card className="p-4 mb-3 flex-row items-center">
      <Avatar
        uri={interest.buyer?.avatarUrl}
        name={buyerName}
        size="md"
        className="mr-3"
      />
      <View className="flex-1">
        <Text className="text-[15px] font-extrabold text-ink tracking-[-0.2px]">
          {buyerName}
        </Text>
        {interest.buyer?.phone ? (
          <View className="flex-row items-center mt-1">
            <Feather name="phone" size={11} color={colors.inkFaint} />
            <Text className="text-[12px] text-ink-muted ml-1">
              {interest.buyer.phone}
            </Text>
          </View>
        ) : null}
      </View>
      <View className="items-end">
        <Text className="text-[11px] text-ink-faint font-medium">
          {new Date(interest.createdAt).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
          })}
        </Text>
        <View className="flex-row items-center mt-1 bg-primary-muted rounded-full px-2 py-0.5">
          <Feather name="heart" size={10} color={colors.primary} />
          <Text className="text-[10px] font-bold text-primary ml-1">
            Interested
          </Text>
        </View>
      </View>
    </Card>
  );
}

export function ListingInterestPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { listingId, listingTitle } = route.params;

  const interest = useInterestForListing(listingId);
  const results = interest.data?.results ?? [];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Interested Buyers"
        subtitle={listingTitle}
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />

      {interest.isLoading ? (
        <LoadingState label="Loading interested buyers…" />
      ) : interest.isError ? (
        <ErrorState
          title="Couldn't load interest"
          message={getErrorMessage(interest.error)}
          onRetry={() => interest.refetch()}
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="users"
          title="No interest yet"
          description="You'll see buyers here as they express interest in this listing."
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 24,
          }}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View className="flex-row items-center mb-4 bg-primary-muted rounded-xl2 px-4 py-3 border border-primary/10">
              <Feather name="users" size={16} color={colors.primary} />
              <Text className="text-[13px] font-semibold text-primary ml-2">
                {results.length} buyer{results.length === 1 ? "" : "s"} interested
              </Text>
            </View>
          }
          renderItem={({ item }) => <BuyerRow interest={item} />}
        />
      )}
    </SafeAreaView>
  );
}
