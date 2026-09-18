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
import { SvgProps } from "react-native-svg";

interface heroTitleProps {
  SvgComponent?: React.FC<SvgProps> | { default: React.FC<SvgProps> } | null;
  width?: DimensionValue;
  height?: DimensionValue;
  aspectRatio?: number;
}

export default function HeroTitle({
  SvgComponent,
  width = "80%",
  height,
  aspectRatio = 4,
}: heroTitleProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, []);

  const animatedTitleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  if (!SvgComponent) return null;

  const Component =
    typeof SvgComponent === "function"
      ? SvgComponent
      : (SvgComponent as any).default;

  if (typeof Component !== "function" && typeof Component !== "object") {
    console.warn("SvgComponent is not a valid component. Did Metro restart?");
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        animatedTitleStyle,
        { width },
        height ? { height } : { aspectRatio },
      ]}
    >
      <Component
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
