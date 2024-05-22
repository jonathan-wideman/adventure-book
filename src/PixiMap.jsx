// import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from "@pixi/react";
import { Fragment } from "react";
import { PixiMapPin } from "./PixiMapPin";
import { PixiMapConnection } from "./PixiMapConnection";
import { PixiMapBackground } from "./PixiMapBackground";
import { useCallback } from "react";

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

  const holdingPin = toolMode === "move" || toolMode === "place";
  const canInteractPins = !holdingPin;

  // const onMove = React.useCallback((e) => {
  //   // if (isDragging && sprite.current) {
  //   //   setPosition(e.data.getLocalPosition(sprite.current.parent));
  //   // }
  //   console.log("move", e);
  // }, []);

  const onDown = useCallback((e) => {
    // if (isDragging && sprite.current) {
    //   setPosition(e.data.getLocalPosition(sprite.current.parent));
    // }
    console.log("click", e);
  }, []);

  return (
    <Stage
      width={PIXI_MAP_SCALE}
      height={PIXI_MAP_SCALE}
      options={{ background: 0xffffff }}
      className="pixi-map aspect-square"
      raf={false}
      renderOnComponentChange={true}
    >
      {/* <Container
        x={0}
        y={0}
        interactive={true}
        pointerdown={() => {
          console.log("click");
        }}
      > */}
      <PixiMapBackground />

      {pins.map((pin) => (
        <Fragment key={pin.id}>
          <PixiMapPin pin={pin} interactive={canInteractPins} />

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

      {holdingPin && selectedPin && (
        <PixiMapPin pin={{ ...selectedPin, x: 0, y: 0 }} interactive={true} />
      )}

      {/* <Container x={0} y={0}>
        <Text
          text="Hello World"
          anchor={{ x: 0, y: 0 }}
          // filters={[blurFilter]}
        />
      </Container> */}
      {/* </Container> */}
    </Stage>
  );
};
