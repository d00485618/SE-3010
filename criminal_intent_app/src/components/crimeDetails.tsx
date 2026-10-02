import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface crimeDetailsProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function CrimeDetails({
  value,
  onChangeText,
  placeholder = "What happened?",
}: crimeDetailsProps) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        multiline
        numberOfLines={4}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    fontSize: 15,
    color: "#212529",
    borderWidth: 1,
    borderColor: "#CED4DA",
    backgroundColor: "#fffff",
    padding: 5,
    minHeight: 150,
    textAlignVertical: "top",
  },
});