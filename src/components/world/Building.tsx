import { Billboard, Text } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { useRef, type ReactNode } from "react";
import type { PortfolioLocation } from "../../data/locations";

type BuildingProps = {
  location: PortfolioLocation;
  active: boolean;
  onSelect: () => void;
};

type BuildingId = PortfolioLocation["id"];

type BuildingTheme = {
  size: number;
  wall: string;
  roof: string;
  style: "home" | "workshop" | "lodge" | "druid" | "guild" | "messenger";
  width: number;
  depth: number;
  height: number;
};

const GROUND_Y = -0.03;

const themes: Record<BuildingId, BuildingTheme> = {
  home: {
    size: 1.3,
    wall: "#493b2b",
    roof: "#315b32",
    style: "home",
    width: 0.78,
    depth: 0.68,
    height: 0.46,
  },
  projects: {
    size: 1.22,
    wall: "#443c2d",
    roof: "#285536",
    style: "workshop",
    width: 0.82,
    depth: 0.65,
    height: 0.43,
  },
  about: {
    size: 1.2,
    wall: "#514332",
    roof: "#315b32",
    style: "lodge",
    width: 0.72,
    depth: 0.7,
    height: 0.43,
  },
  skills: {
    size: 1.18,
    wall: "#394337",
    roof: "#234c35",
    style: "druid",
    width: 0.72,
    depth: 0.72,
    height: 0.4,
  },
  experience: {
    size: 1.22,
    wall: "#4b3828",
    roof: "#345b35",
    style: "guild",
    width: 0.84,
    depth: 0.65,
    height: 0.44,
  },
  contact: {
    size: 1.16,
    wall: "#4b4230",
    roof: "#38643a",
    style: "messenger",
    width: 0.7,
    depth: 0.67,
    height: 0.4,
  },
};

const wood = "#59432e";
const woodLight = "#786044";
const moss = "#347344";
const mossDark = "#245b32";
const stone = "#66705b";

function TimberPost({
  position,
  height,
  radius = 0.035,
  color = wood,
}: {
  position: [number, number, number];
  height: number;
  radius?: number;
  color?: string;
}) {
  return (
    <mesh position={position} castShadow>
      <cylinderGeometry args={[radius * 0.8, radius, height, 6]} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function LeafCluster({
  position,
  radius = 0.12,
  color = mossDark,
}: {
  position: [number, number, number];
  radius?: number;
  color?: string;
}) {
  return (
    <mesh position={position} castShadow>
      <sphereGeometry args={[radius, 7, 5]} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  );
}

function GlowingStone({
  position,
  radius,
  color,
  glow,
}: {
  position: [number, number, number];
  radius: number;
  color: string;
  glow: number;
}) {
  return (
    <mesh position={position} rotation={[0.15, 0.3, 0.2]} castShadow>
      <octahedronGeometry args={[radius, 0]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={glow}
        roughness={0.3}
        toneMapped={false}
      />
    </mesh>
  );
}

function Mushroom({
  position,
  glow,
  color = "#19f58a",
}: {
  position: [number, number, number];
  glow: number;
  color?: string;
}) {
  return (
    <group position={position}>
      <mesh position={[0, 0.055, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.026, 0.11, 6]} />
        <meshStandardMaterial color="#d4ddc8" />
      </mesh>
      <mesh position={[0, 0.115, 0]} castShadow>
        <sphereGeometry args={[0.055, 7, 5]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={glow}
          roughness={0.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function WoodenDoor({
  position,
  width,
  height,
  accent,
  glow,
  active,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  accent: string;
  glow: number;
  active: boolean;
}) {
  const doorRef = useRef<Group | null>(null);

  useFrame((_, delta) => {
    if (!doorRef.current) return;

    doorRef.current.rotation.y = MathUtils.damp(
      doorRef.current.rotation.y,
      active ? -Math.PI / 2 : 0,
      5,
      delta,
    );
  });

  return (
    <group position={position}>
      {/* Entrance interior */}
      <mesh position={[0, height / 2, -0.012]}>
        <boxGeometry args={[width + 0.025, height + 0.015, 0.025]} />
        <meshStandardMaterial
          color="#07150d"
          emissive="#347344"
          emissiveIntensity={active ? 1.4 : 0}
          roughness={1}
        />
      </mesh>

      {/* Hinged door */}
      <group ref={doorRef} position={[-width / 2, 0, 0]}>
        <mesh
          position={[width / 2, height / 2, 0]}
          castShadow
        >
          <boxGeometry args={[width, height, 0.035]} />
          <meshStandardMaterial
            color={active ? "#315b32" : "#18231a"}
            roughness={0.9}
          />
        </mesh>

        {/* Raised panel */}
        <mesh position={[width / 2, height * 0.53, 0.021]}>
          <boxGeometry args={[width * 0.72, height * 0.72, 0.009]} />
          <meshStandardMaterial
            color={active ? "#347344" : "#193625"}
            emissive={accent}
            emissiveIntensity={active ? glow * 0.3 : 0}
            roughness={0.8}
            toneMapped={false}
          />
        </mesh>

        {/* Door handle */}
        <mesh position={[width * 0.8, height * 0.45, 0.032]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial
            color="#b99a5a"
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* Fixed wooden lintel */}
      <mesh position={[0, height + 0.025, 0]} castShadow>
        <boxGeometry args={[width + 0.13, 0.055, 0.065]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>
    </group>
  );
}

function Window({
  position,
  accent,
  glow,
  width = 0.12,
  height = 0.14,
}: {
  position: [number, number, number];
  accent: string;
  glow: number;
  width?: number;
  height?: number;
}) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[width + 0.045, height + 0.045, 0.035]} />
        <meshStandardMaterial color={wood} roughness={1} />
      </mesh>

      <mesh position={[0, 0, 0.022]}>
        <boxGeometry args={[width, height, 0.009]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={glow}
          toneMapped={false}
        />
      </mesh>

      <mesh position={[0, 0, 0.03]}>
        <boxGeometry args={[0.012, height + 0.015, 0.012]} />
        <meshStandardMaterial color={woodLight} />
      </mesh>

      <mesh position={[0, 0, 0.031]}>
        <boxGeometry args={[width + 0.01, 0.012, 0.012]} />
        <meshStandardMaterial color={woodLight} />
      </mesh>
    </group>
  );
}

function RoofFoliage({
  size,
  y,
  depth,
}: {
  size: number;
  y: number;
  depth: number;
}) {
  const clusters: [number, number, number, number][] = [
    [-0.36, 0.02, 0.12, 0.12],
    [-0.19, 0.055, -0.2, 0.1],
    [0.02, 0.035, 0.25, 0.13],
    [0.27, 0.02, 0.16, 0.12],
    [0.35, 0.035, -0.1, 0.1],
    [-0.1, 0.06, -0.3, 0.1],
  ];

  return (
    <group>
      {clusters.map(([x, offsetY, z, radius], index) => (
        <LeafCluster
          key={index}
          position={[x * size, y + offsetY * size, z * size * (depth / 0.68)]}
          radius={radius * size}
          color={index % 2 === 0 ? mossDark : moss}
        />
      ))}
    </group>
  );
}

function Porch({
  size,
  frontZ,
  width,
}: {
  size: number;
  frontZ: number;
  width: number;
}) {
  return (
    <group>
      <mesh
        position={[0, 0.18 * size, frontZ + 0.16 * size]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[width * 0.9, 0.08 * size, 0.35 * size]} />
        <meshStandardMaterial color={wood} roughness={1} />
      </mesh>

      <mesh position={[0, 0.025, frontZ + 0.34 * size]} castShadow>
        <boxGeometry args={[width * 0.65, 0.05, 0.12 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>

      {[-1, 1].map((side) => (
        <TimberPost
          key={side}
          position={[side * width * 0.36, 0.32 * size, frontZ + 0.3 * size]}
          height={0.32 * size}
          radius={0.027 * size}
        />
      ))}

      <mesh position={[0, 0.48 * size, frontZ + 0.3 * size]} castShadow>
        <boxGeometry args={[width * 0.95, 0.055 * size, 0.065 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>
    </group>
  );
}

function HomeStructure({
  size,
  accent,
  glow,
  width,
  depth,
  wallHeight,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  wallHeight: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      <Porch size={size} frontZ={frontZ} width={width} />

      {/* Broad, uneven thatched roof */}
      <mesh
        position={[0, roofBaseY + 0.16 * size, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <coneGeometry args={[0.69 * size, 0.37 * size, 5]} />
        <meshStandardMaterial color="#315b32" roughness={1} flatShading />
      </mesh>

      <RoofFoliage size={size} y={roofBaseY + 0.025 * size} depth={depth} />

      {/* Tall but stout chimney */}
      <mesh
        position={[width * 0.31, roofBaseY + 0.22 * size, -depth * 0.2]}
        castShadow
      >
        <boxGeometry args={[0.15 * size, 0.46 * size, 0.16 * size]} />
        <meshStandardMaterial color="#514b3c" roughness={1} />
      </mesh>

      <mesh
        position={[width * 0.31, roofBaseY + 0.46 * size, -depth * 0.2]}
        castShadow
      >
        <boxGeometry args={[0.19 * size, 0.055 * size, 0.2 * size]} />
        <meshStandardMaterial color="#76644b" roughness={1} />
      </mesh>

      {/* Timber frame */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <TimberPost
            position={[
              side * width * 0.43,
              0.14 + wallHeight / 2,
              frontZ + 0.025,
            ]}
            height={wallHeight + 0.05}
            radius={0.035 * size}
          />
          <LeafCluster
            position={[side * width * 0.52, roofBaseY + 0.18 * size, -0.02]}
            radius={0.16 * size}
            color={mossDark}
          />
          <LeafCluster
            position={[side * width * 0.46, roofBaseY + 0.26 * size, 0.04]}
            radius={0.105 * size}
            color={moss}
          />
        </group>
      ))}

      {/* Moss and hanging vines */}
      {[-1, 1].map((side) => (
        <group key={`vine-${side}`}>
          <mesh
            position={[
              side * width * 0.39,
              roofBaseY - 0.07 * size,
              frontZ + 0.04,
            ]}
          >
            <cylinderGeometry args={[0.009, 0.013, 0.24 * size, 5]} />
            <meshStandardMaterial color={moss} />
          </mesh>
          <LeafCluster
            position={[
              side * width * 0.39,
              roofBaseY - 0.2 * size,
              frontZ + 0.04,
            ]}
            radius={0.045 * size}
            color="#19a653"
          />
        </group>
      ))}

      {/* Small side windows */}
      <Window
        position={[-width * 0.29, 0.14 + wallHeight * 0.64, frontZ + 0.018]}
        accent={accent}
        glow={glow}
        width={0.105 * size}
        height={0.13 * size}
      />
      <Window
        position={[width * 0.29, 0.14 + wallHeight * 0.64, frontZ + 0.018]}
        accent={accent}
        glow={glow}
        width={0.105 * size}
        height={0.13 * size}
      />
    </group>
  );
}

function WorkshopStructure({
  size,
  accent,
  glow,
  width,
  depth,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      {/* Broad gabled workshop roof */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.2 * size, roofBaseY + 0.14 * size, 0]}
          rotation={[0, 0, side * -0.58]}
          castShadow
        >
          <boxGeometry args={[0.53 * size, 0.09 * size, depth * 1.38]} />
          <meshStandardMaterial color="#285536" roughness={1} />
        </mesh>
      ))}

      {/* Large workshop awning */}
      <mesh position={[0, roofBaseY - 0.01, frontZ + 0.12 * size]} castShadow>
        <boxGeometry args={[width * 1.08, 0.055 * size, 0.25 * size]} />
        <meshStandardMaterial color="#3d6639" roughness={1} />
      </mesh>

      {/* Workbench */}
      <mesh position={[0, 0.24 * size, frontZ + 0.18 * size]} castShadow>
        <boxGeometry args={[0.34 * size, 0.07 * size, 0.17 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>
      {[-1, 1].map((side) => (
        <TimberPost
          key={side}
          position={[side * 0.12 * size, 0.12 * size, frontZ + 0.18 * size]}
          height={0.2 * size}
          radius={0.018 * size}
        />
      ))}

      {/* Crystal garden */}
      <GlowingStone
        position={[-0.48 * size, 0.16 * size, frontZ + 0.1]}
        radius={0.15 * size}
        color={accent}
        glow={glow}
      />
      <GlowingStone
        position={[-0.36 * size, 0.1 * size, frontZ + 0.18]}
        radius={0.09 * size}
        color={accent}
        glow={glow}
      />
      <GlowingStone
        position={[0.48 * size, 0.17 * size, frontZ + 0.06]}
        radius={0.14 * size}
        color={accent}
        glow={glow}
      />

      {/* Chimney with moss cap */}
      <mesh
        position={[width * 0.31, roofBaseY + 0.18 * size, -depth * 0.2]}
        castShadow
      >
        <boxGeometry args={[0.15 * size, 0.38 * size, 0.15 * size]} />
        <meshStandardMaterial color="#5b5140" roughness={1} />
      </mesh>
      <LeafCluster
        position={[width * 0.31, roofBaseY + 0.39 * size, -depth * 0.2]}
        radius={0.1 * size}
        color={moss}
      />

      <RoofFoliage size={size} y={roofBaseY - 0.01} depth={depth} />

      {/* Wooden side braces */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * width * 0.43,
            roofBaseY - 0.15 * size,
            frontZ + 0.025,
          ]}
          rotation={[0, 0, side * 0.42]}
          castShadow
        >
          <boxGeometry args={[0.055 * size, 0.32 * size, 0.055 * size]} />
          <meshStandardMaterial color={woodLight} roughness={1} />
        </mesh>
      ))}

      <Window
        position={[width * 0.29, 0.39 * size, frontZ + 0.02]}
        accent={accent}
        glow={glow}
        width={0.14 * size}
        height={0.13 * size}
      />
    </group>
  );
}

function LodgeStructure({
  size,
  accent,
  glow,
  width,
  depth,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      {/* Wide, layered lodge roof */}
      <mesh
        position={[0, roofBaseY + 0.11 * size, 0]}
        rotation={[0, Math.PI / 4, 0]}
        castShadow
      >
        <coneGeometry args={[0.66 * size, 0.3 * size, 6]} />
        <meshStandardMaterial color="#315b32" roughness={1} flatShading />
      </mesh>

      <mesh position={[0, roofBaseY + 0.005, 0]} castShadow>
        <cylinderGeometry args={[0.48 * size, 0.57 * size, 0.065 * size, 7]} />
        <meshStandardMaterial color="#426b38" roughness={1} />
      </mesh>

      <RoofFoliage size={size} y={roofBaseY} depth={depth} />

      {/* Ancient tree beside the lodge */}
      <mesh position={[width * 0.53, 0.33 * size, -depth * 0.2]} castShadow>
        <cylinderGeometry args={[0.09 * size, 0.15 * size, 0.66 * size, 7]} />
        <meshStandardMaterial color="#51402c" roughness={1} />
      </mesh>

      {/* Roots */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            width * 0.53 + side * 0.11 * size,
            0.07 * size,
            -depth * 0.2,
          ]}
          rotation={[0, 0, side * 0.28]}
          castShadow
        >
          <boxGeometry args={[0.22 * size, 0.09 * size, 0.1 * size]} />
          <meshStandardMaterial color="#51402c" roughness={1} />
        </mesh>
      ))}

      <LeafCluster
        position={[width * 0.53, 0.78 * size, -depth * 0.2]}
        radius={0.28 * size}
        color="#245534"
      />
      <LeafCluster
        position={[width * 0.4, 0.72 * size, -depth * 0.13]}
        radius={0.19 * size}
        color="#347344"
      />
      <LeafCluster
        position={[width * 0.67, 0.69 * size, -depth * 0.15]}
        radius={0.2 * size}
        color="#1e6335"
      />

      {/* Timber arch */}
      {[-1, 1].map((side) => (
        <TimberPost
          key={side}
          position={[side * width * 0.44, 0.4 * size, frontZ + 0.03]}
          height={0.62 * size}
          radius={0.04 * size}
        />
      ))}

      <mesh position={[0, 0.7 * size, frontZ + 0.03]} castShadow>
        <boxGeometry args={[width * 1.1, 0.065 * size, 0.07 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>

      <Window
        position={[-width * 0.29, 0.37 * size, frontZ + 0.025]}
        accent={accent}
        glow={glow}
      />
    </group>
  );
}

function DruidStructure({
  size,
  accent,
  glow,
  width,
  depth,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      {/* Low, layered, hexagonal roof */}
      <mesh position={[0, roofBaseY + 0.09 * size, 0]} castShadow>
        <coneGeometry args={[0.63 * size, 0.25 * size, 6]} />
        <meshStandardMaterial color="#234c35" roughness={1} flatShading />
      </mesh>

      <mesh position={[0, roofBaseY + 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.49 * size, 0.55 * size, 0.07 * size, 6]} />
        <meshStandardMaterial color="#426b38" roughness={1} />
      </mesh>

      <RoofFoliage size={size} y={roofBaseY} depth={depth} />

      {/* Rune stones arranged around the entrance */}
      {[-1, 0, 1].map((side) => (
        <group
          key={side}
          position={[side * 0.29 * size, 0, frontZ + 0.16 * size]}
        >
          <mesh position={[0, 0.13 * size, 0]} castShadow>
            <dodecahedronGeometry args={[0.09 * size, 0]} />
            <meshStandardMaterial color="#53624b" roughness={1} flatShading />
          </mesh>
          <GlowingStone
            position={[0, 0.17 * size, 0.075 * size]}
            radius={0.045 * size}
            color={accent}
            glow={glow}
          />
        </group>
      ))}

      {/* Magical garden */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <TimberPost
            position={[side * width * 0.55, 0.19 * size, frontZ + 0.12]}
            height={0.34 * size}
            radius={0.025 * size}
            color="#514b3c"
          />
          <LeafCluster
            position={[side * width * 0.57, 0.4 * size, frontZ + 0.12]}
            radius={0.13 * size}
            color={side < 0 ? "#347344" : "#1e6335"}
          />
        </group>
      ))}

      {/* Hanging magical herb bundle */}
      <mesh position={[0, roofBaseY - 0.08 * size, frontZ + 0.04]}>
        <cylinderGeometry args={[0.012, 0.018, 0.18 * size, 5]} />
        <meshStandardMaterial color={moss} />
      </mesh>
      <GlowingStone
        position={[0, roofBaseY - 0.2 * size, frontZ + 0.05]}
        radius={0.045 * size}
        color={accent}
        glow={glow}
      />

      <Window
        position={[width * 0.3, 0.35 * size, frontZ + 0.025]}
        accent={accent}
        glow={glow}
        width={0.1 * size}
        height={0.12 * size}
      />
    </group>
  );
}

function GuildStructure({
  size,
  accent,
  glow,
  width,
  depth,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      {/* Heavy timber A-frame roof */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.22 * size, roofBaseY + 0.14 * size, 0]}
          rotation={[0, 0, side * -0.48]}
          castShadow
        >
          <boxGeometry args={[0.58 * size, 0.11 * size, depth * 1.36]} />
          <meshStandardMaterial color="#345b35" roughness={1} />
        </mesh>
      ))}

      {/* Wide eaves */}
      <mesh position={[0, roofBaseY - 0.015, 0]} castShadow>
        <boxGeometry args={[width * 1.25, 0.055 * size, depth * 1.25]} />
        <meshStandardMaterial color="#426b38" roughness={1} />
      </mesh>

      <RoofFoliage size={size} y={roofBaseY} depth={depth} />

      {/* Front guild posts */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <TimberPost
            position={[side * width * 0.44, 0.38 * size, frontZ + 0.035]}
            height={0.68 * size}
            radius={0.045 * size}
          />
          <mesh
            position={[side * width * 0.44, 0.69 * size, frontZ + 0.035]}
            rotation={[0, 0, side * 0.35]}
            castShadow
          >
            <boxGeometry args={[0.23 * size, 0.06 * size, 0.07 * size]} />
            <meshStandardMaterial color={woodLight} roughness={1} />
          </mesh>
        </group>
      ))}

      <mesh position={[0, 0.69 * size, frontZ + 0.035]} castShadow>
        <boxGeometry args={[width * 1.05, 0.07 * size, 0.07 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>

      {/* Guild shield */}
      <mesh position={[0, 0.49 * size, frontZ + 0.075]} castShadow>
        <cylinderGeometry args={[0.13 * size, 0.11 * size, 0.045 * size, 6]} />
        <meshStandardMaterial
          color="#b3c8b7"
          metalness={0.3}
          roughness={0.55}
        />
      </mesh>
      <mesh position={[0, 0.49 * size, frontZ + 0.105]}>
        <boxGeometry args={[0.035 * size, 0.15 * size, 0.012]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={glow}
          toneMapped={false}
        />
      </mesh>

      {/* Short banners */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[side * 0.29 * size, 0.48 * size, frontZ + 0.055]}
          rotation={[0, 0, side * -0.04]}
        >
          <boxGeometry args={[0.11 * size, 0.22 * size, 0.025]} />
          <meshStandardMaterial color={side < 0 ? "#315b32" : "#786044"} />
        </mesh>
      ))}

      <Window
        position={[-width * 0.28, 0.34 * size, frontZ + 0.02]}
        accent={accent}
        glow={glow}
        width={0.11 * size}
        height={0.13 * size}
      />
    </group>
  );
}

function MessengerStructure({
  size,
  accent,
  glow,
  width,
  depth,
  roofBaseY,
}: {
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  roofBaseY: number;
}) {
  const frontZ = depth / 2;

  return (
    <group>
      {/* Rounded, layered woodland roof */}
      <mesh position={[0, roofBaseY + 0.12 * size, 0]} castShadow>
        <coneGeometry args={[0.61 * size, 0.3 * size, 7]} />
        <meshStandardMaterial color="#38643a" roughness={1} flatShading />
      </mesh>

      <mesh position={[0, roofBaseY + 0.015, 0]} castShadow>
        <cylinderGeometry args={[0.47 * size, 0.53 * size, 0.065 * size, 7]} />
        <meshStandardMaterial color="#426b38" roughness={1} />
      </mesh>

      <RoofFoliage size={size} y={roofBaseY} depth={depth} />

      {/* Signpost beside the cottage */}
      <group position={[width * 0.65, 0, frontZ + 0.18 * size]}>
        <TimberPost
          position={[0, 0.25 * size, 0]}
          height={0.5 * size}
          radius={0.025 * size}
        />
        <mesh position={[0.08 * size, 0.42 * size, 0]}>
          <boxGeometry args={[0.27 * size, 0.12 * size, 0.045 * size]} />
          <meshStandardMaterial color={woodLight} roughness={1} />
        </mesh>
        <mesh position={[0.08 * size, 0.42 * size, 0.028]}>
          <boxGeometry args={[0.16 * size, 0.012 * size, 0.009]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={glow}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* Mailbox on a stout post */}
      <group position={[-width * 0.59, 0, frontZ + 0.15 * size]}>
        <TimberPost
          position={[0, 0.16 * size, 0]}
          height={0.32 * size}
          radius={0.022 * size}
        />
        <mesh position={[0, 0.34 * size, 0]} castShadow>
          <boxGeometry args={[0.2 * size, 0.15 * size, 0.15 * size]} />
          <meshStandardMaterial color="#315b32" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.35 * size, 0.079 * size]}>
          <boxGeometry args={[0.1 * size, 0.018 * size, 0.008]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={glow}
            toneMapped={false}
          />
        </mesh>
        <mesh position={[0, 0.43 * size, 0]}>
          <boxGeometry args={[0.22 * size, 0.025 * size, 0.17 * size]} />
          <meshStandardMaterial color={woodLight} roughness={1} />
        </mesh>
      </group>

      {/* Mossy timber supports */}
      {[-1, 1].map((side) => (
        <group key={side}>
          <TimberPost
            position={[side * width * 0.43, 0.34 * size, frontZ + 0.025]}
            height={0.56 * size}
            radius={0.033 * size}
          />
          <LeafCluster
            position={[side * width * 0.43, roofBaseY + 0.02, frontZ + 0.025]}
            radius={0.11 * size}
            color={moss}
          />
        </group>
      ))}

      <Window
        position={[width * 0.27, 0.34 * size, frontZ + 0.025]}
        accent={accent}
        glow={glow}
        width={0.11 * size}
        height={0.13 * size}
      />
    </group>
  );
}

function ForestDetails({
  size,
  width,
  depth,
  glow,
}: {
  size: number;
  width: number;
  depth: number;
  glow: number;
}) {
  const mushrooms: [number, number, number][] = [
    [-0.53, 0, 0.28],
    [0.53, 0, 0.25],
    [-0.48, 0, -0.3],
    [0.48, 0, -0.32],
  ];

  const pathStones: [number, number, number][] = [
    [-0.12, 0.045, depth / 2 + 0.28 * size],
    [0.04, 0.045, depth / 2 + 0.42 * size],
    [-0.04, 0.045, depth / 2 + 0.56 * size],
  ];

  return (
    <group>
      {/* Small forest mushrooms */}
      {mushrooms.map((position, index) => (
        <Mushroom
          key={index}
          position={[position[0] * size, position[1], position[2] * size]}
          glow={glow * 0.45}
          color={index % 2 === 0 ? "#19f58a" : "#347344"}
        />
      ))}

      {/* Fern-like foliage around the foundation */}
      {[-1, 1].map((side) => (
        <group
          key={side}
          position={[side * (width / 2 + 0.11 * size), 0.03, 0]}
        >
          <TimberPost
            position={[0, 0.1 * size, 0]}
            height={0.2 * size}
            radius={0.012 * size}
            color={moss}
          />
          {[-1, 0, 1].map((leaf) => (
            <LeafCluster
              key={leaf}
              position={[
                leaf * 0.055 * size,
                (0.12 + Math.abs(leaf) * 0.035) * size,
                0.015,
              ]}
              radius={0.06 * size}
              color={leaf === 0 ? moss : mossDark}
            />
          ))}
        </group>
      ))}

      {/* Stone path to each building */}
      {pathStones.map((position, index) => (
        <mesh
          key={index}
          position={position}
          rotation={[0, index * 0.25, 0]}
          receiveShadow
        >
          <cylinderGeometry args={[0.075 * size, 0.09 * size, 0.055, 6]} />
          <meshStandardMaterial color={stone} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function BuildingArchitecture({
  style,
  size,
  accent,
  glow,
  width,
  depth,
  wallHeight,
  roofBaseY,
}: {
  style: BuildingTheme["style"];
  size: number;
  accent: string;
  glow: number;
  width: number;
  depth: number;
  wallHeight: number;
  roofBaseY: number;
}) {
  const sharedProps = {
    size,
    accent,
    glow,
    width,
    depth,
    wallHeight,
    roofBaseY,
  };

  let structure: ReactNode;

  switch (style) {
    case "home":
      structure = <HomeStructure {...sharedProps} />;
      break;
    case "workshop":
      structure = <WorkshopStructure {...sharedProps} />;
      break;
    case "lodge":
      structure = <LodgeStructure {...sharedProps} />;
      break;
    case "druid":
      structure = <DruidStructure {...sharedProps} />;
      break;
    case "guild":
      structure = <GuildStructure {...sharedProps} />;
      break;
    case "messenger":
      structure = <MessengerStructure {...sharedProps} />;
      break;
  }

  return structure;
}


export default function Building({
  location,
  active,
  onSelect,
}: BuildingProps) {
  const theme = themes[location.id];
  const size = theme.size;
  const accent = location.color;
  const glow = active ? 2.8 : 0.8;

  const baseHeight = 0.14 * size;
  const wallHeight = theme.height * size;
  const width = theme.width * size;
  const depth = theme.depth * size;
  const wallCenterY = baseHeight + wallHeight / 2;
  const roofBaseY = baseHeight + wallHeight;
  const frontZ = depth / 2;

  const markerRef = useRef<Group | null>(null);
  const selectionRingRef = useRef<Group | null>(null);

  useFrame(({ clock }, delta) => {
    // Floating marker animation.
    if (markerRef.current) {
      const bob =
        active ? Math.sin(clock.elapsedTime * 2.5) * 0.035 : 0;

      markerRef.current.position.y = MathUtils.damp(
        markerRef.current.position.y,
        roofBaseY + 0.43 * size + bob,
        6,
        delta,
      );

      const targetScale = active ? 1.35 : 1;

      const nextScale = MathUtils.damp(
        markerRef.current.scale.x,
        targetScale,
        6,
        delta,
      );

      markerRef.current.scale.setScalar(nextScale);
    }

    // Subtle pulse around the selected building.
    if (selectionRingRef.current) {
      const pulse = active
        ? 1 + Math.sin(clock.elapsedTime * 3) * 0.035
        : 1;

      const nextScale = MathUtils.damp(
        selectionRingRef.current.scale.x,
        pulse,
        7,
        delta,
      );

      selectionRingRef.current.scale.setScalar(nextScale);
    }
  });

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    event.stopPropagation();
    onSelect();
  };

  return (
    <group
      position={[location.position[0], GROUND_Y, location.position[1]]}
      onClick={handleClick}
    >
      {/* Broad stone-and-moss foundation */}
      <mesh position={[0, baseHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[width + 0.32 * size, baseHeight, depth + 0.28 * size]}
        />
        <meshStandardMaterial
          color={active ? "#31543a" : "#263b2c"}
          roughness={1}
        />
      </mesh>

      <mesh position={[0, baseHeight + 0.005, 0]} receiveShadow>
        <boxGeometry
          args={[width + 0.34 * size, 0.035 * size, depth + 0.3 * size]}
        />
        <meshStandardMaterial
          color={active ? "#3b8248" : "#285b32"}
          roughness={1}
        />
      </mesh>

      {/* Selection ring: visible only on the active building */}
      <group
        ref={selectionRingRef}
        position={[0, baseHeight + 0.028 * size, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh visible={active}>
          <torusGeometry args={[0.68 * size, 0.012 * size, 8, 48]} />
          <meshBasicMaterial
            color="#4a9b58"
            transparent
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>

        <mesh visible={active} position={[0, 0, 0.002]}>
          <torusGeometry args={[0.59 * size, 0.004 * size, 6, 48]} />
          <meshBasicMaterial
            color="#a1e9a8"
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* Main timber cottage body */}
      <mesh position={[0, wallCenterY, 0]} castShadow receiveShadow>
        <boxGeometry args={[width, wallHeight, depth]} />
        <meshStandardMaterial
          color={theme.wall}
          roughness={0.96}
          emissive={active ? "#183c21" : "#000000"}
          emissiveIntensity={active ? 0.45 : 0}
        />
      </mesh>

      {/* Horizontal exposed timber courses */}
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[
            side * (width / 2 - 0.025 * size),
            wallCenterY,
            frontZ + 0.012,
          ]}
          castShadow
        >
          <boxGeometry args={[0.045 * size, wallHeight * 0.98, 0.045 * size]} />
          <meshStandardMaterial color={wood} roughness={1} />
        </mesh>
      ))}

      <mesh position={[0, baseHeight + 0.035 * size, frontZ + 0.02]} castShadow>
        <boxGeometry args={[width + 0.08 * size, 0.055 * size, 0.055 * size]} />
        <meshStandardMaterial color={woodLight} roughness={1} />
      </mesh>

      {/* Animated entrance */}
      <WoodenDoor
        position={[0, baseHeight + 0.01 * size, frontZ + 0.025]}
        width={0.2 * size}
        height={wallHeight * 0.7}
        accent={accent}
        glow={glow}
        active={active}
      />

      {/* Architecture and landmarks unique to this location */}
      <BuildingArchitecture
        style={theme.style}
        size={size}
        accent={accent}
        glow={glow}
        width={width}
        depth={depth}
        wallHeight={wallHeight}
        roofBaseY={roofBaseY}
      />

      {/* Shared woodland ground details */}
      <ForestDetails size={size} width={width} depth={depth} glow={glow} />

      {/* Animated floating emerald marker */}
      <group
        ref={markerRef}
        position={[0, roofBaseY + 0.43 * size, 0]}
      >
        <mesh>
          <octahedronGeometry args={[active ? 0.065 : 0.04]} />
          <meshStandardMaterial
            color={active ? "#a1f5ae" : "#4d9a5d"}
            emissive={active ? "#268a43" : accent}
            emissiveIntensity={active ? 2.2 : 0.45}
            toneMapped={false}
          />
        </mesh>

        {active && (
          <pointLight
            color="#79e991"
            intensity={0.65}
            distance={1.2}
            decay={2}
          />
        )}
      </group>

      {/* Forest navigation nameplate */}
      <Billboard position={[0, roofBaseY + 0.78 * size, 0]} follow>
        {/* Soft shadow */}
        <mesh position={[0.018, -0.018, -0.045]} renderOrder={998}>
          <planeGeometry args={[1.12, 0.31]} />
          <meshBasicMaterial
            color="#07130b"
            transparent
            opacity={0.55}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Outer wooden trim */}
        <mesh position={[0, 0, -0.035]} renderOrder={999}>
          <planeGeometry args={[1.12, 0.31]} />
          <meshBasicMaterial
            color={active ? "#4a8750" : "#514532"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Main plaque */}
        <mesh position={[0, 0, -0.025]} renderOrder={1000}>
          <planeGeometry args={[1.085, 0.275]} />
          <meshBasicMaterial
            color={active ? "#234b30" : "#142c20"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Inner green surface */}
        <mesh position={[0, 0, -0.015]} renderOrder={1001}>
          <planeGeometry args={[1.045, 0.235]} />
          <meshBasicMaterial
            color={active ? "#285638" : "#193625"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Emerald status marker */}
        <mesh position={[-0.405, 0, 0.005]} renderOrder={1002}>
          <circleGeometry args={[active ? 0.034 : 0.027, 16]} />
          <meshBasicMaterial
            color={active ? "#a1f5ae" : "#4d9a5d"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Small green divider */}
        <mesh position={[-0.355, 0, 0.005]} renderOrder={1002}>
          <planeGeometry args={[0.012, 0.105]} />
          <meshBasicMaterial
            color={active ? "#a1e9a8" : "#426b38"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Location name */}
        <Text
          position={[0.045, 0, 0.012]}
          fontSize={0.105}
          maxWidth={0.78}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          color={active ? "#f5e7bf" : "#e3e8d8"}
          outlineWidth={0.0015}
          outlineColor="#102016"
          renderOrder={1003}
          material-depthTest={false}
          material-depthWrite={false}
        >
          {location.shortTitle}
        </Text>
      </Billboard>
    </group>
  );
}
