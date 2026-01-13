export function clampMin(value: number, min: number): number {
  return value < min ? min : value;
}

export function calculateRemainingMs(endsAt: number, now: number): number {
  return Math.max(0, endsAt - now);
}

export function msToCeilSeconds(ms: number): number {
  return Math.ceil(ms / 1000);
}

export function formatMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
