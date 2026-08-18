import { useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  useWindowDimensions,
  Image,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { setHasSeenOnboarding } from "../../../lib/onboardingStorage.js";
import { colors } from "../../../theme/colors.js";
import { shadows } from "../../../theme/shadows.js";

function SellScene() {
  return (
    <View
      className="w-full max-w-[320px] items-center justify-center self-center rounded-xl3 overflow-hidden"
      style={{ aspectRatio: 320 / 240, ...shadows.lg }}
    >
      <Image
        source={require("../../../../assets/farmer-hero.jpg")}
        className="absolute inset-0 w-full h-full"
        resizeMode="cover"
      />
      <View className="absolute inset-0 bg-primary-dark/40" />
      <View className="absolute bottom-6 left-6 right-6">
        <View className="flex-row items-center bg-white/95 rounded-xl2 px-4 py-3">
          <View className="w-10 h-10 rounded-xl bg-primary-muted items-center justify-center mr-3">
            <MaterialCommunityIcons name="basket-outline" size={22} color={colors.primary} />
          </View>
          <View className="flex-1">
            <Text className="text-[13px] font-bold text-ink">Fresh Tomatoes</Text>
            <Text className="text-[12px] text-primary font-semibold">GHS 45 / crate</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

function BrowseScene() {
  return (
    <View
      className="w-full max-w-[320px] items-center justify-center self-center"
      style={{ aspectRatio: 320 / 240 }}
    >
      <View
        className="absolute inset-x-4 top-4 bottom-4 rounded-xl3 bg-primary-muted border border-primary/10"
      />
      <View
        className="h-52 w-32 rounded-[28px] bg-white border-[3px] border-primary-dark items-center pt-4 overflow-hidden"
        style={shadows.lg}
      >
        <View className="h-2 w-10 rounded-full bg-line mb-4" />
        <View className="h-20 w-24 rounded-xl2 bg-primary-muted mb-3" />
        <View className="h-2.5 w-20 rounded-full bg-line mb-2" />
        <View className="h-2.5 w-14 rounded-full bg-line" />
      </View>
      <View
        className="absolute -right-2 top-12 w-12 h-12 rounded-full bg-primary items-center justify-center border-[3px] border-white"
        style={shadows.md}
      >
        <MaterialCommunityIcons name="check-decagram" size={24} color="#FFFFFF" />
      </View>
      <View
        className="absolute left-6 bottom-10 w-10 h-10 rounded-full bg-accent items-center justify-center border-[3px] border-white"
        style={shadows.sm}
      >
        <MaterialCommunityIcons name="cart-outline" size={18} color="#FFFFFF" />
      </View>
    </View>
  );
}

function OfflineScene() {
  return (
    <View
      className="w-full max-w-[320px] items-center justify-center self-center"
      style={{ aspectRatio: 320 / 240 }}
    >
      <View className="absolute inset-x-4 top-4 bottom-4 rounded-xl3 bg-primary-muted border border-primary/10" />
      <View
        className="w-28 h-28 rounded-full bg-white border-[3px] border-primary items-center justify-center"
        style={shadows.lg}
      >
        <MaterialCommunityIcons name="cloud-sync-outline" size={44} color={colors.primary} />
      </View>
      <View className="absolute top-10 right-16 w-9 h-9 rounded-full bg-success items-center justify-center border-2 border-white">
        <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />
      </View>
      <View className="absolute bottom-12 left-16 w-10 h-10 rounded-full bg-accent-light items-center justify-center border-2 border-white">
        <MaterialCommunityIcons name="wifi-off" size={18} color={colors.accent} />
      </View>
    </View>
  );
}

const SLIDES = [
  {
    key: "sell",
    Scene: SellScene,
    title: "Sell your harvest,\nnot to middlemen",
    body: "List what you've grown and set your own price. Buyers see it directly — no broker taking a cut.",
  },
  {
    key: "browse",
    Scene: BrowseScene,
    title: "Fresh produce,\nverified farmers",
    body: "Browse real listings from farmers near you and buy with confidence.",
  },
  {
    key: "offline",
    Scene: OfflineScene,
    title: "Works even on\na weak network",
    body: "Keep listing, browsing, and tracking orders offline. Syncs when you're back online.",
  },
];

function PaginationDots({ scrollX, slideWidth, count }) {
  return (
    <View className="flex-row items-center justify-center gap-2">
      {Array.from({ length: count }).map((_, index) => {
        const inputRange = [
          (index - 1) * slideWidth,
          index * slideWidth,
          (index + 1) * slideWidth,
        ];

        const width = scrollX.interpolate({
          inputRange,
          outputRange: [8, 28, 8],
          extrapolate: "clamp",
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={index}
            className="h-2 rounded-full bg-primary"
            style={{ width, opacity }}
          />
        );
      })}
    </View>
  );
}

export function OnboardingPage({ onComplete }) {
  const insets = useSafeAreaInsets();
  const { width: windowWidth } = useWindowDimensions();

  const scrollRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const isLastSlide = activeIndex === SLIDES.length - 1;

  async function finishOnboarding() {
    await setHasSeenOnboarding();
    onComplete?.();
  }

  function goToSlide(index) {
    scrollRef.current?.scrollTo({ x: index * windowWidth, animated: true });
  }

  function handleNext() {
    if (isLastSlide) {
      finishOnboarding();
      return;
    }
    goToSlide(activeIndex + 1);
  }

  function handleMomentumScrollEnd(event) {
    const index = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
    setActiveIndex(index);
  }

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar style="dark" />

      <View
        className="flex-row justify-between items-center px-5"
        style={{ paddingTop: insets.top ? 4 : 12 }}
      >
        <View className="flex-row items-center">
          <Image
            source={require("../../../../assets/icon.png")}
            className="w-8 h-8 rounded-lg mr-2"
            resizeMode="contain"
          />
          <Text className="text-[16px] font-extrabold text-primary">HarvestLink</Text>
        </View>

        {!isLastSlide ? (
          <Pressable
            onPress={finishOnboarding}
            accessibilityRole="button"
            accessibilityLabel="Skip introduction"
            hitSlop={8}
            className="py-2 px-3 rounded-full bg-white border border-line"
          >
            <Text className="text-[13px] font-semibold text-ink-muted">Skip</Text>
          </Pressable>
        ) : (
          <View style={{ width: 60 }} />
        )}
      </View>

      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        className="flex-1"
      >
        {SLIDES.map(({ key, Scene, title, body }) => (
          <View key={key} style={{ width: windowWidth }} className="px-6">
            <View className="flex-1 items-center justify-center">
              <Scene />
              <Text className="text-ink text-[28px] leading-[34px] font-extrabold text-center mt-10 tracking-[-0.5px]">
                {title}
              </Text>
              <Text className="text-ink-muted text-[15px] leading-[23px] text-center mt-3 max-w-[300px]">
                {body}
              </Text>
            </View>
          </View>
        ))}
      </Animated.ScrollView>

      <View
        className="px-6"
        style={{ paddingBottom: insets.bottom + 20, paddingTop: 8 }}
      >
        <PaginationDots
          scrollX={scrollX}
          slideWidth={windowWidth}
          count={SLIDES.length}
        />

        <Pressable
          onPress={handleNext}
          accessibilityRole="button"
          accessibilityLabel={isLastSlide ? "Get started" : "Next"}
          style={({ pressed }) => ({
            opacity: pressed ? 0.9 : 1,
            transform: [{ scale: pressed ? 0.985 : 1 }],
            ...shadows.lg,
          })}
          className="mt-6 rounded-xl2 bg-primary py-4"
        >
          <Text className="text-center text-[16px] font-bold text-white tracking-[-0.2px]">
            {isLastSlide ? "Get Started" : "Continue"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
