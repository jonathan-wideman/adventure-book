import { useState } from "react";
import { Location } from "./Location";
import { Map } from "./Map";
import { useLocations } from "./hooks/queries/useLocations";
import { usePins } from "./hooks/queries/usePins";
import { useAddLocation } from "./hooks/queries/useAddLocation";
import { LocationsList } from "./LocationsList";

export const DEFAULT_TOOL_MODE = "select";

export function AdventureBook() {
  const locations = useLocations();
  const pins = usePins();
  const addLocation = useAddLocation();

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [toolMode, setToolMode] = useState(DEFAULT_TOOL_MODE); // 'select' | 'edit' | 'move' | 'place'

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
          selectedLocation={selectedLocation}
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
        <>
          <h4>Locations</h4>
          <LocationsList
            locations={locations.data}
            toggleSelect={toggleSelect}
          />
          <button onClick={() => clickAddLocation()}>Add Location</button>
        </>
        // TODO: convert styles to tailwind
        // TODO: add shadcdn-ui
      )}
    </>
  );
}
