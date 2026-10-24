import { Billboard, Text } from "@react-three/drei";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { MathUtils, type Group } from "three";
import { useRef } from "react";

import type { CityLocation } from "./extended/FloatingProjectCity/types";

type UnderConstructionBuildingProps = {
  location: CityLocation;
  active: boolean;
  onSelect: () => void;
};

const GROUND_Y = -0.03;
const SIZE = 1.22;
const WIDTH = 0.82 * SIZE;
const DEPTH = 0.65 * SIZE;
const BASE_HEIGHT = 0.14 * SIZE;
const WALL_HEIGHT = 0.43 * SIZE;

const WOOD = "#59432e";
// const WOOD_LIGHT = "#786044";
const STONE = "#66705b";
const MOSS = "#347344";
const MOSS_DARK = "#245b32";
const MAGIC_GREEN = "#79e991";

function TimberBeam({
  position,
  size,
  color = WOOD,
  rotation,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={1} />
    </mesh>
  );
}

function StoneBlock({
  position,
  size,
  color = STONE,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color?: string;
}) {
  return (
    <mesh position={position} rotation={[0, 0.08, 0]} castShadow receiveShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={1} flatShading />
    </mesh>
  );
}

function MossPatch({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <sphereGeometry args={[0.075, 8, 5]} />
        <meshStandardMaterial color={MOSS_DARK} roughness={1} flatShading />
      </mesh>

      <mesh position={[0.035, 0.012, 0.018]} castShadow>
        <sphereGeometry args={[0.045, 7, 5]} />
        <meshStandardMaterial color={MOSS} roughness={1} flatShading />
      </mesh>

      <mesh position={[-0.028, 0.014, -0.018]} castShadow>
        <sphereGeometry args={[0.032, 7, 5]} />
        <meshStandardMaterial color="#54864a" roughness={1} flatShading />
      </mesh>
    </group>
  );
}

function ForestFoundation({ active }: { active: boolean }) {
  return (
    <group>
      <mesh position={[0, BASE_HEIGHT / 2, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[
            WIDTH + 0.32 * SIZE,
            BASE_HEIGHT,
            DEPTH + 0.28 * SIZE,
          ]}
        />
        <meshStandardMaterial
          color={active ? "#354f38" : "#293b2c"}
          roughness={1}
          flatShading
        />
      </mesh>

      <mesh position={[0, BASE_HEIGHT + 0.005, 0]} receiveShadow>
        <boxGeometry
          args={[
            WIDTH + 0.34 * SIZE,
            0.035 * SIZE,
            DEPTH + 0.3 * SIZE,
          ]}
        />
        <meshStandardMaterial
          color={active ? "#477c45" : "#315b32"}
          roughness={1}
          flatShading
        />
      </mesh>

      <StoneBlock
        position={[-WIDTH * 0.43, BASE_HEIGHT * 0.8, DEPTH * 0.38]}
        size={[0.18 * SIZE, 0.075 * SIZE, 0.16 * SIZE]}
        color="#4c5c43"
      />

      <StoneBlock
        position={[WIDTH * 0.38, BASE_HEIGHT * 0.8, DEPTH * 0.38]}
        size={[0.16 * SIZE, 0.065 * SIZE, 0.17 * SIZE]}
        color="#59644a"
      />

      <StoneBlock
        position={[-WIDTH * 0.43, BASE_HEIGHT * 0.8, -DEPTH * 0.4]}
        size={[0.17 * SIZE, 0.07 * SIZE, 0.16 * SIZE]}
        color="#445840"
      />

      <StoneBlock
        position={[WIDTH * 0.42, BASE_HEIGHT * 0.8, -DEPTH * 0.4]}
        size={[0.16 * SIZE, 0.075 * SIZE, 0.15 * SIZE]}
        color="#536147"
      />

      <MossPatch
        position={[-WIDTH * 0.48, BASE_HEIGHT + 0.018, DEPTH * 0.4]}
        scale={0.8}
      />

      <MossPatch
        position={[WIDTH * 0.48, BASE_HEIGHT + 0.02, -DEPTH * 0.4]}
        scale={0.9}
      />
    </group>
  );
}

function EnchantedWalls() {
  const frontZ = DEPTH / 2;
  const wallBottom = BASE_HEIGHT + WALL_HEIGHT * 0.16;
  const wallCenterY = BASE_HEIGHT + WALL_HEIGHT * 0.49;
  const wallDepth = DEPTH * 0.82;
  const wallWidth = WIDTH * 0.84;

  return (
    <group>
      <mesh position={[0, wallCenterY, 0]} castShadow receiveShadow>
        <boxGeometry
          args={[wallWidth, WALL_HEIGHT * 0.68, wallDepth]}
        />
        <meshStandardMaterial
          color="#30472e"
          roughness={1}
          flatShading
        />
      </mesh>

      <mesh position={[0, wallCenterY, frontZ * 0.84]} castShadow>
        <boxGeometry
          args={[wallWidth * 0.92, WALL_HEIGHT * 0.61, 0.035 * SIZE]}
        />
        <meshStandardMaterial
          color="#203b27"
          roughness={1}
          flatShading
        />
      </mesh>

      {[-1, 1].map((side) => (
        <group key={`stone-wall-${side}`}>
          <StoneBlock
            position={[
              side * WIDTH * 0.28,
              wallBottom + WALL_HEIGHT * 0.05,
              frontZ * 0.83,
            ]}
            size={[0.16 * SIZE, 0.095 * SIZE, 0.055 * SIZE]}
            color="#43523c"
          />

          <StoneBlock
            position={[
              side * WIDTH * 0.43,
              wallBottom + WALL_HEIGHT * 0.05,
              0,
            ]}
            size={[0.065 * SIZE, 0.1 * SIZE, DEPTH * 0.28]}
            color="#4c5a40"
          />
        </group>
      ))}

      {[-1, 1].map((side) => (
        <group key={`cottage-trim-${side}`}>
          <TimberBeam
            position={[
              side * WIDTH * 0.43,
              wallCenterY,
              frontZ * 0.9,
            ]}
            size={[0.035 * SIZE, WALL_HEIGHT * 0.66, 0.045 * SIZE]}
            color="#60482e"
          />

          <TimberBeam
            position={[
              side * WIDTH * 0.22,
              wallBottom + WALL_HEIGHT * 0.26,
              frontZ * 0.91,
            ]}
            size={[WIDTH * 0.36, 0.025 * SIZE, 0.025 * SIZE]}
            color="#735638"
          />
        </group>
      ))}

      <mesh
        position={[
          WIDTH * 0.12,
          wallBottom + WALL_HEIGHT * 0.16,
          frontZ * 0.93,
        ]}
      >
        <boxGeometry
          args={[0.14 * SIZE, WALL_HEIGHT * 0.39, 0.025 * SIZE]}
        />
        <meshStandardMaterial color="#101e17" roughness={1} />
      </mesh>

      <mesh
        position={[
          WIDTH * 0.12,
          wallBottom + WALL_HEIGHT * 0.39,
          frontZ * 0.96,
        ]}
      >
        <circleGeometry args={[0.035 * SIZE, 8]} />
        <meshStandardMaterial
          color="#b6f5a7"
          emissive="#4bce70"
          emissiveIntensity={1.2}
          toneMapped={false}
        />
      </mesh>

      {[0.3, 0.53, 0.76].map((height, index) => (
        <TimberBeam
          key={`side-support-${index}`}
          position={[
            -WIDTH * 0.45,
            BASE_HEIGHT + WALL_HEIGHT * height,
            0,
          ]}
          size={[0.04 * SIZE, 0.035 * SIZE, DEPTH * 0.72]}
          color={index === 1 ? "#6b603c" : "#4b492f"}
        />
      ))}

      <mesh
        position={[
          -WIDTH * 0.14,
          BASE_HEIGHT + WALL_HEIGHT * 0.79,
          frontZ * 0.87,
        ]}
      >
        <boxGeometry
          args={[WIDTH * 0.44, WALL_HEIGHT * 0.13, 0.035 * SIZE]}
        />
        <meshStandardMaterial color="#172b1c" roughness={1} />
      </mesh>

      <MossPatch
        position={[
          -WIDTH * 0.34,
          BASE_HEIGHT + WALL_HEIGHT * 0.81,
          frontZ * 0.8,
        ]}
        scale={0.6}
      />
    </group>
  );
}

function ForestRoof({ active }: { active: boolean }) {
  const roofY = BASE_HEIGHT + WALL_HEIGHT * 0.92;
  const roofZ = DEPTH * 0.45;
  const roofWidth = WIDTH * 0.65;
  const roofLength = DEPTH * 1.12;

  return (
    <group>
      <mesh
        position={[-WIDTH * 0.2, roofY + WALL_HEIGHT * 0.39, 0]}
        rotation={[0, 0, 0.48]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[roofWidth, 0.09 * SIZE, roofLength]} />
        <meshStandardMaterial
          color="#285638"
          roughness={1}
          flatShading
        />
      </mesh>

      <TimberBeam
        position={[0, roofY + WALL_HEIGHT * 0.67, 0]}
        size={[0.045 * SIZE, 0.045 * SIZE, DEPTH * 1.18]}
        color="#54482d"
      />

      {[-1, 0, 1].map((depthPosition) => (
        <TimberBeam
          key={`open-rafter-${depthPosition}`}
          position={[
            WIDTH * 0.2,
            roofY + WALL_HEIGHT * 0.38,
            depthPosition * DEPTH * 0.42,
          ]}
          size={[roofWidth, 0.035 * SIZE, 0.035 * SIZE]}
          color="#64563a"
          rotation={[0, 0, -0.48]}
        />
      ))}

      <MossPatch
        position={[
          -WIDTH * 0.29,
          roofY + WALL_HEIGHT * 0.51,
          -DEPTH * 0.22,
        ]}
        scale={0.72}
      />

      <MossPatch
        position={[
          -WIDTH * 0.1,
          roofY + WALL_HEIGHT * 0.56,
          DEPTH * 0.2,
        ]}
        scale={0.55}
      />

      {[0, 1, 2].map((index) => (
        <mesh
          key={`roof-growth-${index}`}
          position={[
            -WIDTH * 0.42 + index * WIDTH * 0.16,
            roofY + WALL_HEIGHT * 0.16,
            roofZ,
          ]}
          rotation={[0, 0, -0.16]}
        >
          <coneGeometry args={[0.022 * SIZE, 0.12 * SIZE, 5]} />
          <meshStandardMaterial
            color={index === 1 ? "#66a653" : "#347344"}
            roughness={1}
          />
        </mesh>
      ))}

      {active && (
        <pointLight
          position={[-WIDTH * 0.2, roofY + WALL_HEIGHT * 0.5, 0]}
          color={MAGIC_GREEN}
          intensity={0.35}
          distance={1.1}
          decay={2}
        />
      )}
    </group>
  );
}

function ForestVines() {
  const frontZ = DEPTH / 2;

  return (
    <group>
      {[-1, 1].map((side) => (
        <group key={`vine-${side}`}>
          <mesh
            position={[
              side * WIDTH * 0.43,
              BASE_HEIGHT + WALL_HEIGHT * 0.52,
              frontZ * 0.95,
            ]}
            rotation={[0, 0, side * 0.08]}
          >
            <cylinderGeometry
              args={[0.009 * SIZE, 0.014 * SIZE, WALL_HEIGHT * 0.82, 5]}
            />
            <meshStandardMaterial color="#397b3e" roughness={1} />
          </mesh>

          {[0, 1, 2].map((index) => (
            <mesh
              key={`leaf-${index}`}
              position={[
                side * WIDTH * 0.43 - side * 0.025,
                BASE_HEIGHT + WALL_HEIGHT * (0.3 + index * 0.2),
                frontZ * 0.98,
              ]}
              rotation={[0, 0, side * -0.55]}
            >
              <sphereGeometry args={[0.027 * SIZE, 6, 5]} />
              <meshStandardMaterial
                color={index === 1 ? "#5b994b" : "#347344"}
                roughness={1}
                flatShading
              />
            </mesh>
          ))}
        </group>
      ))}

      <MossPatch
        position={[-WIDTH * 0.62, 0.045, DEPTH * 0.48]}
        scale={0.8}
      />

      <MossPatch
        position={[WIDTH * 0.63, 0.045, -DEPTH * 0.4]}
        scale={0.75}
      />

      <MossPatch
        position={[WIDTH * 0.53, 0.045, DEPTH * 0.48]}
        scale={0.62}
      />
    </group>
  );
}

function ConstructionMaterials() {
  const frontZ = DEPTH / 2;

  return (
    <group>
      <StoneBlock
        position={[WIDTH * 0.56, 0.055, frontZ + 0.15 * SIZE]}
        size={[0.13 * SIZE, 0.085 * SIZE, 0.12 * SIZE]}
        color="#526047"
      />

      <StoneBlock
        position={[
          WIDTH * 0.56 + 0.065 * SIZE,
          0.052,
          frontZ + 0.15 * SIZE,
        ]}
        size={[0.1 * SIZE, 0.08 * SIZE, 0.11 * SIZE]}
        color="#414f3a"
      />

      <TimberBeam
        position={[-WIDTH * 0.56, 0.055, frontZ + 0.13 * SIZE]}
        size={[0.23 * SIZE, 0.025 * SIZE, 0.045 * SIZE]}
        color="#625039"
        rotation={[0, 0.18, -0.04]}
      />
    </group>
  );
}

function Firefly({
  position,
  index,
  active,
}: {
  position: [number, number, number];
  index: number;
  active: boolean;
}) {
  const ref = useRef<Group | null>(null);

  useFrame(({ clock }, delta) => {
    if (!ref.current) return;

    const time = clock.elapsedTime;
    const targetY =
      position[1] +
      Math.sin(time * (1.3 + index * 0.13) + index) * 0.035;

    ref.current.position.y = MathUtils.damp(
      ref.current.position.y,
      targetY,
      4,
      delta,
    );

    ref.current.rotation.y += delta * (0.4 + index * 0.1);
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[active ? 0.014 : 0.009, 6, 6]} />
        <meshBasicMaterial
          color={active ? "#b6ffb7" : "#80c77c"}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function ForestMagic({ active }: { active: boolean }) {
  const magicRef = useRef<Group | null>(null);
  const orbitRef = useRef<Group | null>(null);

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;

    if (magicRef.current) {
      magicRef.current.rotation.y += delta * (active ? 0.65 : 0.22);
    }

    if (orbitRef.current) {
      orbitRef.current.rotation.y = time * (active ? 0.9 : 0.35);
      orbitRef.current.rotation.x = Math.sin(time * 0.6) * 0.12;
    }
  });

  const crystalY = BASE_HEIGHT + WALL_HEIGHT * 1.48;

  return (
    <group>
      <group ref={magicRef} position={[0, crystalY, 0]}>
        <mesh rotation={[0.2, 0.2, Math.PI / 4]} castShadow>
          <octahedronGeometry args={[active ? 0.075 : 0.052, 0]} />
          <meshStandardMaterial
            color={active ? "#c4ffc3" : "#61ae6c"}
            emissive={active ? "#4ce875" : "#247c3e"}
            emissiveIntensity={active ? 2.4 : 0.8}
            roughness={0.22}
            metalness={0.1}
            toneMapped={false}
          />
        </mesh>

        <mesh rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[0.105, 0.004, 5, 28]} />
          <meshBasicMaterial
            color={active ? "#a3f8a5" : "#528e5a"}
            transparent
            opacity={active ? 0.8 : 0.4}
          />
        </mesh>
      </group>

      <group ref={orbitRef} position={[0, crystalY, 0]}>
        {[0, 1, 2].map((index) => (
          <mesh
            key={`orbit-${index}`}
            position={[
              Math.cos((index / 3) * Math.PI * 2) * 0.17,
              Math.sin((index / 3) * Math.PI * 2) * 0.07,
              Math.sin((index / 3) * Math.PI * 2) * 0.17,
            ]}
          >
            <sphereGeometry args={[active ? 0.014 : 0.009, 6, 6]} />
            <meshBasicMaterial
              color={active ? "#c5ffc3" : "#6ebd79"}
              toneMapped={false}
            />
          </mesh>
        ))}
      </group>

      {active && (
        <pointLight
          position={[0, crystalY, 0]}
          color="#66ed85"
          intensity={0.75}
          distance={1.5}
          decay={2}
        />
      )}

      <Firefly
        position={[-WIDTH * 0.7, BASE_HEIGHT + WALL_HEIGHT * 0.45, 0.25]}
        index={1}
        active={active}
      />

      <Firefly
        position={[WIDTH * 0.7, BASE_HEIGHT + WALL_HEIGHT * 0.7, -0.2]}
        index={2}
        active={active}
      />

      <Firefly
        position={[WIDTH * 0.6, BASE_HEIGHT + WALL_HEIGHT * 0.2, 0.32]}
        index={3}
        active={active}
      />
    </group>
  );
}

export default function UnderConstructionBuilding({
  location,
  active,
  onSelect,
}: UnderConstructionBuildingProps) {
  const selectionRingRef = useRef<Group | null>(null);

  // Continuous construction animation refs.
  const wallsBuildRef = useRef<Group | null>(null);
  const roofBuildRef = useRef<Group | null>(null);
  const vinesBuildRef = useRef<Group | null>(null);

  const frontZ = DEPTH / 2;
  const roofY = BASE_HEIGHT + WALL_HEIGHT * 1.65;

  useFrame(({ clock }, delta) => {
    const time = clock.elapsedTime;

    // The walls continuously look like they are being adjusted.
    if (wallsBuildRef.current) {
      wallsBuildRef.current.position.y =
        Math.sin(time * 1.25) * 0.012;

      wallsBuildRef.current.rotation.z =
        Math.sin(time * 0.65) * 0.006;
    }

    // The roof repeatedly lifts and settles into place.
    // The small pauses at the top and bottom create a work-in-progress feel.
    if (roofBuildRef.current) {
      const roofCycle = (Math.sin(time * 1.1) + 1) / 2;

      const roofMotion = Math.pow(roofCycle, 2);

      roofBuildRef.current.position.y = roofMotion * 0.045;
      roofBuildRef.current.rotation.z =
        Math.sin(time * 0.8 + 0.5) * 0.014;
    }

    // The vines sway gently as they grow around the cottage.
    if (vinesBuildRef.current) {
      vinesBuildRef.current.rotation.z =
        Math.sin(time * 0.75 + 0.4) * 0.025;

      vinesBuildRef.current.rotation.y =
        Math.sin(time * 0.45) * 0.018;
    }

    // Keep the selection ring's existing pulse.
    if (selectionRingRef.current) {
      const pulse = active
        ? 1 + Math.sin(time * 3) * 0.035
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
      position={[
        location.position[0],
        GROUND_Y,
        location.position[1],
      ]}
      onClick={handleClick}
    >
      <ForestFoundation active={active} />

      {/* Continuously animated construction parts */}
      <group>
        <group ref={wallsBuildRef}>
          <EnchantedWalls />
        </group>

        <group ref={roofBuildRef}>
          <ForestRoof active={active} />
        </group>

        <group ref={vinesBuildRef}>
          <ForestVines />
        </group>

        {/* Materials stay in place to preserve the construction-site layout. */}
        <ConstructionMaterials />
      </group>

      {/* Selection ring */}
      <group
        ref={selectionRingRef}
        position={[0, BASE_HEIGHT + 0.028 * SIZE, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <mesh visible={active}>
          <torusGeometry args={[0.68 * SIZE, 0.012 * SIZE, 8, 48]} />
          <meshBasicMaterial
            color="#4a9b58"
            transparent
            opacity={0.95}
            depthWrite={false}
          />
        </mesh>

        <mesh visible={active} position={[0, 0, 0.002]}>
          <torusGeometry args={[0.59 * SIZE, 0.004 * SIZE, 6, 48]} />
          <meshBasicMaterial
            color="#a1e9a8"
            transparent
            opacity={0.75}
            depthWrite={false}
          />
        </mesh>
      </group>

      <ForestMagic active={active} />

      {/* Small remaining materials */}
      <group>
        <mesh
          position={[
            -WIDTH * 0.35,
            BASE_HEIGHT + WALL_HEIGHT * 0.13,
            frontZ + 0.06,
          ]}
        >
          <boxGeometry args={[0.12 * SIZE, 0.025 * SIZE, 0.025 * SIZE]} />
          <meshStandardMaterial color="#7b6943" roughness={1} />
        </mesh>
      </group>

      {/* Existing navigation Billboard and title card — unchanged */}
      <Billboard position={[0, roofY + 0.76 * SIZE, 0]} follow>
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

        <mesh position={[0, 0, -0.035]} renderOrder={999}>
          <planeGeometry args={[1.12, 0.31]} />
          <meshBasicMaterial
            color={active ? "#4a8750" : "#514532"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, 0, -0.025]} renderOrder={1000}>
          <planeGeometry args={[1.085, 0.275]} />
          <meshBasicMaterial
            color={active ? "#234b30" : "#142c20"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[0, 0, -0.015]} renderOrder={1001}>
          <planeGeometry args={[1.045, 0.235]} />
          <meshBasicMaterial
            color={active ? "#285638" : "#193625"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        {/* Construction status indicator */}
        <mesh position={[-0.405, 0, 0.005]} renderOrder={1002}>
          <circleGeometry args={[active ? 0.034 : 0.027, 16]} />
          <meshBasicMaterial
            color={active ? "#e5c16a" : "#c49a4a"}
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

        <mesh position={[-0.355, 0, 0.005]} renderOrder={1002}>
          <planeGeometry args={[0.012, 0.105]} />
          <meshBasicMaterial
            color="#c49a4a"
            depthTest={false}
            depthWrite={false}
          />
        </mesh>

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