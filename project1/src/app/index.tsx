import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Header, NavButton } from "../components";

export default function Index() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#241c16", "#120e0b", "#000000"]}
      locations={[0, 0.9, 1]}
      style={styles.container}
    >
      <Header
        title=""
        source={require("../../assets/images/other/Title_screen.webp")}
        height={250}
        scale={2}
        translateY={15}
      />
      <View style={styles.content}>
        <NavButton
          title="Heroes"
          source={require("../../assets/images/other/hero_banner.webp")}
          onPress={() => router.push("/hero_select")}
          width="90%"
          height={140}
        />
        <NavButton
          title="Patrons"
          source={require("../../assets/images/other/patron_banner.webp")}
          onPress={() => router.push("/patron_select")}
          width="90%"
          height={140}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241c16",
  },
  content: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    gap: 25,
  },
});
