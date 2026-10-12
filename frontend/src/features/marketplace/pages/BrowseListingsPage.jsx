import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  FlatList,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";

import { Alert } from "../../../lib/alert.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { shadows } from "../../../theme/shadows.js";

import { Button } from "../../../components/ui/Button.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { ErrorState, EmptyState } from "../../../components/ui/ScreenState.jsx";
import { ProduceCardSkeleton } from "../../../components/ui/Skeleton.jsx";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import { ListingFilters } from "../components/ListingFilters.jsx";
import { ProduceCard } from "../components/ProduceCard.jsx";
import { CROP_LIST } from "../lib/cropMeta.js";
import { listingSearchSchema } from "../schemas/marketplaceSchemas.js";
import { useInfiniteListings } from "../hooks/marketplaceHooks.js";
import { useToggleSaveListing } from "../hooks/useToggleSaveListing.js";

const PAGE_SIZE = 20;
const EMPTY_PANEL = {
  quantityUnit: undefined,
  location: "",
  minPrice: "",
  maxPrice: "",
};

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
];

function buildQueryFilters({ panel, cropType, q, sort }) {
  const { quantityUnit, location, minPrice, maxPrice } = panel;
  return {
    limit: PAGE_SIZE,
    // Only sent when used, so the app still works against an older backend.
    ...(sort !== "newest" ? { sort } : {}),
    ...(q ? { q } : {}),
    ...(cropType ? { cropType } : {}),
    ...(quantityUnit ? { quantityUnit } : {}),
    ...(location?.trim() ? { location: location.trim() } : {}),
    ...(minPrice ? { minPrice: Number(minPrice) } : {}),
    ...(maxPrice ? { maxPrice: Number(maxPrice) } : {}),
  };
}

function CropChip({ label, emoji, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: isSelected }}
      style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}
      className={`flex-row items-center rounded-full mr-2 border px-3.5 min-h-[44px] ${
        isSelected ? "bg-primary border-primary" : "bg-white border-line"
      }`}
    >
      {emoji ? (
        <Text
          style={{ fontSize: 16, marginRight: 6 }}
          allowFontScaling={false}
          accessible={false}
        >
          {emoji}
        </Text>
      ) : null}
      <Text
        className={`text-[13.5px] font-semibold ${isSelected ? "text-white" : "text-ink-secondary"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function BrowseListingsPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user, isAuthenticated } = useAuth();
  const unreadNotificationCount = useUnreadNotificationCount();
  const { isSaved, toggle } = useToggleSaveListing();
  const searchRef = useRef(null);

  const [searchText, setSearchText] = useState("");
  const [debounced, setDebounced] = useState("");
  const [cropType, setCropType] = useState(undefined);
  const [sort, setSort] = useState("newest");
  const [panel, setPanel] = useState(EMPTY_PANEL);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(searchText), 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  // The backend requires at least 2 characters.
  const q = debounced.trim().length >= 2 ? debounced.trim() : "";

  // Presets sent from the home screen (crop tile / search bar tap).
  useEffect(() => {
    const { cropType: presetCrop, focusSearch } = route.params ?? {};
    if (presetCrop) setCropType(presetCrop);
    if (focusSearch) setTimeout(() => searchRef.current?.focus(), 200);
    if (presetCrop || focusSearch) {
      navigation.setParams({ cropType: undefined, focusSearch: undefined });
    }
  }, [route.params, navigation]);

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSearchSchema),
    defaultValues: EMPTY_PANEL,
  });
  const formValues = watch();

  function onApply(values) {
    const { quantityUnit, location, minPrice, maxPrice } = values;
    setPanel({ quantityUnit, location, minPrice, maxPrice });
  }

  function onResetPanel() {
    reset(EMPTY_PANEL);
    setPanel(EMPTY_PANEL);
    setCropType(undefined);
  }

  function clearAll() {
    onResetPanel();
    setSearchText("");
    setDebounced("");
    setSort("newest");
  }

  const queryFilters = useMemo(
    () => buildQueryFilters({ panel, cropType, q, sort }),
    [panel, cropType, q, sort],
  );
  const feed = useInfiniteListings(queryFilters);

  const results = useMemo(() => {
    const seen = new Set();
    return (feed.data?.pages ?? [])
      .flatMap((page) => page.results)
      .filter((item) => !seen.has(item.id) && seen.add(item.id));
  }, [feed.data]);

  const total = feed.data?.pages?.[0]?.pagination?.total ?? 0;
  const hasPanelFilters = Boolean(
    panel.quantityUnit ||
    panel.location?.trim() ||
    panel.minPrice ||
    panel.maxPrice,
  );
  const hasAnyFilter = Boolean(q || cropType || hasPanelFilters);

  // Pad odd counts so the last card keeps column width.
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
          onToggleSave={item.farmerId === user?.id ? undefined : toggle}
        />
      ),
    [isSaved, toggle, openListing, user?.id],
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

  function openSortMenu() {
    Alert.alert("Sort by", "Choose how listings are ordered.", [
      ...SORT_OPTIONS.map((option) => ({
        text: option.value === sort ? `${option.label} ✓` : option.label,
        onPress: () => setSort(option.value),
      })),
      { text: "Cancel", style: "cancel" },
    ]);
  }

  const sortLabel =
    SORT_OPTIONS.find((o) => o.value === sort)?.label ?? "Newest";

  const header = (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 14 }}
        style={{ flexGrow: 0 }}
      >
        <CropChip
          label="All"
          isSelected={!cropType}
          onPress={() => setCropType(undefined)}
        />
        {CROP_LIST.map((crop) => (
          <CropChip
            key={crop.value}
            label={crop.label}
            emoji={crop.emoji}
            isSelected={cropType === crop.value}
            onPress={() =>
              setCropType(cropType === crop.value ? undefined : crop.value)
            }
          />
        ))}
      </ScrollView>

      <View className="px-5 pt-3">
        <ListingFilters
          value={formValues}
          onQuantityUnitChange={(unit) => setValue("quantityUnit", unit)}
          onLocationChange={(text) => setValue("location", text)}
          onMinPriceChange={(text) => setValue("minPrice", text)}
          onMaxPriceChange={(text) => setValue("maxPrice", text)}
          errors={{
            location: errors.location?.message,
            minPrice: errors.minPrice?.message,
            maxPrice: errors.maxPrice?.message,
          }}
          onApply={handleSubmit(onApply)}
          onReset={onResetPanel}
        />
      </View>

      <View className="flex-row items-center justify-between px-5 pb-3">
        <Text
          accessibilityLiveRegion="polite"
          className="text-[13px] font-semibold text-ink-secondary"
        >
          {feed.isLoading
            ? "Loading…"
            : `${total} ${total === 1 ? "listing" : "listings"}`}
        </Text>
        <Pressable
          onPress={openSortMenu}
          accessibilityRole="button"
          accessibilityLabel={`Sort: ${sortLabel}. Change sort order.`}
          hitSlop={8}
          className="flex-row items-center min-h-[44px]"
        >
          <Feather name="sliders" size={14} color={colors.primary} />
          <Text className="text-[13px] font-bold text-primary ml-1.5">
            {sortLabel}
          </Text>
        </Pressable>
      </View>
    </View>
  );

  let emptyContent = null;
  if (feed.isLoading) {
    emptyContent = (
      <View className="flex-row px-5" style={{ gap: 12 }}>
        <ProduceCardSkeleton />
        <ProduceCardSkeleton />
      </View>
    );
  } else if (feed.isError) {
    emptyContent = (
      <ErrorState
        title="Couldn't load listings"
        message={getErrorMessage(feed.error)}
        onRetry={() => feed.refetch()}
      />
    );
  } else if (results.length === 0) {
    emptyContent = (
      <EmptyState
        icon="search"
        title={
          q
            ? `No results for “${q}”`
            : hasAnyFilter
              ? "No listings match your filters"
              : "No produce listed yet"
        }
        description={
          q
            ? "Check the spelling or try a broader search."
            : hasAnyFilter
              ? "Try widening your search or clearing filters."
              : "New produce will appear here as farmers list it."
        }
        action={
          hasAnyFilter ? (
            <Button
              label="Clear search and filters"
              onPress={clearAll}
              variant="secondary"
            />
          ) : undefined
        }
      />
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title="Marketplace"
        tone="tinted"
        leftAction={
          navigation.canGoBack() ? (
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={() => navigation.goBack()}
            />
          ) : undefined
        }
        rightAction={
          isAuthenticated ? (
            <HeaderActionButton
              icon="bell"
              size={18}
              accessibilityLabel="Notifications"
              badgeCount={unreadNotificationCount.data ?? 0}
              onPress={() => navigation.navigate("Notifications")}
            />
          ) : null
        }
      >
        <View
          className="flex-row items-center bg-white rounded-xl px-3 min-h-[48px]"
          style={shadows.md}
        >
          <Feather name="search" size={18} color={colors.inkMuted} />
          <TextInput
            ref={searchRef}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search produce, farmers or places"
            placeholderTextColor={colors.inkFaint}
            accessibilityLabel="Search listings"
            returnKeyType="search"
            autoCorrect={false}
            className="flex-1 px-3 py-3 text-[15px] text-ink"
          />
          {searchText ? (
            <Pressable
              onPress={() => setSearchText("")}
              accessibilityRole="button"
              accessibilityLabel="Clear search"
              hitSlop={10}
            >
              <Feather name="x-circle" size={18} color={colors.inkMuted} />
            </Pressable>
          ) : null}
        </View>
      </ScreenHeader>

      <FlatList
        data={feed.isLoading || feed.isError ? [] : gridData}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: 12, paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={header}
        ListEmptyComponent={emptyContent}
        renderItem={renderItem}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.6}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
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
              accessibilityLabel="Couldn't load more listings. Tap to retry."
              className="items-center justify-center min-h-[56px] mt-3"
            >
              <Text className="text-[13.5px] font-bold text-primary">
                Couldn't load more. Tap to retry
              </Text>
            </Pressable>
          ) : results.length > 0 && !feed.hasNextPage ? (
            <Text className="text-[12.5px] text-ink-muted text-center pt-5">
              You've seen all {total} {total === 1 ? "listing" : "listings"}
            </Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
}
