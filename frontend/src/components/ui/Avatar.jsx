import { useState } from "react";
import { View, Image } from "react-native";
import { Text } from "./AppText.jsx";

function initialsOf(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

const SIZE_STYLES = {
  xs: { box: "w-6 h-6", text: "text-[9px]" },
  sm: { box: "w-8 h-8", text: "text-[12px]" },
  md: { box: "w-12 h-12", text: "text-[16px]" },
  lg: { box: "w-24 h-24", text: "text-[28px]" },
  hero: { box: "w-[76px] h-[76px]", text: "text-[26px]" },
};

export function Avatar({ uri, name, size = "md", className = "" }) {
  const sizeStyle = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  // Seed/demo avatars are hotlinked from a third-party placeholder service,
  // which occasionally 404s, times out, or is simply unreachable (offline
  // device, restrictive network). Without this, a failed load renders as a
  // broken-image glyph instead of falling back to initials like we do when
  // there's no uri at all.
  const [failed, setFailed] = useState(false);
  const showImage = uri && !failed;

  return (
    <View
      className={`${sizeStyle.box} rounded-full bg-primary items-center justify-center overflow-hidden ${className}`}
    >
      {showImage ? (
        <Image
          source={{ uri }}
          className="w-full h-full"
          resizeMode="cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <Text className={`text-white font-extrabold ${sizeStyle.text}`}>
          {initialsOf(name)}
        </Text>
      )}
    </View>
  );
}
