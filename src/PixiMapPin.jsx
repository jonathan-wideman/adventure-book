import { Graphics } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";
import { useCallback } from "react";
import { useState } from "react";

export function PixiMapPin({
  pin,
  selected,
  onSelect = undefined,
  hovered,
  onPointerOver = undefined,
  onPointerOut = undefined,
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
        selected || hovered ? 6 : 4,
      );
      g.endFill();
    },
    [selected, interactive, pin, hovered],
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
      pointerover={interactive ? onPointerOver : undefined}
      pointerout={interactive ? onPointerOut : undefined}
    />
  );
}
