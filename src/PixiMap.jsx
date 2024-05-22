// import { BlurFilter } from 'pixi.js';
import { Stage, Container, Text } from "@pixi/react";
import { Fragment } from "react";
import { PixiMapPin } from "./PixiMapPin";
import { PixiMapConnection } from "./PixiMapConnection";
import { PixiMapBackground } from "./PixiMapBackground";
import { useState } from "react";
import { useUpdatePin } from "./hooks/queries/useUpdatePin";
import { useAddPin } from "./hooks/queries/useAddPin";

export const PIXI_MAP_SCALE = 1280;

export const PixiMap = ({
  locations,
  pins,
  selectedLocation,
  selectedPin,
  toggleSelect,
  deselect,
  toolMode,
  setToolMode,
}) => {
  // const blurFilter = useMemo(() => new BlurFilter(4), []);
  const updatePinPosition = useUpdatePin();
  const addPin = useAddPin();

  const [mouseMapPosition, setMouseMapPosition] = useState({ x: 0, y: 0 });

  const holdingPin = toolMode === "move" || toolMode === "place";
  const canInteractPins = !holdingPin;

  return (
    <Stage
      width={PIXI_MAP_SCALE}
      height={PIXI_MAP_SCALE}
      options={{ background: 0xffffff }}
      className="pixi-map aspect-square"
      raf={false}
      renderOnComponentChange={true}
    >
      <Container
        x={0}
        y={0}
        eventMode={"static"}
        pointermove={(e) => {
          const pos = {
            x: (e.data.global.x * 100) / PIXI_MAP_SCALE,
            y: (e.data.global.y * 100) / PIXI_MAP_SCALE,
          };
          setMouseMapPosition({ ...pos });
        }}
        pointerdown={() => {
          if (toolMode === "move") {
            console.log("move", mouseMapPosition);
            updatePinPosition.mutate({
              pin: selectedPin,
              newPosition: { x: mouseMapPosition.x, y: mouseMapPosition.y },
            });
            setToolMode("select");
            return;
          }

          if (toolMode === "place") {
            console.log("place", mouseMapPosition);
            addPin.mutate({
              locationId: selectedLocation.id,
              x: mouseMapPosition.x,
              y: mouseMapPosition.y,
            });
            setToolMode("select");
            return;
          }

          console.log("deselect", mouseMapPosition);
          setToolMode("select");
          deselect();
        }}
      >
        <PixiMapBackground />
      </Container>

      {pins.map((pin) => (
        <Fragment key={pin.id}>
          <PixiMapPin
            pin={pin}
            selected={selectedPin?.id === pin.id}
            onSelect={() => toggleSelect(pin.id)}
            interactive={canInteractPins}
          />

          {pin.connections?.map((connection) => {
            const connectedPin = pins.find((p) => p.id === connection);
            return (
              <PixiMapConnection
                pin={pin}
                connectedPin={connectedPin}
                key={`${pin.id}-${connectedPin.id}`}
              />
            );
          })}
        </Fragment>
      ))}

      {holdingPin && (
        <PixiMapPin pin={{ ...mouseMapPosition }} interactive={false} />
      )}

      {/* <Container x={0} y={0}>
        <Text
          text="Hello World"
          anchor={{ x: 0, y: 0 }}
          // filters={[blurFilter]}
        />
      </Container> */}
    </Stage>
  );
};
