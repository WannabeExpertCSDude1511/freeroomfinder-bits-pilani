"use client";

type BuildingSelectorProps = {
  selectedBuilding: string;
  setSelectedBuilding: (building: string) => void;
};

export default function BuildingSelector({
  selectedBuilding,
  setSelectedBuilding,
}: BuildingSelectorProps) {
  const buildings = [
    { label: "FD-1", id: "1" },
    { label: "FD-2", id: "2" },
    { label: "FD-3", id: "3" },
    { label: "LTC", id: "5" },
    { label: "NAB", id: "6" },
    { label: "IPC", id: "IPC" },
  ];
  const selectedLabel =
    buildings.find((h) => h.id === selectedBuilding)?.label ||
    "Select a Building";

  return (
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn m-1">
        {selectedLabel}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
      >
        {buildings.map((building) => (
          <li key={building.id}>
            <button onClick={() => setSelectedBuilding(building.id)}>
              {building.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
