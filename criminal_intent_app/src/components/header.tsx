import React, { useState, useCallback } from "react";
import {
  DimensionValue,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useFocusEffect } from "expo-router";
import { getThemeColor } from "../utils/storage";

interface HeaderProps {
  title: string;
  height?: DimensionValue;
  children?: React.ReactNode;
}

export default function Header({
  title,
  height,
  children,
}: HeaderProps) {
  const [themeColor, setThemeColor] = useState<string>("#4f46e5");

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      async function loadHeaderTheme() {
        const color = await getThemeColor();
        if (isMounted) {
          setThemeColor(color);
        }
      }

      loadHeaderTheme();

      return () => {
        isMounted = false;
      };
    }, [])
  );

  return (
    <View style={[styles.overlay, { height, backgroundColor: themeColor }]}>
      {title ? <Text style={styles.bannerTitle}>{title}</Text> : null}
      <View style={styles.rightContainer}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: "space-between",
    alignItems: "flex-end",
    flexDirection: "row",
    height: 10,
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 30,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  rightContainer: {
    marginLeft: "auto",
    flexDirection: "row",
  },
});