import { useState } from "react";
import { View } from "react-native";
import { Text } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import { AuthCard } from "../components/AuthCard.jsx";
import { AuthButton } from "../components/AuthButton.jsx";
import { RoleSelector } from "../components/RoleSelector.jsx";
import { useGoogleSignIn } from "../hooks/authHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { env } from "../../../config/env.js";
import { getDeviceInfo } from "../../../lib/deviceInfo.js";
import {
  ScreenHeader,
  HeaderActionButton,
} from "../../../components/ui/ScreenHeader.jsx";

GoogleSignin.configure({ webClientId: env.GOOGLE_CLIENT_ID });

// getErrorMessage() (lib/errorMap.js) only knows backend AppError codes
// (AUTH_GOOGLE_TOKEN_INVALID, VALIDATION_ERROR, ...). Errors thrown by the
// native Google Sign-In module itself (before any request reaches our API)
// use a completely different code space, so they need their own mapping —
// otherwise every native failure silently collapses into the generic
// fallback message and hides what's actually wrong (misconfigured client
// ID, missing SHA-1 fingerprint, Play Services issues, etc).
function describeNativeGoogleError(err) {
  if (!isErrorWithCode(err)) {
    return "Google sign-in failed to start. Please try again.";
  }

  switch (err.code) {
    case statusCodes.IN_PROGRESS:
      return "A sign-in is already in progress. Please wait a moment.";
    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      return "Google Play Services is missing or out of date on this device.";
    default:
      // Covers DEVELOPER_ERROR (client ID / SHA-1 / bundle ID misconfigured
      // in Google Cloud Console) and any other native failure. Logging the
      // raw code+message is what actually tells you what's wrong — the UI
      // message alone won't.
      if (__DEV__) {
        console.warn(
          "[GoogleSignIn] native sign-in failed:",
          err.code,
          err.message,
        );
      }
      return "Google sign-in failed. Please try again.";
  }
}

export function GoogleSignInScreen() {
  const navigation = useNavigation();
  const googleSignIn = useGoogleSignIn();
  const [pendingIdToken, setPendingIdToken] = useState(null);
  const [role, setRole] = useState(undefined);
  const [roleError, setRoleError] = useState(null);
  // Native Google Sign-In failures (module never even called our API) are
  // kept separate from backend errors, since they need different message
  // handling — see describeNativeGoogleError() above.
  const [nativeSignInError, setNativeSignInError] = useState(null);

  async function handleGoogleButtonPress() {
    setNativeSignInError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const signInResult = await GoogleSignin.signIn();

      // v13+ of @react-native-google-signin/google-signin wraps the result
      // in { type: "success" | "cancelled", data }. The token now lives at
      // signInResult.data.idToken, not on the top-level response.
      if (signInResult.type !== "success") {
        // User dismissed the account picker — not an error, do nothing.
        return;
      }

      const { idToken } = signInResult.data;

      const device = await getDeviceInfo();
      const result = await googleSignIn.mutateAsync({ idToken, device });
      void result;
    } catch (err) {
      if (err?.code === "BAD_REQUEST") {
        const { idToken } = await GoogleSignin.getTokens().catch(() => ({
          idToken: null,
        }));
        setPendingIdToken(idToken);
        return;
      }
      // Errors normalized by our api client (client.js) always carry a
      // `status` field (even NETWORK_ERROR sets status: null explicitly as
      // part of the shape) — that's how we tell "this came back from
      // authApi.googleSignIn / our backend" apart from "this was thrown by
      // the native GoogleSignin module before we ever called the API".
      const isBackendError = err && typeof err === "object" && "status" in err;
      setNativeSignInError(isBackendError ? err : { isNative: true, raw: err });
    }
  }

  async function handleCompleteWithRole() {
    if (!role) {
      setRoleError("Please select whether you are a Farmer or Buyer.");
      return;
    }
    setRoleError(null);
    try {
      const device = await getDeviceInfo();
      await googleSignIn.mutateAsync({ idToken: pendingIdToken, role, device });
    } catch (err) {
      setNativeSignInError(err);
    }
  }

  const displayError = nativeSignInError ?? googleSignIn.error;
  const displayErrorMessage = displayError?.isNative
    ? describeNativeGoogleError(displayError.raw)
    : getErrorMessage(displayError);

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <StatusBar style="dark" />
      <ScreenHeader
        title={pendingIdToken ? "One last step" : "Sign in with Google"}
        subtitle={
          pendingIdToken
            ? "Tell us if you're a farmer or a buyer"
            : "Continue with your Google account"
        }
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={18}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />

      <View className="flex-1 px-5 pt-4 pb-6 justify-center">
        <AuthCard>
          {pendingIdToken ? (
            <>
              <RoleSelector value={role} onChange={setRole} error={roleError} />
              <View className="h-5" />
              <AuthButton
                label="Create Account"
                onPress={handleCompleteWithRole}
                variant="primary"
                isLoading={googleSignIn.isPending}
              />
            </>
          ) : (
            <AuthButton
              label="Continue with Google"
              onPress={handleGoogleButtonPress}
              variant="secondary"
              isLoading={googleSignIn.isPending}
            />
          )}

          {displayError ? (
            <Text
              className="text-sm text-danger mt-3"
              accessibilityRole="alert"
            >
              {displayErrorMessage}
            </Text>
          ) : null}
        </AuthCard>
      </View>
    </SafeAreaView>
  );
}
