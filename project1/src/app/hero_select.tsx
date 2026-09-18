import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { HERO_NAMES } from "../../assets/data/heroNames";
import { Header, HeroCard, Logo, SelectTitle } from "../components";
const heroCards = require.context(
  "../../assets/images/heroes",
  true,
  /_card\.webp$/,
);

export default function Hero_Select() {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#241c16", "#120e0b", "#000000"]}
      locations={[0, 0.9, 1]}
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        <Header
          title=""
          source={require("../../assets/images/other/City_buildings.jpg")}
          height={200}
          scale={1}
          translateY={0}
        >
          <Logo />
        </Header>
        <View style={styles.content}>
          <SelectTitle title="SELECT HERO" />
        </View>
        <View style={styles.hero_grid}>
          {HERO_NAMES.map((heroName) => {
            const imageKey = `./${heroName}/${heroName}_card.webp`;
            const cardSource = heroCards(imageKey);

            return (
              <HeroCard
                key={heroName}
                selectedHero={heroName}
                source={cardSource}
                onPress={() =>
                  router.push({
                    pathname: "/hero",
                    params: { selectedHero: heroName },
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#241c16",
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 50,
  },
  content: {
    alignItems: "center",
    paddingVertical: 15,
  },
  hero_grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 16,
  },
});
