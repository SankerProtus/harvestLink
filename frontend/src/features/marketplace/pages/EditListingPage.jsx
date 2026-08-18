import { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Alert } from "../../../lib/alert.js";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { ListingForm } from "../components/ListingForm.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import {
  useListing,
  useUpdateListing,
  useChangeListingStatus,
} from "../hooks/marketplaceHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { LoadingState, ErrorState } from "../../../components/ui/ScreenState.jsx";

export function EditListingPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { listingId } = route.params;

  const listing = useListing(listingId);
  const updateListing = useUpdateListing();
  const changeStatus = useChangeListingStatus();

  const [statusActionError, setStatusActionError] = useState(null);

  async function handleFormSubmit(updates) {
    try {
      await updateListing.mutateAsync({ listingId, updates });
      navigation.navigate("MyListings");
    } catch {
      // Already captured in updateListing.error and rendered below.
    }
  }

  function handleCancel() {
    navigation.goBack();
  }

  function handleMarkAsSoldPress() {
    Alert.alert(
      "Mark as Sold",
      "This listing will be marked as sold and removed from search results. Continue?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Mark as Sold",
          style: "destructive",
          onPress: () => {
            setStatusActionError(null);
            changeStatus.mutate(
              { listingId, status: "SOLD" },
              {
                onError: (error) => setStatusActionError(error),
                // No manual refetch/invalidation here — useChangeListingStatus
                // already invalidates this listing's query and myListings
                // internally; useListing(listingId) above will pick up the
                // updated status automatically once that invalidation runs.
              },
            );
          },
        },
      ],
    );
  }

  if (listing.isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader
          title="Edit Listing"
          leftAction={
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={() => navigation.goBack()}
            />
          }
        />
        <LoadingState label="Loading listing…" />
      </SafeAreaView>
    );
  }

  if (listing.isError) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader
          title="Edit Listing"
          leftAction={
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={() => navigation.goBack()}
            />
          }
        />
        <ErrorState
          title="Couldn't load this listing"
          message={getErrorMessage(listing.error)}
          onRetry={() => listing.refetch()}
        />
      </SafeAreaView>
    );
  }

  const data = listing.data;

  if (!data) {
    return (
      <SafeAreaView className="flex-1 bg-surface">
        <ScreenHeader
          title="Edit Listing"
          leftAction={
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={() => navigation.goBack()}
            />
          }
        />
        <ErrorState
          icon="file-minus"
          title="Listing not available"
          message="This listing may have been removed or sold."
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <ScreenHeader
        title="Edit Listing"
        subtitle={data.title}
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        {updateListing.isError ? (
          <View className="px-5 pt-4">
            <Text className="text-sm text-danger" accessibilityRole="alert">
              {getErrorMessage(updateListing.error)}
            </Text>
          </View>
        ) : null}

        <View className="px-5 pt-4">
          <ListingForm
            mode="edit"
            initialValues={{
              title: data.title,
              description: data.description ?? "",
              cropType: data.cropType,
              quantity: data.quantity,
              quantityUnit: data.quantityUnit,
              pricePerUnit: data.pricePerUnit,
              location: data.location,
              harvestDate: data.harvestDate
                ? new Date(data.harvestDate)
                : undefined,
              images: data.images ?? [],
            }}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isSubmitting={updateListing.isPending}
          />
        </View>

        {data.status === "ACTIVE" ? (
          <View className="px-5 mt-4">
            <Card>
              <Text className="text-sm font-semibold text-ink mb-1">
                Listing Status
              </Text>
              <Text className="text-xs text-ink-muted mb-3">
                Once marked as sold, this listing can no longer be edited or
                reactivated.
              </Text>
              {statusActionError ? (
                <Text
                  className="text-sm text-danger mb-2"
                  accessibilityRole="alert"
                >
                  {getErrorMessage(statusActionError)}
                </Text>
              ) : null}
              <Button
                label="Mark as Sold"
                onPress={handleMarkAsSoldPress}
                variant="danger"
                isLoading={changeStatus.isPending}
              />
            </Card>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
}
