import { useState } from "react";
import { Location } from "./Location";
import { Map } from "./Map";
import { useLocations } from "./hooks/queries/useLocations";
import { usePins } from "./hooks/queries/usePins";
import { useAddLocation } from "./hooks/queries/useAddLocation";

export function AdventureBook() {
  const locations = useLocations();
  const pins = usePins();
  const addLocation = useAddLocation();

  const [selectedPin, setSelectedPin] = useState(null);
  const [toolMode, setToolMode] = useState("select"); // 'select' | 'edit' | 'move'

  const clickAddLocation = () => {
    addLocation.mutate();
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

      <div
        style={{
          width: "100%",
          // height: "calc(100vh - 10rem)",
          // overflow: "scroll",
          position: "relative",
        }}
      >
        <Map
          locations={locations}
          pins={pins}
          selectedPin={selectedPin}
          setSelectedPin={setSelectedPin}
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      </div>

      {selectedPin ? (
        <Location
          location={locations.data.find((loc) => loc.id === selectedPin)} // FIXME: should use pin.locationId
          pin={pins.data.find((pin) => pin.id === selectedPin)}
          deslectPin={() => setSelectedPin(null)}
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      ) : (
        <button onClick={() => clickAddLocation()}>Add Location</button>
        // TODO: list all locations, including those with no pins
        // TODO: change selection to be based on location id not pin id
        // TODO: for selected location without a pin, show a button to enter place mode
        // TODO: place mode should add a pin when map is clicked
        // TODO: show previews in move, place modes
        // TODO: add method to delete pins, locations
      )}
    </>
  );
}
