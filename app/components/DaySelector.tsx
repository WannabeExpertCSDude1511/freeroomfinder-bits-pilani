"use client";
import { useState } from "react";

export default function DaySelector() {
  const [selectedDay, setSelectedDay] = useState("Select a day");

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedDay}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
      >
        {days.map((day) => (
          <li key={day}>
            <button onClick={() => setSelectedDay(day)}>{day}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
