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
          location.id.toLowerCase().includes(search.toLowerCase())
      ),
    [search, locations]
  );

  return (
    <div className="flex flex-col max-w-3xl my-0 mx-auto">
      <div>
        <Input
          type="search"
          placeholder="Location id or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          // FIXME: how does shadcn-ui do bg colors sith url bg's?
          className="w-full ps-8 bg-[url('./search.svg')] bg-zinc-800 bg-search-icon bg-[position:theme(spacing.2)] bg-[size:theme(spacing.4)]"
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
