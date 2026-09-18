import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  HeroBio,
  HeroIcon,
  HeroRender,
  HeroTitle,
  ToggleBioButton,
} from "../components";
const heroRenders = require.context(
  "../../assets/images/heroes",
  true,
  /_Render\.webp$/,
);
const heroTitles = require.context(
  "../../assets/images/heroes",
  true,
  /_name\.svg$/,
);
const heroBios = require.context(
  "../../assets/images/heroes",
  true,
  /bio.*\.js$/,
);
const heroIcons = require.context(
  "../../assets/images/heroes",
  true,
  /_card\.webp$/,
);
const heroGloatIcons = require.context(
  "../../assets/images/heroes",
  true,
  /_Gloat\.webp$/,
);
const heroCriticalIcons = require.context(
  "../../assets/images/heroes",
  true,
  /_Critical\.webp$/,
);

export default function Hero() {
  const router = useRouter();

  const { selectedHero } = useLocalSearchParams<{ selectedHero: string }>();
  const heroName = selectedHero;

  const [useAltBio, setUseAltBio] = useState(false);

  const imageRenderKey = `./${heroName}/${heroName}_Render.webp`;
  const imageTitleKey = `./${heroName}/${heroName}_name.svg`;
  const textBioKey = `./${heroName}/bio.js`;
  const textAltBioKey = `./${heroName}/bio_translated.js`;
  const imageCardKey = `./${heroName}/${heroName}_card.webp`;
  const imageGloatKey = `./${heroName}/${heroName}_Gloat.webp`;
  const imageCriticalKey = `./${heroName}/${heroName}_Critical.webp`;

  const renderSource = heroRenders(imageRenderKey);
  const TitleSource = heroTitles(imageTitleKey);
  const BioSource = heroBios(textBioKey);
  const AltBioSource = heroName === "Yamato" ? heroBios(textAltBioKey) : null;
  const cardSource = heroIcons(imageCardKey);
  const GloatSource = heroGloatIcons(imageGloatKey);
  const CriticalSource = heroCriticalIcons(imageCriticalKey);

  const activeBio = useAltBio && AltBioSource ? AltBioSource : BioSource;

  return (
    <LinearGradient
      colors={["#170f1b", "#100b13", "#000000"]}
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
        <View style={styles.content}>
          <View style={styles.renderWrapper}>
            <HeroRender source={renderSource} width="100%" height={350} />
          </View>
          <HeroTitle SvgComponent={TitleSource} width="85%" aspectRatio={4} />

          {heroName === "Yamato" && (
            <ToggleBioButton
              title={useAltBio ? "SHOW ORIGINAL BIO" : "TRANSLATE BIO"}
              onPress={() => setUseAltBio((prev) => !prev)}
            />
          )}
          <HeroBio bioText={activeBio} width="90%" />

          <View style={styles.icons}>
            <HeroIcon source={cardSource} />
            <HeroIcon source={GloatSource} />
            <HeroIcon source={CriticalSource} />
          </View>
          {heroName === "Silver" && (
            <View style={styles.icons}>
              <HeroIcon
                source={require("../../assets/images/heroes/Silver/Werewolf_Silver_card.webp")}
              />
              <HeroIcon
                source={require("../../assets/images/heroes/Silver/Werewolf_Silver_Gloat.webp")}
              />
              <HeroIcon
                source={require("../../assets/images/heroes/Silver/Werewolf_Silver_Critical.webp")}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  renderWrapper: {
    width: "100%",
    alignItems: "flex-end",
  },
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
    paddingTop: 60,
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  icons: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 15,
    paddingHorizontal: 16,
  },
});
