import { Sprite } from "@pixi/react";
import { PIXI_MAP_SCALE } from "./PixiMap";
// seed 456
import mapImage from "./assets/map-regions.png";
import mapImageBiomes from "./assets/mapgen4-456-biomes.png";
import mapImageDesaturated from "./assets/mapgen4-456-desaturated.png";
import mapImageSepia from "./assets/mapgen4-456-sepia.png";

export function PixiMapBackground({ layer }) {
  const image = [mapImage, mapImageSepia, mapImageDesaturated, mapImageBiomes][
    layer
  ];
  return (
    <Sprite
      image={image}
      x={0}
      y={0}
      anchor={{ x: 0, y: 0 }}
      width={PIXI_MAP_SCALE}
      height={PIXI_MAP_SCALE}
    />
  );
}
