import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { formatMMSS } from "../logic/logic/timer";

type Props = {
  remainingSec: number;
  isRunning: boolean;
};

export function TimerDisplay({ remainingSec, isRunning }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.time}>{formatMMSS(remainingSec)}</Text>
      <Text style={styles.subtext}>{isRunning ? "Kör..." : "Pausad / Ej startad"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 20, borderRadius: 16, borderWidth: 1, width: "100%", alignItems: "center" },
  time: { fontSize: 56, fontWeight: "800" },
  subtext: { marginTop: 8, fontSize: 14, opacity: 0.7 },
});
