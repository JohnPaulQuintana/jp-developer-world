import { Canvas } from '@react-three/fiber'
import * as THREE from 'three'
import type {
  PortfolioLocation,
  LocationId,
} from '../../data/locations'

import MapTiles from './MapTiles'
// import Mascot from './Mascot'
import WorldLighting from './WorldLighting'
import WorldControls from './WorldControls'
import WindEffects from "./WindEffects";

type WorldSceneProps = {
  selectedId: LocationId
  onSelect: (location: PortfolioLocation) => void
  onMascotClick: () => void
}

export default function WorldScene({
  selectedId,
  onSelect,
  // onMascotClick,
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
      <WorldLighting />

      <MapTiles
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <WindEffects />
      {/* <Mascot onClick={onMascotClick} /> */}

      <WorldControls />
    </Canvas>
  )
}