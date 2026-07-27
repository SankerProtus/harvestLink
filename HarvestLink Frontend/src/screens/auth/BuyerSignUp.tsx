import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { InfoBanner } from "../../components/InfoBanner";
import { apiClient } from "../../api/client";
import { useAuthStore } from "../../store/useAuthStore";

export default function BuyerSignUp() {
  const navigation = useNavigation<any>();
  const setRole = useAuthStore((s) => s.setRole);
  const setPhoneNumber = useAuthStore((s) => s.setPhoneNumber);

  const [businessName, setBusinessName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phone, setPhone] = useState("");
  const [ghanaCard, setGhanaCard] = useState("");
  const [region, setRegion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isValid = businessName && contactPerson && phone && ghanaCard && region;

  const handleCreate = async () => {
    if (!isValid) return;
    setSubmitting(true);
    try {
      await apiClient.post("/auth/signup/buyer", {
        businessName,
        contactPerson,
        phone,
        ghanaCard,
        region,
      });
      setRole("buyer");
      setPhoneNumber(phone);
      navigation.navigate("OtpVerification", { phoneNumber: phone });
    } catch (err) {
      console.error("Buyer sign up failed:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-14">
      <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-6">
        <ChevronLeft size={20} color="#1A1A1A" />
        <Text className="text-text-primary font-medium ml-1">Create Buyer Account</Text>
      </Pressable>

      <Text className="text-2xl font-bold text-text-primary mb-1">Buy direct from farms</Text>
      <Text className="text-text-secondary mb-6">
        Register your business with your Ghana Card so farmers know they are dealing with a trusted buyer.
      </Text>

      <TextField label="Business or market name" placeholder="Serwaa Foods Ltd" value={businessName} onChangeText={setBusinessName} />
      <TextField label="Contact person" placeholder="Ama Serwaa" value={contactPerson} onChangeText={setContactPerson} />
      <TextField label="Phone number" placeholder="+233 20 555 7890" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
      <TextField label="Ghana Card number" placeholder="GHA-987654321-1" value={ghanaCard} onChangeText={setGhanaCard} />
      <TextField label="Region" placeholder="Ashanti Region" value={region} onChangeText={setRegion} />

      <InfoBanner text="We verify every buyer with their Ghana Card so farmers can trade with confidence." />

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
