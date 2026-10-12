import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

// Same green as the app icon and native splash, so the hand-off is seamless.
const BRAND_GREEN = "#1A531B";

export function BootScreen() {
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSlow(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View
      onLayout={() => SplashScreen.hideAsync().catch(() => {})}
      accessibilityLabel="Loading HarvestLink"
      accessibilityLiveRegion="polite"
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: BRAND_GREEN,
      }}
    >
      <Image
        source={require("../../../assets/app_logo.png")}
        style={{ width: 128, height: 128 }}
        resizeMode="contain"
        accessible={false}
      />
      <ActivityIndicator color="#FFFFFF" style={{ marginTop: 32 }} />
      {slow ? (
        <Text
          style={{
            color: "rgba(255,255,255,0.85)",
            fontSize: 13,
            lineHeight: 19,
            marginTop: 16,
            paddingHorizontal: 40,
            textAlign: "center",
          }}
        >
          Taking longer than usual. Checking your connection…
        </Text>
      ) : null}
    </View>
  );
}
