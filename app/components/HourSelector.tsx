"use client";
//import { useState } from "react";
type HourSelectorProps = {
  selectedHour: number | null;
  setSelectedHour: (hour: number) => void;
};
export default function HourSelector({
  selectedHour,
  setSelectedHour,
}: HourSelectorProps) {
  //const [selectedHour, setSelectedHour] = useState<number | null>(null);

  const hours = Array.from({ length: 11 }, (_, i) => {
    const start = 8 + i;
    const end = start + 1;

    return {
      id: i + 1,
      label: `${start}:00 to ${end}:00`,
    };
  });

  const selectedLabel =
    hours.find((h) => h.id === selectedHour)?.label || "Select an Hour";

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedLabel}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
      >
        {hours.map((hour) => (
          <li key={hour.id}>
            <button onClick={() => setSelectedHour(hour.id)}>
              {hour.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
