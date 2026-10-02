import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";
import seedData from "../../assets/seedCrimes.json";
import seedTheme from "../../assets/seedTheme.json";

const STORAGE_KEY = "@crimes_list";
const THEME_STORAGE_KEY = "@app_theme_color";

const DEFAULT_THEME_COLOR = seedTheme.primaryColor || "#4f46e5";

export async function getCrimes() {
  try {
    const storedValue = await AsyncStorage.getItem(STORAGE_KEY);

    if (storedValue === null) {
      console.log("First launch detected: Seeding initial data from assets...");
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(seedData));
      return seedData;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error("Failed to load or seed crimes:", error);
    return seedData;
  }
}

export async function saveCrimes(updatedCrimes: any[]) {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCrimes));
  } catch (error) {
    console.error("Failed to save crimes:", error);
  }
}

export async function getCrimeByIdOrName(identifier: string) {
  try {
    const crimes = await getCrimes();

    const match = crimes.find(
      (crime: any) => crime.id === identifier || crime.title === identifier
    );

    return match || null;
  } catch (error) {
    console.error("Error finding specific crime:", error);
    return null;
  }
}

export async function saveOrUpdateCrime(crimeData: {
  id?: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
}) {
  try {
    const crimes = await getCrimes();

    if (crimeData.id && crimeData.id !== "new") {
      const updatedList = crimes.map((item: any) =>
        item.id === crimeData.id ? { ...item, ...crimeData } : item
      );
      await saveCrimes(updatedList);
      return crimeData;
    } else {
      const newEntry = {
        ...crimeData,
        id: Crypto.randomUUID(), // Generates a standard RFC4122 v4 UUID
      };
      const updatedList = [newEntry, ...crimes];
      await saveCrimes(updatedList);
      return newEntry;
    }
  } catch (error) {
    console.error("Error saving crime:", error);
  }
}

export async function getThemeColor(): Promise<string> {
  try {
    const storedColor = await AsyncStorage.getItem(THEME_STORAGE_KEY);

    // First launch or empty value: seed from seedTheme.json
    if (storedColor === null) {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, DEFAULT_THEME_COLOR);
      return DEFAULT_THEME_COLOR;
    }

    return storedColor;
  } catch (error) {
    console.error("Failed to load theme color:", error);
    return DEFAULT_THEME_COLOR;
  }
}

export async function saveThemeColor(hexColor: string): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_STORAGE_KEY, hexColor);
  } catch (error) {
    console.error("Failed to save theme color:", error);
  }
}