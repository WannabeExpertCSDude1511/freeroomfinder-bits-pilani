type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

type Entry = {
  day: Day;
  hour: number;
  room: string;
};

const dayMap: Record<string, Day> = {
  M: "Monday",
  T: "Tuesday",
  W: "Wednesday",
  Th: "Thursday",
  F: "Friday",
  S: "Saturday",
};

export function extractTimetable(text: string): Entry[] {
  const results: Entry[] = [];

  // clean PDF text (VERY IMPORTANT)
  text = text.replace(/\n/g, " ").replace(/\b\d{1,2}\/\d{1,2}\b/g, "");

  /**
   * Matches patterns like:
   * 5102 M W 2
   * 2217 M 6 7
   * 6156 T Th F 2
   */
  const regex = /(\d{4})\s+([MTWThFS\s]+)\s+((?:\b(?:1[0-2]|[1-9])\b\s*)+)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const room = match[1];

    const rawDays = match[2].trim().split(/\s+/);
    const rawHours = match[3].trim().split(/\s+/);

    const days: Day[] = rawDays.map((d) => dayMap[d]).filter(Boolean);

    const hours: number[] = rawHours.map((h) => Number(h));

    // create combinations
    for (const day of days) {
      for (const hour of hours) {
        results.push({ day, hour, room });
      }
    }
  }

  const uniqueResults = Array.from(
  new Map(
    results.map((entry) => [
      `${entry.day}-${entry.hour}-${entry.room}`,
      entry,
    ])
  ).values()
);

return uniqueResults;
}
