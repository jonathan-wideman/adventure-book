import { useState } from "react";
import { Location } from "./Location";
import { Map } from "./Map";
import { useLocations } from "./hooks/queries/useLocations";
import { usePins } from "./hooks/queries/usePins";

export function AdventureBook() {
  const locations = useLocations();
  const pins = usePins();

  const [selectedPin, setSelectedPin] = useState(null);

  const addLocation = () => {
    console.log("addLocation");
  };

  if (locations.isLoading || pins.isLoading) {
    return <div>Loading...</div>;
  }
  
  if (locations.isError || pins.isError) {
    return <div>Something went wrong</div>;
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

      {selectedPin ? (
        <Location
          location={locations.data.find((loc) => loc.id === selectedPin)}
          deslectPin={() => setSelectedPin(null)}
        />
      ) : (
        <button onClick={() => addLocation()}>Add Location</button>
      )}
    </>
  );
}
