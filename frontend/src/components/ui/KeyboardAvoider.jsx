import { KeyboardAvoidingView } from "react-native";

/**
 * Keeps focused inputs visible above the on-screen keyboard.
 *
 * Why this exists: every screen used
 *   behavior={Platform.OS === "ios" ? "padding" : undefined}
 * i.e. *no* avoidance on Android, relying on `windowSoftInputMode=adjustResize`
 * (app.json `softwareKeyboardLayoutMode: "resize"`). Since Android edge-to-edge
 * became mandatory (Expo SDK 54+, RN 0.81+, so also this app on SDK 57) the
 * window no longer resizes for the keyboard, so the keyboard slid over the
 * inputs. Using "padding" on both platforms makes React Native pad the view by
 * however much the keyboard overlaps it, which works with or without
 * edge-to-edge (if the window *does* resize, the computed overlap is 0, so it
 * never double-compensates).
 *
 * Place it directly around the ScrollView/form, *below* any custom header that
 * lives in the same screen. KeyboardAvoidingView measures its own frame, so no
 * header-height offset is needed (the old iOS `keyboardVerticalOffset={90}`
 * left a ~90px gap above the keyboard).
 */
export function KeyboardAvoider({
  children,
  keyboardVerticalOffset = 0,
  enabled = true,
  ...props
}) {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled={enabled}
      {...props}
    >
      {children}
    </KeyboardAvoidingView>
  );
}
