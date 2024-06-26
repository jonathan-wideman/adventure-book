import { useMemo } from "react";
import { useState } from "react";
import { Input } from "./components/ui/input";

export function LocationsList({ locations, toggleSelect }) {
  const [search, setSearch] = useState("");

  const filteredLocations = useMemo(
    () =>
      locations.filter(
        (location) =>
          location.name.toLowerCase().includes(search.toLowerCase()) ||
          location.id.toLowerCase().includes(search.toLowerCase()),
      ),
    [search, locations],
  );

  return (
    <div className="mx-auto my-0 flex max-w-3xl flex-col gap-4">
      <div>
        <Input
          type="search"
          placeholder="Location id or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-search-icon w-full bg-zinc-800 bg-[url('./search.svg')] bg-[size:theme(spacing.4)] bg-[position:theme(spacing.2)] bg-no-repeat ps-8"
        />
      </div>
      <div className="h-64 overflow-y-scroll">
        {filteredLocations.length === 0 ? (
          <div>No locations found</div>
        ) : (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => toggleSelect(location.id)}
              className="cursor-pointer"
            >
              {location.id} - {location.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
