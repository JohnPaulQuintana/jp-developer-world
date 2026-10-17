import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { CatmullRomCurve3, Vector3, type Group, type Mesh } from "three";

const FIREFLY_SEEDS = Array.from({ length: 12 }, (_, i) => ({
  x: ((i * 31) % 79) / 10 - 3.9,
  y: 0.7 + ((i * 17) % 18) / 10,
  z: ((i * 23) % 79) / 10 - 3.9,
  phase: i * 1.37,
  speed: 0.25 + (i % 4) * 0.08,
}));

function Fireflies() {
  const refs = useRef<(Group | null)[]>([]);
  const lightRefs = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;

    refs.current.forEach((bug, i) => {
      if (!bug) return;

      const seed = FIREFLY_SEEDS[i];
      if (!seed) return;

      bug.position.x = seed.x + Math.sin(time * seed.speed + seed.phase) * 0.35;

      bug.position.y = seed.y + Math.sin(time * 0.8 + seed.phase) * 0.22;

      bug.position.z = seed.z + Math.cos(time * 0.45 + seed.phase) * 0.3;

      bug.rotation.y += delta * 0.25;

      const pulse = 0.35 + (Math.sin(time * 2 + seed.phase) + 1) * 0.325;

      const glow = lightRefs.current[i];
      if (glow) {
        glow.scale.setScalar(pulse);
      }
    });
  });

  return (
    <group name="forest-fireflies">
      {FIREFLY_SEEDS.map((seed, i) => (
        <group
          key={i}
          ref={(node) => {
            refs.current[i] = node;
          }}
          position={[seed.x, seed.y, seed.z]}
        >
          {/* Small ivory-green body */}
          <mesh>
            <sphereGeometry args={[0.018, 6, 5]} />
            <meshBasicMaterial color="#e3e8d8" />
          </mesh>

          {/* Soft glow without expensive point lights */}
          <mesh
            ref={(node) => {
              lightRefs.current[i] = node;
            }}
          >
            <sphereGeometry args={[0.055, 6, 5]} />
            <meshBasicMaterial
              color="#9acba1"
              transparent
              opacity={0.13}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const WIND_PATHS = [
  new CatmullRomCurve3([
    new Vector3(-4.2, 1.15, 1.8),
    new Vector3(-2.5, 1.5, 0.2),
    new Vector3(-0.5, 1.3, -0.4),
    new Vector3(1.5, 1.65, 0.6),
    new Vector3(4.2, 1.25, -0.2),
  ]),
  new CatmullRomCurve3([
    new Vector3(-3.5, 2.1, -2.8),
    new Vector3(-1.8, 2.35, -1.5),
    new Vector3(0.2, 2.0, -1.1),
    new Vector3(2.2, 2.3, -1.9),
    new Vector3(4.0, 2.05, -2.8),
  ]),
  new CatmullRomCurve3([
    new Vector3(-3.8, 0.95, 3.6),
    new Vector3(-2.0, 1.2, 2.8),
    new Vector3(0.0, 1.0, 3.3),
    new Vector3(2.1, 1.35, 2.4),
    new Vector3(3.8, 1.0, 3.2),
  ]),
];

// const LEAF_SEEDS = Array.from({ length: 18 }, (_, index) => ({
//   x: ((index * 37) % 83) / 10 - 4.1,
//   y: 0.55 + ((index * 19) % 22) / 10,
//   z: ((index * 29) % 83) / 10 - 3.8,
//   speed: 0.35 + (index % 5) * 0.07,
//   phase: index * 1.71,
//   size: 0.65 + (index % 4) * 0.13,
// }));

const MIST_SEEDS = [
  { x: -3.0, y: 0.55, z: -1.7, scale: 1.0, phase: 0.0 },
  { x: -1.0, y: 0.48, z: 2.1, scale: 0.8, phase: 1.7 },
  { x: 1.2, y: 0.62, z: -2.5, scale: 1.15, phase: 3.2 },
  { x: 3.0, y: 0.5, z: 1.4, scale: 0.9, phase: 4.6 },
  { x: 0.2, y: 0.43, z: 4.0, scale: 0.75, phase: 2.4 },
];

function WindCurrent({
  curve,
  index,
}: {
  curve: CatmullRomCurve3;
  index: number;
}) {
  const particleRefs = useRef<(Mesh | null)[]>([]);
  const particleCount = 4;
  const speed = 0.045 + index * 0.008;

  useFrame(({ clock }) => {
    const time = clock.elapsedTime;

    particleRefs.current.forEach((particle, particleIndex) => {
      if (!particle) return;

      const progress =
        (time * speed + particleIndex / particleCount + index * 0.19) % 1;

      const point = curve.getPointAt(progress);
      particle.position.copy(point);

      // Small vertical drift makes the current feel like moving air.
      particle.position.y += Math.sin(time * 1.2 + particleIndex) * 0.035;

      const fade = Math.sin(progress * Math.PI);
      particle.scale.setScalar(0.55 + fade * 0.65);
    });
  });

  return (
    <group>
      {/* Very faint continuous airflow line */}
      <mesh>
        <tubeGeometry args={[curve, 48, 0.006, 5, false]} />
        <meshBasicMaterial
          color={index === 1 ? "#e3e8d8" : "#4b9560"}
          transparent
          opacity={0.17}
          depthWrite={false}
        />
      </mesh>

      {/* Moving wind particles */}
      {Array.from({ length: particleCount }, (_, particleIndex) => (
        <mesh
          key={particleIndex}
          ref={(node) => {
            particleRefs.current[particleIndex] = node;
          }}
        >
          <sphereGeometry args={[0.018, 6, 5]} />
          <meshBasicMaterial
            color={index === 1 ? "#e3e8d8" : "#83c994"}
            transparent
            opacity={0.72}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

// function DriftingLeaves() {
//   const leafRefs = useRef<(Group | null)[]>([]);

//   useFrame(({ clock }, delta) => {
//     const time = clock.elapsedTime;

//     leafRefs.current.forEach((leaf, index) => {
//       if (!leaf) return;

//       const seed = LEAF_SEEDS[index];
//       if (!seed) return;

//       leaf.position.x += seed.speed * delta;
//       leaf.position.y = seed.y + Math.sin(time * 0.8 + seed.phase) * 0.12;
//       leaf.position.z = seed.z + Math.sin(time * 0.45 + seed.phase) * 0.2;

//       // Wrap leaves around the map so they can drift continuously.
//       if (leaf.position.x > 4.5) {
//         leaf.position.x = -4.5;
//       }

//       leaf.rotation.x += delta * 0.45;
//       leaf.rotation.y += delta * (0.5 + seed.speed);
//       leaf.rotation.z = Math.sin(time * 0.8 + seed.phase) * 0.35;
//     });
//   });

//   return (
//     <group>
//       {LEAF_SEEDS.map((seed, index) => (
//         <group
//           key={index}
//           ref={(node) => {
//             leafRefs.current[index] = node;
//           }}
//           position={[seed.x, seed.y, seed.z]}
//           rotation={[0.2, seed.phase, 0.3]}
//           scale={seed.size}
//         >
//           {/* Narrow leaf shape */}
//           <mesh>
//             <sphereGeometry args={[0.045, 7, 5]} />
//             <meshStandardMaterial
//               color={index % 3 === 0 ? "#83a96f" : "#347344"}
//               roughness={1}
//               flatShading
//             />
//           </mesh>

//           {/* Fine leaf vein */}
//           <mesh scale={[0.12, 1.0, 0.12]}>
//             <cylinderGeometry args={[0.008, 0.008, 0.065, 4]} />
//             <meshBasicMaterial color="#b9d6a9" />
//           </mesh>
//         </group>
//       ))}
//     </group>
//   );
// }

function ForestMist() {
  const mistRefs = useRef<(Mesh | null)[]>([]);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;

    mistRefs.current.forEach((mist, index) => {
      if (!mist) return;

      const seed = MIST_SEEDS[index];
      if (!seed) return;

      mist.position.x = seed.x + Math.sin(time * 0.12 + seed.phase) * 0.35;

      mist.position.z = seed.z + Math.cos(time * 0.1 + seed.phase) * 0.22;

      mist.position.y = seed.y + Math.sin(time * 0.35 + seed.phase) * 0.035;

      mist.rotation.y += delta * 0.025;
    });
  });

  return (
    <group>
      {MIST_SEEDS.map((seed, index) => (
        <mesh
          key={index}
          ref={(node) => {
            mistRefs.current[index] = node;
          }}
          position={[seed.x, seed.y, seed.z]}
          scale={[0.8 * seed.scale, 0.11 * seed.scale, 0.34 * seed.scale]}
        >
          <sphereGeometry args={[1, 12, 8]} />
          <meshBasicMaterial
            color={index % 2 === 0 ? "#a9cbb0" : "#d5e4d5"}
            transparent
            opacity={0.055}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function WindEffects() {
  return (
    <group name="forest-atmosphere">
      {WIND_PATHS.map((curve, index) => (
        <WindCurrent key={index} curve={curve} index={index} />
      ))}

      {/* <DriftingLeaves /> */}
      <ForestMist />
      <Fireflies />
    </group>
  );
}
