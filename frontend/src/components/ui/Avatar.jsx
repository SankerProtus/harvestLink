import { View, Text, Image } from "react-native";

function initialsOf(name) {
  if (!name) return "?";
  return name.trim().charAt(0).toUpperCase();
}

const SIZE_STYLES = {
  xs: { box: "w-6 h-6", text: "text-[9px]" },
  sm: { box: "w-8 h-8", text: "text-[12px]" },
  md: { box: "w-12 h-12", text: "text-[16px]" },
  lg: { box: "w-24 h-24", text: "text-[28px]" },
};

// Single source of truth for "photo if we have one, else initials in a
// colored circle" — used everywhere a person's picture shows up (order
// counterparts, farmer cards, match details, the profile screen) so the
// fallback never silently diverges into a generic icon on one screen and
// initials on another.
export function Avatar({ uri, name, size = "md", className = "" }) {
  const sizeStyle = SIZE_STYLES[size] ?? SIZE_STYLES.md;
  return (
    <View
      className={`${sizeStyle.box} rounded-full bg-primary items-center justify-center overflow-hidden ${className}`}
    >
      {uri ? (
        <Image
          source={{ uri }}
          className="w-full h-full"
          resizeMode="cover"
        />
      ) : (
        <Text className={`text-white font-extrabold ${sizeStyle.text}`}>
          {initialsOf(name)}
        </Text>
      )}
    </View>
  );
}
