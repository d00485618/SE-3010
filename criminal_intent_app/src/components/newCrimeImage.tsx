import React from "react";
import {
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

interface NewCrimeImageProps {
  photoUri: string | null;
  onSelectImage: (uri: string) => void;
}

export default function NewCrimeImage({
  photoUri,
  onSelectImage,
}: NewCrimeImageProps) {
  const handlePickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "Permission to access photo gallery is required to select a crime photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0].uri) {
      onSelectImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={({ pressed }) => [
          styles.imageButton,
          pressed && styles.pressed,
        ]}
        onPress={handlePickImage}
      >
        {photoUri ? (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={36} color="#3d3d3d" />
          </View>
        ) : (
          <View style={styles.placeholderContainer}>
            <Ionicons name="camera-outline" size={36} color="#3d3d3d" />
          </View>
        )}
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 10,
  },
  imageButton: {
    width: "100%",
    height: 70,
    borderRadius: 8,
    borderWidth: 1.5,
    backgroundColor: "#9d9e9f",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.75,
  },
  placeholderContainer: {
    alignItems: "center",
    gap: 6,
  },
  placeholderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  changeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  changeButtonText: {
    fontSize: 13,
    color: "#6C757D",
    fontWeight: "500",
  },
});