import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather } from "@expo/vector-icons";

import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { FieldLabel } from "../../../components/ui/Input.jsx";
import { SectionHeader } from "../../../components/ui/SectionHeader.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
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
import {
  ErrorState,
  EmptyState,
} from "../../../components/ui/ScreenState.jsx";

const CROP_TYPE_OPTIONS = Object.values(CROP_TYPES);
const QUANTITY_UNIT_OPTIONS = Object.values(QUANTITY_UNITS);

function formatLabel(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
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
  const [submittedFilters, setSubmittedFilters] = useState(null);

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
  const requestedQuantityUnit = watch("requestedQuantityUnit");

  const matches = useSearchMatches(submittedFilters ?? {});
  const hasSearched = submittedFilters !== null;
  const resultCount = matches.data?.results?.length ?? 0;

  function onSubmit(values) {
    setSubmittedFilters(values);
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>
      <ScreenHeader
        title="Find Matches"
        subtitle={
          hasSearched && !matches.isLoading
            ? `${resultCount} match${resultCount === 1 ? "" : "es"} found`
            : "Connect with the right farmers"
        }
        leftAction={
          <HeaderActionButton
            icon="menu"
            size={20}
            accessibilityLabel="Menu"
            onPress={() => navigation.navigate("Profile")}
          />
        }
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-5">
          <SectionHeader
            title="What do you need?"
            subtitle="Tell us your requirements and we'll find matching farmers."
          />
        </View>

        <View className="px-5">
          <Card>
            <FieldLabel required>Crop type</FieldLabel>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-1"
            >
              {CROP_TYPE_OPTIONS.map((crop) => (
                <Chip
                  key={crop}
                  label={formatLabel(crop)}
                  isSelected={cropType === crop}
                  icon="feather"
                  onPress={() => setValue("cropType", crop)}
                />
              ))}
            </ScrollView>
            {errors.cropType ? (
              <Text
                className="text-[12px] text-danger mt-1.5 mb-1"
                accessibilityRole="alert"
              >
                {friendlyError("cropType", errors.cropType)}
              </Text>
            ) : (
              <View className="h-4" />
            )}

            <View className="flex-row gap-3">
              <View className="flex-1">
                <FieldLabel required>Quantity needed</FieldLabel>
                <Controller
                  control={control}
                  name="requestedQuantity"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value !== undefined ? String(value) : ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="0"
                      placeholderTextColor={colors.inkFaint}
                      keyboardType="numeric"
                      accessibilityLabel="Quantity needed"
                      style={shadows.sm}
                      className={`${inputBase} ${errors.requestedQuantity ? "border-danger" : "border-line"}`}
                    />
                  )}
                />
                {errors.requestedQuantity ? (
                  <Text
                    className="text-[12px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {friendlyError("requestedQuantity", errors.requestedQuantity)}
                  </Text>
                ) : null}
              </View>

              <View className="flex-1">
                <FieldLabel>Max price (GHS)</FieldLabel>
                <Controller
                  control={control}
                  name="maxPrice"
                  render={({ field: { value, onChange, onBlur } }) => (
                    <TextInput
                      value={value !== undefined ? String(value) : ""}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      placeholder="Any"
                      placeholderTextColor={colors.inkFaint}
                      keyboardType="numeric"
                      accessibilityLabel="Maximum price (optional)"
                      style={shadows.sm}
                      className={`${inputBase} ${errors.maxPrice ? "border-danger" : "border-line"}`}
                    />
                  )}
                />
                {errors.maxPrice ? (
                  <Text
                    className="text-[12px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {friendlyError("maxPrice", errors.maxPrice)}
                  </Text>
                ) : null}
              </View>
            </View>

            <View className="h-5" />

            <FieldLabel required>Unit</FieldLabel>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-1"
            >
              {QUANTITY_UNIT_OPTIONS.map((unit) => (
                <Chip
                  key={unit}
                  label={formatLabel(unit)}
                  isSelected={requestedQuantityUnit === unit}
                  onPress={() => setValue("requestedQuantityUnit", unit)}
                />
              ))}
            </ScrollView>
            {errors.requestedQuantityUnit ? (
              <Text
                className="text-[12px] text-danger mt-1.5 mb-1"
                accessibilityRole="alert"
              >
                {friendlyError("requestedQuantityUnit", errors.requestedQuantityUnit)}
              </Text>
            ) : (
              <View className="h-4" />
            )}

            <FieldLabel>Location (optional)</FieldLabel>
            <Controller
              control={control}
              name="location"
              render={({ field: { value, onChange, onBlur } }) => (
                <TextInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="e.g. Techiman"
                  placeholderTextColor={colors.inkFaint}
                  accessibilityLabel="Location"
                  style={shadows.sm}
                  className={`${inputBase} ${errors.location ? "border-danger" : "border-line"}`}
                />
              )}
            />
            {errors.location ? (
              <Text
                className="text-[12px] text-danger mt-1.5"
                accessibilityRole="alert"
              >
                {friendlyError("location", errors.location)}
              </Text>
            ) : null}

            <View className="h-6" />

            <Button
              label="Search matches"
              icon="search"
              onPress={handleSubmit(onSubmit)}
            />
          </Card>
        </View>

        {hasSearched ? (
          <View className="px-5 mt-6">
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
                <SectionHeader
                  title="Results"
                  subtitle={`${resultCount} farmer${resultCount === 1 ? "" : "s"} matched`}
                />
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
                          requestedQuantity: submittedFilters?.requestedQuantity,
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
    </SafeAreaView>
  );
}
