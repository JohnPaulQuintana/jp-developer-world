
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

import type {
  PortfolioLocation,
  LocationId,
} from '../../data/locations'

import MapTiles from './MapTiles'
import WorldLighting from './WorldLighting'
import WorldControls from './WorldControls'
import WindEffects from './WindEffects'
import FantasyNPCs from "./FantasyNPCs";

type WorldSceneProps = {
  selectedId: LocationId
  onSelect: (location: PortfolioLocation) => void
  onMascotClick: () => void
  onReady: () => void
}

/**
 * Signals readiness after the first rendered frame begins.
 * The ref prevents the callback from running on every frame.
 */
function SceneReady({ onReady }: { onReady: () => void }) {
  const hasReportedReady = useRef(false)

  useFrame(() => {
    if (hasReportedReady.current) return

    hasReportedReady.current = true
    onReady()
  })

  return null
}

export default function WorldScene({
  selectedId,
  onSelect,
  onReady,
}: WorldSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      camera={{
        position: [10, 11, 12],
        fov: 38,
        near: 0.1,
        far: 100,
      }}
      gl={{ antialias: true, alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor('#06110d', 0)
        gl.toneMapping = THREE.ACESFilmicToneMapping
      }}
    >
      <SceneReady onReady={onReady} />

      <WorldLighting />

      <MapTiles
        selectedId={selectedId}
        onSelect={onSelect}
      />
      <FantasyNPCs />
      <WindEffects />

      {/* <Mascot onClick={onMascotClick} /> */}

      <WorldControls />
    </Canvas>
  )
}
