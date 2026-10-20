import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type WanderingNPCProps = {
  startPosition: [number, number, number];
  radius?: number;
  speed?: number;
  facingOffset?: number;
  children: ReactNode;
};

export default function WanderingNPC({
  startPosition,
  radius = 1.2,
  speed = 0.35,
  facingOffset = Math.PI,
  children,
}: WanderingNPCProps) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRef = useRef<THREE.Vector3 | null>(null);

  const centerRef = useRef(
    new THREE.Vector3(...startPosition),
  );

  const directionRef = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (!targetRef.current) {
      const angle = Math.random() * Math.PI * 2;
      const distance = Math.sqrt(Math.random()) * radius;

      targetRef.current = new THREE.Vector3(
        centerRef.current.x + Math.cos(angle) * distance,
        startPosition[1],
        centerRef.current.z + Math.sin(angle) * distance,
      );
    }

    const target = targetRef.current;

    const dx = target.x - group.position.x;
    const dz = target.z - group.position.z;
    const distance = Math.hypot(dx, dz);

    if (distance < 0.08) {
      targetRef.current = null;
      return;
    }

    directionRef.current.set(dx, 0, dz).normalize();

    // Move in the direction of the destination.
    const step = Math.min(speed * delta, distance);

    group.position.x += directionRef.current.x * step;
    group.position.z += directionRef.current.z * step;

    // Face the direction of movement.
    // The offset compensates for the character's model orientation.
    const targetRotation =
      Math.atan2(directionRef.current.x, directionRef.current.z) +
      facingOffset;

    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      targetRotation,
      8,
      delta,
    );
  });

  return (
    <group ref={groupRef} position={startPosition}>
      {children}
    </group>
  );
}