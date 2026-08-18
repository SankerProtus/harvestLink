// src/components/ui/AppAlert.jsx
//
// Themed replacement for React Native's system Alert dialog, styled to
// match HarvestLink's design system (rounded cards, brand green, soft
// shadows) instead of the OS's plain gray popup. Mount this once near
// the app root (see App.js) — it renders whatever the last
// `Alert.alert(...)` call (src/lib/alert.js) requested.

import { Modal, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAlertStore } from "../../lib/alertStore.js";
import { colors } from "../../theme/colors.js";

const VARIANT_STYLES = {
  default: "bg-primary",
  destructive: "bg-danger",
};

const VARIANT_TEXT_STYLES = {
  default: "text-white",
  destructive: "text-white",
};

export function AppAlert() {
  const { visible, title, message, buttons, hide } = useAlertStore();

  if (!visible) return null;

  const cancelButton = buttons.find((b) => b.style === "cancel");
  const actionButtons = buttons.filter((b) => b.style !== "cancel");
  const isDestructive = buttons.some((b) => b.style === "destructive");

  function handlePress(button) {
    hide();
    // Defer so the modal has fully closed before any navigation or
    // state update the handler triggers (mirrors native Alert timing).
    setTimeout(() => button.onPress?.(), 0);
  }

  function handleRequestClose() {
    // Android hardware back button — behave like the cancel action if
    // one exists, otherwise just dismiss.
    if (cancelButton) {
      handlePress(cancelButton);
    } else {
      hide();
    }
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={handleRequestClose}
    >
      <View
        className="flex-1 items-center justify-center px-8"
        style={{ backgroundColor: "rgba(17,24,39,0.55)" }}
      >
        <View
          className="w-full max-w-[360px] rounded-3xl bg-card px-6 pt-6 pb-5"
          style={{
            shadowColor: "#000",
            shadowOpacity: 0.2,
            shadowRadius: 24,
            shadowOffset: { width: 0, height: 12 },
            elevation: 10,
          }}
        >
          <View
            className={`w-12 h-12 rounded-full items-center justify-center mb-4 self-center ${
              isDestructive ? "bg-danger/10" : "bg-primary/10"
            }`}
          >
            <Feather
              name={isDestructive ? "alert-triangle" : "help-circle"}
              size={22}
              color={isDestructive ? colors.danger : colors.primary}
            />
          </View>

          {title ? (
            <Text className="text-ink font-bold text-[17px] text-center mb-1.5">
              {title}
            </Text>
          ) : null}

          {message ? (
            <Text className="text-ink-muted text-[14.5px] leading-[21px] text-center mb-5">
              {message}
            </Text>
          ) : (
            <View className="mb-3" />
          )}

          <View className="gap-2.5">
            {actionButtons.map((button, index) => {
              const variant =
                button.style === "destructive" ? "destructive" : "default";
              return (
                <Pressable
                  key={`${button.text}-${index}`}
                  onPress={() => handlePress(button)}
                  accessibilityRole="button"
                  accessibilityLabel={button.text}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.88 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                  })}
                  className={`rounded-2xl py-3.5 items-center justify-center ${VARIANT_STYLES[variant]}`}
                >
                  <Text
                    className={`font-bold text-[15px] ${VARIANT_TEXT_STYLES[variant]}`}
                  >
                    {button.text}
                  </Text>
                </Pressable>
              );
            })}

            {cancelButton ? (
              <Pressable
                onPress={() => handlePress(cancelButton)}
                accessibilityRole="button"
                accessibilityLabel={cancelButton.text}
                style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                className="py-2.5 items-center justify-center"
              >
                <Text className="font-semibold text-[14.5px] text-ink-muted">
                  {cancelButton.text}
                </Text>
              </Pressable>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}
