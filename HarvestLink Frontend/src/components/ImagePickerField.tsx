import { useState } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

export function ImagePickerField() {
  const [uri, setUri] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  return (
    <Pressable
      onPress={pickImage}
      className="w-full h-36 bg-primary-light border border-border rounded-card items-center justify-center mb-4 overflow-hidden"
    >
      {uri ? (
        <Image source={{ uri }} className="w-full h-full" />
      ) : (
        <View className="items-center">
          <Camera size={22} color="#6B7280" />
          <Text className="text-text-secondary text-sm mt-2">Add photos of your harvest</Text>
        </View>
      )}
    </Pressable>
  );
}
