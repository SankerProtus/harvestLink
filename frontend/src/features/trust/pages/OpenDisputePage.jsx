import { useState } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { KeyboardAvoider } from "../../../components/ui/KeyboardAvoider.jsx";
import { Text, TextInput } from "../../../components/ui/AppText.jsx";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";

import {
  HeaderActionButton,
  ScreenHeader,
} from "../../../components/ui/ScreenHeader.jsx";
import { Button } from "../../../components/ui/Button.jsx";
import { Card } from "../../../components/ui/Card.jsx";
import { colors } from "../../../theme/colors.js";
import { getErrorMessage } from "../../../lib/errorMap.js";
import {
  useOpenDispute,
  useUploadDisputeEvidence,
} from "../hooks/trustHooks.js";

const REASONS = [
  { value: "NON_DELIVERY", label: "Not delivered" },
  { value: "DAMAGED_GOODS", label: "Damaged goods" },
  { value: "WRONG_QUANTITY", label: "Wrong quantity" },
  { value: "OTHER", label: "Other" },
];

const MAX_EVIDENCE = 5;

export function OpenDisputePage() {
  const navigation = useNavigation();
  const route = useRoute();
  const { orderId } = route.params;

  const openDispute = useOpenDispute();
  const uploadEvidence = useUploadDisputeEvidence();

  const [reason, setReason] = useState("NON_DELIVERY");
  const [description, setDescription] = useState("");
  const [evidenceUrls, setEvidenceUrls] = useState([]);
  const [uploadError, setUploadError] = useState(null);

  const backAction = (
    <HeaderActionButton
      icon="arrow-left"
      size={20}
      accessibilityLabel="Go back"
      onPress={() => navigation.goBack()}
    />
  );

  async function handleAddPhoto() {
    const remainingSlots = MAX_EVIDENCE - evidenceUrls.length;
    if (remainingSlots <= 0) return;
    setUploadError(null);
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setUploadError("Allow photo access to attach evidence.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsMultipleSelection: true,
      selectionLimit: remainingSlots,
      quality: 0.85,
    });
    if (result.canceled) return;

    const uploadedUrls = [];
    for (const asset of result.assets.slice(0, remainingSlots)) {
      try {
        const { url } = await uploadEvidence.mutateAsync(asset.uri);
        uploadedUrls.push(url);
        setEvidenceUrls((prev) => [...prev, url]);
      } catch (err) {
        setUploadError(
          uploadedUrls.length
            ? `${uploadedUrls.length} photo(s) uploaded. ${getErrorMessage(err)}`
            : getErrorMessage(err),
        );
        break;
      }
    }
  }

  async function handleTakePhoto() {
    if (evidenceUrls.length >= MAX_EVIDENCE) return;
    setUploadError(null);
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setUploadError("Allow camera access to attach evidence.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.85,
    });
    if (result.canceled) return;
    try {
      const { url } = await uploadEvidence.mutateAsync(result.assets[0].uri);
      setEvidenceUrls((prev) => [...prev, url]);
    } catch (err) {
      setUploadError(getErrorMessage(err));
    }
  }

  function removeEvidence(url) {
    setEvidenceUrls((prev) => prev.filter((item) => item !== url));
  }

  function handleSubmit() {
    openDispute.mutate(
      {
        orderId,
        reason,
        description: description.trim(),
        evidenceUrls,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["bottom", "left", "right"]}>
      <ScreenHeader
        title="Open dispute"
        subtitle="Photos stay on secure storage for review"
        leftAction={backAction}
      />
      <KeyboardAvoider className="flex-1">
        <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
          <View className="px-5 pt-4">
            <Text className="text-[12.5px] text-ink-muted mb-4">
              Upload up to {MAX_EVIDENCE} photos through HarvestLink. Only
              platform-hosted evidence URLs are accepted. Photos are retained
              only for dispute handling and moderation; do not upload identity
              documents.
            </Text>

            <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
              Reason
            </Text>
            <View className="flex-row flex-wrap gap-2 mb-5">
              {REASONS.map((item) => {
                const active = reason === item.value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => setReason(item.value)}
                    className={`px-3 py-2 rounded-full border ${
                      active
                        ? "bg-primary border-primary"
                        : "bg-card border-line/60"
                    }`}
                  >
                    <Text
                      className={`text-[12.5px] font-semibold ${
                        active ? "text-white" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
              Description
            </Text>
            <TextInput
              placeholder="Describe what went wrong (min. 10 characters)"
              placeholderTextColor={colors.inkFaint}
              value={description}
              onChangeText={setDescription}
              multiline
              maxLength={1000}
              className="rounded-xl2 bg-card border border-line/50 px-4 py-3 text-[13.5px] text-ink min-h-[120px] mb-5"
              textAlignVertical="top"
            />

            <Text className="text-[12px] font-semibold text-ink-muted uppercase tracking-wide mb-2">
              Evidence ({evidenceUrls.length}/{MAX_EVIDENCE})
            </Text>
            <Card className="p-4 mb-3">
              <View className="flex-row flex-wrap gap-2">
                {evidenceUrls.map((url) => (
                  <View key={url} className="w-20 h-20">
                    <Image
                      source={{ uri: url }}
                      className="w-20 h-20 rounded-xl bg-line"
                    />
                    <Pressable
                      onPress={() => removeEvidence(url)}
                      accessibilityLabel="Remove evidence photo"
                      className="absolute -right-1 -top-1 w-6 h-6 rounded-full bg-danger items-center justify-center"
                    >
                      <Feather name="x" size={13} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ))}
                {evidenceUrls.length < MAX_EVIDENCE ? (
                  <View className="flex-row gap-2">
                    <Pressable
                      onPress={handleAddPhoto}
                      disabled={uploadEvidence.isPending}
                      accessibilityLabel="Choose evidence photo"
                      className="w-20 h-20 rounded-xl border border-dashed border-line items-center justify-center bg-cream"
                    >
                      <Feather name="image" size={19} color={colors.primary} />
                      <Text className="text-[9px] text-ink-muted mt-1">
                        Library
                      </Text>
                    </Pressable>
                    <Pressable
                      onPress={handleTakePhoto}
                      disabled={uploadEvidence.isPending}
                      accessibilityLabel="Take evidence photo"
                      className="w-20 h-20 rounded-xl border border-dashed border-line items-center justify-center bg-cream"
                    >
                      <Feather name="camera" size={19} color={colors.primary} />
                      <Text className="text-[9px] text-ink-muted mt-1">
                        Camera
                      </Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
              {uploadError ? (
                <Text className="text-[12px] text-danger mt-2">
                  {uploadError}
                </Text>
              ) : null}
            </Card>

            {openDispute.isError ? (
              <Text className="text-[12.5px] text-danger mb-3">
                {getErrorMessage(openDispute.error)}
              </Text>
            ) : null}

            <Button
              label="Submit dispute"
              isLoading={openDispute.isPending}
              disabled={description.trim().length < 10}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoider>
    </SafeAreaView>
  );
}
