import { ImageBackground, ImageSourcePropType, StyleSheet } from "react-native";

interface logoProps {
  source?: ImageSourcePropType;
  width?: number;
  height?: number;
}

export default function Logo({
  source = require("../../assets/images/other/eye_logo.webp"),
}: logoProps) {
  return (
    <ImageBackground
      source={source}
      style={styles.fixedButtonImage}
      imageStyle={styles.imageRadius}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  fixedButtonImage: {
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
  },
  imageRadius: {
    borderRadius: 5,
  },
});
