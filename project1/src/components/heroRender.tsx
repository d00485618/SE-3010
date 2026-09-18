import {
    DimensionValue,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
} from "react-native";

interface heroRenderProps {
  source: ImageSourcePropType;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function HeroRender({
  source,
  width = 200,
  height = 200,
}: heroRenderProps) {
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
    justifyContent: "center",
    alignItems: "center",
  },
  imageRadius: {
    borderRadius: 0,
  },
});
