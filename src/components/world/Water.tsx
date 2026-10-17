
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh, MeshStandardMaterial } from "three";

type WaterProps = {
  position: [number, number, number];
  scale?: number;
  waterfall?: boolean;
};

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
      ringRef.current.scale.set(size * scale, size * scale, 1);
    }

    if (materialRef.current) {
      materialRef.current.opacity = (1 - progress) * 0.48;
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

// An animated stream of water falling into the pond.
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
    const progress = ((clock.getElapsedTime() * 1.4 + delay) % 1);

    if (streamRef.current) {
      streamRef.current.position.y =
        height * 0.5 - progress * 0.12;

      streamRef.current.scale.y = 0.8 + Math.sin(progress * Math.PI) * 0.2;
    }

    if (materialRef.current) {
      materialRef.current.opacity = 0.58 + Math.sin(progress * Math.PI) * 0.25;
    }
  });

  return (
    <mesh
      ref={streamRef}
      position={position}
      scale={[1, 1, 1]}
    >
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
  return (
    <group position={position} scale={scale}>
      {/* Dark pond bed */}
      <mesh
        position={[0, 0.015, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.65, 1.15, 1]}
        receiveShadow
      >
        <circleGeometry args={[1, 40]} />
        <meshStandardMaterial color="#263e35" roughness={1} />
      </mesh>

      {/* Water surface */}
      <mesh
        position={[0, 0.065, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[1.58, 1.08, 1]}
      >
        <circleGeometry args={[1, 48]} />
        <meshStandardMaterial
          color="#168b83"
          emissive="#063d38"
          emissiveIntensity={0.35}
          roughness={0.22}
          metalness={0.12}
          transparent
          opacity={0.94}
        />
      </mesh>

      {/* Animated pond ripples */}
      <Ripple position={[-0.35, 0.085, -0.05]} delay={0} scale={0.6} />
      <Ripple position={[0.48, 0.087, 0.24]} delay={0.8} scale={0.45} />
      <Ripple position={[0, 0.088, -0.38]} delay={1.3} scale={0.35} />

      {/* Rocky underside — gives the pond depth */}
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

      {/* Waterfall with rocky cliff sides */}
      {waterfall && (
        <group position={[0, -0.05, -0.92]}>
          {/* Dark cliff behind the falling water */}
          <ShoreStone
            position={[0, 0.35, -0.12]}
            scale={[0.72, 0.78, 0.42]}
            color="#303e36"
          />

          {/* Left and right rock walls */}
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

          {/* Main falling stream */}
          <FallingStream
            position={[0, -0.05, 0.12]}
            width={0.48}
            height={0.88}
          />

          {/* Narrow streaks create a flowing-water effect */}
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

          {/* White water and splash rocks at the bottom */}
          <mesh
            position={[0, -0.49, 0.2]}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={[0.65, 0.3, 1]}
          >
            <circleGeometry args={[1, 32]} />
            <meshStandardMaterial
              color="#8bf4ed"
              emissive="#168f91"
              emissiveIntensity={0.45}
              transparent
              opacity={0.75}
              roughness={0.2}
              depthWrite={false}
            />
          </mesh>

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
