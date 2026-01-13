import * as Haptics from "expo-haptics";
import { useEffect, useMemo, useState } from "react";
import { calculateRemainingMs, clampMin, msToCeilSeconds } from "../logic/logic/timer";
type UseTimerOptions = {
  initialDurationSec?: number;
  tickMs?: number; // hur ofta UI uppdateras när timern kör
};

export function useTimer(options: UseTimerOptions = {}) {
  const initialDurationSec = options.initialDurationSec ?? 60;
  const tickMs = options.tickMs ?? 200;

  const [durationSec, setDurationSec] = useState<number>(initialDurationSec);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [now, setNow] = useState<number>(() => Date.now());

  // Tick endast när timern kör
  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => setNow(Date.now()), tickMs);
    return () => clearInterval(id);
  }, [isRunning, tickMs]);

  const remainingSec = useMemo(() => {
    if (!isRunning || endsAt === null) return durationSec;

    const remainingMs = calculateRemainingMs(endsAt, now);
    return msToCeilSeconds(remainingMs);
  }, [durationSec, endsAt, isRunning, now]);

  // Auto-stop när tiden tar slut
  useEffect(() => {
    if (isRunning && remainingSec <= 0) {

         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {
      // Ignorera om något inte stöds på enheten
    });
      setIsRunning(false);
      setEndsAt(null);
    }
  }, [isRunning, remainingSec]);

  function start() {
    const newEndsAt = Date.now() + durationSec * 1000;
    setEndsAt(newEndsAt);
    setIsRunning(true);
    setNow(Date.now());
  }

  function pause() {
    if (!isRunning || endsAt === null) return;

    const remainingMs = calculateRemainingMs(endsAt, Date.now());
    const newDurationSec = clampMin(msToCeilSeconds(remainingMs), 1);

    setDurationSec(newDurationSec);
    setIsRunning(false);
    setEndsAt(null);
  }

  function reset(newDurationSec: number = initialDurationSec) {
    setIsRunning(false);
    setEndsAt(null);
    setDurationSec(clampMin(newDurationSec, 1));
    setNow(Date.now());
  }

  function addSeconds(delta: number) {
    // Håll det enkelt i början: justera bara när den inte kör
    if (isRunning) return;
    setDurationSec((prev) => clampMin(prev + delta, 1));
  }

  return {
    durationSec,
    remainingSec,
    isRunning,
    start,
    pause,
    reset,
    addSeconds,
  };
}
