import { useState } from "react";
import { View, Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { colors } from "../../theme/colors.js";

// Wraps the "show a photo, or a neutral icon placeholder" pattern used for
// listing/produce photos throughout the app. Unlike a plain
// `uri ? <Image /> : <placeholder />` check, this also recovers from a URL
// that *looked* valid but failed to actually load (404, timeout, offline
// device) — those are common for hotlinked demo/seed photos, and without
// an onError guard they render as a broken-image glyph instead of the
// same clean placeholder used when there's no photo at all.
export function RemoteImage({
  uri,
  className = "",
  style,
  resizeMode = "cover",
  iconSize = 20,
  iconWrapperClassName = "w-full h-full items-center justify-center",
  iconWrapperStyle,
  iconBadgeClassName,
  icon = "image",
  accessibilityLabel,
}) {
  const [failed, setFailed] = useState(false);
  const showImage = uri && !failed;

  if (!showImage) {
    const iconEl = <Feather name={icon} size={iconSize} color={colors.inkFaint} />;
    return (
      <View className={iconWrapperClassName} style={iconWrapperStyle}>
        {iconBadgeClassName ? (
          <View className={iconBadgeClassName}>{iconEl}</View>
        ) : (
          iconEl
        )}
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      className={className}
      style={style}
      resizeMode={resizeMode}
      accessibilityLabel={accessibilityLabel}
      onError={() => setFailed(true)}
    />
  );
}
