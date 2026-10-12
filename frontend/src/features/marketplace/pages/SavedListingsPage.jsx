import { useCallback, useMemo } from "react";
import { View, FlatList, Pressable, RefreshControl } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { Button } from "../../../components/ui/Button.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { EmptyState, ErrorState } from "../../../components/ui/ScreenState.jsx";
import { ProduceCardSkeleton } from "../../../components/ui/Skeleton.jsx";

import { ProduceCard } from "../components/ProduceCard.jsx";
import { useInfiniteSavedListings } from "../hooks/savedListingHooks.js";
import { useToggleSaveListing } from "../hooks/useToggleSaveListing.js";

export function SavedListingsPage() {
  const navigation = useNavigation();
  const feed = useInfiniteSavedListings();
  const { savedIds, isSaved, toggle } = useToggleSaveListing();

  // Unsaving removes the card immediately, without waiting for the refetch.
  const results = useMemo(() => {
    const seen = new Set();
    return (feed.data?.pages ?? [])
      .flatMap((page) => page.results)
      .filter((item) => !seen.has(item.id) && seen.add(item.id))
      .filter((item) => (savedIds.data ? savedIds.data.has(item.id) : true));
  }, [feed.data, savedIds.data]);

  const gridData = useMemo(
    () =>
      results.length % 2 === 1
        ? [...results, { id: "__spacer", spacer: true }]
        : results,
    [results],
  );

  const openListing = useCallback(
    (listing) =>
      navigation.navigate("ListingDetail", { listingId: listing.id }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }) =>
      item.spacer ? (
        <View style={{ flex: 1 }} />
      ) : (
        <ProduceCard
          listing={item}
          isSaved={isSaved(item.id)}
          onPress={openListing}
          onToggleSave={toggle}
        />
      ),
    [isSaved, toggle, openListing],
  );

  function handleEndReached() {
    if (
      feed.hasNextPage &&
      !feed.isFetchingNextPage &&
      !feed.isFetchNextPageError
    ) {
      feed.fetchNextPage();
    }
  }

  let emptyContent = null;
  if (feed.isLoading) {
    emptyContent = (
      <View className="flex-row px-5 pt-4" style={{ gap: 12 }}>
        <ProduceCardSkeleton />
        <ProduceCardSkeleton />
      </View>
    );
  } else if (feed.isError) {
    emptyContent = (
      <ErrorState
        title="Couldn't load saved listings"
        message={getErrorMessage(feed.error)}
        onRetry={() => feed.refetch()}
      />
    );
  } else if (results.length === 0) {
    emptyContent = (
      <EmptyState
        icon="bookmark"
        title="Nothing saved yet"
        description="Tap the heart on any listing to keep it here for later."
        action={
          <Button
            label="Browse the market"
            variant="secondary"
            onPress={() =>
              navigation.navigate("ProtectedTabs", { screen: "Marketplace" })
            }
          />
        }
      />
    );
  }

  const total = results.length;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title="Saved"
        subtitle={
          feed.isLoading
            ? undefined
            : `${total} ${total === 1 ? "listing" : "listings"}`
        }
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />

      <FlatList
        data={feed.isLoading || feed.isError ? [] : gridData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={emptyContent}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.6}
        initialNumToRender={6}
        windowSize={7}
        removeClippedSubviews
        refreshControl={
          <RefreshControl
            refreshing={
              feed.isRefetching && !feed.isFetchingNextPage && !feed.isLoading
            }
            onRefresh={() => feed.refetch()}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        ListFooterComponent={
          feed.isFetchingNextPage ? (
            <View className="flex-row px-5 pt-3" style={{ gap: 12 }}>
              <ProduceCardSkeleton />
              <ProduceCardSkeleton />
            </View>
          ) : feed.isFetchNextPageError ? (
            <Pressable
              onPress={() => feed.fetchNextPage()}
              accessibilityRole="button"
              accessibilityLabel="Couldn't load more. Tap to retry."
              className="items-center justify-center min-h-[56px] mt-3"
            >
              <Text className="text-[13.5px] font-bold text-primary">
                Couldn't load more. Tap to retry
              </Text>
            </Pressable>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
