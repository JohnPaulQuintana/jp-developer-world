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

export default function MapTiles({ selectedId, onSelect }: MapTilesProps) {
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
      {/* Connected grass tiles without dirt paths */}
      {tiles.map(({ x, z }) => {
        const location = locations.find(
          (item) => item.position[0] === x && item.position[1] === z,
        );

        return (
          <Tile
            key={`${x}:${z}`}
            position={[x, -0.03, z]}
            active={location?.id === selectedId}
            onClick={location ? () => onSelect(location) : undefined}
          />
        );
      })}

      {/* Dirt walkable area */}
      {/* Horizontal dirt tile */}
      <WalkableArea position={[0, 0.055, 1]} rotation={0} />
      {/* Next connected tile */}
      <WalkableArea position={[1, 0.055, 1]} rotation={0} />
      {/* Turn the path 90 degrees */}
      <WalkableArea position={[1, 0.055, 2]} rotation={Math.PI / 2} />
      <WalkableArea position={[1.7, 0.055, 2]} rotation={Math.PI / 32} />
      <WalkableArea position={[2.6, 0.055, 2]} rotation={Math.PI / 32} />
      <WalkableArea position={[3.1, 0.055, 2]} rotation={Math.PI / 2} />

      {/* Mountains */}
      <Mountain position={[-5.0, -0.15, -3.8]} scale={1.0} />
      <Mountain position={[-2.5, -0.2, -4.2]} scale={1.15} />
      <Mountain position={[0.5, -0.15, -4.5]} scale={1.25} />
      <Mountain position={[3.5, -0.2, -4.0]} scale={1.1} />
      <Mountain position={[5.0, -0.15, -2.0]} scale={0.95} />

      {/* Rocks around the island perimeter */}
      <Rock position={[-4.4, -0.03, -0.5]} scale={1.1} />
      <Rock position={[-4.3, -0.03, 2.8]} scale={1.2} />
      <Rock position={[4.35, -0.03, 0.2]} scale={1.1} />
      <Rock position={[4.3, -0.03, 3.7]} scale={1.1} />
      <Rock position={[-2.8, -0.03, 5.8]} scale={1.1} />
      <Rock position={[2.8, -0.03, 5.8]} scale={1.15} />

      {/* Ponds near the island edges */}
      <Water position={[5.5, 0.02, 5.1]} scale={0.85} />
      <Water position={[-5.5, 0.02, 0.5]} scale={0.7} waterfall />
      {/* Clickable navigation buildings */}
      {locations.map((location) => (
        <Building
          key={location.id}
          location={location}
          active={location.id === selectedId}
          onSelect={() => onSelect(location)}
        />
      ))}

      {/* Trees along the island edges */}
      {[-3, -1, 2, 4].map((x, index) => (
        <Tree
          key={x}
          position={[x, -0.03, index % 2 ? -2 : 4.5]}
          scale={index === 1 ? 0.8 : 1}
        />
      ))}

      {[-2.5, 0.5, 3.5].map((x) => (
        <Tree key={x} position={[x, -0.03, -2.7]} scale={0.8} />
      ))}
    </group>
  );
}
