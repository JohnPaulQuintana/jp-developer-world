import Tree from "../../Tree";
import Rock from "../../Rock";
import { HUB_POSITION, PALETTE } from "./constants";
import { Html } from "@react-three/drei";

const EDGE_STONES = [
  [-1.15, -0.14, -0.7, 0.34, 0.2, 0.28],
  [-0.45, -0.13, -1.3, 0.38, 0.18, 0.3],
  [0.48, -0.14, -1.2, 0.36, 0.2, 0.28],
  [1.2, -0.13, -0.6, 0.3, 0.22, 0.34],
  [1.25, -0.13, 0.45, 0.34, 0.2, 0.3],
  [0.55, -0.14, 1.18, 0.4, 0.18, 0.3],
  [-0.4, -0.14, 1.22, 0.36, 0.2, 0.28],
  [-1.2, -0.13, 0.55, 0.32, 0.2, 0.3],
] as const;

const UNDERSIDE_ROCKS = [
  [-0.65, -0.62, -0.4, 0.46],
  [0.5, -0.7, -0.35, 0.42],
  [-0.25, -0.88, 0.4, 0.4],
  [0.65, -0.5, 0.45, 0.35],
  [0.05, -1.05, -0.05, 0.34],
] as const;

function MagicCrystal({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      {/* Crystal base made from ancient stone */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color={PALETTE.rock} roughness={1} flatShading />
      </mesh>

      {/* Glowing crystal floating above its base */}
      <mesh
        position={[0, 0.38, 0]}
        rotation={[0.12, Math.PI / 4, -0.08]}
        castShadow
      >
        <octahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color={PALETTE.glow}
          emissive={PALETTE.glow}
          emissiveIntensity={1.1}
          roughness={0.25}
          flatShading
        />
      </mesh>

      {/* Smaller crystal shards surrounding the main crystal */}
      <mesh
        position={[-0.2, 0.2, 0.04]}
        rotation={[0.1, 0.3, 0.25]}
        scale={[0.45, 0.7, 0.45]}
      >
        <octahedronGeometry args={[0.19, 0]} />
        <meshStandardMaterial
          color={PALETTE.grassTop}
          emissive={PALETTE.glow}
          emissiveIntensity={0.35}
          flatShading
        />
      </mesh>
    </group>
  );
}

export default function HubIsland() {
  return (
    <group position={HUB_POSITION}>
      {/* Central hub title */}
      <Html
        position={[0, 1.25, 0]}
        center
        distanceFactor={8}
        zIndexRange={[20, 0]}
        style={{
          pointerEvents: "none",
          userSelect: "none",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "5px",
            padding: "9px 16px",
            border: "1px solid rgba(145, 165, 156, 0.35)",
            borderRadius: "5px",
            background:
              "linear-gradient(180deg, rgba(17, 31, 23, 0.96), rgba(6, 17, 13, 0.97))",
            boxShadow: "0 4px 14px rgba(0, 0, 0, 0.3)",
          }}
        >
          <span
            style={{
              color: "#19f58a",
              fontSize: "8px",
              fontWeight: 700,
              letterSpacing: "2.5px",
            }}
          >
            THE DEVELOPER'S REALM
          </span>

          <span
            style={{
              color: "#f0f5f0",
              fontSize: "13px",
              fontWeight: 800,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Full Stack Projects
          </span>

          <div
            style={{
              width: "32px",
              height: "2px",
              borderRadius: "2px",
              background: "#19f58a",
              opacity: 0.8,
            }}
          />
        </div>
      </Html>
      {/* Tapered rocky underside for a floating-island silhouette */}
      <mesh
        position={[0, -0.52, 0]}
        scale={[1.62, 0.82, 1.55]}
        rotation={[0.04, 0.18, -0.03]}
        castShadow
        receiveShadow
      >
        <coneGeometry args={[1, 1.9, 9, 3]} />
        <meshStandardMaterial color={PALETTE.rock} roughness={1} flatShading />
      </mesh>

      {/* Extra rock fragments create a rugged underside */}
      {UNDERSIDE_ROCKS.map(([x, y, z, scale], index) => (
        <mesh
          key={`hub-underside-${index}`}
          position={[x, y, z]}
          rotation={[index * 0.12, index * 0.7, index % 2 ? 0.16 : -0.12]}
          scale={[scale, scale * 0.85, scale * 0.9]}
          castShadow
        >
          <dodecahedronGeometry args={[0.65, 0]} />
          <meshStandardMaterial
            color={index % 2 ? "#4b5148" : PALETTE.rock}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Ancient stone shelf supports the grassy surface */}
      <mesh position={[0, -0.13, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.52, 1.7, 0.22, 10]} />
        <meshStandardMaterial color="#686b57" roughness={1} flatShading />
      </mesh>

      {/* Main grassy platform */}
      <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.58, 1.52, 0.13, 10]} />
        <meshStandardMaterial color={PALETTE.grass} roughness={1} flatShading />
      </mesh>

      {/* Broken stone pieces form an irregular island rim */}
      {EDGE_STONES.map(([x, y, z, sx, sy, sz], index) => (
        <mesh
          key={`hub-edge-${index}`}
          position={[x, y, z]}
          rotation={[0.05, index * 0.72, 0.08]}
          scale={[sx, sy, sz]}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={index % 3 === 0 ? "#777966" : PALETTE.rock}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Moss patches grow across the grassy island */}
      {[
        [-1.0, 0.095, -0.55, 0.32],
        [1.0, 0.095, 0.55, 0.28],
        [-0.85, 0.095, 0.95, 0.24],
        [0.9, 0.095, -0.95, 0.26],
      ].map(([x, y, z, scale], index) => (
        <mesh
          key={`hub-moss-${index}`}
          position={[x, y, z]}
          rotation={[-Math.PI / 2, 0, index * 0.6]}
          scale={[scale, scale * 0.7, 0.025]}
          receiveShadow
        >
          <sphereGeometry args={[1, 7, 5]} />
          <meshStandardMaterial
            color={PALETTE.grassTop}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Main magical crystal marks the center of the hub */}
      <MagicCrystal position={[0, 0.08, 0]} scale={1.15} />

      {/* Smaller crystals decorate the outer edges */}
      <MagicCrystal position={[-1.12, 0.1, -0.25]} scale={0.48} />

      <MagicCrystal position={[1.12, 0.1, 0.5]} scale={0.4} />

      {/* Existing trees stay toward the island edges */}
      <Tree position={[-1.0, 0.08, 0.8]} scale={0.55} />

      <Tree position={[1.05, 0.08, -0.8]} scale={0.55} />

      {/* Small rocks add detail without blocking the central crystal */}
      <Rock position={[-0.85, 0.08, -0.85]} scale={0.28} />

      <Rock position={[0.85, 0.08, 0.95]} scale={0.25} />
    </group>
  );
}
