import { View } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { Card } from "../../../components/ui/Card.jsx";
import { PriceText } from "../../../components/ui/PriceText.jsx";
import { RemoteImage } from "../../../components/ui/RemoteImage.jsx";
import {
  TrustBadge,
  getOrderTrustSignals,
} from "../../../components/ui/TrustBadge.jsx";
import {
  TIMELINE_LABELS,
  TIMELINE_STEPS,
  TONE_COLORS,
  getOrderStatusCopy,
  getOrderStatusMeta,
} from "../lib/orderStatus.js";

function Timeline({ status }) {
  const currentIndex = TIMELINE_STEPS.indexOf(status);
  return (
    <View
      accessible
      accessibilityRole="progressbar"
      accessibilityLabel={`Order progress: ${TIMELINE_LABELS[status]}, step ${currentIndex + 1} of ${TIMELINE_STEPS.length}`}
      accessibilityValue={{
        min: 0,
        max: TIMELINE_STEPS.length - 1,
        now: currentIndex,
      }}
      className="flex-row mt-4"
    >
      {TIMELINE_STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <View key={step} className="flex-1 items-center">
            {index > 0 ? (
              <View
                className={`absolute left-0 right-1/2 h-[2px] ${index <= currentIndex ? "bg-primary" : "bg-line"}`}
                style={{ top: 11 }}
              />
            ) : null}
            {index < TIMELINE_STEPS.length - 1 ? (
              <View
                className={`absolute left-1/2 right-0 h-[2px] ${index < currentIndex ? "bg-primary" : "bg-line"}`}
                style={{ top: 11 }}
              />
            ) : null}
            <View
              className={`w-6 h-6 rounded-full items-center justify-center ${
                isDone
                  ? "bg-primary"
                  : isCurrent
                    ? "bg-white border-2 border-primary"
                    : "bg-line"
              }`}
            >
              {isDone ? (
                <Feather name="check" size={13} color="#FFFFFF" />
              ) : isCurrent ? (
                <View className="w-2 h-2 rounded-full bg-primary" />
              ) : null}
            </View>
            <Text
              className={`text-[11px] mt-1.5 font-semibold ${
                isCurrent
                  ? "text-primary-dark"
                  : isDone
                    ? "text-ink"
                    : "text-ink-muted"
              }`}
              numberOfLines={1}
            >
              {TIMELINE_LABELS[step]}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

// Layout animations in Reanimated 4 follow the system reduce-motion setting
// by default, so this entrance is skipped for users who've turned it off.
export function OrderStatusHero({
  order,
  total,
  isFarmer,
  orderRef,
  dateLabel,
}) {
  const meta = getOrderStatusMeta(order.status);
  const copy = getOrderStatusCopy({ status: order.status, isFarmer });
  const tone = TONE_COLORS[meta.tone];
  const signals = getOrderTrustSignals(order);
  const isLinear = TIMELINE_STEPS.includes(order.status);

  return (
    <Animated.View entering={FadeInDown.duration(260)}>
      <Card padded={false}>
        <View className="flex-row items-center p-4">
          <View className="w-14 h-14 rounded-xl overflow-hidden bg-primary-muted mr-3">
            <RemoteImage
              uri={order.listing?.images?.[0]}
              className="w-full h-full"
              iconSize={18}
              icon="package"
            />
          </View>
          <View className="flex-1 min-w-0 mr-2">
            <Text className="text-[15px] font-bold text-ink" numberOfLines={1}>
              {order.listing?.title ?? "Order"}
            </Text>
            <Text
              className="text-[12px] text-ink-muted mt-0.5"
              numberOfLines={1}
            >
              #{orderRef} · {dateLabel}
            </Text>
          </View>
          <PriceText amount={total} size="sm" />
        </View>

        <View className="border-t border-line/70 p-4">
          <View className="flex-row items-center">
            <View
              className="w-10 h-10 rounded-full items-center justify-center mr-3"
              style={{ backgroundColor: tone.bg }}
            >
              <Feather name={meta.icon} size={18} color={tone.fg} />
            </View>
            <View className="flex-1">
              <Text
                className="text-[11px] font-bold uppercase tracking-[0.8px]"
                style={{ color: tone.fg }}
              >
                {meta.label}
              </Text>
              <Text className="text-[18px] font-extrabold text-ink tracking-[-0.3px]">
                {copy.title}
              </Text>
            </View>
            {copy.actionNeeded ? (
              <View className="rounded-full bg-accent-dark px-2.5 py-1">
                <Text className="text-[11px] font-bold text-white">
                  Action needed
                </Text>
              </View>
            ) : null}
          </View>

          {copy.next ? (
            <Text className="text-[13.5px] text-ink-secondary mt-3 leading-5">
              {copy.next}
            </Text>
          ) : null}
          {copy.help ? (
            <Text className="text-[12.5px] text-ink-muted mt-1.5 leading-[18px]">
              {copy.help}
            </Text>
          ) : null}

          {signals.length > 0 ? (
            <View className="flex-row flex-wrap gap-2 mt-3">
              {signals.map((type) => (
                <TrustBadge key={type} type={type} />
              ))}
            </View>
          ) : null}

          {isLinear ? <Timeline status={order.status} /> : null}
        </View>
      </Card>
    </Animated.View>
  );
}
