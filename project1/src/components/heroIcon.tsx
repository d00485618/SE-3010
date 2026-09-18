import {
    DimensionValue,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
} from "react-native";

interface heroIconProps {
  source: ImageSourcePropType;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function HeroIcon({
  source,
  width = 100,
  height = 150,
}: heroIconProps) {
  return (
    <ImageBackground
      source={source}
      style={[styles.fixedImage, { width, height }]}
      imageStyle={styles.imageRadius}
      resizeMode="cover"
    />
  );
}

const styles = StyleSheet.create({
  fixedImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageRadius: {
    borderRadius: 5,
  },
});
