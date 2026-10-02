import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePicker, {
  DateTimePickerChangeEvent,
} from "@react-native-community/datetimepicker";
import { useFocusEffect } from "expo-router";
import { getThemeColor } from "../utils/storage";

interface CrimeDateProps {
  jsonDate: string | null;
  onDateChange: (newDate: Date) => void;
}

export default function CrimeDate({
  jsonDate,
  onDateChange,
}: CrimeDateProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [themeColor, setThemeColor] = useState<string>("#4f46e5");

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function loadTheme() {
        const color = await getThemeColor();
        if (isMounted) {
          setThemeColor(color);
        }
      }

      loadTheme();

      return () => {
        isMounted = false;
      };
    }, [])
  );

  const parsedDate = jsonDate ? new Date(jsonDate) : null;
  const validDate =
    parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : new Date();

  const formattedDisplayDate =
    jsonDate && parsedDate && !isNaN(parsedDate.getTime())
      ? validDate.toLocaleDateString("en-US", {
          timeZone: "America/Denver",
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : "Select Crime Date";

  const handleValueChange = (
    _event: DateTimePickerChangeEvent,
    selectedDate?: Date
  ) => {
    setShowPicker(false);
    if (selectedDate) {
      onDateChange(selectedDate);
    }
  };

  const handleDismiss = () => {
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColor }]}
        onPress={() => setShowPicker(true)}
        activeOpacity={0.7}
      >
        <Text style={styles.buttonText}>{formattedDisplayDate}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={validDate}
          mode="date"
          maximumDate={new Date()}
          display="default"
          timeZoneName="America/Denver"
          onValueChange={handleValueChange}
          onDismiss={handleDismiss}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 2,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
    elevation: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
});