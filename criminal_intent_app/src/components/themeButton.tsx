import React, { useState, useEffect } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { getThemeColor, saveThemeColor } from "../utils/storage";

const THEME_OPTIONS = [
  { name: "Indigo", hex: "#4f46e5" },
  { name: "Emerald", hex: "#059669" },
  { name: "Crimson", hex: "#dc2626" },
  { name: "Amber", hex: "#d97706" },
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Violet", hex: "#7c3aed" },
];

interface ThemeButtonProps {
  onThemeChange?: (newColor: string) => void;
}

export default function ThemeButton({ onThemeChange }: ThemeButtonProps) {
  const [activeColor, setActiveColor] = useState<string>("");

  useEffect(() => {
    async function loadInitialColor() {
      const color = await getThemeColor();
      setActiveColor(color);
    }
    loadInitialColor();
  }, []);

  const handleSelectColor = async (hexColor: string) => {
    setActiveColor(hexColor);
    await saveThemeColor(hexColor);
    if (onThemeChange) {
      onThemeChange(hexColor);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonColumn}>
        {THEME_OPTIONS.map((option) => {
          const isSelected =
            activeColor.toLowerCase() === option.hex.toLowerCase();

          return (
            <Pressable
              key={option.hex}
              onPress={() => handleSelectColor(option.hex)}
              style={({ pressed }) => [
                styles.themeOptionButton,
                { backgroundColor: option.hex },
                isSelected && styles.selectedButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.buttonText}>{option.name}</Text>
              {isSelected && <Text style={styles.activeBadge}>✓ Active</Text>}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  buttonColumn: {
    flexDirection: "column",
    gap: 10,
    width: "100%",
  },
  themeOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  selectedButton: {
    borderWidth: 3,
    borderColor: "#111827",
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  activeBadge: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});