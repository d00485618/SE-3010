import React, { useReducer } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Header, ThemeButton } from "../components";

export default function Settings() {
  const router = useRouter();
  const [refreshKey, forceUpdate] = useReducer((x) => x + 1, 0);

  return (
    <>
      <Header key={refreshKey} title="Criminal Intent" height="20%" />
      <View style={styles.container}>
        <Text style={styles.title}>Pick a Theme</Text>
        <ThemeButton onThemeChange={() => forceUpdate()} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    marginBottom: 10,
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
});