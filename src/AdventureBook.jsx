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

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [toolMode, setToolMode] = useState("select"); // 'select' | 'edit' | 'move'

  const selectedLocation = locations.data?.find(
    (loc) => loc.id === selectedLocationId
  );
  const selectedPin = pins.data?.find(
    (pin) => pin.locationId === selectedLocationId
  );

  const deselect = () => {
    setSelectedLocationId(null);
  };

  const toggleSelect = (locationId) => {
    locationId === selectedLocationId
      ? setSelectedLocationId(null)
      : setSelectedLocationId(locationId);
  };

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
          toggleSelect={toggleSelect}
          deselect={deselect}
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      </div>

      {selectedLocation ? (
        <Location
          location={selectedLocation}
          pin={selectedPin}
          deselect={deselect}
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      ) : (
        <button onClick={() => clickAddLocation()}>Add Location</button>
        // TODO: list all locations, including those with no pins
        // TODO: for selected location without a pin, show a button to enter place mode
        // TODO: place mode should add a pin when map is clicked
        // TODO: show previews in move, place modes
        // TODO: add method to delete pins, locations
      )}
    </>
  );
}
