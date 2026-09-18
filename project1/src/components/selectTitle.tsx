import { useEffect } from "react";
import { DimensionValue, StyleSheet } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

interface selectTitleProps {
  title: string;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function SelectTitle({ title }: selectTitleProps) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withSequence(
        withTiming(-2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotation.value}deg` }],
  }));

  return (
    <Animated.Text
      style={[styles.titleText, animatedTitleStyle]}
      numberOfLines={1}
      adjustsFontSizeToFit
      minimumFontScale={0.6}
    >
      {title}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  titleText: {
    color: "rgba(206, 158, 255, 0.9)",
    fontSize: 40,
    fontFamily: "valveOracleSemiBold",
    letterSpacing: 1,
    textShadowColor: "rgba(178, 59, 238, 0.9)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
});
