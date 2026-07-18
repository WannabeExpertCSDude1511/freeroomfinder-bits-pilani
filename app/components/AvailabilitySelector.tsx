"use client";

type AvailabilitySelectorProps = {
  availability: number;
  setAvailability: (value: number) => void;
};

export default function AvailabilitySelector({
  availability,
  setAvailability,
}: AvailabilitySelectorProps) {
  const options = [
    { label: "This hour", value: 1 },
    { label: "At least 2 hours", value: 2 },
    { label: "At least 3 hours", value: 3 },
    { label: "At least 4 hours", value: 4 },
  ];

  const selectedLabel =
    options.find((o) => o.value === availability)?.label ??
    "Select availability";

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedLabel}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
      >
        {options.map((option) => (
          <li key={option.value}>
            <button onClick={() => setAvailability(option.value)}>
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
