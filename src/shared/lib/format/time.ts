export const formatTime = (totalTime: number): string => {
  const hours = Math.floor(totalTime / 60);
  const minutes = totalTime % 60;

  const paddedMinutes = minutes.toString().padStart(2, '0');

  return `${hours}:${paddedMinutes}`;
};
