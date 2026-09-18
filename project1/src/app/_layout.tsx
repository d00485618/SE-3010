import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    valveOracleMedium: require("../../assets/fonts/valveoracle-medium.ttf"),
    valveOracleThin: require("../../assets/fonts/valveoracle-thin.ttf"),
    valveOracleSemiBold: require("../../assets/fonts/valveoracle-semibold.ttf"),
    valvePulpBold: require("../../assets/fonts/valvepulp-bold.ttf"),
  });
  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerTitle: "",
          headerTransparent: true,
          headerTintColor: "#ffffff",
        }}
      />
    </>
  );
}
