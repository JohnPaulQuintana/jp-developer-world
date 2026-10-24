import { useMemo } from "react";

import { ProjectIslandNPCs } from "../../FantasyNPCs";
import WorldTravelNPCs from "../../WorldTravelNPCs";

import { additionalProjectLocations } from "../../../../data/locations";

import Bridge from "./Bridge";
import HubIsland from "./HubIsland";
import ProjectCity from "./ProjectCity";
import { getBridgeEndpoints } from "./getBridgeEndpoints";

import {
  HUB_POSITION,
  HUB_RADIUS,
  VILLAGE_CONNECTION,
} from "./constants";

import type {
  FloatingProjectCityProps,
  Point3,
} from "./types";

/**
 * The project city is one complete destination.
 *
 * X: horizontal world offset from the hub.
 * Y: vertical world offset from the hub.
 * Z: forward world offset from the hub.
 */
const CITY_OFFSET: Point3 = [1.5, 0, 13];

/**
 * Approximate distance from the city center to the bridge entrance.
 *
 * IMPORTANT:
 * This value must match the actual edge of ProjectCity's terrain.
 * Update it if you change the terrain dimensions.
 */
const CITY_BRIDGE_RADIUS = 3.5;

export default function FloatingProjectCity({
  selectedId,
  onSelect,
}: FloatingProjectCityProps) {
  const projectLocations = additionalProjectLocations;

  /**
   * Calculate the city's world position once.
   *
   * ProjectCity itself should use local coordinates, because its
   * parent group applies this world offset.
   */
  const cityPosition = useMemo<Point3>(
    () => [
      HUB_POSITION[0] + CITY_OFFSET[0],
      HUB_POSITION[1] + CITY_OFFSET[1],
      HUB_POSITION[2] + CITY_OFFSET[2],
    ],
    [],
  );

  /**
   * Existing village-to-hub bridge.
   * Keep the current connection unchanged.
   */
  const mainBridge = useMemo(
    () =>
      getBridgeEndpoints(
        VILLAGE_CONNECTION,
        HUB_POSITION,
        0,
        HUB_RADIUS,
      ),
    [],
  );

  /**
   * One bridge connects the hub to the entire project city.
   */
  const cityBridge = useMemo(
    () =>
      getBridgeEndpoints(
        HUB_POSITION,
        cityPosition,
        HUB_RADIUS,
        CITY_BRIDGE_RADIUS,
      ),
    [cityPosition],
  );

  /**
   * The entire project city is one NPC destination.
   * Individual project landmarks remain inside ProjectCity.
   */
  const projectPositions = useMemo<Point3[]>(
    () => [cityPosition],
    [cityPosition],
  );

  /**
   * World travel uses the same bridge that is rendered visually.
   */
  const islandBridges = useMemo(
    () => [cityBridge],
    [cityBridge],
  );

  return (
    <group name="floating-project-world">
      {/* Existing village entrance bridge */}
      <Bridge
        start={mainBridge.start}
        end={mainBridge.end}
        label="Village Bridge"
      />

      {/* Single hub-to-city bridge */}
      <Bridge
        start={cityBridge.start}
        end={cityBridge.end}
        label="Project City Bridge"
      />

      {/* Entire project city: forest surface, tiles, landmarks and rocky underside */}
      <group
        name="project-city"
        position={cityPosition}
      >
        <ProjectCity
          locations={projectLocations}
          selectedId={selectedId}
          onSelect={onSelect}
        />
      </group>

      {/* Preserve the existing project NPC system */}
      <ProjectIslandNPCs
        positions={projectPositions}
      />

      {/* Preserve the existing world-travel NPC system */}
      <WorldTravelNPCs
        projectPositions={projectPositions}
        mainBridge={mainBridge}
        islandBridges={islandBridges}
      />

      {/* Existing central hub */}
      <HubIsland />
    </group>
  );
}