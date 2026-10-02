import {
    DimensionValue,
    StyleSheet,
    View,
    Text,
} from "react-native";

interface crimeTitleProps {
  title?: string;
  width?: DimensionValue;
  height?: DimensionValue;
}

export default function CrimeTitle({
  title = "Untitled Incident",
  width = "100%",
  height = 80,
}: crimeTitleProps) {
  return (
    <Text style={styles.crimeName} numberOfLines={1}>{title}</Text>
  );
}

const styles = StyleSheet.create({
  crimeName: {
    fontSize: 20,
    fontWeight: "600",
  },
});
