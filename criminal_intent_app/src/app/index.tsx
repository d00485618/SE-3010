import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useCallback } from "react";
import { useRouter, useFocusEffect } from "expo-router";
import { Header, NewCrimeButton, ReportedCrime, SettingsButton } from "../components";
import { getCrimes } from "../utils/storage";

export default function Index() {
  const router = useRouter();
  const [crimes, setCrimes] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const fetchCrimes = async () => {
        const data = await getCrimes();
        if (isActive) {
          setCrimes(data);
        }
      };

      fetchCrimes();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <>
      <Header title="Criminal Intent" height="20%">
        <NewCrimeButton
          isNew="new"
          onPress={() =>
            router.push({
              pathname: "/detail",
              params: { selectedCrime: "new" },
            })
          }
        />
        <SettingsButton/>
      </Header>
      <View style={styles.crimes_container}>
        <FlatList
          data={crimes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReportedCrime
              id={item.id}
              title={item.title}
              date={item.date}
              solved={item.solved}
              onPress={() =>
                router.push({
                  pathname: "/detail",
                  params: { selectedCrime: item.id },
                })
              }
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  crimes_container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    rowGap: 15,
  },
});