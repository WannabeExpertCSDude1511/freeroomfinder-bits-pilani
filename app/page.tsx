"use client";
//import { useState } from "react";
import { useEffect, useState } from "react";
import classes from "./data/classes.json";
import DaySelector from "./components/DaySelector";
import HourSelector from "./components/HourSelector";
import ResultsButton from "./components/ResultsButton";
import BuildingSelector from "./components/BuildingSelector";
import AvailabilitySelector from "./components/AvailabilitySelector";

export default function Home() {
  const [selectedDay, setDay] = useState("");
  const [selectedHour, setHour] = useState<number | null>(null);
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [availability, setAvailability] = useState(0);
  //const [occupiedRooms, setOccupiedRooms] = useState<typeof classes>([]);
  const [freeRooms, setFreeRooms] = useState<string[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
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
  /*function handleResults() {
    const occupied = classes.filter((c) => {
      if (c.day !== selectedDay) return false;
      if (selectedHour === null) return false;

      return c.hour >= selectedHour && c.hour < selectedHour + availability;
    });

    //setOccupiedRooms(occupied);
    const occupiedRoomNumbers = occupied.map((c) => c.room);
    const allRooms = [...new Set(classes.map((c) => c.room))];
    const freeRoomNumbers = allRooms
      .filter((room) => !occupiedRoomNumbers.includes(room))
      .sort();
    setFreeRooms(freeRoomNumbers);
    setHasSearched(true);
  }*/
  const ipcRooms = ["6114", "6116", "6117", "6118", "6119"];
  const displayedRooms = freeRooms.filter((room) => {
    if (selectedBuilding == "IPC") {
      return ipcRooms.includes(room);
    }

    return room.startsWith(selectedBuilding);
  });
  function calculateFreeRooms() {
    if (selectedHour === null) return;

    const occupied = classes.filter((c) => {
      if (c.day !== selectedDay) return false;

      return c.hour >= selectedHour && c.hour < selectedHour + availability;
    });

    const occupiedRoomNumbers = occupied.map((c) => c.room);

    const allRooms = [...new Set(classes.map((c) => c.room))];

    const freeRoomNumbers = allRooms
      .filter((room) => !occupiedRoomNumbers.includes(room))
      .sort();

    setFreeRooms(freeRoomNumbers);
  }
  function handleResults() {
    calculateFreeRooms();
    setHasSearched(true);
  }
  useEffect(() => {
    if (hasSearched) {
      calculateFreeRooms();
    }
  }, [selectedDay, selectedHour, availability, hasSearched]);
  return (
    <main>
      <h1>Find a Free Room Here!</h1>
      <h3>
        {" "}
        Pick a Day, and then an Hour, to choose the timeslot for which you seek
        a free room. Then, click on the Results button{" "}
      </h3>
      <h3>Day:</h3>
      <DaySelector selectedDay={selectedDay} setSelectedDay={setDay} />
      <h3>Hour: </h3>
      <HourSelector selectedHour={selectedHour} setSelectedHour={setHour} />
      <h3>Building: </h3>
      <BuildingSelector
        selectedBuilding={selectedBuilding}
        setSelectedBuilding={setSelectedBuilding}
      />
      <h3>Availability:</h3>
      <AvailabilitySelector
        availability={availability}
        setAvailability={setAvailability}
      />
      <p>
        Disabled:{" "}
        {String(
          !selectedDay ||
            selectedHour === null ||
            availability === 0 ||
            !selectedBuilding,
        )}
      </p>
      <ResultsButton
        onClick={handleResults}
        disabled={
          !selectedDay ||
          selectedHour === null ||
          availability == 0 ||
          !selectedBuilding
        }
      />
      {hasSearched && (
        <>
          <h2>Free Rooms ({displayedRooms.length})</h2>

          {displayedRooms.length === 0 ? (
            <p>No free rooms available.</p>
          ) : (
            <ul>
              {displayedRooms.map((room) => (
                <li key={room}>{room}</li>
              ))}
            </ul>
          )}
        </>
      )}
    </main>
  );
}
