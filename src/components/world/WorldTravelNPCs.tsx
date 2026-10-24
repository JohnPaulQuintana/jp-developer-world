
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import FantasyNPC from "./FantasyNPC";
import type { Point3 } from "./extended/FloatingProjectCity/types";
import type { getBridgeEndpoints } from "./extended/FloatingProjectCity/getBridgeEndpoints";

import {
  HUB_POSITION,
  HUB_RADIUS,
  // VILLAGE_CONNECTION,
} from "./extended/FloatingProjectCity/constants";

type BridgeEndpoints = ReturnType<typeof getBridgeEndpoints>;

type GraphNode = {
  id: string;
  position: Point3;
  neighbors: string[];
};

type NavigationGraph = {
  nodes: Map<string, GraphNode>;
  destinations: string[];
};

type WorldTravelNPCsProps = {
  projectPositions: Point3[];
  mainBridge: BridgeEndpoints;
  islandBridges: BridgeEndpoints[];
};

const VILLAGE_GATE: Point3 = [2.55, 0.1, -0.8];
const VILLAGE_APPROACH: Point3 = [3.3, 0.2, -0.8];

const HUB_WALK_RADIUS = HUB_RADIUS * 0.8;
const BRIDGE_SEGMENT_LENGTH = 0.38;

/**
 * NPCs should walk past the bridge endpoint and onto the island.
 * Increase this slightly if your tile surface extends farther inward.
 */
const ISLAND_ENTRY_DISTANCE = 0.65;

const NPC_TYPES = ["female", "male"] as const;

function distance3D(a: Point3, b: Point3) {
  return Math.hypot(
    b[0] - a[0],
    b[1] - a[1],
    b[2] - a[2],
  );
}

function interpolateBridge(
  start: Point3,
  end: Point3,
  t: number,
): Point3 {
  const arch = Math.sin(t * Math.PI) * 0.09;

  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t + arch,
    start[2] + (end[2] - start[2]) * t,
  ];
}

function lerpPoint(
  start: Point3,
  end: Point3,
  t: number,
): Point3 {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t,
    start[2] + (end[2] - start[2]) * t,
  ];
}

function buildNavigationGraph(
  projectPositions: Point3[],
  mainBridge: BridgeEndpoints,
  islandBridges: BridgeEndpoints[],
): NavigationGraph {
  const nodes = new Map<string, GraphNode>();

  function addNode(id: string, position: Point3) {
    if (!nodes.has(id)) {
      nodes.set(id, {
        id,
        position: [...position] as Point3,
        neighbors: [],
      });
    }
  }

  function connect(aId: string, bId: string) {
    const a = nodes.get(aId);
    const b = nodes.get(bId);

    if (!a || !b) return;

    if (!a.neighbors.includes(bId)) a.neighbors.push(bId);
    if (!b.neighbors.includes(aId)) b.neighbors.push(aId);
  }

  function connectSegment(
    prefix: string,
    startId: string,
    endId: string,
    start: Point3,
    end: Point3,
    curved = false,
  ) {
    const segmentCount = Math.max(
      1,
      Math.ceil(distance3D(start, end) / BRIDGE_SEGMENT_LENGTH),
    );

    let previousId = startId;

    for (let i = 1; i < segmentCount; i++) {
      const t = i / segmentCount;
      const id = `${prefix}-${i}`;

      const position = curved
        ? interpolateBridge(start, end, t)
        : lerpPoint(start, end, t);

      addNode(id, position);
      connect(previousId, id);
      previousId = id;
    }

    connect(previousId, endId);
  }

  // Village walking path.
  addNode("village-gate", VILLAGE_GATE);
  addNode("village-approach", VILLAGE_APPROACH);
  addNode("village-bridge", mainBridge.start);
  addNode("hub-main-edge", mainBridge.end);

  connectSegment(
    "village-path-a",
    "village-gate",
    "village-approach",
    VILLAGE_GATE,
    VILLAGE_APPROACH,
  );

  connectSegment(
    "village-path-b",
    "village-approach",
    "village-bridge",
    VILLAGE_APPROACH,
    mainBridge.start,
  );

  connectSegment(
    "main-bridge",
    "village-bridge",
    "hub-main-edge",
    mainBridge.start,
    mainBridge.end,
    true,
  );

  // Build perimeter waypoints around the hub.
  const hubConnections = [
    {
      edgeId: "hub-main-edge",
      position: mainBridge.end,
    },
    ...islandBridges.map((bridge, index) => ({
      edgeId: `hub-island-edge-${index}`,
      position: bridge.start,
    })),
  ];

  const ringNodes: { id: string; angle: number }[] = [];

  hubConnections.forEach(({ edgeId, position }, index) => {
    addNode(edgeId, position);

    const angle = Math.atan2(
      position[2] - HUB_POSITION[2],
      position[0] - HUB_POSITION[0],
    );

    const ringId = `hub-ring-${index}`;

    const ringPosition: Point3 = [
      HUB_POSITION[0] + Math.cos(angle) * HUB_WALK_RADIUS,
      HUB_POSITION[1] + 0.1,
      HUB_POSITION[2] + Math.sin(angle) * HUB_WALK_RADIUS,
    ];

    addNode(ringId, ringPosition);

    connectSegment(
      `hub-access-${index}`,
      edgeId,
      ringId,
      position,
      ringPosition,
    );

    ringNodes.push({ id: ringId, angle });
  });

  ringNodes.sort((a, b) => a.angle - b.angle);

  for (let i = 0; i < ringNodes.length; i++) {
    const current = ringNodes[i];
    const next = ringNodes[(i + 1) % ringNodes.length];

    const currentPosition = nodes.get(current.id)!.position;
    const nextPosition = nodes.get(next.id)!.position;

    connectSegment(
      `hub-ring-path-${i}`,
      current.id,
      next.id,
      currentPosition,
      nextPosition,
    );
  }

  // Connect each island bridge to an interior destination.
  const destinations = ["village-gate"];

  projectPositions.forEach((position, index) => {
    const bridge = islandBridges[index];
    if (!bridge) return;

    const hubEdgeId = `hub-island-edge-${index}`;
    const islandEdgeId = `island-edge-${index}`;
    const interiorId = `island-interior-${index}`;

    addNode(hubEdgeId, bridge.start);
    addNode(islandEdgeId, bridge.end);

    connectSegment(
      `project-bridge-${index}`,
      hubEdgeId,
      islandEdgeId,
      bridge.start,
      bridge.end,
      true,
    );

    /**
     * The bridge endpoint is the island's entry point.
     * Extend the route toward the island center so the NPC
     * doesn't stop on the bridge or at the island's outer edge.
     */
    const dx = position[0] - bridge.end[0];
    const dz = position[2] - bridge.end[2];
    const horizontalLength = Math.hypot(dx, dz);

    const interiorPosition: Point3 =
      horizontalLength > 0.001
        ? [
            bridge.end[0] +
              (dx / horizontalLength) * ISLAND_ENTRY_DISTANCE,
            position[1] + 0.1,
            bridge.end[2] +
              (dz / horizontalLength) * ISLAND_ENTRY_DISTANCE,
          ]
        : [
            position[0],
            position[1] + 0.1,
            position[2],
          ];

    addNode(interiorId, interiorPosition);

    connectSegment(
      `island-approach-${index}`,
      islandEdgeId,
      interiorId,
      bridge.end,
      interiorPosition,
    );

    destinations.push(interiorId);
  });

  return { nodes, destinations };
}

/**
 * A* searches the shared waypoint graph.
 * Edge costs use world-space distances.
 */
function findAStarPath(
  graph: NavigationGraph,
  startId: string,
  goalId: string,
): string[] {
  if (!graph.nodes.has(startId) || !graph.nodes.has(goalId)) {
    return [];
  }

  if (startId === goalId) return [startId];

  const openSet = new Set<string>([startId]);
  const cameFrom = new Map<string, string>();
  const gScore = new Map<string, number>([[startId, 0]]);

  const heuristic = (id: string) =>
    distance3D(
      graph.nodes.get(id)!.position,
      graph.nodes.get(goalId)!.position,
    );

  const fScore = new Map<string, number>([
    [startId, heuristic(startId)],
  ]);

  while (openSet.size > 0) {
    let currentId: string | undefined;
    let bestScore = Infinity;

    for (const id of openSet) {
      const score = fScore.get(id) ?? Infinity;

      if (score < bestScore) {
        bestScore = score;
        currentId = id;
      }
    }

    if (!currentId) break;

    if (currentId === goalId) {
      const path = [goalId];
      let current = goalId;

      while (cameFrom.has(current)) {
        current = cameFrom.get(current)!;
        path.unshift(current);
      }

      return path;
    }

    openSet.delete(currentId);

    const currentNode = graph.nodes.get(currentId)!;

    for (const neighborId of currentNode.neighbors) {
      const neighbor = graph.nodes.get(neighborId)!;

      const tentativeG =
        (gScore.get(currentId) ?? Infinity) +
        distance3D(currentNode.position, neighbor.position);

      if (tentativeG >= (gScore.get(neighborId) ?? Infinity)) {
        continue;
      }

      cameFrom.set(neighborId, currentId);
      gScore.set(neighborId, tentativeG);
      fScore.set(
        neighborId,
        tentativeG + heuristic(neighborId),
      );
      openSet.add(neighborId);
    }
  }

  return [];
}

type TravelerProps = {
  graph: NavigationGraph;
  startId: string;
  type: (typeof NPC_TYPES)[number];
  speed: number;
  scale: number;
};

function TravelingNPC({
  graph,
  startId,
  type,
  speed,
  scale,
}: TravelerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pathRef = useRef<string[] | null>(null);
  const pathIndexRef = useRef(1);
  const currentNodeRef = useRef(startId);

  const destinationRef = useRef<string | null>(null);
  const directionRef = useRef(new THREE.Vector3());
  const targetRef = useRef(new THREE.Vector3());

  const availableDestinations = useMemo(
    () => graph.destinations.filter((id) => id !== startId),
    [graph, startId],
  );

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!pathRef.current) {
      if (availableDestinations.length === 0) return;

      const nextDestination =
        availableDestinations[
          Math.floor(Math.random() * availableDestinations.length)
        ];

      const path = findAStarPath(
        graph,
        currentNodeRef.current,
        nextDestination,
      );

      if (path.length < 2) return;

      destinationRef.current = nextDestination;
      pathRef.current = path;
      pathIndexRef.current = 1;
    }

    const path = pathRef.current;
    if (!path) return;

    const nextId = path[pathIndexRef.current];

    if (!nextId) {
      if (destinationRef.current) {
        currentNodeRef.current = destinationRef.current;
      }

      pathRef.current = null;
      destinationRef.current = null;
      return;
    }

    const target = graph.nodes.get(nextId);

    if (!target) {
      pathRef.current = null;
      destinationRef.current = null;
      return;
    }

    targetRef.current.set(...target.position);

    directionRef.current.subVectors(
      targetRef.current,
      group.position,
    );

    const distance = directionRef.current.length();
    const safeDelta = Math.min(delta, 0.05);

    if (distance <= speed * safeDelta + 0.025) {
      group.position.copy(targetRef.current);
      pathIndexRef.current += 1;

      if (pathIndexRef.current >= path.length) {
        currentNodeRef.current = destinationRef.current ?? nextId;
        pathRef.current = null;
        destinationRef.current = null;
      }

      return;
    }

    directionRef.current.normalize();

    group.position.addScaledVector(
      directionRef.current,
      speed * safeDelta,
    );

    group.rotation.y = Math.atan2(
      directionRef.current.x,
      directionRef.current.z,
    );
  });

  const startPosition = graph.nodes.get(startId)?.position;

  if (!startPosition) return null;

  return (
    <group ref={groupRef} position={startPosition}>
      <FantasyNPC
        type={type}
        position={[0, 0, 0]}
        rotation={0}
        scale={scale}
      />
    </group>
  );
}

export default function WorldTravelNPCs({
  projectPositions,
  mainBridge,
  islandBridges,
}: WorldTravelNPCsProps) {
  const graph = useMemo(
    () =>
      buildNavigationGraph(
        projectPositions,
        mainBridge,
        islandBridges,
      ),
    [projectPositions, mainBridge, islandBridges],
  );

  if (projectPositions.length === 0) return null;

  return (
    <group name="world-traveling-npcs">
      <TravelingNPC
        graph={graph}
        startId="village-gate"
        type="female"
        speed={0.55}
        scale={0.2}
      />

      <TravelingNPC
        graph={graph}
        startId="island-interior-0"
        type="male"
        speed={0.48}
        scale={0.2}
      />
    </group>
  );
}
