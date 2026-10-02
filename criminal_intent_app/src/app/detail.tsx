import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Button, Text } from "react-native";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";
import { getThemeColor } from "../utils/storage";
import {
  Header,
  CrimeTitle,
  NewCrimeTitle,
  CrimeDetails,
  CrimeImage,
  NewCrimeImage,
  CrimeSolved,
  CrimeDate,
  SettingsButton,
} from "../components";
import { getCrimeByIdOrName, saveOrUpdateCrime } from "../utils/storage";

const toMountainISOString = (inputDate: Date = new Date()) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Denver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "shortOffset",
  });

  const parts = formatter.formatToParts(inputDate);
  const getPart = (type: string) => parts.find((p) => p.type === type)?.value || "";

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  let hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");
  const offset = getPart("timeZoneName");

  if (hour === "24") hour = "00";

  const isoOffset = offset
    .replace("GMT", "")
    .replace(/^([+-])(\d)$/, "$10$2:00")
    .replace(/^([+-])(\d{2})$/, "$1$2:00");

  return `${year}-${month}-${day}T${hour}:${minute}:${second}${isoOffset}`;
};

export default function Detail() {
  const router = useRouter();
  const { selectedCrime } = useLocalSearchParams<{ selectedCrime: string }>();
  const isNew = selectedCrime === "new";

  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [date, setDate] = useState<string | null>(toMountainISOString());
  const [solved, setSolved] = useState<boolean>(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      if (!isNew && selectedCrime) {
        const foundCrime = await getCrimeByIdOrName(selectedCrime);
        if (foundCrime) {
          setTitle(foundCrime.title || "");
          setDetails(foundCrime.details || "");
          setDate(foundCrime.date || toMountainISOString());
          setSolved(foundCrime.solved ?? false);
          setPhotoUri(foundCrime.photoUri || null);
        }
      }
    }
    loadData();
  }, [selectedCrime, isNew]);

  const handleDateChange = (newDate: Date) => {
    setDate(toMountainISOString(newDate));
  };

  const [themeColor, setThemeColor] = useState<string>("#4f46e5");
  
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;
  
      async function loadHeaderTheme() {
        const color = await getThemeColor();
        if (isMounted) {
          setThemeColor(color);
        }
      }
  
      loadHeaderTheme();
  
      return () => {
        isMounted = false;
      };
    }, [])
  );

  const handleSave = async () => {
    await saveOrUpdateCrime({
      id: isNew ? undefined : selectedCrime,
      title: title || "Untitled Crime",
      details: details,
      date: date || toMountainISOString(),
      solved: solved,
      photoUri: photoUri || undefined,
    });

    router.back();
  };

  return (
    <View style={styles.screenContainer}>
      <Header title="Criminal Intent" height="20%">
        <SettingsButton />
      </Header>

      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false} overScrollMode="never">
        {isNew && <Text style={styles.pageHeader}>Report New Crime</Text>}

        <View style={styles.crimeContainer}>
          <View style={styles.topSection}>
            <View style={styles.imageSection}>
              {photoUri ? (
                <CrimeImage source={{ uri: photoUri }} />
              ) : (
                <CrimeImage
                  source={require("../../assets/images/No-Image-Placeholder.webp")}
                />
              )}
              <NewCrimeImage photoUri={photoUri} onSelectImage={(uri) => setPhotoUri(uri)} />
            </View>

            <View style={styles.titleSection}>
              {!isNew && <CrimeTitle title={title} />}
              <NewCrimeTitle value={title} onChangeText={setTitle} placeholder="Title" />
            </View>
          </View>

          <Text style={styles.sectionLabel}>Details</Text>
          <CrimeDetails value={details} onChangeText={setDetails} placeholder="What happened?"/>

          <CrimeDate jsonDate={date} onDateChange={handleDateChange} />

          <CrimeSolved value={solved} onValueChange={(val: boolean) => setSolved(val)} />

          <View style={styles.buttonContainer}>
            <Button title="Save Crime" onPress={handleSave} color={themeColor} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  pageHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
    marginTop: 15,
    color: "#111827",
  },
  crimeContainer: {
    flex: 1,
    flexDirection: "column",
    rowGap: 15,
    paddingHorizontal: 20,
  },
  topSection: {
    flexDirection: "row",
    paddingTop: 15,
    gap: 15,
  },
  imageSection: {
    flexDirection: "column",
    rowGap: 10,
  },
  titleSection: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    rowGap: 5,
  },
  sectionLabel: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
    marginTop: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
});