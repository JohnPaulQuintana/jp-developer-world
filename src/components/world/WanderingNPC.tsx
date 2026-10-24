
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

type GridNode = {
  x: number;
  z: number;
  g: number;
  h: number;
  parent: GridNode | null;
};

const DEFAULT_BOUNDS: RectBounds = {
  minX: -8,
  maxX: 8,
  minZ: -8,
  maxZ: 8,
};

const CELL_SIZE = 0.2;
const NPC_RADIUS = 0.14;
const OBSTACLE_MARGIN = 0.08;
const ARRIVAL_DISTANCE = 0.07;
const MAX_DESTINATION_ATTEMPTS = 50;

function isInsideBounds(
  x: number,
  z: number,
  bounds: PatrolBounds,
): boolean {
  if ("centerX" in bounds) {
    const radius = bounds.radius - NPC_RADIUS;
    const dx = x - bounds.centerX;
    const dz = z - bounds.centerZ;

    return radius > 0 && dx * dx + dz * dz <= radius * radius;
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

function isWalkable(
  x: number,
  z: number,
  bounds: PatrolBounds,
  obstacles: PatrolObstacle[],
): boolean {
  return (
    isInsideBounds(x, z, bounds) &&
    !isBlocked(x, z, obstacles)
  );
}

function heuristic(
  x: number,
  z: number,
  targetX: number,
  targetZ: number,
): number {
  return Math.hypot(targetX - x, targetZ - z);
}

function nodeKey(x: number, z: number): string {
  return `${x},${z}`;
}

function worldToGrid(value: number): number {
  return Math.round(value / CELL_SIZE);
}

function gridToWorld(value: number): number {
  return value * CELL_SIZE;
}

function findNearestWalkableNode(
  worldX: number,
  worldZ: number,
  bounds: PatrolBounds,
  obstacles: PatrolObstacle[],
): { x: number; z: number } | null {
  const startX = worldToGrid(worldX);
  const startZ = worldToGrid(worldZ);

  if (isWalkable(worldX, worldZ, bounds, obstacles)) {
    return { x: startX, z: startZ };
  }

  for (let radius = 1; radius <= 12; radius++) {
    for (let dx = -radius; dx <= radius; dx++) {
      for (let dz = -radius; dz <= radius; dz++) {
        if (
          Math.abs(dx) !== radius &&
          Math.abs(dz) !== radius
        ) {
          continue;
        }

        const x = startX + dx;
        const z = startZ + dz;

        if (
          isWalkable(
            gridToWorld(x),
            gridToWorld(z),
            bounds,
            obstacles,
          )
        ) {
          return { x, z };
        }
      }
    }
  }

  return null;
}

function reconstructPath(
  node: GridNode,
  height: number,
): THREE.Vector3[] {
  const path: THREE.Vector3[] = [];
  let current: GridNode | null = node;

  while (current) {
    path.push(
      new THREE.Vector3(
        gridToWorld(current.x),
        height,
        gridToWorld(current.z),
      ),
    );

    current = current.parent;
  }

  return path.reverse();
}

function findPath(
  startX: number,
  startZ: number,
  targetX: number,
  targetZ: number,
  height: number,
  bounds: PatrolBounds,
  obstacles: PatrolObstacle[],
): THREE.Vector3[] | null {
  const start = findNearestWalkableNode(
    startX,
    startZ,
    bounds,
    obstacles,
  );

  const goal = findNearestWalkableNode(
    targetX,
    targetZ,
    bounds,
    obstacles,
  );

  if (!start || !goal) return null;

  const startNode: GridNode = {
    ...start,
    g: 0,
    h: heuristic(start.x, start.z, goal.x, goal.z),
    parent: null,
  };

  const open = new Map<string, GridNode>();
  const closed = new Set<string>();

  open.set(nodeKey(start.x, start.z), startNode);

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ] as const;

  const maxIterations = 12000;
  let iterations = 0;

  while (open.size > 0 && iterations < maxIterations) {
    iterations++;

    let current: GridNode | null = null;
    let currentKey = "";
    let bestScore = Infinity;

    for (const [key, node] of open) {
      const score = node.g + node.h;

      if (score < bestScore) {
        bestScore = score;
        current = node;
        currentKey = key;
      }
    }

    if (!current) return null;

    if (current.x === goal.x && current.z === goal.z) {
      return reconstructPath(current, height);
    }

    open.delete(currentKey);
    closed.add(currentKey);

    for (const [dx, dz] of directions) {
      const nx = current.x + dx;
      const nz = current.z + dz;
      const key = nodeKey(nx, nz);

      if (closed.has(key)) continue;

      const wx = gridToWorld(nx);
      const wz = gridToWorld(nz);

      if (!isWalkable(wx, wz, bounds, obstacles)) continue;

      // Prevent diagonal movement through obstacle corners.
      if (dx !== 0 && dz !== 0) {
        if (
          !isWalkable(
            gridToWorld(current.x + dx),
            gridToWorld(current.z),
            bounds,
            obstacles,
          ) ||
          !isWalkable(
            gridToWorld(current.x),
            gridToWorld(current.z + dz),
            bounds,
            obstacles,
          )
        ) {
          continue;
        }
      }

      const movementCost =
        dx !== 0 && dz !== 0 ? Math.SQRT2 : 1;

      const tentativeG = current.g + movementCost;
      const existing = open.get(key);

      if (existing && tentativeG >= existing.g) continue;

      open.set(key, {
        x: nx,
        z: nz,
        g: tentativeG,
        h: heuristic(nx, nz, goal.x, goal.z),
        parent: current,
      });
    }
  }

  return null;
}

function simplifyPath(
  path: THREE.Vector3[],
  bounds: PatrolBounds,
  obstacles: PatrolObstacle[],
): THREE.Vector3[] {
  if (path.length < 3) return path;

  const simplified: THREE.Vector3[] = [path[0]];
  let anchor = 0;

  while (anchor < path.length - 1) {
    let furthest = anchor + 1;

    for (let candidate = anchor + 2; candidate < path.length; candidate++) {
      const from = path[anchor];
      const to = path[candidate];
      const distance = Math.hypot(
        to.x - from.x,
        to.z - from.z,
      );
      const samples = Math.max(1, Math.ceil(distance / 0.08));
      let clear = true;

      for (let i = 1; i <= samples; i++) {
        const t = i / samples;
        const x = THREE.MathUtils.lerp(from.x, to.x, t);
        const z = THREE.MathUtils.lerp(from.z, to.z, t);

        if (!isWalkable(x, z, bounds, obstacles)) {
          clear = false;
          break;
        }
      }

      if (!clear) break;
      furthest = candidate;
    }

    simplified.push(path[furthest]);
    anchor = furthest;
  }

  return simplified;
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
  const pathRef = useRef<THREE.Vector3[]>([]);
  const waypointRef = useRef(0);
  const retryRef = useRef(0);
  const initializedRef = useRef(false);

  const chooseDestination = useCallback(
    (currentX: number, currentZ: number, height: number) => {
      for (
        let attempt = 0;
        attempt < MAX_DESTINATION_ATTEMPTS;
        attempt++
      ) {
        let x: number;
        let z: number;

        if ("centerX" in bounds) {
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

        if (Math.hypot(x - currentX, z - currentZ) < 0.55) {
          continue;
        }

        if (!isWalkable(x, z, bounds, obstacles)) continue;

        const path = findPath(
          currentX,
          currentZ,
          x,
          z,
          height,
          bounds,
          obstacles,
        );

        if (!path || path.length < 2) continue;

        return simplifyPath(path, bounds, obstacles);
      }

      return null;
    },
    [bounds, obstacles],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!initializedRef.current) {
      initializedRef.current = true;
      group.position.set(...startPosition);
    }

    if (pathRef.current.length === 0) {
      retryRef.current -= delta;

      if (retryRef.current > 0) return;

      const path = chooseDestination(
        group.position.x,
        group.position.z,
        startPosition[1],
      );

      if (!path) {
        retryRef.current = 0.8;
        return;
      }

      pathRef.current = path;
      waypointRef.current = 1;
    }

    const path = pathRef.current;
    const waypointIndex = waypointRef.current;
    const target = path[waypointIndex];

    if (!target) {
      pathRef.current = [];
      retryRef.current = 0.5;
      return;
    }

    const dx = target.x - group.position.x;
    const dz = target.z - group.position.z;
    const distance = Math.hypot(dx, dz);

    if (distance < ARRIVAL_DISTANCE) {
      waypointRef.current++;

      if (waypointRef.current >= path.length) {
        pathRef.current = [];
        waypointRef.current = 0;
        retryRef.current = THREE.MathUtils.randFloat(0.4, 1.2);
      }

      return;
    }

    const directionX = dx / distance;
    const directionZ = dz / distance;
    const step = Math.min(Math.max(0, speed) * delta, distance);

    const nextX = group.position.x + directionX * step;
    const nextZ = group.position.z + directionZ * step;

    // Safety check: never advance into an obstacle.
    if (!isWalkable(nextX, nextZ, bounds, obstacles)) {
      pathRef.current = [];
      retryRef.current = 0.2;
      return;
    }

    group.position.x = nextX;
    group.position.z = nextZ;

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
