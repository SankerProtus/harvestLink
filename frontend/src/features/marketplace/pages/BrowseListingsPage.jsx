import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Feather } from "@expo/vector-icons";

import { Alert } from "../../../lib/alert.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { CROP_TYPES } from "../schemas/marketplaceSchemas.js";

import {
  useExpressedInterestIds,
  useExpressInterest,
  useWithdrawInterest,
} from "../hooks/listingInterestHooks.js";
import {
  useSavedListingIds,
  useSaveListing,
  useUnsaveListing,
} from "../hooks/savedListingHooks.js";
import { useUnreadNotificationCount } from "../../notifications/hooks/notificationHooks.js";

import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { ListingFilters } from "../components/ListingFilters.jsx";
import { ListingCard } from "../components/ListingCard.jsx";

import { listingSearchSchema } from "../schemas/marketplaceSchemas.js";
import { useListings } from "../hooks/marketplaceHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  LoadingState,
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";

const CROP_TYPE_LIST = Object.values(CROP_TYPES);
const DEFAULT_FILTERS = { page: 1, limit: 20 };

function formatCropLabel(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function toApiFilters(formValues) {
  const { minPrice, maxPrice, ...rest } = formValues;
  return {
    ...rest,
    ...(minPrice ? { minPrice: Number(minPrice) } : {}),
    ...(maxPrice ? { maxPrice: Number(maxPrice) } : {}),
  };
}

export function BrowseListingsPage() {
  const navigation = useNavigation();
  const unreadNotificationCount = useUnreadNotificationCount();
  const { user, isAuthenticated } = useAuth();
  const [appliedFilters, setAppliedFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const expressedInterestIds = useExpressedInterestIds();
  const expressInterest = useExpressInterest();
  const withdrawInterest = useWithdrawInterest();

  const savedListingIds = useSavedListingIds();
  const saveListing = useSaveListing();
  const unsaveListing = useUnsaveListing();

  function handleToggleInterest(item) {
    const isCurrentlyInterested = expressedInterestIds.data?.has(item.id);
    const mutation = isCurrentlyInterested ? withdrawInterest : expressInterest;
    mutation.mutate(item.id, {
      onError: (err) => {
        Alert.alert("Couldn't update interest", getErrorMessage(err));
      },
    });
  }

  function handleToggleSave(item) {
    const isCurrentlySaved = savedListingIds.data?.has(item.id);
    const mutation = isCurrentlySaved ? unsaveListing : saveListing;
    mutation.mutate(item.id, {
      onError: (err) => {
        Alert.alert("Couldn't update saved listings", getErrorMessage(err));
      },
    });
  }

  const {
    control,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(listingSearchSchema),
    defaultValues: {
      cropType: undefined,
      quantityUnit: undefined,
      location: "",
      minPrice: "",
      maxPrice: "",
    },
  });

  const formValues = watch();

  const queryFilters = toApiFilters({
    ...appliedFilters,
    page,
    limit: DEFAULT_FILTERS.limit,
  });

  const listings = useListings(queryFilters);

  function onApply(values) {
    setAppliedFilters(values);
    setPage(1);
  }

  function onReset() {
    reset({
      cropType: undefined,
      quantityUnit: undefined,
      location: "",
      minPrice: "",
      maxPrice: "",
    });
    setAppliedFilters(DEFAULT_FILTERS);
    setPage(1);
  }

  const results = listings.data?.results ?? [];
  const pagination = listings.data?.pagination;
  const canGoNext = pagination ? page < pagination.totalPages : false;
  const canGoPrev = page > 1;

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Marketplace"
        leftAction={
          navigation.canGoBack() ? (
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={() => navigation.goBack()}
            />
          ) : (
            <HeaderActionButton
              icon="menu"
              size={20}
              accessibilityLabel="Menu"
              onPress={() =>
                isAuthenticated
                  ? navigation.navigate("ProtectedTabs", { screen: "Profile" })
                  : navigation.navigate("Welcome")
              }
            />
          )
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
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="pt-4">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            <Chip
              label="All"
              isSelected={!formValues.cropType}
              icon="grid"
              onPress={() => {
                setValue("cropType", undefined);
                handleSubmit(onApply)();
              }}
            />
            {CROP_TYPE_LIST.map((crop) => (
              <Chip
                key={crop}
                label={formatCropLabel(crop)}
                isSelected={formValues.cropType === crop}
                icon="feather"
                onPress={() => {
                  setValue(
                    "cropType",
                    formValues.cropType === crop ? undefined : crop,
                  );
                  handleSubmit(onApply)();
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View className="px-5 pt-2 pb-1">
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
            onReset={onReset}
          />
        </View>

        {listings.isLoading ? (
          <LoadingState label="Loading listings…" />
        ) : listings.isError ? (
          <ErrorState
            title="Couldn't load listings"
            message={getErrorMessage(listings.error)}
            onRetry={() => listings.refetch()}
          />
        ) : results.length === 0 ? (
          <EmptyState
            icon="search"
            title="No listings match your filters"
            description="Try widening your search or resetting filters."
            action={
              <Button
                label="Reset filters"
                onPress={onReset}
                variant="secondary"
              />
            }
          />
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingTop: 8,
              paddingBottom: 16,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const isOwnListing = item.farmerId === user?.id;
              return (
                <ListingCard
                  listing={item}
                  isInterested={
                    expressedInterestIds.data?.has(item.id) ?? false
                  }
                  onExpressInterest={
                    isOwnListing ? undefined : handleToggleInterest
                  }
                  isSaved={savedListingIds.data?.has(item.id) ?? false}
                  onToggleSave={isOwnListing ? undefined : handleToggleSave}
                  onRequestMatch={
                    isOwnListing
                      ? undefined
                      : (listing) =>
                          navigation.navigate("ListingDetail", {
                            listingId: listing.id,
                          })
                  }
                  onPress={() =>
                    navigation.navigate("ListingDetail", { listingId: item.id })
                  }
                />
              );
            }}
            ListFooterComponent={
              pagination && pagination.totalPages > 1 ? (
                <View className="flex-row justify-center items-center py-6 gap-5">
                  <Pressable
                    onPress={() => setPage((p) => p - 1)}
                    disabled={!canGoPrev}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Previous page"
                    style={({ pressed }) => ({
                      opacity: !canGoPrev ? 0.3 : pressed ? 0.7 : 1,
                      ...shadows.sm,
                    })}
                    className="w-10 h-10 rounded-xl bg-white border border-line items-center justify-center"
                  >
                    <Feather name="chevron-left" size={18} color={colors.ink} />
                  </Pressable>
                  <Text className="text-[13px] font-semibold text-ink-muted">
                    {pagination.page} / {pagination.totalPages}
                  </Text>
                  <Pressable
                    onPress={() => setPage((p) => p + 1)}
                    disabled={!canGoNext}
                    hitSlop={8}
                    accessibilityRole="button"
                    accessibilityLabel="Next page"
                    style={({ pressed }) => ({
                      opacity: !canGoNext ? 0.3 : pressed ? 0.7 : 1,
                      ...shadows.sm,
                    })}
                    className="w-10 h-10 rounded-xl bg-white border border-line items-center justify-center"
                  >
                    <Feather
                      name="chevron-right"
                      size={18}
                      color={colors.ink}
                    />
                  </Pressable>
                </View>
              ) : null
            }
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
