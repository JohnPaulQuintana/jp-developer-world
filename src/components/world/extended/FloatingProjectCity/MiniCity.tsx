
import Tile from "../../Tile";
import Tree from "../../Tree";
import Building from "../../Building";
import Rock from "../../Rock";
import WalkableArea from "../../WalkableArea";

import { PALETTE } from "./constants";
import type { MiniCityProps } from "./types";

const TREE_POSITIONS = [
  [-1.05, -0.95, 0.7],
  [1.05, -0.95, 0.8],
  [-1.05, 0.95, 0.75],
  [1.05, 0.95, 0.65],
] as const;

const EDGE_STONES = [
  [-1.15, -0.15, -0.85, 0.36, 0.22, 0.3],
  [-0.45, -0.17, -1.3, 0.42, 0.2, 0.25],
  [0.55, -0.15, -1.22, 0.36, 0.24, 0.3],
  [1.22, -0.17, -0.65, 0.3, 0.22, 0.38],
  [1.3, -0.17, 0.35, 0.34, 0.2, 0.32],
  [0.7, -0.18, 1.18, 0.4, 0.2, 0.28],
  [-0.25, -0.16, 1.28, 0.35, 0.22, 0.3],
  [-1.15, -0.18, 0.7, 0.34, 0.24, 0.3],
] as const;

const UNDERSIDE_ROCKS = [
  [-0.8, -0.55, -0.45, 0.55],
  [0.5, -0.65, -0.55, 0.48],
  [-0.35, -0.85, 0.4, 0.45],
  [0.65, -0.48, 0.45, 0.38],
  [0.05, -1.08, -0.05, 0.4],
] as const;

export default function MiniCity({
  location,
  index,
  position,
  selected,
  onSelect,
}: MiniCityProps) {
  const handleSelect = () => onSelect(location);

  return (
    <group position={position}>
      {/* Tapered, uneven rock mass underneath the island */}
      <mesh
        position={[0, -0.53, 0]}
        scale={[1.62, 0.82, 1.55]}
        rotation={[0.04, 0.18, -0.035]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[1, 1.9, 9, 3]} />
        <meshStandardMaterial
          color={PALETTE.rock}
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Additional broken rock faces for a natural silhouette */}
      {UNDERSIDE_ROCKS.map(([x, y, z, scale], rockIndex) => (
        <mesh
          key={`underside-${index}-${rockIndex}`}
          position={[x, y, z]}
          rotation={[
            rockIndex * 0.12,
            rockIndex * 0.8,
            (rockIndex % 2 === 0 ? 1 : -1) * 0.16,
          ]}
          scale={[scale, scale * 0.85, scale * 0.9]}
          castShadow
        >
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color={rockIndex % 2 === 0 ? "#4c5147" : PALETTE.rock}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Thin, irregular stone shelf beneath the grass */}
      <mesh
        position={[0, -0.12, 0]}
        scale={[1, 1, 1]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.52, 1.68, 0.22, 10, 1]} />
        <meshStandardMaterial
          color="#686b57"
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Grassy top: broad enough to support the village */}
      <mesh
        position={[0, 0.015, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[1.58, 1.52, 0.13, 10, 1]} />
        <meshStandardMaterial
          color={PALETTE.grass}
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Individual stones around the perimeter */}
      {EDGE_STONES.map(
        ([x, y, z, sx, sy, sz], stoneIndex) => (
          <mesh
            key={`edge-stone-${index}-${stoneIndex}`}
            position={[x, y, z]}
            rotation={[0.05, stoneIndex * 0.7, 0.08]}
            scale={[sx, sy, sz]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={
                stoneIndex % 3 === 0
                  ? "#777966"
                  : PALETTE.rock
              }
              roughness={1}
              flatShading
            />
          </mesh>
        ),
      )}

      {/* Village tiles */}
      {Array.from({ length: 9 }, (_, tileIndex) => {
        const x = (tileIndex % 3) - 1;
        const z = Math.floor(tileIndex / 3) - 1;

        return (
          <Tile
            key={`mini-tile-${index}-${tileIndex}`}
            position={[x, 0.09, z]}
            active={selected}
            onClick={handleSelect}
          />
        );
      })}

      {/* Connecting dirt path */}
      <WalkableArea
        position={[0, 0.14, 0.35]}
        rotation={0}
      />

      <WalkableArea
        position={[0, 0.14, -0.25]}
        rotation={0}
      />

      {/* Existing building remains unchanged */}
      <Building
        location={{
          ...location,
          position: [0, 0],
        }}
        active={selected}
        onSelect={handleSelect}
      />

      {/* Trees stay around the perimeter */}
      {TREE_POSITIONS.map(([x, z, scale], treeIndex) => (
        <Tree
          key={`mini-tree-${index}-${treeIndex}`}
          position={[x, 0.1, z]}
          scale={scale}
        />
      ))}

      <Rock
        position={[1.22, 0.1, 0.15]}
        scale={0.35}
      />

      {/* Selection marker */}
      {selected && (
        <mesh position={[0, 1.75, 0]}>
          <octahedronGeometry args={[0.14, 0]} />
          <meshStandardMaterial
            color={PALETTE.glow}
            emissive={PALETTE.glow}
            emissiveIntensity={1.3}
          />
        </mesh>
      )}
    </group>
  );
}
