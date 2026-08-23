import { View, FlatList } from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { useInterestSummaryForFarmer } from "../hooks/listingInterestHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";
import { Button } from "../../../components/ui/Button.jsx";
import { SectionHeader } from "../../../components/ui/SectionHeader.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { ListingCard } from "../components/ListingCard.jsx";
import { useMyListings } from "../hooks/marketplaceHooks.js";
import { useSyncStatus } from "../../../lib/useSyncStatus.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  LoadingState,
  ErrorState,
  EmptyState,
  Banner,
} from "../../../components/ui/ScreenState.jsx";

export function MyListingsPage() {
  const navigation = useNavigation();
  const myListings = useMyListings();
  const { pendingCount, isOnline } = useSyncStatus();
  const interestSummary = useInterestSummaryForFarmer();
  const unreadNotificationCount = useUnreadNotificationCount();
  const interestCountByListingId = new Map(
    (interestSummary.data ?? []).map((row) => [
      row.listingId,
      row.interestCount,
    ]),
  );

  const listings = myListings.data ?? [];

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="My Listings"
        subtitle="Manage and track your harvests"
        leftAction={
          <HeaderActionButton
            icon="menu"
            size={20}
            accessibilityLabel="Menu"
            onPress={() => navigation.navigate("Profile")}
          />
        }
        rightAction={
          <HeaderActionButton
            icon="bell"
            size={19}
            accessibilityLabel="Notifications"
            badgeCount={unreadNotificationCount.data ?? 0}
            onPress={() => navigation.navigate("Notifications")}
          />
        }
      />

      <View className="px-5 pt-5 pb-3">
        {!isOnline || pendingCount > 0 ? (
          <View className="mb-5">
            <Banner
              variant="warning"
              icon="wifi-off"
              title={
                pendingCount > 0
                  ? `${pendingCount} harvest${pendingCount === 1 ? "" : "es"} stored offline`
                  : "You're offline"
              }
              message={
                pendingCount > 0
                  ? "They will sync automatically when you're back online."
                  : "New listings will be saved on this device for now."
              }
            />
          </View>
        ) : null}

        <SectionHeader
          title="Your listings"
          subtitle={`${listings.length} total`}
        />
      </View>

      {myListings.isLoading ? (
        <LoadingState label="Loading your listings…" />
      ) : myListings.isError ? (
        <ErrorState
          title="Couldn't load your listings"
          message={getErrorMessage(myListings.error)}
          onRetry={() => myListings.refetch()}
        />
      ) : listings.length === 0 ? (
        <EmptyState
          icon="package"
          title="No listings yet"
          description="Start selling by logging your first harvest."
          action={
            <Button
              label="Log New Harvest"
              icon="plus"
              onPress={() => navigation.navigate("CreateListing")}
            />
          }
        />
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 16 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ListingCard
              listing={item}
              interestCount={interestCountByListingId.get(item.id) ?? 0}
              onViewInterest={(listing) =>
                navigation.navigate("ListingInterest", {
                  listingId: listing.id,
                  listingTitle: listing.title,
                })
              }
              onPress={() => {
                if (item.syncStatus === "pending") {
                  Alert.alert(
                    "Still syncing",
                    "This listing was saved on this device and hasn't synced to the server yet, so it can't be edited until it does. It will sync automatically once you're online.",
                  );
                  return;
                }
                navigation.navigate("EditListing", { listingId: item.id });
              }}
            />
          )}
        />
      )}

      {listings.length > 0 ? (
        <View className="px-5 pt-2 pb-5 bg-surface">
          <Button
            label="Log New Harvest"
            icon="plus"
            onPress={() => navigation.navigate("CreateListing")}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
