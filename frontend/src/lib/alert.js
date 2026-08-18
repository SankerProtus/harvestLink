// src/lib/alert.js
//
// Drop-in replacement for React Native's `Alert` import. Matches the
// same call signature — Alert.alert(title, message, buttons) — so every
// existing call site keeps working unchanged; only the import line moves
// from "react-native" to this file. Renders through <AppAlert />, a
// themed dialog mounted once near the app root, instead of the OS's
// default system alert.
//
// Usage (identical to React Native):
//   import { Alert } from "../../../lib/alert.js";
//   Alert.alert("Log out", "Are you sure you want to log out?", [
//     { text: "Cancel", style: "cancel" },
//     { text: "Log Out", style: "destructive", onPress: () => logout.mutate() },
//   ]);

import { useAlertStore } from "./alertStore.js";

export const Alert = {
  alert(title, message, buttons) {
    useAlertStore.getState().show(title, message, buttons);
  },
};
