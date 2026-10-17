import { OrbitControls } from '@react-three/drei'

export default function WorldControls() {
  return (
    <OrbitControls
      makeDefault
      enablePan
      enableRotate
      enableZoom
      minDistance={7}
      maxDistance={22}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI / 2.15}
      target={[0, 0, 1]}
      dampingFactor={0.08}
      enableDamping
    />
  )
}