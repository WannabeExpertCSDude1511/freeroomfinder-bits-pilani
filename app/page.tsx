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
  const [selectedBuildings, setSelectedBuildings] = useState<string[]>([]);
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
  const displayedRooms = freeRooms.filter((room) =>
    selectedBuildings.some((building) => {
      if (building === "IPC") {
        return ipcRooms.includes(room);
      }

      return room.startsWith(building);
    }),
  );
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
  const disabled =
    !selectedDay ||
    selectedHour === null ||
    availability === 0 ||
    selectedBuildings.length === 0;
  function getBadgeClass(room: string) {
    if (ipcRooms.includes(room)) {
      return "badge badge-lg bg-gray-300 text-black border-gray-400";
    }

    switch (room[0]) {
      case "1":
        return "badge badge-lg bg-orange-300 text-black border-orange-400";
      case "2":
        return "badge badge-lg bg-sky-300 text-black border-sky-400";
      case "3":
        return "badge badge-lg bg-green-300 text-black border-green-400";
      case "5":
        return "badge badge-lg bg-pink-300 text-black border-pink-400";
      case "6":
        return "badge badge-lg bg-yellow-300 text-black border-yellow-400";
      default:
        return "badge badge-lg";
    }
  }
  return (
    <main className="min-h-screen bg-base-200 flex justify-center items-center p-6">
      <div className="card bg-base-100 shadow-xl w-full max-w-3xl">
        <div className="card-body">
          <h3>
            {" "}
            Room too claustrophobic? Library not comfortable for you? In between
            classes and want a convenient rest spot? Well, no worries, for you
            can...{" "}
          </h3>
          <h1 className="card-title text-4xl justify-center">
            Find a Free Room Here!
          </h1>
          <h3 className="text-black text-base">
            {" "}
            Pick a Day, and then an Hour, to choose the timeslot for which you
            seek a free room. Then, click on the Results button{" "}
          </h3>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <label className="label justify-center">
              <span className="label-text text-black text-lg font-bold">
                Day:
              </span>
            </label>
            <DaySelector selectedDay={selectedDay} setSelectedDay={setDay} />
            <label className="label justify-center">
              <span className="label-text text-black text-lg font-bold">
                Hour:
              </span>
            </label>
            <HourSelector
              selectedHour={selectedHour}
              setSelectedHour={setHour}
            />
            <label className="label justify-center">
              <span className="label-text text-black text-lg font-bold">
                Building:
              </span>
            </label>
            <BuildingSelector
              selectedBuildings={selectedBuildings}
              setSelectedBuildings={setSelectedBuildings}
            />
            <label className="label justify-center">
              <span className="label-text text-black text-lg font-bold">
                Availability:
              </span>
            </label>
            <AvailabilitySelector
              availability={availability}
              setAvailability={setAvailability}
            />
          </div>
          {disabled && (
            <p>
              Choose an option in all the buttons. Then, click on the results
              button.
            </p>
          )}
          {!disabled && !hasSearched && <p>Click on the results button.</p>}
          <ResultsButton
            onClick={handleResults}
            disabled={
              !selectedDay ||
              selectedHour === null ||
              availability == 0 ||
              selectedBuildings.length === 0
            }
            hasSearched={hasSearched}
          />
          {hasSearched && (
            <>
              <h2>Free Rooms ({displayedRooms.length})</h2>

              {displayedRooms.length === 0 ? (
                <p>No free rooms available.</p>
              ) : (
                <div className="flex flex-wrap gap-3 mt-4">
                  {displayedRooms.map((room) => (
                    <div
                      key={room}
                      className={`${getBadgeClass(room)} rounded-md px-4 py-4 text-lg font-medium`}
                    >
                      {room}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
