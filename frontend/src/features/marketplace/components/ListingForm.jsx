import {
  View,
  ScrollView,
  Pressable,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "../../../lib/alert.js";

import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import { FieldLabel } from "../../../components/ui/Input.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import {
  createListingSchema,
  CROP_TYPES,
  QUANTITY_UNITS,
} from "../schemas/marketplaceSchemas.js";

const CROP_TYPE_OPTIONS = Object.values(CROP_TYPES);
const QUANTITY_UNIT_OPTIONS = Object.values(QUANTITY_UNITS);
const MAX_IMAGES = 5;

const CROP_ICONS = {
  TOMATO: "food-apple-outline",
  MAIZE: "corn",
  CASSAVA: "food-variant",
  PLANTAIN: "food-drumstick-outline",
  YAM: "sprout-outline",
  PEPPER: "chili-mild-outline",
  ONION: "circle-outline",
  RICE: "rice",
  GROUNDNUT: "peanut-outline",
  COCOA: "cup-outline",
};

function formatLabel(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function CropTile({ crop, isSelected, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityLabel={formatLabel(crop)}
      accessibilityState={{ selected: isSelected }}
      style={({ pressed }) => ({
        transform: [{ scale: pressed ? 0.96 : 1 }],
        ...(isSelected ? shadows.md : shadows.sm),
      })}
      className={`
        items-center justify-center rounded-xl2 border-[1.5px] px-2 py-3.5
        ${isSelected ? "bg-primary border-primary" : "bg-white border-line"}
      `}
    >
      <MaterialCommunityIcons
        name={CROP_ICONS[crop] ?? "leaf"}
        size={22}
        color={isSelected ? colors.white : colors.primary}
      />
      <Text
        className={`text-[11.5px] font-bold mt-2 ${isSelected ? "text-white" : "text-ink"}`}
        numberOfLines={1}
      >
        {formatLabel(crop)}
      </Text>
    </Pressable>
  );
}

function FieldError({ children }) {
  if (!children) return null;
  return (
    <Text
      className="text-[12.5px] text-danger mt-1.5"
      accessibilityRole="alert"
    >
      {children}
    </Text>
  );
}

const inputBase =
  "border-[1.5px] rounded-xl2 px-4 py-3.5 text-[15px] text-ink min-h-[52px] bg-white";

const numberFromString = (schema) =>
  z.preprocess(
    (val) => (val === "" || val === undefined ? undefined : Number(val)),
    schema,
  );

const formSchema = createListingSchema.extend({
  quantity: numberFromString(createListingSchema.shape.quantity),
  pricePerUnit: numberFromString(createListingSchema.shape.pricePerUnit),
});

const STEP_1_FIELDS = [
  "title",
  "description",
  "cropType",
  "quantity",
  "pricePerUnit",
  "quantityUnit",
  "location",
  "harvestDate",
];

export function ListingForm({
  mode,
  initialValues = {},
  onSubmit,
  onCancel,
  isSubmitting = false,
  stepped = false,
  onStepChange,
}) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialValues.title ?? "",
      description: initialValues.description ?? "",
      cropType: initialValues.cropType ?? undefined,
      quantity: initialValues.quantity ?? undefined,
      quantityUnit: initialValues.quantityUnit ?? undefined,
      pricePerUnit: initialValues.pricePerUnit ?? undefined,
      location: initialValues.location ?? "",
      harvestDate: initialValues.harvestDate ?? undefined,
      images: initialValues.images ?? [],
    },
  });

  const cropType = watch("cropType");
  const quantityUnit = watch("quantityUnit");
  const images = watch("images") ?? [];
  const [showDatePicker, setShowDatePicker] = useState(false);
  const harvestDate = watch("harvestDate");

  // Non-stepped (edit) mode renders every field in one pass, same as
  // before this was introduced. Stepped (create) mode gates each half
  // of the form behind its own step so it actually matches the "Step 1
  // of 2" header CreateListingPage shows — previously that header
  // promised two steps a single flat form never delivered.
  const [step, setStep] = useState(1);
  const showStep1 = !stepped || step === 1;
  const showStep2 = !stepped || step === 2;

  function goToStep(next) {
    setStep(next);
    onStepChange?.(next);
  }

  async function handleNextPress() {
    const isValid = await trigger(STEP_1_FIELDS);
    if (isValid) goToStep(2);
  }

  const [isPickingImages, setIsPickingImages] = useState(false);

  async function handlePickImages() {
    const remainingSlots = MAX_IMAGES - images.length;
    if (remainingSlots <= 0) return;

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission needed",
        "Allow photo library access to add photos of your produce.",
      );
      return;
    }

    setIsPickingImages(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: remainingSlots,
        quality: 0.8,
      });

      if (result.canceled) return;

      const pickedUris = result.assets.map((asset) => asset.uri);
      setValue("images", [...images, ...pickedUris].slice(0, MAX_IMAGES));
    } finally {
      setIsPickingImages(false);
    }
  }

  function removeImageAt(index) {
    setValue(
      "images",
      images.filter((_, i) => i !== index),
    );
  }

  function makeCoverPhoto(index) {
    if (index === 0) return;
    const next = [...images];
    const [chosen] = next.splice(index, 1);
    next.unshift(chosen);
    setValue("images", next);
  }

  return (
    <KeyboardAvoider
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 28 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Card className="p-5">
          {showStep1 ? (
            <>
              <FieldLabel>Title</FieldLabel>
              <Controller
                control={control}
                name="title"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="e.g. Fresh Tomatoes - Farm Gate"
                    placeholderTextColor={colors.inkFaint}
                    accessibilityLabel="Title"
                    className={`${inputBase} ${errors.title ? "border-danger" : "border-line"}`}
                  />
                )}
              />
              <FieldError>{errors.title?.message}</FieldError>

              <View className="h-5" />

              <FieldLabel>Description (optional)</FieldLabel>
              <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Describe your produce…"
                    placeholderTextColor={colors.inkFaint}
                    multiline
                    numberOfLines={3}
                    accessibilityLabel="Description"
                    className={`${inputBase} min-h-[84px] ${errors.description ? "border-danger" : "border-line"}`}
                    style={{ textAlignVertical: "top" }}
                  />
                )}
              />
              <FieldError>{errors.description?.message}</FieldError>

              <View className="h-6" />

              <FieldLabel>Select Crop Type</FieldLabel>
              <View className="flex-row flex-wrap gap-2.5 mb-1">
                {CROP_TYPE_OPTIONS.map((crop) => (
                  <View key={crop} style={{ width: "22.5%" }}>
                    <CropTile
                      crop={crop}
                      isSelected={cropType === crop}
                      onPress={() => setValue("cropType", crop)}
                    />
                  </View>
                ))}
              </View>
              {errors.cropType ? (
                <FieldError>{errors.cropType.message}</FieldError>
              ) : (
                <View className="h-5" />
              )}

              <View className="flex-row gap-3">
                <View className="flex-1">
                  <FieldLabel>Quantity</FieldLabel>
                  <Controller
                    control={control}
                    name="quantity"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextInput
                        value={value !== undefined ? String(value) : ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="0"
                        placeholderTextColor={colors.inkFaint}
                        keyboardType="numeric"
                        accessibilityLabel="Quantity"
                        className={`${inputBase} ${errors.quantity ? "border-danger" : "border-line"}`}
                      />
                    )}
                  />
                  <FieldError>{errors.quantity?.message}</FieldError>
                </View>

                <View className="flex-1">
                  <FieldLabel>Price per Unit (GHS)</FieldLabel>
                  <Controller
                    control={control}
                    name="pricePerUnit"
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextInput
                        value={value !== undefined ? String(value) : ""}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="0.00"
                        placeholderTextColor={colors.inkFaint}
                        keyboardType="numeric"
                        accessibilityLabel="Price per unit"
                        className={`${inputBase} ${errors.pricePerUnit ? "border-danger" : "border-line"}`}
                      />
                    )}
                  />
                  <FieldError>{errors.pricePerUnit?.message}</FieldError>
                </View>
              </View>

              <View className="h-6" />

              <FieldLabel>Unit</FieldLabel>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-1"
              >
                {QUANTITY_UNIT_OPTIONS.map((unit) => (
                  <Chip
                    key={unit}
                    label={formatLabel(unit)}
                    isSelected={quantityUnit === unit}
                    onPress={() => setValue("quantityUnit", unit)}
                  />
                ))}
              </ScrollView>
              {errors.quantityUnit ? (
                <FieldError>{errors.quantityUnit.message}</FieldError>
              ) : (
                <View className="h-5" />
              )}

              <FieldLabel>Location</FieldLabel>
              <Controller
                control={control}
                name="location"
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextInput
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="e.g. Techiman, Bono East"
                    placeholderTextColor={colors.inkFaint}
                    accessibilityLabel="Location"
                    className={`${inputBase} ${errors.location ? "border-danger" : "border-line"}`}
                  />
                )}
              />
              <FieldError>{errors.location?.message}</FieldError>

              <FieldLabel>Harvest Date (optional)</FieldLabel>
              <Pressable
                onPress={() => setShowDatePicker(true)}
                accessibilityRole="button"
                accessibilityLabel="Select harvest date"
                className={`${inputBase} flex-row items-center justify-between ${errors.harvestDate ? "border-danger" : "border-line"}`}
              >
                <Text
                  className={
                    harvestDate
                      ? "text-[15px] text-ink"
                      : "text-[15px] text-ink-faint"
                  }
                >
                  {harvestDate
                    ? new Date(harvestDate).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Select a date"}
                </Text>
                <Feather name="calendar" size={18} color={colors.inkMuted} />
              </Pressable>
              <FieldError>{errors.harvestDate?.message}</FieldError>

              {showDatePicker ? (
                <DateTimePicker
                  value={harvestDate ? new Date(harvestDate) : new Date()}
                  mode="date"
                  display="default"
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (event.type === "set" && selectedDate) {
                      setValue("harvestDate", selectedDate);
                    }
                  }}
                />
              ) : null}

              <View className="h-6" />
            </>
          ) : null}

          {showStep2 ? (
            <>
              <FieldLabel>Photos (optional, up to {MAX_IMAGES})</FieldLabel>
              {images.length > 1 ? (
                <Text className="text-[11.5px] text-ink-muted mb-2">
                  The first photo is what buyers see everywhere else. Tap
                  another photo's star to make it the cover.
                </Text>
              ) : null}
              <View className="flex-row flex-wrap gap-3 mb-2">
                {images.map((url, index) => (
                  <View key={index} className="w-[76px] h-[76px]">
                    <Pressable
                      onPress={() => makeCoverPhoto(index)}
                      disabled={index === 0}
                      accessibilityRole="button"
                      accessibilityLabel={
                        index === 0
                          ? "Cover photo"
                          : `Make photo ${index + 1} the cover photo`
                      }
                      className="w-[76px] h-[76px] rounded-xl2 overflow-hidden border border-line bg-cream items-center justify-center"
                    >
                      <RemoteImage
                        uri={url}
                        className="w-full h-full"
                        iconSize={18}
                      />
                    </Pressable>
                    {index === 0 ? (
                      <View className="absolute -top-2 -left-2 rounded-full bg-primary px-2 py-0.5 border-2 border-white">
                        <Text className="text-[9px] font-bold text-white">
                          Cover
                        </Text>
                      </View>
                    ) : (
                      <Pressable
                        onPress={() => makeCoverPhoto(index)}
                        accessibilityRole="button"
                        accessibilityLabel={`Make photo ${index + 1} the cover photo`}
                        className="absolute -top-2 -left-2 w-6 h-6 rounded-full bg-white items-center justify-center shadow-sm border border-line"
                      >
                        <Feather
                          name="star"
                          size={11}
                          color={colors.inkMuted}
                        />
                      </Pressable>
                    )}
                    <Pressable
                      onPress={() => removeImageAt(index)}
                      accessibilityRole="button"
                      accessibilityLabel={`Remove photo ${index + 1}`}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-danger items-center justify-center shadow-sm border-2 border-white"
                    >
                      <Feather name="x" size={12} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
                {images.length < MAX_IMAGES ? (
                  <Pressable
                    onPress={handlePickImages}
                    disabled={isPickingImages}
                    accessibilityRole="button"
                    accessibilityLabel="Add photo from your gallery"
                    style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
                    className="w-[76px] h-[76px] rounded-xl2 border-2 border-dashed border-line items-center justify-center bg-white"
                  >
                    {isPickingImages ? (
                      <Feather
                        name="loader"
                        size={18}
                        color={colors.inkMuted}
                      />
                    ) : (
                      <Feather
                        name="camera"
                        size={18}
                        color={colors.inkMuted}
                      />
                    )}
                    <Text className="text-[10.5px] font-medium text-ink-muted mt-1">
                      Add photo
                    </Text>
                  </Pressable>
                ) : null}
              </View>
              <Text className="text-[11.5px] text-ink-muted mb-1">
                Choose photos of your produce from your phone's gallery.
              </Text>
              <FieldError>{errors.images?.message}</FieldError>
            </>
          ) : null}

          <View className="h-7" />

          <View className="flex-row gap-3">
            {stepped && step === 2 ? (
              <View className="flex-1">
                <Button
                  label="Back"
                  onPress={() => goToStep(1)}
                  variant="secondary"
                />
              </View>
            ) : (
              <View className="flex-1">
                <Button label="Cancel" onPress={onCancel} variant="secondary" />
              </View>
            )}

            <View className="flex-1">
              {stepped && step === 1 ? (
                <Button
                  label="Next"
                  onPress={handleNextPress}
                  variant="primary"
                />
              ) : (
                <Button
                  label={mode === "edit" ? "Save Changes" : "Create Listing"}
                  onPress={handleSubmit(onSubmit)}
                  variant="primary"
                  isLoading={isSubmitting}
                />
              )}
            </View>
          </View>

          <View className="h-4" />
          <View className="flex-row items-center justify-center gap-1.5">
            <Feather name="wifi-off" size={12} color={colors.inkFaint} />
            <Text className="text-[11.5px] text-ink-muted text-center">
              Works offline. We'll sync when you're back online.
            </Text>
          </View>
        </Card>
      </ScrollView>
    </KeyboardAvoider>
  );
}
