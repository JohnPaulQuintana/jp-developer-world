
import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type VillageBounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

type CircleObstacle = {
  type: "circle";
  x: number;
  z: number;
  radius: number;
};

type BoxObstacle = {
  type: "box";
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

type Obstacle = CircleObstacle | BoxObstacle;

type WanderingNPCProps = {
  startPosition: [number, number, number];
  bounds?: VillageBounds;
  obstacles?: Obstacle[];
  speed?: number;
  facingOffset?: number;
  children: ReactNode;
};

const DEFAULT_BOUNDS: VillageBounds = {
  minX: -8,
  maxX: 8,
  minZ: -8,
  maxZ: 8,
};

const NPC_RADIUS = 0.3;
const OBSTACLE_MARGIN = 0.2;
const SAMPLE_DISTANCE = 0.15;

function isBlocked(
  x: number,
  z: number,
  obstacles: Obstacle[],
): boolean {
  return obstacles.some((obstacle) => {
    if (obstacle.type === "circle") {
      const dx = x - obstacle.x;
      const dz = z - obstacle.z;

      const clearance =
        obstacle.radius + NPC_RADIUS + OBSTACLE_MARGIN;

      return dx * dx + dz * dz < clearance * clearance;
    }

    return (
      x >= obstacle.minX - NPC_RADIUS - OBSTACLE_MARGIN &&
      x <= obstacle.maxX + NPC_RADIUS + OBSTACLE_MARGIN &&
      z >= obstacle.minZ - NPC_RADIUS - OBSTACLE_MARGIN &&
      z <= obstacle.maxZ + NPC_RADIUS + OBSTACLE_MARGIN
    );
  });
}

function isInsideBounds(
  x: number,
  z: number,
  bounds: VillageBounds,
): boolean {
  return (
    x >= bounds.minX + NPC_RADIUS &&
    x <= bounds.maxX - NPC_RADIUS &&
    z >= bounds.minZ + NPC_RADIUS &&
    z <= bounds.maxZ - NPC_RADIUS
  );
}

function hasClearPath(
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number,
  bounds: VillageBounds,
  obstacles: Obstacle[],
): boolean {
  const dx = toX - fromX;
  const dz = toZ - fromZ;
  const distance = Math.hypot(dx, dz);
  const samples = Math.max(
    1,
    Math.ceil(distance / SAMPLE_DISTANCE),
  );

  for (let i = 1; i <= samples; i++) {
    const t = i / samples;
    const x = fromX + dx * t;
    const z = fromZ + dz * t;

    if (
      !isInsideBounds(x, z, bounds) ||
      isBlocked(x, z, obstacles)
    ) {
      return false;
    }
  }

  return true;
}

export default function WanderingNPC({
  startPosition,
  bounds = DEFAULT_BOUNDS,
  obstacles = [],
  speed = 0.35,
  facingOffset = 0,
  children,
}: WanderingNPCProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef<THREE.Vector3 | null>(null);

  const chooseDestination = (
    currentX: number,
    currentZ: number,
  ): THREE.Vector3 | null => {
    for (let attempt = 0; attempt < 30; attempt++) {
      const x = THREE.MathUtils.randFloat(
        bounds.minX + NPC_RADIUS,
        bounds.maxX - NPC_RADIUS,
      );

      const z = THREE.MathUtils.randFloat(
        bounds.minZ + NPC_RADIUS,
        bounds.maxZ - NPC_RADIUS,
      );

      const distance = Math.hypot(
        x - currentX,
        z - currentZ,
      );

      // Avoid destinations too close to the current position.
      if (distance < 1) continue;

      if (isBlocked(x, z, obstacles)) continue;

      if (
        !hasClearPath(
          currentX,
          currentZ,
          x,
          z,
          bounds,
          obstacles,
        )
      ) {
        continue;
      }

      return new THREE.Vector3(x, startPosition[1], z);
    }

    return null;
  };

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!targetRef.current) {
      targetRef.current = chooseDestination(
        group.position.x,
        group.position.z,
      );

      // Retry on a later frame if no valid path was found.
      if (!targetRef.current) return;
    }

    const target = targetRef.current;
    const dx = target.x - group.position.x;
    const dz = target.z - group.position.z;
    const distance = Math.hypot(dx, dz);

    if (distance < 0.08) {
      targetRef.current = null;
      return;
    }

    const directionX = dx / distance;
    const directionZ = dz / distance;
    const step = Math.min(speed * delta, distance);

    const nextX = group.position.x + directionX * step;
    const nextZ = group.position.z + directionZ * step;

    // Never step into an obstacle or outside the village.
    if (
      !isInsideBounds(nextX, nextZ, bounds) ||
      isBlocked(nextX, nextZ, obstacles)
    ) {
      targetRef.current = null;
      return;
    }

    group.position.x = nextX;
    group.position.z = nextZ;

    // Character's face points along local -Z.
    const targetRotation =
      Math.atan2(-dx, -dz) + facingOffset;

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      8,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {children}
    </group>
  );
}
