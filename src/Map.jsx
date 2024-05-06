import mapImage from "./assets/map-regions.png";
import { useUpdatePin } from "./hooks/queries/useUpdatePin";
import { MapPin } from "./MapPin";

export function Map({
  locations,
  pins,
  selectedPin,
  setSelectedPin,
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
        pin: pins?.data.find((pin) => pin.id === selectedPin),
        newPosition: { x, y },
      });
    }
    setToolMode("select");
  };

  const selectPin = (pin) => {
    setSelectedPin((prev) => (prev === pin ? null : pin));
  };

  return (
    <div
      style={{
        width: "100%",
        // height: "calc(100vh - 10rem)",
        // overflow: "scroll",
        position: "relative",
      }}
      onClick={onClickMap}
    >
      <img src={mapImage} alt="map" style={{ width: "100%" }} />
      {pins.data?.map((pin) => (
        <MapPin
          key={pin.id}
          pin={pin}
          location={locations.data?.find(
            (location) => location.id === pin.locationId
          )}
          selectPin={selectPin}
          selected={pin.id === selectedPin}
        />
      ))}
    </div>
  );
}
