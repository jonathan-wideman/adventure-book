import mapImage from "./assets/map-regions.png";
import { useUpdatePin } from "./hooks/queries/useUpdatePin";
import { MapPin } from "./MapPin";

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

  const onClickMap = (e) => {
    if (toolMode === "move") {
      // Get the bounding rectangle of the map
      const rect = e.target.getBoundingClientRect();
      // Get the mouse position as percentage of the map
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      updatePinPosition.mutate({
        pin: selectedPin,
        newPosition: { x, y },
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
    </>
  );
}
