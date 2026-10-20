import { useMemo } from "react";
import { ProjectIslandNPCs } from "../../FantasyNPCs";
import { additionalProjectLocations } from "../../../../data/locations";

import Bridge from "./Bridge";
import HubIsland from "./HubIsland";
import MiniCity from "./MiniCity";
import { getBridgeEndpoints } from "./getBridgeEndpoints";

import {
  HUB_POSITION,
  HUB_RADIUS,
  ISLAND_RADIUS,
  MIN_CITY_SPACING,
  VILLAGE_CONNECTION,
} from "./constants";

import type { FloatingProjectCityProps, Point3 } from "./types";

export default function FloatingProjectCity({
  selectedId,
  onSelect,
}: FloatingProjectCityProps) {
  const projectLocations = additionalProjectLocations;

  const projectPositions = useMemo<Point3[]>(() => {
    const count = projectLocations.length;

    if (count === 0) return [];

    const radius = Math.max(
      MIN_CITY_SPACING,
      count > 2 ? 2.8 / Math.sin(Math.PI / count) : MIN_CITY_SPACING,
    );

    const connectionAngle = Math.atan2(
      VILLAGE_CONNECTION[2] - HUB_POSITION[2],
      VILLAGE_CONNECTION[0] - HUB_POSITION[0],
    );

    const startAngle = connectionAngle + Math.PI / count;

    return projectLocations.map((location, index) => {
      const angle = startAngle + (index / count) * Math.PI * 2;

      // Use the configured project position as the island's X/Z layout.
      // The configuration uses 2D coordinates: [x, z].
      const configuredPosition = location.position;

      return [
        HUB_POSITION[0] +
          Math.cos(angle) * radius +
          configuredPosition[0] * 0.15,
        HUB_POSITION[1] + Math.sin(index * 1.7) * 0.22,
        HUB_POSITION[2] +
          Math.sin(angle) * radius +
          configuredPosition[1] * 0.15,
      ];
    });
  }, [projectLocations]);

  const mainBridge = useMemo(
    () => getBridgeEndpoints(VILLAGE_CONNECTION, HUB_POSITION, 0, HUB_RADIUS),
    [],
  );

  return (
    <group name="floating-project-city">
      {/* Connect the main village to the central hub */}
      {projectLocations.length > 0 && (
        <Bridge
          start={mainBridge.start}
          end={mainBridge.end}
          label="Project Bridge"
        />
      )}

      {/* Connect the central hub to each configured project island */}
      {projectPositions.map((position, index) => {
        const location = projectLocations[index];

        const endpoints = getBridgeEndpoints(
          HUB_POSITION,
          position,
          HUB_RADIUS,
          ISLAND_RADIUS,
        );

        return (
          <Bridge
            key={`hub-bridge-${location.id}`}
            start={endpoints.start}
            end={endpoints.end}
          />
        );
      })}

      {/* Render each configured project as an independent island */}
      {projectLocations.map((location, index) => (
        <MiniCity
          key={location.id}
          location={location}
          index={index}
          position={projectPositions[index]}
          selected={location.id === selectedId}
          onSelect={onSelect}
        />
      ))}

      {/* NPCs patrol on their corresponding project islands */}
      <ProjectIslandNPCs positions={projectPositions} />

      <HubIsland />
    </group>
  );
}
