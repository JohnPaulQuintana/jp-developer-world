import { ContactShadows, Sparkles } from '@react-three/drei'

export default function WorldLighting() {
  return (
    <>
      <ambientLight intensity={1.4} />

      <hemisphereLight args={['#b8ffdd', '#12231d', 1.1]} />

      <directionalLight
        position={[7, 12, 5]}
        intensity={2.3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      <pointLight
        position={[-3, 4, 2]}
        color="#19f58a"
        intensity={18}
        distance={12}
      />

      <pointLight
        position={[3, 3, -1]}
        color="#2e9dff"
        intensity={6}
        distance={10}
      />

      <Sparkles
        count={65}
        scale={[11, 3, 11]}
        size={1.5}
        speed={0.2}
        color="#19f58a"
        opacity={0.55}
      />

      <ContactShadows
        position={[0, -0.15, 0]}
        opacity={0.3}
        scale={18}
        blur={2.4}
        far={4}
      />
    </>
  )
}