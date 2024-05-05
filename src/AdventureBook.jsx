import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { dbUrl } from "./api";
import { Location } from "./Location";
import { Map } from "./Map";

export function AdventureBook() {
  const locations = useQuery({
    queryKey: ["locations"],
    queryFn: () => fetch(`${dbUrl}/locations`).then((res) => res.json()),
  });

  const pins = useQuery({
    queryKey: ["pins"],
    queryFn: () => fetch(`${dbUrl}/pins`).then((res) => res.json()),
  });

  const [selectedPin, setSelectedPin] = useState(null);

  const addLocation = () => {
    console.log("addLocation");
  };

  if (locations.isLoading || pins.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h3>Adventure Book</h3>

      <Map
        locations={locations}
        pins={pins}
        selectedPin={selectedPin}
        setSelectedPin={setSelectedPin}
      />

      <div>
        {selectedPin ? (
          <Location
            location={locations.data.find((loc) => loc.id === selectedPin)}
            deslectPin={() => setSelectedPin(null)}
          />
        ) : (
          <button onClick={() => addLocation()}>Add Location</button>
        )}
      </div>
      {/* <div>
              {locations.data?.map((location) => (
                <Location
                  key={location.id}
                  location={location}
                  pin={pins.data?.find((pin) => pin.locationId === location.id)}
                />
              ))}
            </div> */}
    </>
  );
}
