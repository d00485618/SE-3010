import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { BottomTabInset, MaxContentWidth, Spacing } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question:
      "Python is a statically typed language, meaning variable types must be explicitly declared before use.",
    answer: false,
  },
  {
    id: 2,
    question: "Lists in Python are mutable, while tuples are immutable.",
    answer: true,
  },
  {
    id: 3,
    question:
      "Python uses indentation to define code blocks instead of curly braces {} or keywords like begin/end.",
    answer: true,
  },
  {
    id: 4,
    question: "The expression 3 * '2' will raise a TypeError in Python.",
    answer: false,
  },
  {
    id: 5,
    question:
      "In Python, the // operator performs floor division, returning the quotient rounded down to the nearest integer.",
    answer: true,
  },
  {
    id: 6,
    question: "Functions in Python can return multiple values as a tuple.",
    answer: true,
  },
  {
    id: 7,
    question: "Python's built-in range() function returns a list of integers.",
    answer: false,
  },
  {
    id: 8,
    question:
      "The is operator checks if two variables have equal values, while == checks if they refer to the exact same object in memory.",
    answer: false,
  },
];

export default function HomeScreen() {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  const primaryButtonColor = isLandscape ? "#10B981" : "#3052fc";
  const selectedButtonColor = isLandscape ? "#047857" : "#1D35B8";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCheat, setShowCheat] = useState(false);
  const [userSelected, setUserSelected] = useState<boolean | null>(null);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];

  const handleAnswer = (selected: boolean) => {
    setUserSelected(selected);
    const isCorrect = selected === currentQuestion.answer;
    Alert.alert(
      isCorrect ? "Correct!" : "Incorrect",
      isCorrect
        ? "Great job!"
        : `The correct answer was ${currentQuestion.answer ? "True" : "False"}.`,
      [
        {
          text: "OK",
          onPress: () => handleNext(),
        },
      ],
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % QUIZ_QUESTIONS.length);
    setShowCheat(false);
    setUserSelected(null);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + QUIZ_QUESTIONS.length) % QUIZ_QUESTIONS.length,
    );
    setShowCheat(false);
    setUserSelected(null);
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={[
          styles.heroSection,
          isLandscape && { flex: 0.18, backgroundColor: primaryButtonColor },
        ]}
      >
        <ThemedText
          type="title"
          style={[styles.title, isLandscape && { fontSize: 28, paddingTop: 0 }]}
        >
          QUIZ APP
        </ThemedText>
      </SafeAreaView>

      <SafeAreaView style={styles.safeArea}>
        <ThemedText style={styles.questionTracker}>
          Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
        </ThemedText>
        <View style={styles.quizSection}>
          <ThemedText
            style={[
              styles.quizQuestion,
              isLandscape && { fontSize: 20, minHeight: 40 },
            ]}
          >
            {currentQuestion.question}
          </ThemedText>

          <View style={styles.quizAnswerButtonBar}>
            <Pressable
              style={({ pressed }) => [
                styles.answerButton,
                { backgroundColor: primaryButtonColor },
                userSelected === true && {
                  backgroundColor: selectedButtonColor,
                },
                pressed && styles.buttonPressed,
              ]}
              onPress={() => handleAnswer(true)}
            >
              <ThemedText style={styles.answerButtonText}>True</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.answerButton,
                { backgroundColor: primaryButtonColor },
                userSelected === false && {
                  backgroundColor: selectedButtonColor,
                },
                pressed && styles.buttonPressed,
              ]}
              onPress={() => handleAnswer(false)}
            >
              <ThemedText style={styles.answerButtonText}>False</ThemedText>
            </Pressable>
          </View>

          {showCheat && (
            <View style={styles.cheatBox}>
              <ThemedText
                style={[styles.cheatButtonText, { color: primaryButtonColor }]}
              >
                Answer: {currentQuestion.answer ? "TRUE" : "FALSE"}
              </ThemedText>
            </View>
          )}

          <View style={styles.navButtonBar}>
            <Pressable
              style={({ pressed }) => [
                styles.navButton,
                { backgroundColor: primaryButtonColor },
                pressed && styles.buttonPressed,
              ]}
              onPress={handlePrev}
            >
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
              <ThemedText style={styles.navButtonText}>{"Prev"}</ThemedText>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.navButton,
                { backgroundColor: primaryButtonColor },
                pressed && styles.buttonPressed,
              ]}
              onPress={handleNext}
            >
              <ThemedText style={styles.navButtonText}>{"Next"}</ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          <View style={styles.navButtonBar}>
            <Pressable
              style={({ pressed }) => [
                styles.cheatButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={() => setShowCheat((prev) => !prev)}
            >
              <ThemedText
                style={[styles.cheatButtonText, { color: primaryButtonColor }]}
              >
                {showCheat ? "Hide Answer" : "CHEAT"}
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.two,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    flex: 0.25,
    paddingHorizontal: Spacing.one,
    gap: Spacing.four,
    backgroundColor: "#3052fc",
  },
  title: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 40,
    paddingTop: Spacing.four,
  },
  quizSection: {
    flexDirection: "column",
    alignItems: "center",
    gap: Spacing.three,
    marginTop: Spacing.two,
    width: "100%",
  },
  questionTracker: {
    fontSize: 16,
    opacity: 0.7,
  },
  quizQuestion: {
    fontSize: 24,
    textAlign: "center",
    minHeight: 80,
  },
  quizAnswerButtonBar: {
    flexDirection: "row",
    gap: Spacing.three,
    justifyContent: "center",
    width: "100%",
  },
  answerButton: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  answerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cheatBox: {
    padding: Spacing.three,
    backgroundColor: "#E2E8F0",
    borderRadius: Spacing.two,
    width: "100%",
    alignItems: "center",
  },
  navButtonBar: {
    flexDirection: "row",
    gap: Spacing.four,
    justifyContent: "center",
    width: "100%",
  },
  navButton: {
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: Spacing.two,
    flex: 1,
  },
  navButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  cheatButton: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.four,
    borderRadius: Spacing.three,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  cheatButtonText: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});
