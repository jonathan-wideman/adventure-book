import mapImage from "./assets/map.png";
import { useUpdatePinMutation } from "./hooks/queries/useUpdatePinMutation";
import { MapPin } from "./MapPin";

export function Map({ locations, pins, selectedPin, setSelectedPin }) {
  const updatePinPositionMutation = useUpdatePinMutation();

  const onClickMap = (e) => {
    // Get the bounding rectangle of target
    const rect = e.target.getBoundingClientRect();
    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    updatePinPositionMutation.mutate({
      pin: pins?.data.find((pin) => pin.id === selectedPin),
      newPosition: { x, y },
    });
    setSelectedPin(null);
  };

  const selectPin = (pin) => {
    setSelectedPin((prev) => (prev === pin ? null : pin));
  };

  return (
    <div style={{ width: "100%", position: "relative" }} onClick={onClickMap}>
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
