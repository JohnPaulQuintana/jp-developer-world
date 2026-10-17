
type TreeProps = {
  position: [number, number, number]
  scale?: number
}

const barkColor = '#61462c'
const barkLight = '#786044'
const leafColors = ['#0b5135', '#087c48', '#14663a', '#1e6335']
const mossColor = '#347344'

export default function Tree({ position, scale = 1 }: TreeProps) {
  return (
    <group position={position} scale={scale}>
      {/* Main twisted trunk */}
      <mesh
        position={[0, 0.36, 0]}
        rotation={[0, 0, -0.035]}
        castShadow
      >
        <cylinderGeometry args={[0.065, 0.105, 0.72, 7]} />
        <meshStandardMaterial color={barkColor} roughness={1} />
      </mesh>

      {/* Natural trunk ridges */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.035, 0.37, 0.045]}
          rotation={[0, 0, side * -0.08]}
          castShadow
        >
          <cylinderGeometry args={[0.018, 0.025, 0.62, 5]} />
          <meshStandardMaterial color={barkLight} roughness={1} />
        </mesh>
      ))}

      {/* Exposed roots */}
      {[
        { x: -0.13, z: 0.025, rotation: -0.42 },
        { x: 0.13, z: 0.015, rotation: 0.42 },
        { x: 0, z: -0.13, rotation: 0.08 },
        { x: 0, z: 0.13, rotation: -0.08 },
      ].map((root, index) => (
        <mesh
          key={index}
          position={[root.x * 0.55, 0.055, root.z * 0.55]}
          rotation={[0, 0, root.rotation]}
          castShadow
        >
          <cylinderGeometry args={[0.018, 0.045, 0.3, 5]} />
          <meshStandardMaterial color={barkColor} roughness={1} />
        </mesh>
      ))}

      {/* Short branches extending into the canopy */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.12, 0.57, 0]}
          rotation={[0, 0, side * -0.72]}
          castShadow
        >
          <cylinderGeometry args={[0.018, 0.035, 0.32, 5]} />
          <meshStandardMaterial color={barkColor} roughness={1} />
        </mesh>
      ))}

      {/* Lower, wide canopy */}
      <mesh position={[0, 0.82, 0]} castShadow>
        <coneGeometry args={[0.37, 0.55, 7]} />
        <meshStandardMaterial
          color={leafColors[0]}
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Middle canopy */}
      <mesh
        position={[0.015, 1.08, 0.005]}
        rotation={[0, 0.12, -0.025]}
        castShadow
      >
        <coneGeometry args={[0.31, 0.5, 7]} />
        <meshStandardMaterial
          color={leafColors[1]}
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Upper canopy */}
      <mesh
        position={[-0.025, 1.31, 0]}
        rotation={[0, 0.2, 0.035]}
        castShadow
      >
        <coneGeometry args={[0.235, 0.43, 6]} />
        <meshStandardMaterial
          color={leafColors[2]}
          roughness={1}
          flatShading
        />
      </mesh>

      {/* Uneven leafy clusters around the canopy */}
      {[
        [-0.22, 0.83, 0.06, 0.15],
        [0.23, 0.88, 0.035, 0.17],
        [-0.16, 1.06, -0.11, 0.13],
        [0.18, 1.13, 0.08, 0.15],
        [-0.1, 1.28, 0.07, 0.12],
        [0.08, 1.34, -0.08, 0.12],
      ].map(([x, y, z, radius], index) => (
        <mesh
          key={index}
          position={[x, y, z]}
          castShadow
        >
          <sphereGeometry args={[radius, 6, 5]} />
          <meshStandardMaterial
            color={leafColors[index % leafColors.length]}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Moss patches */}
      {[
        [-0.16, 0.72, 0.21],
        [0.18, 0.91, 0.18],
        [0.02, 1.12, 0.25],
      ].map(([x, y, z], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.055, 6, 4]} />
          <meshStandardMaterial
            color={mossColor}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Hanging vines */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh
            position={[side * 0.24, 0.72, 0.11]}
            rotation={[0, 0, side * 0.08]}
          >
            <cylinderGeometry args={[0.009, 0.012, 0.3, 5]} />
            <meshStandardMaterial color={mossColor} />
          </mesh>

          <mesh position={[side * 0.25, 0.56, 0.12]}>
            <sphereGeometry args={[0.035, 6, 4]} />
            <meshStandardMaterial color="#19a653" roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}
