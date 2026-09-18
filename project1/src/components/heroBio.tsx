import React from "react";
import {ActivityIndicator, DimensionValue, ScrollView, StyleSheet, Text, View } from "react-native";

interface heroBioProps {
  bioText?: string | null;
  width?: DimensionValue;
  isLoading?: boolean;
}

export default function HeroBio({
  bioText,
  width = "90%",
  isLoading = false,
}: heroBioProps) {
  if (!bioText && !isLoading) return null;

  return (
    <View style={[styles.boxContainer, { width }]}>
      {!bioText || isLoading ? (
        <ActivityIndicator color="#ce9eff" style={{ marginVertical: 20 }} />
      ) : (
        <Text style={styles.bioText}>{bioText}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "rgba(34, 21, 48, 0.75)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    alignSelf: "center",
    marginVertical: 10,
  },
  scrollContent: {
    paddingRight: 4,
  },
  bioText: {
    color: "#e2d6ec",
    fontFamily: "valveOracleMedium",
    fontSize: 16,
    lineHeight: 20,
  },
});