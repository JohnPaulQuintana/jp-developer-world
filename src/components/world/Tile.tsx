import type { ThreeEvent } from "@react-three/fiber";

type TileProps = {
  position: [number, number, number];
  active?: boolean;
  locked?: boolean;
  path?: boolean;
  onClick?: () => void;
};

export default function Tile({
  position,
  active = false,
  path = false,
  onClick,
}: TileProps) {
  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onClick?.();
  };

  const grassColor = active ? "#326b43" : "#496846";

  return (
    <group position={position} onClick={handleClick}>
      {/* Floating rocky underside */}
      <mesh position={[0, -0.34, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.68, 0.34, 0.56, 6, 1]} />
        <meshStandardMaterial color="#454c46" roughness={1} flatShading />
      </mesh>

      <mesh
        position={[0, -0.59, 0]}
        rotation={[0.12, 0.35, -0.08]}
        scale={[0.42, 0.16, 0.4]}
        castShadow
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#343b36" roughness={1} flatShading />
      </mesh>

      {/* Small rock fragments */}
      <mesh
        position={[-0.24, -0.64, 0.12]}
        rotation={[0.2, 0.4, 0.3]}
        scale={[0.09, 0.14, 0.08]}
        castShadow
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#555d54" roughness={1} flatShading />
      </mesh>

      <mesh
        position={[0.22, -0.49, -0.2]}
        rotation={[0.4, 0.2, -0.2]}
        scale={[0.1, 0.08, 0.12]}
        castShadow
      >
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#60665a" roughness={1} flatShading />
      </mesh>

      {/* Flat, connected walkable grass surface */}
      <mesh position={[0, -0.035, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.04, 0.14, 1.04]} />
        <meshStandardMaterial color={grassColor} roughness={1} />
      </mesh>

      {/* Continuous top layer: this is the walking surface */}
      <mesh position={[0, 0.038, 0]} receiveShadow>
        <boxGeometry args={[1.045, 0.012, 1.045]} />
        <meshStandardMaterial
          color={active ? "#3b754a" : "#52754b"}
          roughness={1}
        />
      </mesh>

      {/* Dirt path spanning the entire tile and joining its neighbors */}
      {path && (
        <group position={[0, 0.047, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[0.5, 0.008, 1.06]} />
            <meshStandardMaterial color="#92754e" roughness={1} />
          </mesh>

          {/* Worn earth patches */}
          <mesh position={[-0.08, 0.005, -0.23]}>
            <boxGeometry args={[0.13, 0.003, 0.17]} />
            <meshStandardMaterial color="#aa9068" roughness={1} />
          </mesh>

          <mesh position={[0.09, 0.005, 0.2]}>
            <boxGeometry args={[0.14, 0.003, 0.16]} />
            <meshStandardMaterial color="#806744" roughness={1} />
          </mesh>
        </group>
      )}

      {/* Small moss patches outside the walking path */}
      {!path && (
        <>
          <mesh
            position={[-0.32, 0.046, -0.29]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.12, 0.07, 1]}
          >
            <circleGeometry args={[1, 7]} />
            <meshStandardMaterial color="#678353" roughness={1} />
          </mesh>

          <mesh
            position={[0.31, 0.046, 0.3]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.1, 0.06, 1]}
          >
            <circleGeometry args={[1, 7]} />
            <meshStandardMaterial color="#355d3b" roughness={1} />
          </mesh>
        </>
      )}

      {/* Active location marker */}
      {active && (
        <mesh position={[0, 0.055, 0]}>
          <boxGeometry args={[0.7, 0.008, 0.7]} />
          <meshStandardMaterial
            color="#19f58a"
            emissive="#087f49"
            emissiveIntensity={0.65}
            transparent
            opacity={0.25}
          />
        </mesh>
      )}
    </group>
  );
}
