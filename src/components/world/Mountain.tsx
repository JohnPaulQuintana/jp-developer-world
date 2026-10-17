
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

type MossProps = {
  position: [number, number, number]
  scale: [number, number, number]
  rotation?: [number, number, number]
  color?: string
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
      <icosahedronGeometry args={[1, 2]} />
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
      {/* Rounded, irregular rocky peak */}
      <icosahedronGeometry args={[1, 2]} />
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
  color = '#3d7543',
}: MossProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 10, 7]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
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
      {/* Narrow rocky base instead of a wide bread-shaped mound */}
      <Ridge
        position={[0, 0.22, 0]}
        scale={[1.65, 0.38, 0.95]}
        color="#424c43"
        rotation={[0.02, 0.1, -0.04]}
      />

      {/* Main mountain: raised, uneven and broad near the bottom */}
      <MountainPeak
        position={[0, 1.05, -0.12]}
        scale={[0.88, 1.25, 0.72]}
        color="#465044"
        rotation={[0.03, 0.12, -0.08]}
      />

      {/* Secondary peak on the left */}
      <MountainPeak
        position={[-0.88, 0.76, -0.05]}
        scale={[0.68, 0.87, 0.65]}
        color="#566052"
        rotation={[0.05, -0.2, -0.16]}
      />

      {/* Lower shoulder on the right */}
      <MountainPeak
        position={[0.88, 0.58, 0.02]}
        scale={[0.65, 0.66, 0.62]}
        color="#626857"
        rotation={[0.02, 0.25, 0.12]}
      />

      {/* Angular rock faces break up the smooth silhouette */}
      <Ridge
        position={[-0.43, 0.82, 0.43]}
        scale={[0.42, 0.62, 0.3]}
        color="#62695e"
        rotation={[0.08, 0.15, -0.28]}
      />

      <Ridge
        position={[0.34, 0.96, 0.39]}
        scale={[0.38, 0.73, 0.28]}
        color="#394438"
        rotation={[0.08, -0.12, 0.2]}
      />

      <Ridge
        position={[0.84, 0.47, 0.38]}
        scale={[0.42, 0.3, 0.34]}
        color="#73766a"
        rotation={[0.1, 0.2, -0.15]}
      />

      <Ridge
        position={[-0.96, 0.49, 0.37]}
        scale={[0.35, 0.27, 0.3]}
        color="#73766a"
        rotation={[0.12, -0.1, 0.18]}
      />

      {/* Small patches of old moss on the slopes */}
      <Moss
        position={[-0.72, 0.7, 0.52]}
        scale={[0.3, 0.07, 0.1]}
        rotation={[0, 0.1, -0.28]}
        color="#4c8249"
      />

      <Moss
        position={[-0.34, 0.47, 0.69]}
        scale={[0.42, 0.065, 0.12]}
        rotation={[0, -0.1, -0.12]}
      />

      <Moss
        position={[0.3, 0.57, 0.65]}
        scale={[0.38, 0.065, 0.12]}
        rotation={[0, 0.1, 0.12]}
        color="#315b35"
      />

      <Moss
        position={[0.77, 0.42, 0.55]}
        scale={[0.32, 0.06, 0.1]}
        rotation={[0, 0.2, 0.1]}
      />

      {/* A few higher moss patches that follow the rock faces */}
      <Moss
        position={[-0.48, 1.13, 0.36]}
        scale={[0.22, 0.045, 0.09]}
        rotation={[0, 0.1, -0.3]}
        color="#4c8249"
      />

      <Moss
        position={[0.2, 1.32, 0.3]}
        scale={[0.25, 0.045, 0.09]}
        rotation={[0, -0.1, 0.2]}
        color="#3d7543"
      />
    </group>
  )
}
