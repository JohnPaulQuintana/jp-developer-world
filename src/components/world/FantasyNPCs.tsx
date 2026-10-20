
import FantasyNPC from "./FantasyNPC";
import WanderingNPC, {
  type PatrolObstacle,
} from "./WanderingNPC";

import {
  villageBounds,
  villageObstacles,
} from "./villageNavigation";

import type { Point3 } from "./extended/FloatingProjectCity/types";

const ISLAND_BOUNDS = {
  centerX: 0,
  centerZ: 0,
  // Keep NPCs away from the outer edge of the grass.
  radius: 1.12,
};

const ISLAND_OBSTACLES: PatrolObstacle[] = [
  // Central building footprint.
  {
    type: "box",
    minX: -0.4,
    maxX: 0.4,
    minZ: -0.4,
    maxZ: 0.4,
  },

  // Perimeter trees.
  {
    type: "circle",
    x: -1.05,
    z: -0.95,
    radius: 0.12,
  },
  {
    type: "circle",
    x: 1.05,
    z: -0.95,
    radius: 0.13,
  },
  {
    type: "circle",
    x: -1.05,
    z: 0.95,
    radius: 0.12,
  },
  {
    type: "circle",
    x: 1.05,
    z: 0.95,
    radius: 0.11,
  },

  // Decorative rock near the edge.
  {
    type: "circle",
    x: 1.22,
    z: 0.15,
    radius: 0.18,
  },
];

const ISLAND_NPC_TYPES = [
  "female",
  "male",
  "mage",
  "ranger",
  "female",
] as const;

type ProjectIslandNPCsProps = {
  positions: Point3[];
};

export function ProjectIslandNPCs({
  positions,
}: ProjectIslandNPCsProps) {
  return (
    <group name="project-island-npcs">
      {positions.map((position, index) => (
        <group
          key={`island-npc-${index}`}
          position={position}
        >
          <WanderingNPC
            startPosition={[
              index % 2 === 0 ? 0.65 : -0.65,
              0.1,
              0.55,
            ]}
            bounds={ISLAND_BOUNDS}
            obstacles={ISLAND_OBSTACLES}
            speed={0.2 + (index % 3) * 0.04}
          >
            <FantasyNPC
              type={ISLAND_NPC_TYPES[index % ISLAND_NPC_TYPES.length]}
              position={[0, 0, 0]}
              rotation={0}
              scale={0.16}
            />
          </WanderingNPC>
        </group>
      ))}
    </group>
  );
}

export default function FantasyNPCs() {
  return (
    <group name="fantasy-npcs">
      <WanderingNPC
        startPosition={[-2.4, 0, -1.4]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.3}
      >
        <FantasyNPC
          type="female"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[2.2, 0, -1.4]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.35}
      >
        <FantasyNPC
          type="male"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[2.2, 0, 3.0]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.25}
      >
        <FantasyNPC
          type="mage"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[-2.3, 0, 3.0]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.3}
      >
        <FantasyNPC
          type="ranger"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>
    </group>
  );
}
