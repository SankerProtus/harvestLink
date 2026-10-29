import {
  Children,
  cloneElement,
  isValidElement,
  memo,
} from "react";
import { Platform, Pressable, RefreshControl, ScrollView, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Text } from "../../../components/ui/AppText.jsx";
import {
  ErrorState,
  LoadingState,
} from "../../../components/ui/ScreenState.jsx";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";
import { TABULAR_NUMS } from "../../../theme/typography.js";
import { TONE_COLORS } from "../../deliveryTracking/lib/orderStatus.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  AdminScreen,
  Group,
  IconBubble,
  Row,
  SectionTitle,
  StatusPill,
} from "./AdminUI.jsx";

// Shared building blocks for the Operations drill-down screens (order,
// payment, listing, audit event). Each screen supplies its own fields; the
// layout, loading/error handling and styling live here so they stay uniform.

export function formatDateTime(iso) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const day = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day}, ${time}`;
}

export function shortId(id) {
  return id ? String(id).slice(0, 8).toUpperCase() : "—";
}

// One tone vocabulary for every payment / escrow / refund / payout / dispute
// status so the same word always has the same colour across screens.
export function statusTone(status) {
  switch (status) {
    case "SUCCEEDED":
    case "RELEASED":
    case "FUNDED":
    case "ACTIVE":
    case "APPROVED":
    case "DELIVERED":
    case "RESOLVED":
      return "success";
    case "PENDING":
    case "PROCESSING":
    case "AUTHORIZED":
    case "RELEASE_PENDING":
    case "UNDER_REVIEW":
      return "warning";
    case "HELD":
    case "CAPTURED":
    case "CONFIRMED":
    case "IN_TRANSIT":
      return "primary";
    case "REFUND_PENDING":
    case "FROZEN":
    case "DISPUTED":
    case "OPEN":
      return "accent";
    case "FAILED":
    case "REJECTED":
    case "SUSPENDED":
      return "danger";
    default:
      return "neutral";
  }
}

/**
 * Screen shell: header with back button, then loading / error / content.
 * `children` is a render function that receives the loaded record.
 */
export function DetailScreen({ eyebrow, title, onBack, query, children }) {
  let body;
  if (query.isLoading) {
    body = <LoadingState label="Loading details…" />;
  } else if (query.isError || !query.data) {
    body = (
      <ErrorState
        message={
          query.error
            ? getErrorMessage(query.error)
            : "This record could not be found."
        }
        onRetry={() => query.refetch()}
      />
    );
  } else {
    body = (
      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching}
            onRefresh={() => query.refetch()}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {children(query.data)}
      </ScrollView>
    );
  }

  return (
    <AdminScreen eyebrow={eyebrow} title={title} onBack={onBack}>
      {body}
    </AdminScreen>
  );
}

/** Summary card at the top of a detail screen. */
export function HeroCard({
  icon,
  tone = "primary",
  title,
  subtitle,
  pills = [],
  amount,
  amountCaption,
}) {
  return (
    <View
      className="mx-5 mt-1 bg-white rounded-2xl border border-line/60 p-4"
      style={shadows.card}
    >
      <View className="flex-row items-start">
        <IconBubble name={icon} tone={tone} />
        <View className="flex-1 min-w-0 ml-3">
          <Text
            className="text-[17px] font-extrabold text-ink tracking-[-0.2px]"
            numberOfLines={2}
          >
            {title}
          </Text>
          {subtitle ? (
            <Text className="text-[13px] text-ink-muted mt-0.5" numberOfLines={2}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </View>
      {pills.length > 0 ? (
        <View className="flex-row flex-wrap gap-2 mt-3">
          {pills.map((pill) => (
            <StatusPill key={pill.label} label={pill.label} tone={pill.tone} />
          ))}
        </View>
      ) : null}
      {amount ? (
        <View className="mt-3 pt-3 border-t border-line/60">
          {amountCaption ? (
            <Text className="text-[11.5px] font-semibold text-ink-muted uppercase tracking-wide">
              {amountCaption}
            </Text>
          ) : null}
          <Text
            className="text-[24px] font-extrabold text-ink mt-0.5 tracking-[-0.4px]"
            style={TABULAR_NUMS}
          >
            {amount}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

export function NoteCard({ text, tone }) {
  const t = tone ? TONE_COLORS[tone] : null;
  return (
    <View
      className="mx-5 rounded-2xl border border-line/60 p-4"
      style={{ backgroundColor: t ? t.bg : colors.white }}
    >
      <Text
        className="text-[13.5px] leading-5"
        style={{ color: t ? t.fg : colors.inkSecondary }}
      >
        {text}
      </Text>
    </View>
  );
}

/**
 * Titled card. Children are Field / Row elements; falsy children are
 * dropped so a screen can include a field conditionally. The last visible
 * child loses its bottom border. Do not wrap children in a fragment.
 */
export function FieldGroup({ title, children, empty = "Nothing recorded." }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <>
      <SectionTitle title={title} />
      {items.length === 0 ? (
        <NoteCard text={empty} />
      ) : (
        <Group>
          {items.map((child, index) =>
            cloneElement(child, { isLast: index === items.length - 1 }),
          )}
        </Group>
      )}
    </>
  );
}

/** Label on the left, value on the right; long values wrap. */
export const Field = memo(function Field({
  label,
  value,
  emphasis = false,
  onPress,
  isLast,
}) {
  const display =
    value === undefined || value === null || value === ""
      ? "—"
      : String(value);
  const border = isLast ? "" : "border-b border-line/60";

  const content = (
    <>
      <Text className="w-[36%] pr-3 text-[12.5px] text-ink-muted">{label}</Text>
      <Text
        selectable={!onPress}
        className={`flex-1 text-right text-[13.5px] text-ink ${
          emphasis ? "font-bold" : "font-semibold"
        }`}
        style={TABULAR_NUMS}
      >
        {display}
      </Text>
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

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${display}`}
        style={({ pressed }) => ({
          backgroundColor: pressed ? colors.surface : colors.white,
        })}
        className={`flex-row items-start px-4 py-3 ${border}`}
      >
        {content}
      </Pressable>
    );
  }
  return (
    <View
      accessible
      accessibilityLabel={`${label}: ${display}`}
      className={`flex-row items-start px-4 py-3 bg-white ${border}`}
    >
      {content}
    </View>
  );
});

/** A buyer / farmer / actor shown as a row. */
export function PartyRow({ role, party, isLast }) {
  const level = party?.verificationLevel ?? 0;
  return (
    <Row
      leading={<IconBubble name="user" tone="neutral" />}
      title={party?.fullName ?? "Unknown"}
      subtitle={[role, party?.phone].filter(Boolean).join(" · ")}
      pill={
        party
          ? { label: `Tier ${level}`, tone: level > 0 ? "success" : "neutral" }
          : undefined
      }
      isLast={isLast}
    />
  );
}

function TimelineItem({ item, isLast }) {
  const tone = TONE_COLORS[item.tone] ?? TONE_COLORS.neutral;
  const body = (
    <View className="flex-row px-4 pt-3.5 bg-white">
      <View className="items-center w-3 mr-3">
        <View
          className="w-2.5 h-2.5 rounded-full mt-1"
          style={{ backgroundColor: tone.fg }}
        />
        {!isLast ? <View className="w-px flex-1 bg-line mt-1" /> : null}
      </View>
      <View className="flex-1 min-w-0 pb-3.5">
        <View className="flex-row items-start">
          <Text
            className="flex-1 text-[13.5px] font-bold text-ink"
            numberOfLines={2}
          >
            {item.title}
          </Text>
          {item.chevron ? (
            <Feather
              name="chevron-right"
              size={16}
              color={colors.inkFaint}
              style={{ marginLeft: 8 }}
            />
          ) : null}
        </View>
        {item.detail ? (
          <Text className="text-[12.5px] text-ink-secondary mt-0.5 leading-[18px]">
            {item.detail}
          </Text>
        ) : null}
        <Text className="text-[11.5px] text-ink-muted mt-1">
          {formatDateTime(item.at)}
        </Text>
      </View>
    </View>
  );

  if (item.onPress) {
    return (
      <Pressable
        onPress={item.onPress}
        accessibilityRole="button"
        accessibilityLabel={`${item.title}, ${formatDateTime(item.at)}`}
      >
        {body}
      </Pressable>
    );
  }
  return (
    <View accessible accessibilityLabel={`${item.title}, ${formatDateTime(item.at)}`}>
      {body}
    </View>
  );
}

/**
 * Vertical event history. `items`: { id, title, detail?, at, tone?, onPress? }.
 * Entries without a timestamp are skipped; the rest are shown oldest first
 * unless `newestFirst` is set.
 */
export function TimelineGroup({
  title,
  items,
  newestFirst = false,
  empty = "No events recorded yet.",
}) {
  const sorted = items
    .filter((item) => item.at)
    .sort((a, b) => {
      const diff = new Date(a.at).getTime() - new Date(b.at).getTime();
      return newestFirst ? -diff : diff;
    });
  return (
    <>
      <SectionTitle title={title} />
      {sorted.length === 0 ? (
        <NoteCard text={empty} />
      ) : (
        <Group>
          {sorted.map((item, index) => (
            <TimelineItem
              key={item.id}
              item={{ ...item, chevron: Boolean(item.onPress) }}
              isLast={index === sorted.length - 1}
            />
          ))}
        </Group>
      )}
    </>
  );
}

function stringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

/** Pretty-printed, selectable JSON for free-form metadata. */
export function JsonBlock({ value }) {
  return (
    <View className="px-4 py-3.5 bg-white">
      <Text
        selectable
        style={{
          fontFamily: Platform.select({
            ios: "Menlo",
            android: "monospace",
            default: "monospace",
          }),
          fontSize: 12,
          lineHeight: 18,
          color: colors.inkSecondary,
        }}
      >
        {stringify(value)}
      </Text>
    </View>
  );
}
