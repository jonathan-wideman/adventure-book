import { useMemo } from "react";
import mapImage from "./assets/map-regions.png";
import { useUpdatePin } from "./hooks/queries/useUpdatePin";
import useMousePosition from "./hooks/useMousePosition";
import { MapPin } from "./MapPin";
import { useRef } from "react";
import { PinMarker } from "./PinMarker";
import { useAddPin } from "./hooks/queries/useAddPin";
import { clamp } from "./util";

export function Map({
  locations,
  pins,
  selectedLocation,
  selectedPin,
  toggleSelect,
  deselect,
  toolMode,
  setToolMode,
}) {
  const updatePinPosition = useUpdatePin();
  const addPin = useAddPin();

  const mousePosition = useMousePosition();

  const mapRef = useRef(null);

  const mouseMapPosition = useMemo(() => {
    if (!mapRef.current) return { x: 0, y: 0 };
    // Get the bounding rectangle of the map
    const rect = mapRef.current.getBoundingClientRect();
    // Get the mouse position as percentage of the map
    const x = ((mousePosition.x - rect.left) / rect.width) * 100;
    const y = ((mousePosition.y - rect.top) / rect.height) * 100;
    const isOnMap = x >= 0 && x <= 100 && y >= 0 && y <= 100;
    return { x: clamp(x, 0, 100), y: clamp(y, 0, 100), isOnMap };
  }, [mousePosition]);

  const onClickMap = (e) => {
    if (mouseMapPosition.isOnMap === false) return;

    if (toolMode === "move") {
      updatePinPosition.mutate({
        pin: selectedPin,
        newPosition: { x: mouseMapPosition.x, y: mouseMapPosition.y },
      });
      setToolMode("select");
      return;
    }

    if (toolMode === "place") {
      addPin.mutate({
        locationId: selectedLocation.id,
        x: mouseMapPosition.x,
        y: mouseMapPosition.y,
      });
      setToolMode("select");
      return;
    }

    setToolMode("select");
    deselect();
  };

  return (
    <>
      <img
        src={mapImage}
        alt="map"
        className="w-full"
        ref={mapRef}
        onClick={onClickMap}
      />
      {pins.data?.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          location={locations.data?.find(
            (location) => location.id === pin.locationId
          )}
          onSelect={() => toggleSelect(pin.locationId)}
          selected={pin.id === selectedPin?.id}
          ghost={toolMode === "move"}
        />
      ))}
      {(toolMode === "move" || toolMode === "place") &&
        mouseMapPosition.isOnMap && (
          <PinMarker
            color="hsla(0, 0%, 100%, 0.7)"
            x={mouseMapPosition.x}
            y={mouseMapPosition.y}
            disablePointerEvents
          />
        )}
    </>
  );
}
