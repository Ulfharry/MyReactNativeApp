import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { TimerControls } from "../src/components/timerControls";
import { TimerDisplay } from "../src/components/timerDisplay";
import { useTimer } from "../src/hooks/useTimer";

export default function TimerScreen() {
  const params = useLocalSearchParams<{ durationSec?: string }>();

  // Läs duration från URL-param (default 60)
  const durationSec = Number(params.durationSec ?? "60");
  const safeDurationSec = Number.isFinite(durationSec) && durationSec > 0 ? durationSec : 60;

  const timer = useTimer({ initialDurationSec: safeDurationSec, tickMs: 200 });

  // Starta automatiskt när skärmen laddas
  useEffect(() => {
    timer.start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Timer</Text>

      <TimerDisplay remainingSec={timer.remainingSec} isRunning={timer.isRunning} />

      <TimerControls
        isRunning={timer.isRunning}
        onStart={timer.start}
        onPause={timer.pause}
        onReset={() => timer.reset(safeDurationSec)}
        onAddMinus10={() => timer.addSeconds(-10)}
        onAddPlus10={() => timer.addSeconds(10)}
      />

      <Text style={styles.footer} onPress={() => router.back()}>
        Tillbaka
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 16 },
  footer: { marginTop: 18, fontSize: 14, opacity: 0.7 },
});
