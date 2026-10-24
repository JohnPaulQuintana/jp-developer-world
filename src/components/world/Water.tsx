
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Shape,
  ShapeGeometry,
  type Mesh,
  type MeshStandardMaterial,
} from "three";

type WaterProps = {
  position: [number, number, number];
  scale?: number;
  waterfall?: boolean;
};

type Point2 = [number, number];

// Fixed, irregular shoreline points.
// The shape is deliberately asymmetrical rather than circular.
const LAKE_SHORE: Point2[] = [
  [-1.45, -0.12],
  [-1.34, -0.52],
  [-1.08, -0.83],
  [-0.88, -1.02],
  [-0.43, -1.13],
  [-0.12, -1.04],
  [0.18, -1.12],
  [0.56, -0.99],
  [0.91, -0.82],
  [1.22, -0.61],
  [1.39, -0.27],
  [1.32, 0.08],
  [1.43, 0.38],
  [1.19, 0.66],
  [0.89, 0.79],
  [0.65, 1.02],
  [0.27, 1.07],
  [-0.02, 0.96],
  [-0.39, 1.12],
  [-0.73, 0.96],
  [-1.04, 0.78],
  [-1.29, 0.49],
  [-1.43, 0.19],
];

const WATER_SHORE: Point2[] = LAKE_SHORE.map(([x, z]) => [
  x * 0.91,
  z * 0.87,
]);

function createLakeGeometry(points: Point2[]) {
  const shape = new Shape();

  shape.moveTo(points[0][0], points[0][1]);

  for (let i = 1; i < points.length; i++) {
    const previous = points[i - 1];
    const current = points[i];
    const next = points[(i + 1) % points.length];

    // Slightly softened corners without making the lake circular.
    const startX = previous[0] * 0.82 + current[0] * 0.18;
    const startY = previous[1] * 0.82 + current[1] * 0.18;
    const endX = current[0] * 0.82 + next[0] * 0.18;
    const endY = current[1] * 0.82 + next[1] * 0.18;

    shape.lineTo(startX, startY);
    shape.quadraticCurveTo(
      current[0],
      current[1],
      endX,
      endY,
    );
  }

  shape.closePath();
  return new ShapeGeometry(shape, 2);
}

function LakeSurface({
  points,
  position,
  color,
  emissive = "#000000",
  emissiveIntensity = 0,
  roughness = 0.8,
  metalness = 0,
  opacity = 1,
}: {
  points: Point2[];
  position: [number, number, number];
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  opacity?: number;
}) {
  const geometry = useMemo(() => {
    const lakeGeometry = createLakeGeometry(points);
    // ShapeGeometry lies in XY. Rotate the lake flat into the XZ plane.
    lakeGeometry.rotateX(-Math.PI / 2);
    return lakeGeometry;
  }, [points]);

  return (
    <mesh
      geometry={geometry}
      position={position}
      receiveShadow
    >
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        roughness={roughness}
        metalness={metalness}
        transparent={opacity < 1}
        opacity={opacity}
        side={2}
      />
    </mesh>
  );
}

function Ripple({
  position,
  delay,
  scale,
}: {
  position: [number, number, number];
  delay: number;
  scale: number;
}) {
  const ringRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const progress = ((clock.getElapsedTime() + delay) % 2) / 2;

    if (ringRef.current) {
      const size = 0.3 + progress * 0.7;
      ringRef.current.scale.set(
        size * scale * 1.2,
        size * scale * 0.8,
        1,
      );
    }

    if (materialRef.current) {
      materialRef.current.opacity = (1 - progress) * 0.38;
    }
  });

  return (
    <mesh
      ref={ringRef}
      position={position}
      rotation={[-Math.PI / 2, 0, 0]}
    >
      <ringGeometry args={[0.92, 1, 32]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#a0f6dc"
        transparent
        opacity={0.4}
        roughness={0.3}
        side={2}
        depthWrite={false}
      />
    </mesh>
  );
}

function ShoreStone({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow receiveShadow>
      <dodecahedronGeometry args={[0.5, 0]} />
      <meshStandardMaterial
        color={color}
        roughness={0.95}
        flatShading
      />
    </mesh>
  );
}

function FallingStream({
  position,
  width,
  height,
  delay = 0,
}: {
  position: [number, number, number];
  width: number;
  height: number;
  delay?: number;
}) {
  const streamRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const progress = (clock.getElapsedTime() * 1.4 + delay) % 1;

    if (streamRef.current) {
      streamRef.current.position.y = height * 0.5 - progress * 0.12;
      streamRef.current.scale.y =
        0.8 + Math.sin(progress * Math.PI) * 0.2;
    }

    if (materialRef.current) {
      materialRef.current.opacity =
        0.58 + Math.sin(progress * Math.PI) * 0.25;
    }
  });

  return (
    <mesh ref={streamRef} position={position}>
      <boxGeometry args={[width, height, 0.045]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#8bf4ed"
        emissive="#168f91"
        emissiveIntensity={0.6}
        transparent
        opacity={0.75}
        roughness={0.18}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function Water({
  position,
  scale = 1,
  waterfall = false,
}: WaterProps) {
  const bedPoints = useMemo(() => LAKE_SHORE, []);
  const surfacePoints = useMemo(() => WATER_SHORE, []);

  return (
    <group position={position} scale={scale}>
      {/* Irregular dark lake bed */}
      <LakeSurface
        points={bedPoints}
        position={[0, 0.015, 0]}
        color="#263e35"
        roughness={1}
      />

      {/* Smaller, inset water surface */}
      <LakeSurface
        points={surfacePoints}
        position={[0, 0.065, 0]}
        color="#168b83"
        emissive="#063d38"
        emissiveIntensity={0.35}
        roughness={0.22}
        metalness={0.12}
        opacity={0.94}
      />

      {/* Ripples in varied positions and sizes */}
      <Ripple position={[-0.32, 0.085, -0.12]} delay={0} scale={0.48} />
      <Ripple position={[0.47, 0.087, 0.24]} delay={0.8} scale={0.34} />
      <Ripple position={[-0.12, 0.088, 0.51]} delay={1.3} scale={0.25} />
      <Ripple position={[0.72, 0.086, -0.29]} delay={0.45} scale={0.22} />

      {/* Rocky underside */}
      <ShoreStone
        position={[-1.0, -0.28, -0.48]}
        scale={[0.65, 0.38, 0.55]}
        color="#303c35"
      />
      <ShoreStone
        position={[-0.48, -0.43, -0.67]}
        scale={[0.62, 0.48, 0.5]}
        color="#414c40"
      />
      <ShoreStone
        position={[0.22, -0.45, -0.65]}
        scale={[0.72, 0.52, 0.58]}
        color="#354238"
      />
      <ShoreStone
        position={[0.88, -0.32, -0.42]}
        scale={[0.65, 0.4, 0.55]}
        color="#465044"
      />
      <ShoreStone
        position={[1.05, -0.34, 0.18]}
        scale={[0.62, 0.42, 0.58]}
        color="#303b34"
      />
      <ShoreStone
        position={[0.63, -0.45, 0.56]}
        scale={[0.75, 0.5, 0.52]}
        color="#424b3f"
      />
      <ShoreStone
        position={[-0.05, -0.47, 0.66]}
        scale={[0.72, 0.52, 0.55]}
        color="#303c34"
      />
      <ShoreStone
        position={[-0.75, -0.38, 0.48]}
        scale={[0.68, 0.45, 0.56]}
        color="#465044"
      />
      <ShoreStone
        position={[-1.15, -0.25, 0.05]}
        scale={[0.52, 0.38, 0.5]}
        color="#354238"
      />

      {/* Uneven shoreline stones */}
      <ShoreStone
        position={[-1.35, 0.12, -0.25]}
        scale={[0.4, 0.22, 0.32]}
        color="#555e52"
      />
      <ShoreStone
        position={[-0.95, 0.1, -0.83]}
        scale={[0.36, 0.18, 0.3]}
        color="#62675a"
      />
      <ShoreStone
        position={[-0.25, 0.12, -1.08]}
        scale={[0.42, 0.2, 0.27]}
        color="#465248"
      />
      <ShoreStone
        position={[0.65, 0.1, -0.93]}
        scale={[0.34, 0.17, 0.3]}
        color="#596255"
      />
      <ShoreStone
        position={[1.35, 0.11, -0.3]}
        scale={[0.38, 0.21, 0.3]}
        color="#4d554b"
      />
      <ShoreStone
        position={[1.25, 0.1, 0.55]}
        scale={[0.4, 0.18, 0.32]}
        color="#65685a"
      />
      <ShoreStone
        position={[0.55, 0.1, 0.96]}
        scale={[0.36, 0.17, 0.26]}
        color="#4b5548"
      />
      <ShoreStone
        position={[-0.5, 0.1, 0.99]}
        scale={[0.38, 0.2, 0.3]}
        color="#555c50"
      />
      <ShoreStone
        position={[-1.3, 0.1, 0.58]}
        scale={[0.34, 0.18, 0.28]}
        color="#4a5349"
      />

      {/* Optional waterfall */}
      {waterfall && (
        <group position={[0, -0.05, -0.92]}>
          <ShoreStone
            position={[0, 0.35, -0.12]}
            scale={[0.72, 0.78, 0.42]}
            color="#303e36"
          />

          <ShoreStone
            position={[-0.48, 0.05, 0]}
            scale={[0.4, 0.65, 0.38]}
            color="#465448"
          />
          <ShoreStone
            position={[0.48, 0.08, 0]}
            scale={[0.42, 0.7, 0.38]}
            color="#39483d"
          />

          <FallingStream
            position={[0, -0.05, 0.12]}
            width={0.48}
            height={0.88}
          />
          <FallingStream
            position={[-0.12, -0.05, 0.16]}
            width={0.08}
            height={0.76}
            delay={0.3}
          />
          <FallingStream
            position={[0.13, -0.05, 0.17]}
            width={0.07}
            height={0.68}
            delay={0.65}
          />

          {/* Irregular splash pool */}
          <LakeSurface
            points={[
              [-0.55, -0.05],
              [-0.4, -0.23],
              [-0.18, -0.28],
              [0.03, -0.21],
              [0.28, -0.3],
              [0.53, -0.13],
              [0.46, 0.09],
              [0.22, 0.18],
              [-0.06, 0.13],
              [-0.36, 0.17],
              [-0.55, 0.08],
            ]}
            position={[0, -0.49, 0.2]}
            color="#8bf4ed"
            emissive="#168f91"
            emissiveIntensity={0.45}
            roughness={0.2}
            opacity={0.75}
          />

          <ShoreStone
            position={[-0.32, -0.43, 0.18]}
            scale={[0.32, 0.24, 0.28]}
            color="#566456"
          />
          <ShoreStone
            position={[0.34, -0.43, 0.22]}
            scale={[0.3, 0.2, 0.25]}
            color="#465346"
          />
        </group>
      )}
    </group>
  );
}
