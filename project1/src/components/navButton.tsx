import React, { useEffect } from "react";
import {
  DimensionValue,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

interface navButtonProps {
  title: string;
  source: ImageSourcePropType;
  onPress: () => void;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function NavButton({
  title,
  source,
  onPress,
  width = 200,
  height = 50,
}: navButtonProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-4, { duration: 1700, easing: Easing.inOut(Easing.ease) }),
        withTiming(4, { duration: 1700, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        { width, height },
        pressed && styles.pressed,
      ]}
    >
      <ImageBackground
        source={source}
        style={styles.fixedButtonImage}
        imageStyle={styles.imageRadius}
        resizeMode="cover"
      >
        <Animated.Text
          style={[
            styles.buttonText,
            animatedTitleStyle,
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.6}
        >
          {title}
        </Animated.Text>
      </ImageBackground>
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
  buttonText: {
    color: "rgba(234, 255, 255, 0.9)",
    fontSize: 80,
    fontFamily: "valveOracleMedium",
    letterSpacing: 1,
    textShadowColor: "rgba(127, 250, 248, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});
