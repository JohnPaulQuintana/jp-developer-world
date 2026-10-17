import { Float, Html } from '@react-three/drei'
import type { ThreeEvent } from '@react-three/fiber'

type MascotProps = {
  onClick: () => void
}

export default function Mascot({ onClick }: MascotProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation()
    onClick()
  }

  return (
    <group position={[-3, 0.2, 2]} onClick={handleClick}>
      <Float speed={1.6} rotationIntensity={0.04} floatIntensity={0.12}>
        {/* Replace this placeholder with the JP GLB model later. */}
        <mesh position={[0, 0.53, 0]} castShadow>
          <capsuleGeometry args={[0.19, 0.3, 5, 10]} />
          <meshStandardMaterial color="#111a18" roughness={0.5} />
        </mesh>

        <mesh position={[0, 0.92, 0]} castShadow>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshStandardMaterial color="#f1b98c" roughness={0.62} />
        </mesh>

        <mesh
          position={[0, 1.09, -0.015]}
          rotation={[0.15, 0, 0]}
          castShadow
        >
          <sphereGeometry
            args={[0.225, 20, 12, 0, Math.PI * 2, 0, Math.PI * 0.55]}
          />
          <meshStandardMaterial color="#171716" roughness={0.8} />
        </mesh>

        {[-0.075, 0.075].map((x) => (
          <mesh key={x} position={[x, 0.94, 0.194]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial color="#25211d" />
          </mesh>
        ))}

        <mesh position={[0, 0.66, 0.02]} castShadow>
          <boxGeometry args={[0.43, 0.1, 0.33]} />
          <meshStandardMaterial color="#111917" />
        </mesh>

        <mesh position={[0, 0.66, 0.19]}>
          <boxGeometry args={[0.14, 0.055, 0.018]} />
          <meshStandardMaterial
            color="#19f58a"
            emissive="#087d46"
            emissiveIntensity={1}
          />
        </mesh>

        <mesh
          position={[0.27, 0.61, 0.03]}
          rotation={[0, 0, -0.55]}
          castShadow
        >
          <capsuleGeometry args={[0.055, 0.23, 4, 8]} />
          <meshStandardMaterial color="#111a18" />
        </mesh>

        <mesh
          position={[0.38, 0.76, 0.04]}
          rotation={[0, 0, -0.15]}
          castShadow
        >
          <capsuleGeometry args={[0.055, 0.15, 4, 8]} />
          <meshStandardMaterial color="#f1b98c" />
        </mesh>

        <mesh position={[0.38, 0.84, 0.04]} castShadow>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial
            color="#19f58a"
            emissive="#087d46"
            emissiveIntensity={0.5}
          />
        </mesh>

        <Html position={[0, 1.45, 0]} center distanceFactor={9}>
          <button
            className="mascot-tag"
            onClick={(event) => {
              event.stopPropagation()
              onClick()
            }}
          >
            JP <span>Talk</span>
          </button>
        </Html>
      </Float>
    </group>
  )
}