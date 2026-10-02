import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface newCrimeButtonProps {
  isNew: string;
  onPress: (isNew: string) => void;
}

export default function NewCrimeButton({
  isNew,
  onPress,
}: newCrimeButtonProps) {
  return (
    <Pressable 
      onPress={() => onPress(isNew)} 
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed
      ]}
    >
      <Text style={styles.plusText}>+</Text>
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
  plusText: {
    color: 'white',
    fontSize: 50,
    lineHeight: 26, 
    textAlign: 'center',
    fontWeight: 200,
  },
});