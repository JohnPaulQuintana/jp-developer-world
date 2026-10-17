
type MountainProps = {
  position: [number, number, number]
  scale?: number
}

type RidgeProps = {
  position: [number, number, number]
  scale: [number, number, number]
  color: string
  rotation?: [number, number, number]
}

function Ridge({
  position,
  scale,
  color,
  rotation = [0, 0, 0],
}: RidgeProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        flatShading
      />
    </mesh>
  )
}

function MountainPeak({
  position,
  scale,
  color,
  rotation = [0, 0, 0],
}: RidgeProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <coneGeometry args={[1, 2, 5, 2]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        flatShading
      />
    </mesh>
  )
}

function Moss({
  position,
  scale,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number]
  scale: [number, number, number]
  rotation?: [number, number, number]
}) {
  return (
    <mesh position={position} scale={scale} rotation={rotation}>
      <sphereGeometry args={[1, 7, 5]} />
      <meshStandardMaterial
        color="#315b35"
        roughness={1}
        flatShading
      />
    </mesh>
  )
}

export default function Mountain({
  position,
  scale = 1,
}: MountainProps) {
  return (
    <group position={position} scale={scale}>
      {/* Broad connected mountain base */}
      <Ridge
        position={[0, 0.52, 0]}
        scale={[2.5, 0.75, 1.15]}
        color="#424c43"
        rotation={[0, 0, -0.04]}
      />

      {/* Main mountain ridge */}
      <MountainPeak
        position={[-0.95, 1.15, -0.12]}
        scale={[1.05, 1.3, 0.9]}
        color="#566052"
        rotation={[0, 0, -0.16]}
      />

      <MountainPeak
        position={[0.15, 1.45, -0.2]}
        scale={[1.15, 1.75, 1.0]}
        color="#3f4a40"
        rotation={[0, 0, 0.1]}
      />

      <MountainPeak
        position={[1.2, 0.98, -0.08]}
        scale={[0.95, 1.15, 0.9]}
        color="#626857"
        rotation={[0, 0, 0.18]}
      />

      {/* Lower slopes blend the peaks into the base */}
      <Ridge
        position={[-1.25, 0.42, 0.36]}
        scale={[1.15, 0.65, 0.7]}
        color="#505a4c"
        rotation={[0.05, 0.1, -0.12]}
      />

      <Ridge
        position={[0.25, 0.4, 0.38]}
        scale={[1.25, 0.62, 0.72]}
        color="#465044"
        rotation={[0, -0.12, 0.08]}
      />

      <Ridge
        position={[1.4, 0.36, 0.25]}
        scale={[0.9, 0.52, 0.68]}
        color="#51594a"
        rotation={[0, 0.2, 0.1]}
      />

      {/* Exposed stone faces */}
      <Ridge
        position={[-0.75, 0.88, 0.7]}
        scale={[0.42, 0.58, 0.18]}
        color="#73766a"
        rotation={[0.1, 0.15, -0.35]}
      />

      <Ridge
        position={[0.28, 1.05, 0.73]}
        scale={[0.48, 0.72, 0.19]}
        color="#62695e"
        rotation={[0, -0.12, 0.25]}
      />

      <Ridge
        position={[1.05, 0.72, 0.66]}
        scale={[0.38, 0.48, 0.18]}
        color="#747669"
        rotation={[0.1, 0.2, -0.18]}
      />

      {/* Moss along the lower slopes */}
      <Moss
        position={[-1.45, 0.65, 0.72]}
        scale={[0.55, 0.12, 0.22]}
        rotation={[0, 0.15, -0.1]}
      />

      <Moss
        position={[-0.35, 0.48, 0.85]}
        scale={[0.65, 0.13, 0.2]}
      />

      <Moss
        position={[0.75, 0.44, 0.8]}
        scale={[0.58, 0.12, 0.22]}
      />

      <Moss
        position={[1.55, 0.48, 0.58]}
        scale={[0.38, 0.1, 0.18]}
      />
    </group>
  )
}
