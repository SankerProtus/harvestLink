import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { InfoBanner } from "../../components/InfoBanner";
import { apiClient } from "../../api/client";
import { useAuthStore } from "../../store/useAuthStore";

export default function FarmerSignUp() {
  const navigation = useNavigation<any>();
  const setRole = useAuthStore((s) => s.setRole);
  const setPhoneNumber = useAuthStore((s) => s.setPhoneNumber);

  const [fullName, setFullName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [phone, setPhone] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");
  const [region, setRegion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid = fullName && farmName && phone && ghanaCard && region;

  const handleCreate = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await apiClient.post("/auth/signup/farmer", {
        fullName,
        farmName,
        phone,
        ghanaCard,
        region,
      });
      setRole("farmer");
      setPhoneNumber(phone);
      navigation.navigate("OtpVerification", { phoneNumber: phone });
    } catch (err) {
      console.error("Farmer sign up failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-14">
      <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-6">
        <ChevronLeft size={20} color="#1A1A1A" />
        <Text className="text-text-primary font-medium ml-1">Create Account</Text>
      </Pressable>

      <Text className="text-2xl font-bold text-text-primary mb-1">Join HarvestLink</Text>
      <Text className="text-text-secondary mb-6">
        Register with your Ghana Card and farm name so buyers know exactly who they are buying from.
      </Text>

      <TextField label="Full name" placeholder="Kwaku Asante" value={fullName} onChangeText={setFullName} />
      <TextField label="Farm name" placeholder="Asante Family Farm" value={farmName} onChangeText={setFarmName} />
      <TextField label="Phone number" placeholder="+233 24 123 4567" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextField label="Ghana Card number" placeholder="GHA-123456789-0" value={ghanaCard} onChangeText={setGhanaCard} />
      <TextField label="Region" placeholder="Ashanti Region" value={region} onChangeText={setRegion} />

      <InfoBanner text="Your Ghana Card is used once to verify your identity. It is never shown to buyers." />

      <View className="mt-4 mb-4">
        <Button
          label={submitting ? "Creating..." : "Create Account"}
          onPress={handleCreate}
          disabled={!isValid || submitting}
        />
      </View>

      <Pressable onPress={() => navigation.navigate("Login")} className="items-center mb-10">
        <Text className="text-primary font-medium">Already have an account? Log in</Text>
      </Pressable>
    </ScrollView>
  );
}
