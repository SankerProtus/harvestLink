import { memo } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { Chip } from "../../../components/ui/Chip.jsx";
import { Skeleton } from "../../../components/ui/Skeleton.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { TONE_COLORS } from "../../deliveryTracking/lib/orderStatus.js";

export function humanize(value) {
  if (!value) return "";
  const text = String(value).toLowerCase().replace(/_/g, " ");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function ageLabel(iso) {
  if (!iso) return "";
  const mins = Math.max(
    0,
    Math.floor((Date.now() - new Date(iso).getTime()) / 60000),
  );
  if (mins < 60) return `${Math.max(1, mins)}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function formatShortDate(iso) {
  return iso
    ? new Date(iso).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "—";
}

export function AdminScreen({
  eyebrow,
  title,
  subtitle,
  onBack,
  right,
  tone,
  children,
}) {
  return (
    <SafeAreaView edges={[]} className="flex-1 bg-surface">
      <ScreenHeader
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        tone={tone}
        leftAction={
          onBack ? (
            <HeaderActionButton
              icon="arrow-left"
              size={20}
              accessibilityLabel="Go back"
              onPress={onBack}
            />
          ) : null
        }
        rightAction={right}
      />
      {children}
    </SafeAreaView>
  );
}

export function StatusPill({ label, tone = "neutral" }) {
  const t = TONE_COLORS[tone] ?? TONE_COLORS.neutral;
  return (
    <View
      className="rounded-full px-2 py-[3px] self-start"
      style={{ backgroundColor: t.bg }}
    >
      <Text
        className="text-[11px] font-bold"
        style={{ color: t.fg }}
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  );
}

export function SectionTitle({ title, action, onAction }) {
  return (
    <View className="flex-row items-center justify-between px-5 mt-6 mb-2.5">
      <Text
        accessibilityRole="header"
        className="text-[15px] font-extrabold text-ink"
      >
        {title}
      </Text>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" hitSlop={8}>
          <Text className="text-[13px] font-bold text-primary">{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

export function Group({ children }) {
  return (
    <View
      className="mx-5 bg-white rounded-2xl border border-line/60 overflow-hidden"
      style={shadows.card}
    >
      {children}
    </View>
  );
}

export function KpiTile({ icon, label, value, hint, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? "button" : "text"}
      accessibilityLabel={`${label}: ${value}${hint ? `, ${hint}` : ""}`}
      style={({ pressed }) => ({
        flexBasis: "47%",
        flexGrow: 1,
        opacity: pressed ? 0.9 : 1,
        ...shadows.card,
      })}
      className="bg-white rounded-2xl border border-line/60 p-3.5"
    >
      <View className="w-8 h-8 rounded-full bg-primary-light items-center justify-center">
        <Feather name={icon} size={15} color={colors.primary} />
      </View>
      <Text
        className="text-[26px] font-extrabold text-ink mt-3 tracking-[-0.5px]"
        style={TABULAR_NUMS}
      >
        {value}
      </Text>
      <Text className="text-[12.5px] font-semibold text-ink-secondary mt-0.5">
        {label}
      </Text>
      {hint ? (
        <Text className="text-[11.5px] text-ink-muted mt-0.5" numberOfLines={1}>
          {hint}
        </Text>
      ) : null}
    </Pressable>
  );
}

export const Row = memo(function Row({
  leading,
  title,
  subtitle,
  meta,
  pill,
  footer,
  onPress,
  isLast,
  accessibilityLabel,
}) {
  const body = (
    <>
      {leading ? <View className="mr-3">{leading}</View> : null}
      <View className="flex-1 min-w-0">
        <Text className="text-[14.5px] font-bold text-ink" numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? (
          <Text
            className="text-[12.5px] text-ink-muted mt-0.5"
            numberOfLines={1}
          >
            {subtitle}
          </Text>
        ) : null}
        {footer ? (
          <Text
            className="text-[12px] text-ink-secondary mt-1"
            numberOfLines={2}
          >
            {footer}
          </Text>
        ) : null}
      </View>
      <View className="items-end ml-3 gap-1">
        {meta ? (
          <Text
            className="text-[13px] font-semibold text-ink"
            style={TABULAR_NUMS}
          >
            {meta}
          </Text>
        ) : null}
        {pill ? <StatusPill label={pill.label} tone={pill.tone} /> : null}
      </View>
      {onPress ? (
        <Feather
          name="chevron-right"
          size={16}
          color={colors.inkFaint}
          style={{ marginLeft: 8 }}
        />
      ) : null}
    </>
  );
  const border = isLast ? "" : "border-b border-line/60";
  const label =
    accessibilityLabel ??
    [title, subtitle, meta, pill?.label].filter(Boolean).join(", ");

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.surface : colors.white,
        })}
        className={`flex-row items-center px-4 py-3 min-h-[64px] ${border}`}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View
      accessible
      accessibilityLabel={label}
      className={`flex-row items-center px-4 py-3 min-h-[64px] bg-white ${border}`}
    >
      {body}
    </View>
  );
});

export function IconBubble({ name, tone = "primary" }) {
  const t = TONE_COLORS[tone] ?? TONE_COLORS.primary;
  return (
    <View
      className="w-10 h-10 rounded-full items-center justify-center"
      style={{ backgroundColor: t.bg }}
    >
      <Feather name={name} size={17} color={t.fg} />
    </View>
  );
}

export function SearchField({ value, onChangeText, placeholder }) {
  return (
    <View className="mx-5 mb-3 flex-row items-center bg-white border border-line rounded-xl px-3 min-h-[44px]">
      <Feather name="search" size={16} color={colors.inkFaint} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.inkFaint}
        accessibilityLabel={placeholder}
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        className="flex-1 px-2 py-2.5 text-[14px] text-ink"
      />
      {value ? (
        <Pressable
          onPress={() => onChangeText("")}
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          hitSlop={10}
        >
          <Feather name="x-circle" size={16} color={colors.inkFaint} />
        </Pressable>
      ) : null}
    </View>
  );
}

export function FilterChips({ options, value, onChange }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      // A horizontal ScrollView shrinks by default, so the list below was
      // eating its height and clipping the chips and their bottom padding.
      style={{ flexGrow: 0, flexShrink: 0 }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 2,
        paddingBottom: 14,
      }}
    >
      {options.map((o) => (
        <Chip
          key={o.value}
          size="sm"
          label={o.count ? `${o.label} · ${o.count}` : o.label}
          isSelected={value === o.value}
          onPress={() => onChange(o.value)}
        />
      ))}
    </ScrollView>
  );
}

export function EmptyNote({ icon = "check-circle", title, body }) {
  return (
    <View className="items-center px-8 py-12">
      <View className="w-14 h-14 rounded-full bg-primary-light items-center justify-center mb-3">
        <Feather name={icon} size={24} color={colors.primary} />
      </View>
      <Text className="text-[16px] font-bold text-ink text-center">
        {title}
      </Text>
      {body ? (
        <Text className="text-[13.5px] text-ink-secondary text-center mt-1 leading-5">
          {body}
        </Text>
      ) : null}
    </View>
  );
}

export function ListSkeleton({ rows = 6 }) {
  return (
    <View accessibilityLabel="Loading" className="bg-white">
      {Array.from({ length: rows }, (_, i) => (
        <View
          key={i}
          className="flex-row items-center px-4 py-3 border-b border-line/60"
        >
          <Skeleton width={40} height={40} radius={20} />
          <View className="flex-1 ml-3">
            <Skeleton width="55%" height={13} />
            <Skeleton width="35%" height={11} style={{ marginTop: 8 }} />
          </View>
          <Skeleton width={56} height={18} radius={9} />
        </View>
      ))}
    </View>
  );
}
