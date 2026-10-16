import { useState } from "react";
import { View, ScrollView, Pressable, Linking } from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { Alert } from "../../../lib/alert.js";
import { colors } from "../../../theme/colors.js";
import { LEGAL_URLS } from "../../../config/legal.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import { Button } from "../../../components/ui/Button.jsx";
import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { useDeleteAccount } from "../hooks/authHooks.js";

const CONSEQUENCES = [
  {
    icon: "user-x",
    text: "Your name, phone number and profile photo are removed.",
  },
  { icon: "package", text: "Any active listings are taken down." },
  { icon: "smartphone", text: "You're signed out on every device." },
  {
    icon: "file-text",
    text: "Past orders and payments are kept for record-keeping, without your name.",
  },
];

export function DeleteAccountPage() {
  const navigation = useNavigation();
  const deleteAccount = useDeleteAccount();
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText.trim() === "DELETE";

  function handleDelete() {
    Alert.alert(
      "Delete your account?",
      "This can't be undone. You won't be able to sign in with this account again.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete account",
          style: "destructive",
          onPress: () => deleteAccount.mutate(),
        },
      ],
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={[]}>
      <ScreenHeader
        title="Delete account"
        leftAction={
          <HeaderActionButton
            icon="arrow-left"
            size={20}
            accessibilityLabel="Go back"
            onPress={() => navigation.goBack()}
          />
        }
      />
      <KeyboardAvoider className="flex-1">
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <Text
            accessibilityRole="header"
            className="text-[20px] font-extrabold text-ink tracking-[-0.3px]"
          >
            This permanently deletes your account
          </Text>
          <Text className="text-[14px] text-ink-secondary mt-2 leading-[21px]">
            You can't delete your account while you have active orders or
            payments still being settled. Finish or cancel those first.
          </Text>

          <View className="bg-white rounded-2xl border border-line/60 mt-5 overflow-hidden">
            {CONSEQUENCES.map((item, i) => (
              <View
                key={item.text}
                className={`flex-row items-center px-4 py-3.5 ${
                  i < CONSEQUENCES.length - 1 ? "border-b border-line/60" : ""
                }`}
              >
                <Feather
                  name={item.icon}
                  size={17}
                  color={colors.inkSecondary}
                />
                <Text className="text-[13.5px] text-ink ml-3 flex-1 leading-5">
                  {item.text}
                </Text>
              </View>
            ))}
          </View>

          <Text className="text-[13.5px] font-semibold text-ink mt-6">
            Type DELETE to confirm
          </Text>
          <TextInput
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
            autoCorrect={false}
            placeholder="DELETE"
            placeholderTextColor={colors.inkFaint}
            accessibilityLabel="Type DELETE to confirm account deletion"
            className="bg-white border border-line rounded-xl px-4 py-3.5 text-[16px] text-ink mt-2"
          />

          {deleteAccount.isError ? (
            <View className="mt-3 rounded-xl bg-danger-muted px-4 py-3">
              <Text
                className="text-[13.5px] text-danger leading-5"
                accessibilityLiveRegion="polite"
              >
                {getErrorMessage(deleteAccount.error)}
              </Text>
            </View>
          ) : null}

          <View className="mt-5">
            <Button
              label="Delete my account"
              variant="danger"
              disabled={!canDelete}
              isLoading={deleteAccount.isPending}
              onPress={handleDelete}
            />
          </View>

          {LEGAL_URLS.accountDeletion ? (
            <Pressable
              onPress={() => Linking.openURL(LEGAL_URLS.accountDeletion)}
              accessibilityRole="link"
              className="items-center min-h-[48px] justify-center mt-3"
            >
              <Text className="text-[13px] font-semibold text-primary">
                Can't access the app? Request deletion online
              </Text>
            </Pressable>
          ) : null}
        </ScrollView>
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
