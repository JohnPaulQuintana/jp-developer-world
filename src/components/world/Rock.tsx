
type RockProps = {
  position: [number, number, number];
  scale?: number;
};

type StoneProps = {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  rotation?: [number, number, number];
};

function Stone({
  position,
  scale,
  color,
  rotation = [0, 0, 0],
}: StoneProps) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <icosahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        flatShading
      />
    </mesh>
  );
}

function MossPatch({
  position,
  scale,
  rotation = [0, 0, 0],
}: {
  position: [number, number, number];
  scale: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh
      position={position}
      scale={scale}
      rotation={rotation}
      castShadow
      receiveShadow
    >
      <sphereGeometry args={[1, 8, 5]} />
      <meshStandardMaterial
        color="#315f35"
        roughness={1}
        flatShading
        polygonOffset
        polygonOffsetFactor={-1}
      />
    </mesh>
  );
}

export default function Rock({
  position,
  scale = 1,
}: RockProps) {
  return (
    <group
      position={[position[0], position[1] - 0.12 * scale, position[2]]}
      scale={scale}
    >
      {/* Small angular rocks, partially embedded in the ground */}
      <Stone
        position={[-0.3, 0.14, 0]}
        scale={[0.38, 0.23, 0.3]}
        rotation={[0.2, 0.3, -0.15]}
        color="#454b48"
      />

      <Stone
        position={[0.04, 0.12, 0.08]}
        scale={[0.32, 0.19, 0.27]}
        rotation={[-0.1, 0.8, 0.2]}
        color="#59605a"
      />

      <Stone
        position={[0.24, 0.17, -0.12]}
        scale={[0.3, 0.24, 0.25]}
        rotation={[0.25, -0.5, 0.1]}
        color="#505752"
      />

      {/* Scattered smaller stones */}
      <Stone
        position={[-0.57, 0.06, 0.13]}
        scale={[0.19, 0.11, 0.16]}
        rotation={[0.2, 0.4, 0.1]}
        color="#686b60"
      />

      <Stone
        position={[0.49, 0.06, 0.22]}
        scale={[0.17, 0.1, 0.14]}
        rotation={[-0.1, 0.7, 0.2]}
        color="#424944"
      />

      <Stone
        position={[0.4, 0.07, -0.3]}
        scale={[0.15, 0.09, 0.13]}
        rotation={[0.3, -0.2, 0.1]}
        color="#747568"
      />

      <Stone
        position={[-0.12, 0.055, 0.32]}
        scale={[0.13, 0.08, 0.11]}
        rotation={[0.1, 0.5, -0.1]}
        color="#555d53"
      />

      {/* Moss growing between the rocks */}
      <MossPatch
        position={[-0.32, 0.29, 0.015]}
        scale={[0.15, 0.025, 0.11]}
        rotation={[0.08, 0.1, -0.12]}
      />

      <MossPatch
        position={[0.18, 0.29, 0.16]}
        scale={[0.12, 0.025, 0.09]}
        rotation={[0.2, -0.15, 0.08]}
      />

      <MossPatch
        position={[0.015, 0.28, -0.12]}
        scale={[0.1, 0.025, 0.08]}
        rotation={[-0.08, 0.15, 0.06]}
      />
    </group>
  );
}
