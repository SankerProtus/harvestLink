import { useState } from "react";
import { View, ScrollView, Pressable } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { Feather } from "@expo/vector-icons";
import { Card } from "../../../components/ui/Card.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Chip } from "../../../components/ui/Chip.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { QUANTITY_UNITS } from "../schemas/marketplaceSchemas.js";

const QUANTITY_UNIT_OPTIONS = Object.values(QUANTITY_UNITS);

function formatLabel(value) {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

function FilterPill({ label, isActive, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => ({
        opacity: pressed ? 0.85 : 1,
        ...(isActive ? shadows.sm : {}),
      })}
      className={`
        flex-row items-center rounded-full px-4 py-2.5 mr-2 min-h-[38px]
        ${isActive ? "bg-primary border border-primary" : "bg-white border border-line/70"}
      `}
    >
      <Text
        className={`text-[12.5px] font-semibold mr-1.5 ${isActive ? "text-white" : "text-ink-muted"}`}
        numberOfLines={1}
      >
        {label}
      </Text>
      <Feather
        name="chevron-down"
        size={13}
        color={isActive ? colors.white : colors.inkMuted}
      />
    </Pressable>
  );
}

export function ListingFilters({
  value,
  onQuantityUnitChange,
  onLocationChange,
  onMinPriceChange,
  onMaxPriceChange,
  errors = {},
  onApply,
  onReset,
}) {
  const [openSection, setOpenSection] = useState(null);

  function togglePill(section) {
    setOpenSection((current) => (current === section ? null : section));
  }

  const priceLabel =
    value.minPrice || value.maxPrice
      ? `GHS ${value.minPrice || "0"}–${value.maxPrice || "Any"}`
      : "Price";
  const locationLabel = value.location ? value.location : "Location";
  const unitLabel = value.quantityUnit
    ? formatLabel(value.quantityUnit)
    : "Unit";

  const locationApplied = Boolean(value.location);
  const priceApplied = Boolean(value.minPrice || value.maxPrice);
  const unitApplied = Boolean(value.quantityUnit);

  const inputClass =
    "border-[1.5px] rounded-xl2 px-4 py-3.5 text-[15px] text-ink min-h-[52px] bg-white";

  return (
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="mb-3"
      >
        <FilterPill
          label={locationLabel}
          isActive={openSection === "location" || locationApplied}
          onPress={() => togglePill("location")}
        />
        <FilterPill
          label={priceLabel}
          isActive={openSection === "price" || priceApplied}
          onPress={() => togglePill("price")}
        />
        <FilterPill
          label={unitLabel}
          isActive={openSection === "unit" || unitApplied}
          onPress={() => togglePill("unit")}
        />
      </ScrollView>

      {openSection ? (
        <Card className="p-5">
          {openSection === "unit" ? (
            <>
              <Text className="text-[13px] font-bold text-ink mb-3">Unit</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Chip
                  label="Any"
                  isSelected={!value.quantityUnit}
                  onPress={() => onQuantityUnitChange(undefined)}
                />
                {QUANTITY_UNIT_OPTIONS.map((unit) => (
                  <Chip
                    key={unit}
                    label={formatLabel(unit)}
                    isSelected={value.quantityUnit === unit}
                    onPress={() => onQuantityUnitChange(unit)}
                  />
                ))}
              </ScrollView>
            </>
          ) : null}

          {openSection === "location" ? (
            <>
              <Text className="text-[13px] font-bold text-ink mb-2">
                Location
              </Text>
              <TextInput
                value={value.location ?? ""}
                onChangeText={onLocationChange}
                placeholder="e.g. Techiman"
                placeholderTextColor={colors.inkFaint}
                accessibilityLabel="Location"
                style={shadows.sm}
                className={`${inputClass} ${errors.location ? "border-danger" : "border-line"}`}
              />
              {errors.location ? (
                <Text
                  className="text-[12.5px] text-danger mt-1.5"
                  accessibilityRole="alert"
                >
                  {errors.location}
                </Text>
              ) : null}
            </>
          ) : null}

          {openSection === "price" ? (
            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-[13px] font-bold text-ink mb-2">
                  Min Price (GHS)
                </Text>
                <TextInput
                  value={value.minPrice ?? ""}
                  onChangeText={onMinPriceChange}
                  placeholder="0"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="numeric"
                  accessibilityLabel="Minimum price"
                  style={shadows.sm}
                  className={`${inputClass} ${errors.minPrice ? "border-danger" : "border-line"}`}
                />
                {errors.minPrice ? (
                  <Text
                    className="text-[12.5px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {errors.minPrice}
                  </Text>
                ) : null}
              </View>

              <View className="flex-1">
                <Text className="text-[13px] font-bold text-ink mb-2">
                  Max Price (GHS)
                </Text>
                <TextInput
                  value={value.maxPrice ?? ""}
                  onChangeText={onMaxPriceChange}
                  placeholder="Any"
                  placeholderTextColor={colors.inkFaint}
                  keyboardType="numeric"
                  accessibilityLabel="Maximum price"
                  style={shadows.sm}
                  className={`${inputClass} ${errors.maxPrice ? "border-danger" : "border-line"}`}
                />
                {errors.maxPrice ? (
                  <Text
                    className="text-[12.5px] text-danger mt-1.5"
                    accessibilityRole="alert"
                  >
                    {errors.maxPrice}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}

          <View className="h-6" />

          <View className="flex-row gap-3">
            <View className="flex-1">
              <Button label="Reset" onPress={onReset} variant="secondary" />
            </View>
            <View className="flex-1">
              <Button
                label="Apply Filters"
                onPress={() => {
                  onApply();
                  setOpenSection(null);
                }}
                variant="primary"
              />
            </View>
          </View>
        </Card>
      ) : null}
    </View>
  );
}
