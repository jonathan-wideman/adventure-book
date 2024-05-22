import { Sprite } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";
import mapImage from "./assets/map-regions.png";

export function PixiMapBackground() {
  return (
    <Sprite
      image={mapImage}
      x={0}
      y={0}
      anchor={{ x: 0, y: 0 }}
      width={PIXI_MAP_SCALE}
      height={PIXI_MAP_SCALE}
      eventMode="static"
      pointerdown={() => {
        console.log("click");
      }}
    />
  );
}
