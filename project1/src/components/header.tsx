import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";

interface HeaderProps {
  title: string;
  source?: ImageSourcePropType;
  height?: number;
  scale?: number;
  translateY?: number;
  children?: React.ReactNode;
}

export default function Header({
  title,
  source = require("../../assets/images/other/Title_screen.webp"),
  height = 100,
  scale = 1,
  translateY = 0,
  children,
}: HeaderProps) {
  return (
    <ImageBackground
      source={source}
      style={[styles.bannerContainer, { height }]}
      imageStyle={{
        transform: [{ scale }, { translateY }],
      }}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
        {title ? <Text style={styles.bannerTitle}>{title}</Text> : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width: "100%",
    height: 140,
    overflow: "hidden",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "valveOracleMedium",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
});
