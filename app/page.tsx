"use client";
import { useState } from "react";
import classes from "./data/classes.json";
import DaySelector from "./components/DaySelector";
import HourSelector from "./components/HourSelector";
import ResultsButton from "./components/ResultsButton";

export default function Home() {
  const [selectedDay, setDay] = useState("");
  const [selectedHour, setHour] = useState<number | null>(null);
  const [occupiedRooms, setOccupiedRooms] = useState<typeof classes>([]);
  const hours = Array.from({ length: 11 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;

    return {
      id: i + 1,
      label: `${start}:00 to ${end}:00`,
    };
  });
  const selectedLabel =
    hours.find((h) => h.id === selectedHour)?.label ?? "None";
  function handleResults() {
    const occupied = classes.filter(
      (c) => c.day === selectedDay && c.hour === selectedHour,
    );

    setOccupiedRooms(occupied);
  }
  return (
    <main>
      <h1>Hello World</h1>
      <h3>
        {" "}
        Pick a Day, and then an Hour, to choose the timeslot for which you seek
        a free room. Then, click on the Results button{" "}
      </h3>
      <h3>Day:</h3>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setDay} />
      <h3>Hour: </h3>
      <HourSelector selectedHour={selectedHour} setSelectedHour={setHour} />
      <p>Selected day: {selectedDay || "None"}</p>
      <p>Selected hour: {selectedLabel}</p>
      <ResultsButton onClick={handleResults} />
      <ul>
        {occupiedRooms.map((room) => (
          <li key={`${room.room}-${room.day}-${room.hour}`}>{room.room}</li>
        ))}
      </ul>
    </main>
  );
}
