import {
  DimensionValue,
  StyleSheet,
  View,
  Text,
} from "react-native";
import React from "react";
import Checkbox from "expo-checkbox";

interface CrimeSolvedProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function CrimeSolved({
  value,
  onValueChange,
  width = "100%",
  height = 80,
}: CrimeSolvedProps) {
  return (
    <View style={styles.container}>
      <Checkbox
        value={value}
        onValueChange={onValueChange}
        color={value ? "#4f46e5" : undefined}
      />
      <Text style={styles.solvedText} numberOfLines={1}>
        Solved
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  solvedText: {
    fontSize: 20,
    fontWeight: "600",
  },
});