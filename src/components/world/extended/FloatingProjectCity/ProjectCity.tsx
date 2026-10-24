
import { useMemo } from "react";

import Tile from "../../Tile";
import Tree from "../../Tree";
import Building from "../../Building";
import UnderConstructionBuilding from "../../UnderConstructionBuilding";
import Rock from "../../Rock";
import Water from "../../Water";
import WalkableArea from "../../WalkableArea";

import { PALETTE } from "./constants";

import type { FloatingProjectCityProps, Point3 } from "./types";

/* =========================================
   TYPES
   ========================================= */

type ProjectLocation = Parameters<
  FloatingProjectCityProps["onSelect"]
>[0];

type ProjectCityProps = Pick<
  FloatingProjectCityProps,
  "selectedId" | "onSelect"
> & {
  locations: ProjectLocation[];
};

type GridPosition = {
  x: number;
  z: number;
};

type TreePlacement = {
  x: number;
  z: number;
  scale: number;
};

type RockPlacement = {
  position: Point3;
  scale: Point3;
  rotation: Point3;
};

type PathPlacement = {
  x: number;
  z: number;
  rotation: number;
};

/* =========================================
   GRID CONFIGURATION
   ========================================= */

const GRID_MIN_X = -4;
const GRID_MAX_X = 4;
const GRID_MIN_Z = -3;
const GRID_MAX_Z = 5;

const TILE_Y = 0.12;
const TREE_Y = 0.12;
const PATH_Y = 0.095;

const PROJECT_GRID: GridPosition[] = [
  { x: -3, z: -2 },
  { x: 0, z: -2 },
  { x: 3, z: -2 },

  { x: -3, z: 0 },
  { x: 0, z: 0 },
  { x: 3, z: 0 },

  { x: -3, z: 2 },
  { x: 0, z: 2 },
  { x: 3, z: 2 },

  { x: -2, z: 4 },
  { x: 1, z: 4 },
  { x: 3, z: 4 },
];

const BUILDING_SCALES = [
  0.92, 1.04, 0.96, 1.08, 0.94, 1.02,
  0.98, 1.06, 0.92, 1.02, 0.96, 1.04,
];

const BUILDING_ROTATIONS = [
  0, 0.16, -0.12, 0.08, -0.08, 0.18,
  -0.16, 0.12, 0, 0.1, -0.14, 0.06,
];

/* =========================================
   PROJECT POSITIONS
   ========================================= */

function getProjectPosition(index: number): GridPosition {
  const fixedPosition = PROJECT_GRID[index];

  if (fixedPosition) {
    return fixedPosition;
  }

  const occupied = new Set(
    PROJECT_GRID.map(({ x, z }) => `${x}:${z}`),
  );

  const candidates: GridPosition[] = [];

  for (let z = GRID_MIN_Z + 1; z < GRID_MAX_Z; z++) {
    for (let x = GRID_MIN_X + 1; x < GRID_MAX_X; x++) {
      candidates.push({ x, z });
    }
  }

  candidates.sort((a, b) => {
    const scoreA = Math.abs(a.x) + Math.abs(a.z);
    const scoreB = Math.abs(b.x) + Math.abs(b.z);

    return scoreA - scoreB || a.z - b.z || a.x - b.x;
  });

  const available = candidates.filter(
    ({ x, z }) => !occupied.has(`${x}:${z}`),
  );

  return available[index - PROJECT_GRID.length] ?? {
    x: GRID_MAX_X - 1,
    z: GRID_MAX_Z - 1,
  };
}

/* =========================================
   PERIMETER FOREST
   ========================================= */

const FOREST_TREES: TreePlacement[] = [
  // North-west
  { x: -4.0, z: -2.8, scale: 0.82 },
  { x: -3.3, z: -3.0, scale: 0.95 },
  { x: -2.5, z: -3.1, scale: 0.76 },
  { x: -1.7, z: -3.0, scale: 0.88 },

  // North-east
  { x: 1.6, z: -3.0, scale: 0.82 },
  { x: 2.5, z: -3.0, scale: 0.98 },
  { x: 3.5, z: -2.8, scale: 0.86 },
  { x: 4.0, z: -2.0, scale: 0.92 },

  // West
  { x: -4.0, z: -1.2, scale: 0.86 },
  { x: -4.0, z: 0.0, scale: 0.96 },
  { x: -4.0, z: 1.3, scale: 0.78 },
  { x: -3.9, z: 2.5, scale: 0.9 },

  // East
  { x: 4.0, z: -0.4, scale: 0.84 },
  { x: 4.0, z: 0.9, scale: 0.96 },
  { x: 4.0, z: 2.0, scale: 0.8 },
  { x: 4.0, z: 3.0, scale: 0.92 },

  // South
  { x: -3.6, z: 4.2, scale: 0.9 },
  { x: -2.6, z: 4.5, scale: 0.78 },
  { x: -1.4, z: 4.5, scale: 0.94 },
  { x: -0.3, z: 4.5, scale: 0.82 },
  { x: 1.5, z: 4.5, scale: 0.9 },
  { x: 2.6, z: 4.5, scale: 0.78 },
];

/* =========================================
   WALKWAYS
   ========================================= */

const PATHS: PathPlacement[] = [
  // Upper row
  { x: -2, z: -2, rotation: Math.PI / 2 },
  { x: -1, z: -2, rotation: Math.PI / 2 },
  { x: 1, z: -2, rotation: Math.PI / 2 },
  { x: 2, z: -2, rotation: Math.PI / 2 },

  // Center row
  { x: -2, z: 0, rotation: Math.PI / 2 },
  { x: -1, z: 0, rotation: Math.PI / 2 },
  { x: 1, z: 0, rotation: Math.PI / 2 },
  { x: 2, z: 0, rotation: Math.PI / 2 },

  // Lower row
  { x: -2, z: 2, rotation: Math.PI / 2 },
  { x: -1, z: 2, rotation: Math.PI / 2 },
  { x: 1, z: 2, rotation: Math.PI / 2 },
  { x: 2, z: 2, rotation: Math.PI / 2 },

  // Vertical connectors
  { x: -3, z: -1, rotation: 0 },
  { x: 0, z: -1, rotation: 0 },
  { x: 3, z: -1, rotation: 0 },

  { x: -3, z: 1, rotation: 0 },
  { x: 0, z: 1, rotation: 0 },
  { x: 3, z: 1, rotation: 0 },

  { x: -3, z: 3, rotation: 0 },
  { x: 0, z: 3, rotation: 0 },
  { x: 2, z: 3, rotation: 0 },
];

/* =========================================
   FLOATING ISLAND ROCKS
   ========================================= */

function createRockPlacements(): RockPlacement[] {
  const count = 18;

  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2;
    const ring = index % 3;

    return {
      position: [
        Math.cos(angle) * (3.5 + ring * 0.35),
        -0.65 - (index % 4) * 0.16,
        Math.sin(angle) * (3.5 + ring * 0.35),
      ],
      scale: [
        0.4 + (index % 3) * 0.12,
        0.28 + (index % 2) * 0.12,
        0.38 + (index % 4) * 0.08,
      ],
      rotation: [
        0.1 * (index % 2),
        angle,
        0.08 * (index % 3),
      ],
    };
  });
}

/* =========================================
   PLACEMENT FILTERS
   ========================================= */

function isNearProject(
  x: number,
  z: number,
  positions: GridPosition[],
): boolean {
  return positions.some(
    (position) =>
      Math.abs(position.x - x) < 0.8 &&
      Math.abs(position.z - z) < 0.8,
  );
}

function isNearPath(x: number, z: number): boolean {
  return PATHS.some(
    (path) =>
      Math.abs(path.x - x) < 0.4 &&
      Math.abs(path.z - z) < 0.4,
  );
}

function getForestPositions(
  projectPositions: GridPosition[],
): TreePlacement[] {
  const accepted: TreePlacement[] = [];

  for (const tree of FOREST_TREES) {
    if (isNearProject(tree.x, tree.z, projectPositions)) {
      continue;
    }

    if (isNearPath(tree.x, tree.z)) {
      continue;
    }

    const duplicate = accepted.some(
      (other) =>
        Math.hypot(other.x - tree.x, other.z - tree.z) < 0.65,
    );

    if (!duplicate) {
      accepted.push(tree);
    }
  }

  return accepted;
}

/* =========================================
   DECORATIONS
   ========================================= */

const CRYSTAL_POSITIONS: TreePlacement[] = [
  { x: -3.7, z: -1.8, scale: 0.75 },
  { x: 3.7, z: -1.8, scale: 0.8 },
  { x: -3.7, z: 1.8, scale: 0.7 },
  { x: 3.7, z: 3.4, scale: 0.85 },
  { x: -2.8, z: 3.8, scale: 0.72 },
  { x: 2.8, z: -2.8, scale: 0.7 },
];

/* =========================================
   PROJECT STATUS
   ========================================= */

function isInDevelopment(location: ProjectLocation): boolean {
  return (
    "status" in location &&
    location.status === "In development"
  );
}

/* =========================================
   PROJECT CITY
   ========================================= */

export default function ProjectCity({
  locations,
  selectedId,
  onSelect,
}: ProjectCityProps) {
  const projectPositions = useMemo(
    () => locations.map((_, index) => getProjectPosition(index)),
    [locations],
  );

  const rockPlacements = useMemo(
    () => createRockPlacements(),
    [],
  );

  const forestTrees = useMemo(
    () => getForestPositions(projectPositions),
    [projectPositions],
  );

  const columns = GRID_MAX_X - GRID_MIN_X + 1;
  const rows = GRID_MAX_Z - GRID_MIN_Z + 1;

  return (
    <group name="fantasy-forest-project-city">
      {/* Floating rocky underside */}
      {rockPlacements.map((rock, index) => (
        <mesh
          key={`floating-rock-${index}`}
          position={rock.position}
          scale={rock.scale}
          rotation={rock.rotation}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#4c5147" : PALETTE.rock}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Walkways sit between the grid tiles */}
      {PATHS.map((path, index) => (
        <WalkableArea
          key={`walkway-${index}`}
          position={[path.x, PATH_Y, path.z]}
          rotation={path.rotation}
        />
      ))}

      {/* Edge rocks */}
      <Rock position={[-4.35, -0.03, -1.0]} scale={0.9} />
      <Rock position={[-4.3, -0.03, 3.1]} scale={1} />
      <Rock position={[4.25, -0.03, -0.8]} scale={0.85} />
      <Rock position={[4.25, -0.03, 3.2]} scale={0.95} />

      {/* Water features */}
      <Water position={[4.75, 0.40, 3.75]} scale={0.72} />
      <Water position={[-5.0, 0.40, 0.5]} scale={0.65} waterfall />

      {/* Perimeter forest */}
      {forestTrees.map((tree, index) => (
        <Tree
          key={`forest-tree-${index}`}
          position={[tree.x, TREE_Y, tree.z]}
          scale={tree.scale}
        />
      ))}

      {/* Crystals */}
      {CRYSTAL_POSITIONS.map((crystal, index) => {
        if (
          isNearProject(
            crystal.x,
            crystal.z,
            projectPositions,
          )
        ) {
          return null;
        }

        return (
          <group
            key={`crystal-${index}`}
            position={[crystal.x, 0.14, crystal.z]}
            scale={crystal.scale}
          >
            <mesh
              position={[0, 0.25, 0]}
              rotation={[0.12, index * 0.8, 0.18]}
              castShadow
            >
              <octahedronGeometry args={[0.2, 0]} />
              <meshStandardMaterial
                color="#9acb91"
                emissive="#477c4c"
                emissiveIntensity={0.55}
                roughness={0.45}
              />
            </mesh>

            <mesh
              position={[0.2, 0.12, 0.08]}
              scale={0.5}
            >
              <octahedronGeometry args={[0.15, 0]} />
              <meshStandardMaterial
                color="#c4dba1"
                emissive="#628e52"
                emissiveIntensity={0.4}
              />
            </mesh>
          </group>
        );
      })}

      {/* Mushrooms */}
      {CRYSTAL_POSITIONS.slice(0, 4).map((item, index) => {
        if (
          isNearProject(
            item.x,
            item.z,
            projectPositions,
          )
        ) {
          return null;
        }

        return (
          <group
            key={`mushroom-${index}`}
            position={[item.x + 0.25, 0.13, item.z - 0.2]}
            scale={0.55 + (index % 2) * 0.15}
          >
            <mesh position={[0, 0.13, 0]} castShadow>
              <cylinderGeometry args={[0.055, 0.075, 0.26, 7]} />
              <meshStandardMaterial
                color="#e4d7b4"
                roughness={1}
              />
            </mesh>

            <mesh position={[0, 0.29, 0]} castShadow>
              <coneGeometry args={[0.17, 0.14, 7]} />
              <meshStandardMaterial
                color={index % 2 === 0 ? "#8b674e" : "#b17c59"}
                roughness={1}
              />
            </mesh>
          </group>
        );
      })}

      {/* Project grid */}
      {Array.from(
        { length: columns * rows },
        (_, index) => {
          const x = GRID_MIN_X + (index % columns);
          const z = GRID_MIN_Z + Math.floor(index / columns);

          const projectIndex = projectPositions.findIndex(
            (position) => position.x === x && position.z === z,
          );

          const location =
            projectIndex >= 0
              ? locations[projectIndex]
              : undefined;

          if (!location) {
            return (
              <group
                key={`empty-tile-${x}-${z}`}
                position={[x, 0, z]}
              >
                <Tile
                  position={[0, TILE_Y, 0]}
                  active={false}
                />
              </group>
            );
          }

          const selected = location.id === selectedId;

          const rotation =
            BUILDING_ROTATIONS[
              projectIndex % BUILDING_ROTATIONS.length
            ];

          const buildingScale =
            BUILDING_SCALES[
              projectIndex % BUILDING_SCALES.length
            ];

          const cityLocation = {
            ...location,
            position: [0, 0] as [number, number],
          };

          const handleSelect = () => onSelect(location);
          const underConstruction = isInDevelopment(location);

          return (
            <group
              key={location.id}
              name={`project-${location.id}`}
              position={[x, 0, z]}
            >
              <group rotation={[0, rotation, 0]}>
                <Tile
                  position={[0, TILE_Y, 0]}
                  active={selected}
                  onClick={handleSelect}
                />
              </group>

              <group
                name={`building-${location.id}`}
                position={[0, TILE_Y, 0]}
                rotation={[0, rotation, 0]}
                scale={buildingScale}
              >
                {underConstruction ? (
                  <UnderConstructionBuilding
                    location={cityLocation}
                    active={selected}
                    onSelect={handleSelect}
                  />
                ) : (
                  <Building
                    location={cityLocation}
                    active={selected}
                    onSelect={handleSelect}
                  />
                )}
              </group>

              {selected && (
                <mesh
                  name={`selected-project-marker-${location.id}`}
                  position={[0, 2.15, 0]}
                >
                  <octahedronGeometry args={[0.15, 0]} />
                  <meshStandardMaterial
                    color={PALETTE.glow}
                    emissive={PALETTE.glow}
                    emissiveIntensity={1.3}
                  />
                </mesh>
              )}
            </group>
          );
        },
      )}
    </group>
  );
}
