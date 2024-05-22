import { Graphics } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";

export function PixiMapConnection({ pin, connectedPin }) {
  return (
    <Graphics
      draw={(g) => {
        g.lineStyle(1, "cornflowerblue");
        g.moveTo(
          (pin.x / 100) * PIXI_MAP_SCALE,
          (pin.y / 100) * PIXI_MAP_SCALE,
        );
        g.lineTo(
          (connectedPin.x / 100) * PIXI_MAP_SCALE,
          (connectedPin.y / 100) * PIXI_MAP_SCALE,
        );
      }}
    />
  );
}
