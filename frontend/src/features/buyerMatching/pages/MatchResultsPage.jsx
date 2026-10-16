import { useState } from "react";
import {
  View,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather } from "@expo/vector-icons";

import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { TopBar, TopBarButton } from "../../../components/ui/TopBar.jsx";
import { ListingCard } from "../../marketplace/components/ListingCard.jsx";
import {
  matchSearchSchema,
  CROP_TYPES,
  QUANTITY_UNITS,
} from "../schemas/buyerMatchingSchemas.js";
import { useSearchMatches } from "../hooks/buyerMatchingHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { ErrorState, EmptyState } from "../../../components/ui/ScreenState.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const CROP_TYPE_OPTIONS = Object.values(CROP_TYPES);
const QUANTITY_UNIT_OPTIONS = Object.values(QUANTITY_UNITS);
const MAX_RECENT_SEARCHES = 5;

const POPULAR_SEARCHES = [
  {
    label: "Tomatoes near Techiman",
    icon: "feather",
    values: {
      cropType: CROP_TYPES.TOMATO,
      requestedQuantity: 20,
      requestedQuantityUnit: QUANTITY_UNITS.CRATE,
      location: "Techiman",
    },
  },
  {
    label: "Maize, bulk",
    icon: "feather",
    values: {
      cropType: CROP_TYPES.MAIZE,
      requestedQuantity: 30,
      requestedQuantityUnit: QUANTITY_UNITS.SACK,
      location: "",
    },
  },
  {
    label: "Cassava near Sunyani",
    icon: "feather",
    values: {
      cropType: CROP_TYPES.CASSAVA,
      requestedQuantity: 15,
      requestedQuantityUnit: QUANTITY_UNITS.BASKET,
      location: "Sunyani",
    },
  },
  {
    label: "Rice, wholesale",
    icon: "feather",
    values: {
      cropType: CROP_TYPES.RICE,
      requestedQuantity: 50,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      location: "",
    },
  },
  {
    label: "Cocoa beans",
    icon: "feather",
    values: {
      cropType: CROP_TYPES.COCOA,
      requestedQuantity: 10,
      requestedQuantityUnit: QUANTITY_UNITS.BAG,
      location: "",
    },
  },
];

function summarizeSearch(values) {
  const parts = [
    `${values.requestedQuantity} ${formatLabel(values.requestedQuantityUnit)}`,
    formatLabel(values.cropType),
  ];
  if (values.location) parts.push(values.location);
  return parts.join(" · ");
}

function formatLabel(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function Label({ children, hint }) {
  return (
    <View className="flex-row items-baseline mb-2">
      <Text className="text-[14px] font-bold text-ink">{children}</Text>
      {hint ? (
        <Text className="text-[12.5px] text-ink-muted ml-2">{hint}</Text>
      ) : null}
    </View>
  );
}

// Numbered step that turns into a green tick once it is filled in, so people
// can see at a glance what is still missing before they search.
function StepLabel({ step, done, title, hint }) {
  return (
    <View className="flex-row items-center mb-3">
      <View
        className="items-center justify-center"
        style={{
          width: 22,
          height: 22,
          borderRadius: 11,
          backgroundColor: done ? colors.primary : colors.primaryLight,
        }}
      >
        {done ? (
          <Feather name="check" size={13} color={colors.white} />
        ) : (
          <Text
            className="text-[12px] font-extrabold"
            style={{ color: colors.primaryActive }}
          >
            {step}
          </Text>
        )}
      </View>
      <Text className="text-[15px] font-extrabold text-ink ml-2.5 tracking-[-0.2px]">
        {title}
      </Text>
      {hint ? (
        <Text className="text-[12.5px] text-ink-muted ml-2">{hint}</Text>
      ) : null}
    </View>
  );
}

// Every option is visible at once. The old sideways-scrolling rows hid half
// the crops and units ("Cassav…") and nothing told people to scroll.
function OptionWrap({ children }) {
  return (
    <View className="flex-row flex-wrap" style={{ rowGap: 8 }}>
      {children}
    </View>
  );
}

const inputBase =
  "border-[1.5px] rounded-xl2 px-4 py-3.5 text-[15px] text-ink min-h-[52px] bg-white";

const numberFromString = (schema) =>
  z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    schema,
  );

const formSchema = matchSearchSchema.extend({
  requestedQuantity: numberFromString(
    matchSearchSchema.shape.requestedQuantity,
  ),
  maxPrice: numberFromString(matchSearchSchema.shape.maxPrice),
});

const FRIENDLY_FIELD_ERRORS = {
  cropType: "Please select a crop type.",
  requestedQuantity: "Please enter how much you need.",
  requestedQuantityUnit: "Please select a unit.",
  maxPrice: "Please enter a valid price.",
  location: "Location must be under 120 characters.",
};

function friendlyError(fieldName, fieldError) {
  if (!fieldError) return null;
  return FRIENDLY_FIELD_ERRORS[fieldName] ?? fieldError.message;
}

export function MatchResultsPage() {
  const navigation = useNavigation();
  const { isAuthenticated } = useAuth();
  const [submittedFilters, setSubmittedFilters] = useState(null);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cropType: undefined,
      requestedQuantity: undefined,
      requestedQuantityUnit: undefined,
      location: "",
      maxPrice: undefined,
    },
  });

  const cropType = watch("cropType");
  const requestedQuantity = watch("requestedQuantity");
  const requestedQuantityUnit = watch("requestedQuantityUnit");
  const quantityNumber = Number(requestedQuantity);
  const hasCrop = Boolean(cropType);
  const hasAmount =
    requestedQuantity !== undefined &&
    requestedQuantity !== "" &&
    quantityNumber > 0 &&
    Boolean(requestedQuantityUnit);
  const canSearch = hasCrop && hasAmount;
  const optionalHasErrors = Boolean(errors.maxPrice || errors.location);
  const filtersOpen = showMoreFilters || optionalHasErrors;

  const matches = useSearchMatches(submittedFilters ?? {});
  const hasSearched = submittedFilters !== null;
  const resultCount = matches.data?.results?.length ?? 0;

  function runSearch(values) {
    setSubmittedFilters(values);
    setIsFormExpanded(false);
    setRecentSearches((current) => {
      const withoutDuplicate = current.filter(
        (entry) => summarizeSearch(entry) !== summarizeSearch(values),
      );
      return [values, ...withoutDuplicate].slice(0, MAX_RECENT_SEARCHES);
    });
  }

  function onSubmit(values) {
    runSearch(values);
  }

  function applySuggestion(values) {
    setValue("cropType", values.cropType);
    setValue("requestedQuantity", values.requestedQuantity);
    setValue("requestedQuantityUnit", values.requestedQuantityUnit);
    setValue("location", values.location ?? "");
    setValue("maxPrice", values.maxPrice);
    runSearch({ ...values, location: values.location || undefined });
  }

  const showForm = !(hasSearched && !isFormExpanded);

  // Recent searches first, then starter searches, shown ABOVE the form so a
  // repeat search is a single tap.
  const quickSearches = [
    ...recentSearches.map((entry) => ({
      key: `recent-${summarizeSearch(entry)}`,
      label: summarizeSearch(entry),
      icon: "clock",
      values: entry,
    })),
    ...POPULAR_SEARCHES.map((s) => ({
      key: `popular-${s.label}`,
      label: s.label,
      icon: "trending-up",
      values: s.values,
    })),
  ];

  const draftSummary = canSearch
    ? summarizeSearch({
        cropType,
        requestedQuantity: quantityNumber,
        requestedQuantityUnit,
        location: undefined,
      })
    : hasCrop
      ? `${formatLabel(cropType)} · add how much you need`
      : "Choose a crop to get started";

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <TopBar
        title="Find matches"
        subtitle={
          hasSearched && !matches.isLoading && !showForm
            ? `${resultCount} match${resultCount === 1 ? "" : "es"} found`
            : "Farmers with what you need"
        }
        onBack={navigation.canGoBack() ? () => navigation.goBack() : undefined}
        right={
          navigation.canGoBack() ? null : (
            <TopBarButton
              icon="user"
              accessibilityLabel={isAuthenticated ? "Profile" : "Sign in"}
              onPress={() =>
                isAuthenticated
                  ? navigation.navigate("ProtectedTabs", { screen: "Profile" })
                  : navigation.navigate("Welcome")
              }
            />
          )
        }
      />

      <KeyboardAvoider className="flex-1">
        <ScrollView
          contentContainerStyle={{ paddingTop: 4, paddingBottom: 24 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {!showForm ? (
            <View className="px-5">
              <Pressable
                onPress={() => setIsFormExpanded(true)}
                accessibilityRole="button"
                accessibilityLabel="Edit search"
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  ...shadows.sm,
                })}
                className="flex-row items-center bg-white rounded-full border border-line px-4 min-h-[54px]"
              >
                <Feather name="search" size={17} color={colors.primary} />
                <Text
                  className="flex-1 ml-3 text-[14.5px] font-semibold text-ink"
                  numberOfLines={1}
                >
                  {summarizeSearch(submittedFilters)}
                </Text>
                <View
                  className="rounded-full px-3 py-1.5"
                  style={{ backgroundColor: colors.primaryLight }}
                >
                  <Text
                    className="text-[12.5px] font-bold"
                    style={{ color: colors.primaryActive }}
                  >
                    Edit
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <View>
              {quickSearches.length > 0 ? (
                <View className="mb-5">
                  <Text className="px-5 text-[12.5px] font-semibold text-ink-muted mb-2.5">
                    Quick searches
                  </Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flexGrow: 0 }}
                    contentContainerStyle={{ paddingHorizontal: 20 }}
                  >
                    {quickSearches.map((q) => (
                      <Chip
                        key={q.key}
                        size="sm"
                        label={q.label}
                        icon={q.icon}
                        onPress={() => applySuggestion(q.values)}
                      />
                    ))}
                  </ScrollView>
                </View>
              ) : null}

              <View
                className="mx-5 bg-white rounded-3xl border border-line/60 p-5"
                style={shadows.card}
              >
                <StepLabel step={1} done={hasCrop} title="What crop?" />
                <OptionWrap>
                  {CROP_TYPE_OPTIONS.map((crop) => (
                    <Chip
                      key={crop}
                      label={formatLabel(crop)}
                      isSelected={cropType === crop}
                      onPress={() => setValue("cropType", crop)}
                    />
                  ))}
                </OptionWrap>
                {errors.cropType ? (
                  <Text
                    className="text-[12.5px] text-danger mt-2"
                    accessibilityRole="alert"
                  >
                    {friendlyError("cropType", errors.cropType)}
                  </Text>
                ) : null}

                <View className="h-px bg-line/70 my-5" />

                <StepLabel step={2} done={hasAmount} title="How much?" />
                <Controller
                  control={control}
                  name="requestedQuantity"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value !== undefined ? String(value) : ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Quantity, e.g. 20"
                      placeholderTextColor={colors.inkFaint}
                      keyboardType="numeric"
                      returnKeyType="done"
                      accessibilityLabel="Quantity needed"
                      className={`${inputBase} ${
                        errors.requestedQuantity
                          ? "border-danger"
                          : "border-line"
                      }`}
                    />
                  )}
                />
                {errors.requestedQuantity ? (
                  <Text
                    className="text-[12.5px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {friendlyError(
                      "requestedQuantity",
                      errors.requestedQuantity,
                    )}
                  </Text>
                ) : null}
                <Text className="text-[12.5px] text-ink-muted mt-3 mb-2">
                  Sold by the…
                </Text>
                <OptionWrap>
                  {QUANTITY_UNIT_OPTIONS.map((unit) => (
                    <Chip
                      key={unit}
                      size="sm"
                      label={formatLabel(unit)}
                      isSelected={requestedQuantityUnit === unit}
                      onPress={() => setValue("requestedQuantityUnit", unit)}
                    />
                  ))}
                </OptionWrap>
                {errors.requestedQuantityUnit ? (
                  <Text
                    className="text-[12.5px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {friendlyError(
                      "requestedQuantityUnit",
                      errors.requestedQuantityUnit,
                    )}
                  </Text>
                ) : null}

                <View className="h-px bg-line/70 my-5" />

                {/* Optional refinements stay out of the way until wanted. */}
                <Pressable
                  onPress={() => setShowMoreFilters((v) => !v)}
                  accessibilityRole="button"
                  accessibilityState={{ expanded: filtersOpen }}
                  className="flex-row items-center justify-between min-h-[36px]"
                >
                  <View className="flex-row items-center flex-1">
                    <Feather
                      name="sliders"
                      size={16}
                      color={colors.inkSecondary}
                    />
                    <Text className="text-[14.5px] font-bold text-ink ml-2.5">
                      Narrow it down
                    </Text>
                    <Text className="text-[12.5px] text-ink-muted ml-2">
                      optional
                    </Text>
                  </View>
                  <Feather
                    name={filtersOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color={colors.inkMuted}
                  />
                </Pressable>

                {filtersOpen ? (
                  <View className="mt-4">
                    <Label>Highest price you'll pay (GHS)</Label>
                    <Controller
                      control={control}
                      name="maxPrice"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput
                          value={value !== undefined ? String(value) : ""}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Any price"
                          placeholderTextColor={colors.inkFaint}
                          keyboardType="numeric"
                          accessibilityLabel="Maximum price (optional)"
                          className={`${inputBase} ${
                            errors.maxPrice ? "border-danger" : "border-line"
                          }`}
                        />
                      )}
                    />
                    {errors.maxPrice ? (
                      <Text
                        className="text-[12.5px] text-danger mt-1.5"
                        accessibilityRole="alert"
                      >
                        {friendlyError("maxPrice", errors.maxPrice)}
                      </Text>
                    ) : null}

                    <View className="h-4" />
                    <Label>Near</Label>
                    <Controller
                      control={control}
                      name="location"
                      render={({ field: { value, onChange, onBlur } }) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Town or region, e.g. Techiman"
                          placeholderTextColor={colors.inkFaint}
                          accessibilityLabel="Location"
                          className={`${inputBase} ${
                            errors.location ? "border-danger" : "border-line"
                          }`}
                        />
                      )}
                    />
                    {errors.location ? (
                      <Text
                        className="text-[12.5px] text-danger mt-1.5"
                        accessibilityRole="alert"
                      >
                        {friendlyError("location", errors.location)}
                      </Text>
                    ) : null}
                  </View>
                ) : null}
              </View>
            </View>
          )}

          {hasSearched && !showForm ? (
            <View className="px-5 mt-5">
              {matches.isLoading ? (
                <View className="items-center py-12">
                  <ActivityIndicator color={colors.primary} size="large" />
                  <Text className="text-ink-muted text-[14px] mt-4 font-medium">
                    Searching for matches…
                  </Text>
                </View>
              ) : matches.isError ? (
                <ErrorState
                  title="Couldn't search matches"
                  message={getErrorMessage(matches.error)}
                  onRetry={() => matches.refetch()}
                />
              ) : resultCount === 0 ? (
                <EmptyState
                  icon="search"
                  title="No matching listings found"
                  description="Try a wider quantity range or a different crop."
                />
              ) : (
                <>
                  <Text className="text-[17px] font-extrabold text-ink tracking-[-0.2px] mb-3">
                    {resultCount} {resultCount === 1 ? "match" : "matches"} for
                    you
                  </Text>
                  <FlatList
                    data={matches.data.results}
                    keyExtractor={(item) => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <ListingCard
                        listing={item}
                        onPress={() =>
                          navigation.navigate("MatchDetail", {
                            listingId: item.id,
                            requestedQuantity:
                              submittedFilters?.requestedQuantity,
                            maxPrice: submittedFilters?.maxPrice,
                          })
                        }
                      />
                    )}
                  />
                </>
              )}
            </View>
          ) : null}
        </ScrollView>

        {showForm ? (
          <View
            className="bg-white border-t border-line/60 px-5 pt-3 pb-3"
            style={shadows.md}
          >
            <View className="flex-row items-center mb-2.5">
              <Feather
                name={canSearch ? "check-circle" : "search"}
                size={14}
                color={canSearch ? colors.primary : colors.inkMuted}
              />
              <Text
                className={`ml-2 flex-1 text-[13px] ${
                  canSearch
                    ? "font-bold text-ink"
                    : "font-medium text-ink-muted"
                }`}
                numberOfLines={1}
              >
                {draftSummary}
              </Text>
            </View>
            <View className="flex-row" style={{ gap: 12 }}>
              {hasSearched ? (
                <View className="flex-1">
                  <Button
                    label="Cancel"
                    variant="secondary"
                    size="lg"
                    onPress={() => setIsFormExpanded(false)}
                  />
                </View>
              ) : null}
              <View style={{ flex: hasSearched ? 2 : 1 }}>
                <Button
                  label="Search matches"
                  icon="search"
                  size="lg"
                  onPress={handleSubmit(onSubmit)}
                />
              </View>
            </View>
          </View>
        ) : null}
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
