import React, { useEffect } from "react";
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

interface toggleBioButtonProps {
  title: string;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function ToggleBioButton({
  title,
  onPress,
  width,
  height,
}: toggleBioButtonProps) {
  return (
    <Pressable
        style={({ pressed }) => [
          styles.toggleButton,
          width ? { width } : null,
          height ? { height } : null,
          pressed && styles.toggleButtonPressed,
        ]}
        onPress={onPress}
    >
      <Text style={styles.toggleButtonText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  toggleButton: {
    alignSelf: "center",
    backgroundColor: "rgba(206, 158, 255, 0.15)",
    borderColor: "rgba(206, 158, 255, 0.4)",
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginTop: 15,
    marginBottom: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonPressed: {
    backgroundColor: "rgba(206, 158, 255, 0.3)",
  },
  toggleButtonText: {
    color: "#ce9eff",
    fontFamily: "valveOracleMedium",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1,
  },
});
