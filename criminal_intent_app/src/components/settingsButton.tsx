import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SettingsButton() {
  const router = useRouter();

  return (
    <Pressable 
      onPress={() => router.push('/settings')} 
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed
      ]}
      hitSlop={8}
    >
      <MaterialCommunityIcons name="cog" size={26} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
});