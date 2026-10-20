
import { locations } from "../../data/locations";

export type VillageObstacle =
  | {
      type: "circle";
      x: number;
      z: number;
      radius: number;
    }
  | {
      type: "box";
      minX: number;
      maxX: number;
      minZ: number;
      maxZ: number;
    };

export const villageBounds = {
  // Keep NPCs inside the grass area, away from the outer forest.
  minX: -3.0,
  maxX: 3.0,
  minZ: -2.0,
  maxZ: 4.0,
};

const forestTrees = [
  { x: -3.8, z: -2.5, scale: 0.9 },
  { x: -3.1, z: -2.8, scale: 1.1 },
  { x: -2.4, z: -2.7, scale: 0.75 },
  { x: -3.8, z: -1.8, scale: 0.7 },
  { x: -3.9, z: 0.2, scale: 1.0 },
  { x: -3.8, z: 1.5, scale: 0.85 },
  { x: -3.7, z: 2.8, scale: 1.05 },
  { x: -3.6, z: 4.0, scale: 0.85 },
  { x: 2.8, z: -2.7, scale: 0.8 },
  { x: 3.5, z: -2.8, scale: 1.1 },
  { x: 4.0, z: -2.0, scale: 0.75 },
  { x: 3.9, z: -1.1, scale: 0.9 },
  { x: 3.9, z: 0.4, scale: 1.0 },
  { x: 3.9, z: 1.6, scale: 0.8 },
  { x: 3.9, z: 2.8, scale: 1.1 },
  { x: 3.8, z: 4.0, scale: 0.85 },
  { x: -3.0, z: 4.7, scale: 0.8 },
  { x: -2.0, z: 4.8, scale: 1.0 },
  { x: 2.0, z: 4.8, scale: 0.85 },
  { x: 3.0, z: 4.7, scale: 0.95 },
];

const rocks = [
  { x: -4.4, z: -0.5, radius: 0.35 },
  { x: -4.3, z: 2.8, radius: 0.4 },
  { x: 4.35, z: 0.2, radius: 0.35 },
  { x: 4.3, z: 3.7, radius: 0.35 },
  { x: -2.8, z: 5.8, radius: 0.4 },
  { x: 2.8, z: 5.8, radius: 0.4 },
];

const treesAsObstacles: VillageObstacle[] = forestTrees
  .filter(
    (tree) =>
      tree.x > villageBounds.minX - 0.5 &&
      tree.x < villageBounds.maxX + 0.5 &&
      tree.z > villageBounds.minZ - 0.5 &&
      tree.z < villageBounds.maxZ + 0.5,
  )
  .map((tree) => ({
    type: "circle",
    x: tree.x,
    z: tree.z,
    // A small trunk collision radius leaves room to walk around trees.
    radius: 0.16 * tree.scale,
  }));

const rocksAsObstacles: VillageObstacle[] = rocks
  .filter(
    (rock) =>
      rock.x > villageBounds.minX - 0.5 &&
      rock.x < villageBounds.maxX + 0.5 &&
      rock.z > villageBounds.minZ - 0.5 &&
      rock.z < villageBounds.maxZ + 0.5,
  )
  .map((rock) => ({
    type: "circle",
    x: rock.x,
    z: rock.z,
    radius: rock.radius,
  }));

const buildingsAsObstacles: VillageObstacle[] = locations.map(
  (location) => {
    const x = location.position[0];
    const z = location.position[1];

    return {
      type: "box",
      // Smaller collision footprint to avoid blocking narrow paths.
      minX: x - 0.32,
      maxX: x + 0.32,
      minZ: z - 0.32,
      maxZ: z + 0.32,
    };
  },
);

export const villageObstacles: VillageObstacle[] = [
  ...treesAsObstacles,
  ...rocksAsObstacles,
  ...buildingsAsObstacles,
];
