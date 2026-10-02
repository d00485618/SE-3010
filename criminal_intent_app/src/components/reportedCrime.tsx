import React from "react";
import {
  DimensionValue,
  Pressable,
  StyleSheet,
  View,
  Text,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ReportedCrimeProps {
  id?: string;
  title?: string;
  date?: string;
  solved?: boolean;
  onPress: (selectedCrime: string) => void;
  width?: DimensionValue;
  minHeight?: DimensionValue;
}

export default function ReportedCrime({
  id = "1",
  title = "Untitled Incident",
  date = "Unknown Date",
  solved = false,
  onPress,
  width = "100%",
  minHeight = 80,
}: ReportedCrimeProps) {
  return (
    <Pressable
      onPress={() => onPress(id)}
      style={({ pressed }) => [
        { width, minHeight },
        styles.cardContainer,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.crimeData}>
        <Text style={styles.crimeName}>{title}</Text>
        <Text style={styles.crimeDate}>{date}</Text>
      </View>

      <View style={styles.statusContainer}>
        {solved && (
          <MaterialCommunityIcons name="handcuffs" size={30} color="#2e2e2e" />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#f3f4f6",
  },
  crimeData: {
    flex: 1,
    flexDirection: "column",
    rowGap: 4,
    marginRight: 10,
  },
  crimeName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  crimeDate: {
    fontSize: 14,
    color: "#6b7280",
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "flex-end",
    minWidth: 30,
  },
});