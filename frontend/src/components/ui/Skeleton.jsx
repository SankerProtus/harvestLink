import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useReducedMotion,
} from "react-native-reanimated";
import { colors } from "../../theme/colors.js";

export function Skeleton({ width = "100%", height = 16, radius = 8, style }) {
  const reduceMotion = useReducedMotion();
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (reduceMotion) {
      opacity.value = 0.75;
      return;
    }
    opacity.value = withRepeat(withTiming(0.5, { duration: 900 }), -1, true);
  }, [reduceMotion, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      accessible={false}
      importantForAccessibility="no-hide-descendants"
      style={[
        {
          width,
          height,
          borderRadius: radius,
          backgroundColor: colors.skeleton,
        },
        animatedStyle,
        style,
      ]}
    />
  );
}

export function ListingCardSkeleton() {
  return (
    <View
      className="flex-1 bg-white rounded-xl border border-line/50 overflow-hidden mb-3"
      accessibilityLabel="Loading listing"
    >
      <Skeleton height={108} radius={0} />
      <View className="px-2.5 pt-2.5 pb-3">
        <Skeleton width="70%" height={14} />
        <Skeleton width="45%" height={16} style={{ marginTop: 8 }} />
        <Skeleton width="55%" height={10} style={{ marginTop: 8 }} />
      </View>
    </View>
  );
}

export function ProduceCardSkeleton({ width }) {
  return (
    <View
      style={width ? { width } : { flex: 1 }}
      className="bg-white rounded-2xl border border-line/60 overflow-hidden"
      accessibilityLabel="Loading listing"
    >
      <Skeleton width="100%" height={140} radius={0} />
      <View className="px-3 pt-3 pb-3">
        <Skeleton width="75%" height={14} />
        <Skeleton width="45%" height={14} style={{ marginTop: 8 }} />
        <Skeleton width="60%" height={11} style={{ marginTop: 10 }} />
      </View>
    </View>
  );
}