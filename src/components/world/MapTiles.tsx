
import { useMemo } from "react";
import type { PortfolioLocation, LocationId } from "../../data/locations";
import { locations } from "../../data/locations";
import Tile from "./Tile";
import Tree from "./Tree";
import Building from "./Building";
import Rock from "./Rock";
import Mountain from "./Mountain";
import Water from "./Water";
import WalkableArea from "./WalkableArea";

type MapTileData = {
  x: number;
  z: number;
};

type MapTilesProps = {
  selectedId: LocationId;
  onSelect: (location: PortfolioLocation) => void;
};

// Small forest clusters. Keep paths and building positions open.

const forestTrees: {
  x: number;
  z: number;
  scale: number;
}[] = [
  // Northwest forest — pushed toward the outer edge
  { x: -3.8, z: -2.5, scale: 0.9 },
  { x: -3.1, z: -2.8, scale: 1.1 },
  { x: -2.4, z: -2.7, scale: 0.75 },
  { x: -3.8, z: -1.8, scale: 0.7 },

  // West perimeter
  { x: -3.9, z: 0.2, scale: 1.0 },
  { x: -3.8, z: 1.5, scale: 0.85 },
  { x: -3.7, z: 2.8, scale: 1.05 },
  { x: -3.6, z: 4.0, scale: 0.85 },

  // Northeast forest
  { x: 2.8, z: -2.7, scale: 0.8 },
  { x: 3.5, z: -2.8, scale: 1.1 },
  { x: 4.0, z: -2.0, scale: 0.75 },
  { x: 3.9, z: -1.1, scale: 0.9 },

  // East perimeter
  { x: 3.9, z: 0.4, scale: 1.0 },
  { x: 3.9, z: 1.6, scale: 0.8 },
  { x: 3.9, z: 2.8, scale: 1.1 },
  { x: 3.8, z: 4.0, scale: 0.85 },

  // Southern edge — leave the central entrance clear
  { x: -3.0, z: 4.7, scale: 0.8 },
  { x: -2.0, z: 4.8, scale: 1.0 },
  { x: 2.0, z: 4.8, scale: 0.85 },
  { x: 3.0, z: 4.7, scale: 0.95 },
];


export default function MapTiles({
  selectedId,
  onSelect,
}: MapTilesProps) {
  const tiles = useMemo(() => {
    const result: MapTileData[] = [];

    // Main connected island grid.
    for (let x = -4; x <= 4; x++) {
      for (let z = -3; z <= 5; z++) {
        result.push({ x, z });
      }
    }

    return result;
  }, []);

  return (
    <group>
      {/* Connected grass tiles */}
      {tiles.map(({ x, z }) => {
        const location = locations.find(
          (item) =>
            item.position[0] === x &&
            item.position[1] === z,
        );

        return (
          <Tile
            key={`${x}:${z}`}
            position={[x, -0.03, z]}
            active={location?.id === selectedId}
            onClick={
              location
                ? () => onSelect(location)
                : undefined
            }
          />
        );
      })}

      {/* Dirt walking paths */}
      <WalkableArea
        position={[0, 0.055, 1]}
        rotation={0}
      />
      <WalkableArea
        position={[1, 0.055, 1]}
        rotation={0}
      />
      <WalkableArea
        position={[1, 0.055, 2]}
        rotation={Math.PI / 2}
      />
      <WalkableArea
        position={[1.7, 0.055, 2]}
        rotation={Math.PI / 32}
      />
      <WalkableArea
        position={[2.6, 0.055, 2]}
        rotation={Math.PI / 32}
      />
      <WalkableArea
        position={[3.1, 0.055, 2]}
        rotation={Math.PI / 2}
      />

      {/* Mountain range beyond the island */}
      <Mountain
        position={[-5.0, -0.15, -3.8]}
        scale={1.0}
      />
      <Mountain
        position={[-2.5, -0.2, -4.2]}
        scale={1.15}
      />
      <Mountain
        position={[0.5, -0.15, -4.5]}
        scale={1.25}
      />
      <Mountain
        position={[3.5, -0.2, -4.0]}
        scale={1.1}
      />
      <Mountain
        position={[5.0, -0.15, -2.0]}
        scale={0.95}
      />

      {/* Perimeter rocks */}
      <Rock position={[-4.4, -0.03, -0.5]} scale={1.1} />
      <Rock position={[-4.3, -0.03, 2.8]} scale={1.2} />
      <Rock position={[4.35, -0.03, 0.2]} scale={1.1} />
      <Rock position={[4.3, -0.03, 3.7]} scale={1.1} />
      <Rock position={[-2.8, -0.03, 5.8]} scale={1.1} />
      <Rock position={[2.8, -0.03, 5.8]} scale={1.15} />

      {/* Ponds and waterfall */}
      <Water position={[5.5, 0.02, 5.1]} scale={0.85} />
      <Water
        position={[-5.5, 0.02, 0.5]}
        scale={0.7}
        waterfall
      />

      {/* Forest clusters */}
      {forestTrees.map((tree, index) => (
        <Tree
          key={`forest-${index}`}
          position={[tree.x, -0.03, tree.z]}
          scale={tree.scale}
        />
      ))}

      {/* Clickable portfolio buildings */}
      {locations.map((location) => (
        <Building
          key={location.id}
          location={location}
          active={location.id === selectedId}
          onSelect={() => onSelect(location)}
        />
      ))}
    </group>
  );
}
