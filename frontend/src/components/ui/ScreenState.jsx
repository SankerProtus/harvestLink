import { View, Text, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button } from "./Button.jsx";
import { colors } from "../../theme/colors.js";
import { shadows } from "../../theme/shadows.js";

export function LoadingState({ label = "Loading…" }) {
  return (
    <View className="flex-1 items-center justify-center px-6 pb-20">
      <View
        className="w-14 h-14 rounded-full bg-white items-center justify-center mb-4 border border-line/50"
        style={shadows.sm}
      >
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
      <Text className="text-[14px] text-ink-muted font-medium">{label}</Text>
    </View>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  retryLabel = "Try again",
  icon = "alert-triangle",
}) {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-20">
      <View className="w-16 h-16 rounded-full bg-danger-muted items-center justify-center mb-4">
        <Feather name={icon} size={24} color={colors.danger} />
      </View>
      <Text className="text-[17px] font-extrabold text-ink text-center mb-1.5 tracking-[-0.2px]">
        {title}
      </Text>
      {message ? (
        <Text
          className="text-[14px] text-ink-muted text-center mb-6 leading-5"
          accessibilityRole="alert"
        >
          {message}
        </Text>
      ) : null}
      {onRetry ? (
        <View className="w-full max-w-[240px]">
          <Button label={retryLabel} onPress={onRetry} variant="secondary" />
        </View>
      ) : null}
    </View>
  );
}

export function EmptyState({ icon = "inbox", title, description, action }) {
  return (
    <View className="flex-1 items-center justify-center px-8 pb-20">
      <View
        className="w-[72px] h-[72px] rounded-full bg-white border border-line/60 items-center justify-center mb-5"
        style={shadows.card}
      >
        <Feather name={icon} size={28} color={colors.inkFaint} />
      </View>
      {title ? (
        <Text className="text-[17px] font-extrabold text-ink text-center mb-1.5 tracking-[-0.2px]">
          {title}
        </Text>
      ) : null}
      {description ? (
        <Text className="text-[14px] text-ink-muted text-center leading-5 max-w-[280px]">
          {description}
        </Text>
      ) : null}
      {action ? <View className="w-full max-w-[280px] mt-6">{action}</View> : null}
    </View>
  );
}

export function Banner({ variant = "warning", title, message, icon }) {
  const styles = {
    warning: {
      bg: "bg-warning-muted border-warning/20",
      iconBg: "bg-warning/15",
      iconColor: colors.warning,
      titleColor: "text-[#92400E]",
      messageColor: "text-[#A16207]",
    },
    info: {
      bg: "bg-info-muted border-info/20",
      iconBg: "bg-info/15",
      iconColor: colors.info,
      titleColor: "text-[#1E40AF]",
      messageColor: "text-[#2563EB]",
    },
    success: {
      bg: "bg-success-muted border-success/20",
      iconBg: "bg-success/15",
      iconColor: colors.success,
      titleColor: "text-[#065F46]",
      messageColor: "text-[#059669]",
    },
  };

  const style = styles[variant] ?? styles.warning;

  return (
    <View
      className={`rounded-xl2 border px-4 py-3.5 flex-row items-center gap-3 ${style.bg}`}
    >
      {icon ? (
        <View
          className={`w-9 h-9 rounded-xl items-center justify-center ${style.iconBg}`}
        >
          <Feather name={icon} size={16} color={style.iconColor} />
        </View>
      ) : null}
      <View className="flex-1">
        <Text className={`text-[13px] font-semibold leading-[18px] ${style.titleColor}`}>
          {title}
        </Text>
        {message ? (
          <Text className={`text-[12px] mt-0.5 leading-[16px] ${style.messageColor}`}>
            {message}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
