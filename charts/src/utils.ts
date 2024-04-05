export function calculateTotalTime(callLogs: any): { [key: string]: string } {
  const totalTime: { [key: string]: string } = {};

  for (const key in callLogs) {
    const callEntries = callLogs[key];

    let totalSeconds = 0;
    for (const entry of callEntries) {
      const duration = entry[6];
      const durationParts = duration.split(":");
      const hours = parseInt(durationParts[0]);
      const minutes = parseInt(durationParts[1]);
      const seconds = parseInt(durationParts[2]);

      totalSeconds += hours * 3600 + minutes * 60 + seconds;
    }

    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const totalSecondsLeft = totalSeconds % 60;

    totalTime[key] = `${totalHours.toString().padStart(2, "0")}:${totalMinutes
      .toString()
      .padStart(2, "0")}:${totalSecondsLeft.toString().padStart(2, "0")}`;
  }

  return totalTime;
}
