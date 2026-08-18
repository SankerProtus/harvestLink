import { useState } from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

import { AuthCard } from "../components/AuthCard.jsx";
import { AuthButton } from "../components/AuthButton.jsx";
import { RoleSelector } from "../components/RoleSelector.jsx";
import { useGoogleSignIn } from "../hooks/authHooks.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { env } from "../../../config/env.js";
import { getDeviceInfo } from "../../../lib/deviceInfo.js";
import { ScreenHeader, HeaderActionButton } from "../../../components/ui/ScreenHeader.jsx";

GoogleSignin.configure({ webClientId: env.GOOGLE_CLIENT_ID });

export function GoogleSignInScreen() {
  const navigation = useNavigation();
  const googleSignIn = useGoogleSignIn();
  const [pendingIdToken, setPendingIdToken] = useState(null);
  const [role, setRole] = useState(undefined);
  const [roleError, setRoleError] = useState(null);
  const [nativeSignInError, setNativeSignInError] = useState(null);

  async function handleGoogleButtonPress() {
    setNativeSignInError(null);
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

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
      setNativeSignInError(err);
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

  return (
    <SafeAreaView className="flex-1 bg-surface">
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
              {getErrorMessage(displayError)}
            </Text>
          ) : null}
        </AuthCard>
      </View>
    </SafeAreaView>
  );
}
