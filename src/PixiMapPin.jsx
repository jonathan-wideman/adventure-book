import { Graphics } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";

export function PixiMapPin({ pin, interactive = false }) {
  return (
    <Graphics
      draw={(g) => {
        g.beginFill(interactive ? "blue" : "grey");
        g.drawCircle(
          (pin.x / 100) * PIXI_MAP_SCALE,
          (pin.y / 100) * PIXI_MAP_SCALE,
          3,
        );
        g.endFill();
      }}
    />
  );
}
