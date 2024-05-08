import { useMemo } from "react";
import { useState } from "react";

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
    <div
      style={{
        maxWidth: "720px",
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
      }}
    >
      <div>
        <input
          type="search"
          placeholder="Location id or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="location-search-box"
        />
      </div>
      <div style={{ height: "15rem", overflowY: "scroll" }}>
        {filteredLocations.length === 0 ? (
          <div>No locations found</div>
        ) : (
          filteredLocations.map((location) => (
            <div
              key={location.id}
              onClick={() => toggleSelect(location.id)}
              style={{ cursor: "pointer" }}
            >
              {location.id} - {location.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
