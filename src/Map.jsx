import { useMemo } from "react";
import mapImage from "./assets/map-regions.png";
import { useUpdatePin } from "./hooks/queries/useUpdatePin";
import useMousePosition from "./hooks/useMousePosition";
import { MapPin } from "./MapPin";
import { useRef } from "react";
import { PinMarker } from "./PinMarker";

export function Map({
  locations,
  pins,
  selectedPin,
  toggleSelect,
  deselect,
  toolMode,
  setToolMode,
}) {
  const updatePinPosition = useUpdatePin();

  const mousePosition = useMousePosition();

  const mapRef = useRef(null);

  const mouseMapPercent = useMemo(() => {
    if (!mapRef.current) return { x: 0, y: 0 };
    // Get the bounding rectangle of the map
    const rect = mapRef.current.getBoundingClientRect();
    // Get the mouse position as percentage of the map
    // TODO: clamp between 0 and 100
    const x = ((mousePosition.x - rect.left) / rect.width) * 100;
    const y = ((mousePosition.y - rect.top) / rect.height) * 100;
    return { x, y };
  }, [mousePosition]);

  const onClickMap = (e) => {
    if (toolMode === "move") {
      updatePinPosition.mutate({
        pin: selectedPin,
        newPosition: mouseMapPercent,
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
        style={{ width: "100%" }}
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
        />
      ))}
      {toolMode === "move" && (
        <PinMarker
          color="black"
          x={mouseMapPercent.x}
          y={mouseMapPercent.y}
          disablePointerEvents
        />
      )}
    </>
  );
}
