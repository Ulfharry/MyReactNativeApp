import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onAddMinus10: () => void;
  onAddPlus10: () => void;
};

export function TimerControls({
  isRunning,
  onStart,
  onPause,
  onReset,
  onAddMinus10,
  onAddPlus10,
}: Props) {
  return (
    <>
      <View style={styles.row}>
        <Pressable
          style={[styles.button, isRunning && styles.buttonDisabled]}
          onPress={onAddMinus10}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>-10s</Text>
        </Pressable>

        <Pressable
          style={[styles.button, isRunning && styles.buttonDisabled]}
          onPress={onAddPlus10}
          disabled={isRunning}
        >
          <Text style={styles.buttonText}>+10s</Text>
        </Pressable>
      </View>

      <View style={styles.row}>
        {!isRunning ? (
          <Pressable style={styles.buttonPrimary} onPress={onStart}>
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.buttonPrimary} onPress={onPause}>
            <Text style={styles.buttonText}>Pausa</Text>
          </Pressable>
        )}

        <Pressable style={styles.button} onPress={onReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 12, marginTop: 16 },
  button: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, borderWidth: 1 },
  buttonPrimary: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, borderWidth: 1 },
  buttonDisabled: { opacity: 0.4 },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
