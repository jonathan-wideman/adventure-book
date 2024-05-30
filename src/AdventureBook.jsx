import { useState } from "react";
import { useLocations } from "./hooks/queries/useLocations";
import { usePins } from "./hooks/queries/usePins";
import { useAddLocation } from "./hooks/queries/useAddLocation";
import { Button } from "./components/ui/button";
import { LocationSelect } from "./LocationSelect";
import { LocationToolbar } from "./LocationToolbar";
import { cn } from "./lib/utils";
import { PixiMap } from "./PixiMap";
import Markdown from "react-markdown";
import { CharacterSheet } from "./CharacterSheet";

export const DEFAULT_TOOL_MODE = "select";

export function AdventureBook() {
  const locations = useLocations();
  const pins = usePins();

  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [toolMode, setToolMode] = useState(DEFAULT_TOOL_MODE); // 'select' | 'edit' | 'move' | 'place'
  const [mapLayer, setMapLayer] = useState(0);
  const [playMode, setPlayMode] = useState(true);

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
          {!playMode && toolMode !== "edit" ? (
            <LocationSelect
              locations={locations.data}
              selectedLocation={selectedLocation}
              toggleSelect={toggleSelect}
            />
          ) : null}
          {!playMode && selectedLocation && toolMode !== "edit" ? (
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
          {!playMode &&
            (selectedLocation ? (
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
            ))}
          <Button
            onClick={() => setMapLayer((mapLayer + 1) % 4)}
            variant="secondary"
          >
            ☼
          </Button>
          <Button
            onClick={() => setPlayMode((prev) => !prev)}
            variant="secondary"
          >
            {playMode ? "🕮" : "✎"}
          </Button>
        </div>
      </div>

      {playMode && (
        <div className="sticky top-0 z-10 w-full bg-zinc-900">
          <CharacterSheet />
        </div>
      )}

      {/* FIXME: position breaks sticky */}
      <div className="relative">
        <PixiMap
          locations={locations?.data ?? []}
          pins={pins?.data ?? []}
          selectedLocation={selectedLocation}
          selectedPin={selectedPin}
          toggleSelect={toggleSelect}
          deselect={deselect}
          toolMode={toolMode}
          setToolMode={setToolMode}
          layer={mapLayer}
          interactive={!playMode}
        />
        {playMode && (
          <div className="absolute aspect-square w-full bg-zinc-900 bg-opacity-90 backdrop-blur-sm">
            <div className="mx-auto h-full w-10/12 bg-zinc-900 bg-opacity-80">
              {selectedLocation && (
                <Markdown>{selectedLocation.content}</Markdown>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
