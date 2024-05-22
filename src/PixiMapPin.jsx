import { Graphics } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";
import { useCallback } from "react";

export function PixiMapPin({
  pin,
  selected,
  onSelect = undefined,
  interactive = false,
}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.beginFill(selected ? "white" : interactive ? "blue" : "grey");
      if (selected) {
        g.lineStyle(1, "blue");
      }
      g.drawCircle(
        (pin.x / 100) * PIXI_MAP_SCALE,
        (pin.y / 100) * PIXI_MAP_SCALE,
        selected ? 6 : 4,
      );
      g.endFill();
    },
    [selected, interactive, pin],
  );

  return (
    <Graphics
      draw={draw}
      eventMode={interactive ? "static" : "passive"}
      cursor={interactive ? "pointer" : "default"}
      pointerdown={
        interactive && onSelect
          ? () => {
              onSelect();
            }
          : undefined
      }
    />
  );
}
