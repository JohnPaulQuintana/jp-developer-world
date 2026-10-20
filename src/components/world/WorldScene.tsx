
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import type { LocationId } from "../../data/locations";

import MapTiles from "./MapTiles";
import WorldLighting from "./WorldLighting";
import WorldControls from "./WorldControls";
import WindEffects from "./WindEffects";
import FantasyNPCs from "./FantasyNPCs";
import FloatingProjectCity from "./extended/FloatingProjectCity/index";
import type { CityLocation } from "./extended/FloatingProjectCity/types";

type WorldSceneProps = {
  selectedId: LocationId;
  onSelect: (location: CityLocation) => void;
  onMascotClick: () => void;
  onReady: () => void;
};

function SceneReady({ onReady }: { onReady: () => void }) {
  const hasReportedReady = useRef(false);

  useFrame(() => {
    if (hasReportedReady.current) return;

    hasReportedReady.current = true;
    onReady();
  });

  return null;
}

export default function WorldScene({
  selectedId,
  onSelect,
  onReady,
}: WorldSceneProps) {
  return (
    <Canvas
      // Avoid the cost of real-time shadow maps for the entire world.
      shadows={false}

      // Lower resolution reduces GPU workload, especially on mobile.
      dpr={[1, 1.25]}

      camera={{
        position: [10, 11, 12],
        fov: 38,
        near: 0.1,
        far: 100,
      }}

      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}

      onCreated={({ gl }) => {
        gl.setClearColor("#06110d", 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
      }}
    >
      <SceneReady onReady={onReady} />

      <WorldLighting />

      <MapTiles
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <FantasyNPCs />

      <FloatingProjectCity
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <WindEffects />

      <WorldControls />
    </Canvas>
  );
}
