import {
    DimensionValue,
    ImageBackground,
    ImageSourcePropType,
    Pressable,
    StyleSheet,
} from "react-native";
import { Image } from 'expo-image';

interface heroCardProps {
  source: ImageSourcePropType;
  selectedHero: string;
  onPress: (selectedHero: string) => void;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function HeroCard({
  source,
  selectedHero,
  onPress,
  width = 80,
  height = 120,
}: heroCardProps) {
  return (
    <Pressable
      onPress={() => onPress(selectedHero)}
      style={({ pressed }) => [{ width, height }, pressed && styles.pressed]}
    >
      <ImageBackground
        source={source}
        style={styles.fixedButtonImage}
        imageStyle={styles.imageRadius}
        resizeMode="cover"
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    alignSelf: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  fixedButtonImage: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  imageRadius: {
    borderRadius: 5,
  },
});
