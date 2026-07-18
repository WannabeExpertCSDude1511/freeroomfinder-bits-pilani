"use client";

type BuildingSelectorProps = {
  selectedBuildings: string[];
  setSelectedBuildings: (buildings: string[]) => void;
};

export default function BuildingSelector({
  selectedBuildings,
  setSelectedBuildings,
}: BuildingSelectorProps) {
  const buildings = [
    { label: "FD-1", id: "1", color: "text-orange-500" },
    { label: "FD-2", id: "2", color: "text-sky-500" },
    { label: "FD-3", id: "3", color: "text-green-500" },
    { label: "LTC", id: "5", color: "text-pink-500" },
    { label: "NAB", id: "6", color: "text-yellow-500" },
    { label: "IPC", id: "IPC", color: "text-gray-500" },
  ];
  const selectedLabel =
    selectedBuildings.length === 0
      ? "Select Buildings"
      : buildings
          .filter((building) => selectedBuildings.includes(building.id))
          .map((building) => building.label)
          .join(", ");
  function toggleBuilding(id: string) {
    if (selectedBuildings.includes(id)) {
      setSelectedBuildings(selectedBuildings.filter((b) => b !== id));
    } else {
      setSelectedBuildings([...selectedBuildings, id]);
    }
  }
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
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="checkbox checkbox-sm"
                checked={selectedBuildings.includes(building.id)}
                onChange={() => toggleBuilding(building.id)}
              />
              <span className={` ${building.color}`}>{building.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
