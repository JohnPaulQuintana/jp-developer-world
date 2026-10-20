
import { useCallback, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type RectBounds = {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

type CircleBounds = {
  centerX: number;
  centerZ: number;
  radius: number;
};

export type PatrolBounds = RectBounds | CircleBounds;

export type CircleObstacle = {
  type: "circle";
  x: number;
  z: number;
  radius: number;
};

export type BoxObstacle = {
  type: "box";
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
};

export type PatrolObstacle = CircleObstacle | BoxObstacle;

type WanderingNPCProps = {
  startPosition: [number, number, number];
  bounds?: PatrolBounds;
  obstacles?: PatrolObstacle[];
  speed?: number;
  facingOffset?: number;
  children: ReactNode;
};

const DEFAULT_BOUNDS: RectBounds = {
  minX: -8,
  maxX: 8,
  minZ: -8,
  maxZ: 8,
};

const NPC_RADIUS = 0.14;
const OBSTACLE_MARGIN = 0.08;
const SAMPLE_DISTANCE = 0.15;

function isInsideBounds(
  x: number,
  z: number,
  bounds: PatrolBounds,
): boolean {
  if ("centerX" in bounds) {
    const dx = x - bounds.centerX;
    const dz = z - bounds.centerZ;
    const allowedRadius = bounds.radius - NPC_RADIUS;

    return (
      allowedRadius > 0 &&
      dx * dx + dz * dz <= allowedRadius * allowedRadius
    );
  }

  return (
    x >= bounds.minX + NPC_RADIUS &&
    x <= bounds.maxX - NPC_RADIUS &&
    z >= bounds.minZ + NPC_RADIUS &&
    z <= bounds.maxZ - NPC_RADIUS
  );
}

function isBlocked(
  x: number,
  z: number,
  obstacles: PatrolObstacle[],
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

function hasClearPath(
  fromX: number,
  fromZ: number,
  toX: number,
  toZ: number,
  bounds: PatrolBounds,
  obstacles: PatrolObstacle[],
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
  const retryRef = useRef(0);

  const chooseDestination = useCallback(
    (currentX: number, currentZ: number) => {
      for (let attempt = 0; attempt < 35; attempt++) {
        let x: number;
        let z: number;

        if ("centerX" in bounds) {
          // Uniformly distribute destinations across the circular area.
          const angle = Math.random() * Math.PI * 2;
          const radius =
            Math.sqrt(Math.random()) *
            Math.max(0, bounds.radius - NPC_RADIUS - 0.05);

          x = bounds.centerX + Math.cos(angle) * radius;
          z = bounds.centerZ + Math.sin(angle) * radius;
        } else {
          x = THREE.MathUtils.randFloat(
            bounds.minX + NPC_RADIUS,
            bounds.maxX - NPC_RADIUS,
          );

          z = THREE.MathUtils.randFloat(
            bounds.minZ + NPC_RADIUS,
            bounds.maxZ - NPC_RADIUS,
          );
        }

        const distance = Math.hypot(
          x - currentX,
          z - currentZ,
        );

        if (distance < 0.55) continue;
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
    },
    [bounds, obstacles, startPosition,],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!targetRef.current) {
      // Avoid retrying destination searches on every frame.
      retryRef.current -= delta;

      if (retryRef.current > 0) return;

      targetRef.current = chooseDestination(
        group.position.x,
        group.position.z,
      );

      if (!targetRef.current) {
        retryRef.current = 0.5;
        return;
      }
    }

    const target = targetRef.current;
    const dx = target.x - group.position.x;
    const dz = target.z - group.position.z;
    const distance = Math.hypot(dx, dz);

    if (distance < 0.06) {
      targetRef.current = null;
      retryRef.current = 0.4;
      return;
    }

    const directionX = dx / distance;
    const directionZ = dz / distance;
    const step = Math.min(speed * delta, distance);

    const nextX = group.position.x + directionX * step;
    const nextZ = group.position.z + directionZ * step;

    if (
      !isInsideBounds(nextX, nextZ, bounds) ||
      isBlocked(nextX, nextZ, obstacles)
    ) {
      targetRef.current = null;
      retryRef.current = 0.2;
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
