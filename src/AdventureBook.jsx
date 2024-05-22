import { useState } from "react";
import { useLocations } from "./hooks/queries/useLocations";
import { usePins } from "./hooks/queries/usePins";
import { useAddLocation } from "./hooks/queries/useAddLocation";
import { Button } from "./components/ui/button";
import { LocationSelect } from "./LocationSelect";
import { LocationToolbar } from "./LocationToolbar";
import { cn } from "./lib/utils";
import { PixiMap } from "./PixiMap";

export const DEFAULT_TOOL_MODE = "select";

export function AdventureBook() {
  const locations = useLocations();
  const pins = usePins();

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [toolMode, setToolMode] = useState(DEFAULT_TOOL_MODE); // 'select' | 'edit' | 'move' | 'place'

  const selectedLocation = locations.data?.find(
    (loc) => loc.id === selectedLocationId,
  );
  const selectedPin = pins.data?.find(
    (pin) => pin.locationId === selectedLocationId,
  );

  const deselect = () => {
    setSelectedLocationId(null);
  };

  const toggleSelect = (locationId) => {
    locationId === selectedLocationId
      ? setSelectedLocationId(null)
      : setSelectedLocationId(locationId);
  };

  const onLocationAdded = (location) => {
    setSelectedLocationId(location.id);
  };

  const addLocation = useAddLocation(onLocationAdded);

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
    <div className="mx-auto my-0 max-w-7xl text-center">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-4 bg-zinc-900">
        <div className="flex items-center gap-4">
          <h1 className="p-4 text-xl font-bold">Adventure Book</h1>
          {toolMode !== "edit" ? (
            <LocationSelect
              locations={locations.data}
              selectedLocation={selectedLocation}
              toggleSelect={toggleSelect}
            />
          ) : null}
          {selectedLocation && toolMode !== "edit" ? (
            // FIXME: overflow isn't working
            // see https://www.bennadel.com/blog/3881-css-flexbox-overflow-text-overflow-ellipses-and-a-separation-of-concerns.htm
            <div className="overflow-hidden text-ellipsis">
              {selectedLocation.content.slice(0, 70)}...
            </div>
          ) : null}
        </div>
        <div
          className={cn(
            "flex items-center gap-4",
            toolMode === "edit" ? "grow" : "",
          )}
        >
          {selectedLocation ? (
            <LocationToolbar
              location={selectedLocation}
              pin={selectedPin}
              deselect={deselect}
              toolMode={toolMode}
              setToolMode={setToolMode}
            />
          ) : (
            <Button onClick={() => clickAddLocation()} variant="secondary">
              Add Location
            </Button>
          )}
        </div>
      </div>

      <PixiMap
        locations={locations}
        pins={pins?.data ?? []}
        selectedLocation={selectedLocation}
        selectedPin={selectedPin}
        toggleSelect={toggleSelect}
        deselect={deselect}
        toolMode={toolMode}
        setToolMode={setToolMode}
      />

      {/* <div className="relative w-full">
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
      </div> */}

      {/* {selectedLocation ? (
        <Location
          location={selectedLocation}
          pin={selectedPin}
          deselect={deselect}
          toolMode={toolMode}
          setToolMode={setToolMode}
        />
      ) : (
        <>
          <h2 className="p-4 text-lg font-bold">Locations</h2>
          <LocationsList
            locations={locations.data}
            toggleSelect={toggleSelect}
          />
          <Button onClick={() => clickAddLocation()} variant="secondary">
            Add Location
          </Button>
        </>
        // TODO: convert styles to tailwind
        // TODO: add shadcdn-ui
        // FIXME: map pins should not be selectable when in place, move modes
      )} */}
    </div>
  );
}
