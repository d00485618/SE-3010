import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface newCrimeTitleProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function NewCrimeTitle({
  value,
  onChangeText,
  placeholder = "Title",
}: newCrimeTitleProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    fontSize: 20,
    fontWeight: "600",
    color: "#212529",
    borderBottomWidth: 1,
    borderBottomColor: "#CED4DA",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
});