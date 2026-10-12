import { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../components/ui/AppText.jsx";
import { colors } from "../theme/colors.js";
import { MAX_BAR_WIDTH, getTabMetrics } from "./tabMetrics.jsx";

function useKeyboardVisible() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (Platform.OS !== "android") return undefined;
    const show = Keyboard.addListener("keyboardDidShow", () =>
      setVisible(true),
    );
    const hide = Keyboard.addListener("keyboardDidHide", () =>
      setVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  return visible;
}

function Badge({ value }) {
  return (
    <View
      accessible={false}
      style={{
        position: "absolute",
        top: -4,
        right: 4,
        minWidth: 18,
        height: 18,
        paddingHorizontal: 4,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accentDark,
        borderWidth: 2,
        borderColor: colors.white,
      }}
    >
      <Text
        maxFontSizeMultiplier={1}
        style={{
          fontSize: 10,
          lineHeight: 12,
          fontWeight: "700",
          color: colors.white,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function AppTabBar({ state, descriptors, navigation }) {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const keyboardVisible = useKeyboardVisible();

  if (keyboardVisible) return null;

  const m = getTabMetrics({ width, height, tabCount: state.routes.length });

  return (
    <View
      style={{
        backgroundColor: colors.white,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colors.line,
        paddingBottom: Math.max(insets.bottom, 8),
        paddingLeft: insets.left,
        paddingRight: insets.right,
        shadowColor: "#0F172A",
        shadowOpacity: 0.06,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: -3 },
        elevation: 8,
      }}
    >
      <View
        accessibilityRole="tablist"
        style={{
          flexDirection: "row",
          alignSelf: "center",
          width: "100%",
          maxWidth: MAX_BAR_WIDTH,
          paddingTop: m.landscapePhone ? 4 : 8,
          paddingHorizontal: 4,
        }}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel ?? options.title ?? route.name;
          const badge = options.tabBarBadge;
          const isFocused = state.index === index;
          const color = isFocused ? colors.primary : colors.inkMuted;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
          const onLongPress = () =>
            navigation.emit({ type: "tabLongPress", target: route.key });

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              accessibilityRole="tab"
              accessibilityState={{ selected: isFocused }}
              accessibilityLabel={
                badge != null ? `${label}, ${badge} pending` : label
              }
              testID={options.tabBarButtonTestID}
              android_ripple={{
                color: colors.primaryLight,
                radius: m.perTab / 2,
              }}
              style={{
                flex: 1,
                minHeight: m.landscapePhone ? 44 : 52,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: m.landscapePhone ? "row" : "column",
                paddingBottom: 2,
              }}
            >
              <View
                style={{
                  width: m.pillW,
                  height: m.pillH,
                  borderRadius: m.pillH / 2,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: isFocused
                    ? colors.primaryLight
                    : "transparent",
                }}
              >
                {options.tabBarIcon?.({
                  focused: isFocused,
                  color,
                  size: m.icon,
                })}
                {badge != null ? <Badge value={badge} /> : null}
              </View>
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.8}
                maxFontSizeMultiplier={1.15}
                style={{
                  maxWidth: m.landscapePhone ? undefined : m.perTab - 4,
                  marginTop: m.landscapePhone ? 0 : 3,
                  marginLeft: m.landscapePhone ? 6 : 0,
                  fontSize: m.label,
                  lineHeight: m.label + 4,
                  fontWeight: isFocused ? "700" : "600",
                  letterSpacing: 0.1,
                  textAlign: "center",
                  color: isFocused ? colors.primaryActive : colors.inkMuted,
                }}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
