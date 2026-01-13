import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { clampMin, formatMMSS } from "../src/logic/logic/timer";

export default function OptionsScreen() {
  const [durationSec, setDurationSec] = useState<number>(60);

  function addSeconds(delta: number) {
    setDurationSec((prev) => clampMin(prev + delta, 1));
  }

  function goToTimer() {
    router.push({ pathname: "/timer", params: { durationSec: String(durationSec) } });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Options</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Vald tid</Text>
        <Text style={styles.time}>{formatMMSS(durationSec)}</Text>
      </View>

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => addSeconds(-10)}>
          <Text style={styles.buttonText}>-10s</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => addSeconds(10)}>
          <Text style={styles.buttonText}>+10s</Text>
        </Pressable>
      </View>

      <Pressable style={styles.primaryButton} onPress={goToTimer}>
        <Text style={styles.primaryButtonText}>Start</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },

  card: { padding: 20, borderRadius: 16, borderWidth: 1, width: "100%", alignItems: "center" },
  label: { fontSize: 14, opacity: 0.7 },
  time: { fontSize: 56, fontWeight: "800", marginTop: 6 },

  row: { flexDirection: "row", gap: 12, marginTop: 16 },
  button: { paddingVertical: 12, paddingHorizontal: 18, borderRadius: 12, borderWidth: 1 },
  buttonText: { fontSize: 16, fontWeight: "600" },

  primaryButton: {
    marginTop: 18,
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    borderWidth: 1,
  },
  primaryButtonText: { fontSize: 18, fontWeight: "700" },
});
