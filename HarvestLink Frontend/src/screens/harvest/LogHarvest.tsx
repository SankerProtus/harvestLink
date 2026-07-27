import { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { ChevronLeft } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { ImagePickerField } from "../../components/ImagePickerField";
import { database } from "../../db";

export default function LogHarvest() {
  const navigation = useNavigation<any>();

  const [cropType, setCropType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [farmLocation, setFarmLocation] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [saving, setSaving] = useState(false);

  const isValid = cropType && quantity && pricePerKg && farmLocation && availableFrom;

  const handlePost = async () => {
    if (!isValid) return;
    setSaving(true);
    try {
      await database.write(async () => {
        await database.get("harvests").create((harvest: any) => {
          harvest.cropType = cropType;
          harvest.quantityKg = parseFloat(quantity);
          harvest.pricePerKg = parseFloat(pricePerKg);
          harvest.farmLocation = farmLocation;
          harvest.availableFrom = new Date(availableFrom).getTime();
          harvest.synced = false; // syncWithServer() picks this up when connection returns
        });
      });
      navigation.navigate("Marketplace");
    } catch (err) {
      console.error("Failed to save harvest locally:", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-14">
      <Pressable onPress={() => navigation.goBack()} className="flex-row items-center mb-6">
        <ChevronLeft size={20} color="#1A1A1A" />
        <Text className="text-text-primary font-medium ml-1">Log New Harvest</Text>
      </Pressable>

      <ImagePickerField />

      <TextField
        label="Crop type"
        placeholder="Tomatoes"
        value={cropType}
        onChangeText={setCropType}
      />
      <TextField
        label="Quantity available (kg)"
        placeholder="120"
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <TextField
        label="Price per kg (GH₵)"
        placeholder="8.50"
        keyboardType="decimal-pad"
        value={pricePerKg}
        onChangeText={setPricePerKg}
      />
      <TextField
        label="Farm location"
        placeholder="Ejura, Ashanti Region"
        value={farmLocation}
        onChangeText={setFarmLocation}
      />
      <TextField
        label="Available from"
        placeholder="18 Jul 2026"
        value={availableFrom}
        onChangeText={setAvailableFrom}
      />

      <View className="mt-2 mb-8">
        <Button
          label={saving ? "Saving..." : "Post Harvest Listing"}
          onPress={handlePost}
          disabled={!isValid || saving}
        />
      </View>
    </ScrollView>
  );
}
