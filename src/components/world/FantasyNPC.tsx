
import { useEffect, useId, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import NPCDialogue from "./NPCDialogue";
import {
  registerNPC,
  unregisterNPC,
  useNPCConversation,
} from "./NPCConversationManager";

export type NPCType = "female" | "male" | "mage" | "ranger";

type FantasyNPCProps = {
  type?: NPCType;
  position?: [number, number, number];
  rotation?: number;
  scale?: number;
};

const COLORS = {
  skin: "#e8b995",
  skinShadow: "#bd8968",
  green: "#285b3d",
  greenLight: "#438455",
  darkGreen: "#142d21",
  leather: "#503522",
  gold: "#d6ad55",
  cream: "#e7dec4",
  hair: "#39251d",
  hairLight: "#70452e",
  black: "#171a16",
  eye: "#241a16",
  purple: "#604581",
  purpleLight: "#9b7bc2",
};

const NPC_NAMES: Record<NPCType, string> = {
  female: "Forest Villager",
  male: "Village Traveler",
  mage: "Forest Mage",
  ranger: "Forest Ranger",
};

const NPC_DIALOGUES: Record<NPCType, string[]> = {
  female: [
    "Welcome! A software engineer created this little world.",
    "The creator enjoys turning ideas into working software.",
    "Explore around! This world is part of a developer's portfolio.",
  ],
  male: [
    "The creator works with Python, backend APIs, and databases.",
    "Good software needs thoughtful architecture, not just code.",
    "Automation makes repetitive work easier and more reliable.",
  ],
  mage: [
    "The creator is exploring AI and building intelligent tools.",
    "Imagine an assistant that learns from your own knowledge!",
    "AI, APIs, and automation can make a powerful combination.",
  ],
  ranger: [
    "NaviAtlas is an indoor navigation and spatial mapping project.",
    "The creator also builds risk management and business automation tools.",
    "Every project here turns an idea into something practical.",
  ],
};

function Sphere({
  position,
  scale,
  color,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={position} scale={scale} castShadow>
      <sphereGeometry args={[1, 10, 8]} />
      <meshStandardMaterial color={color} roughness={0.9} />
    </mesh>
  );
}

function FantasyCharacter({
  type = "female",
  position = [0, 0, 0],
  rotation = 0,
  scale = 0.2,
}: FantasyNPCProps) {
  const generatedId = useId();
  const npcId = `${type}-${generatedId}`;

  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);

  const leftArmRef = useRef<THREE.Mesh>(null);
  const rightArmRef = useRef<THREE.Mesh>(null);
  const leftLegRef = useRef<THREE.Mesh>(null);
  const rightLegRef = useRef<THREE.Mesh>(null);
  const leftBootRef = useRef<THREE.Mesh>(null);
  const rightBootRef = useRef<THREE.Mesh>(null);

  const conversation = useNPCConversation(npcId);
  const isTalking = conversation !== null;

  useEffect(() => {
    registerNPC({
      id: npcId,
      name: NPC_NAMES[type],
      messages: NPC_DIALOGUES[type],
    });

    return () => unregisterNPC(npcId);
  }, [npcId, type]);

  const isFemale = type === "female" || type === "mage";
  const isMage = type === "mage";
  const isRanger = type === "ranger";

  const outfit = isMage
    ? COLORS.purple
    : isRanger
      ? COLORS.darkGreen
      : isFemale
        ? COLORS.green
        : "#765035";

  const hair = isMage ? COLORS.hairLight : COLORS.hair;

  const cloak = isMage
    ? COLORS.purpleLight
    : isRanger
      ? COLORS.greenLight
      : COLORS.darkGreen;

  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;

    // WanderingNPC moves the parent group.
    // This component animates the character within that group.
    const moving =
      !isTalking &&
      bodyRef.current !== null &&
      bodyRef.current.parent !== null;

    const walkSpeed = 9;
    const walkAmount = moving
      ? Math.sin(time * walkSpeed + position[0]) * 0.65
      : 0;

    // Walking bounce or idle breathing.
    if (bodyRef.current) {
      const bounce = moving
        ? Math.abs(Math.sin(time * walkSpeed + position[0])) * 0.045
        : Math.sin(time * 1.6 + position[0]) * 0.018;

      bodyRef.current.position.y = THREE.MathUtils.damp(
        bodyRef.current.position.y,
        bounce,
        10,
        delta,
      );

      const idleSway = Math.sin(time * 0.8 + position[2]) * 0.025;
      const talkingSway = isTalking ? Math.sin(time * 5.5) * 0.035 : 0;
      const walkingSway = moving ? Math.sin(time * walkSpeed) * 0.035 : 0;

      bodyRef.current.rotation.z = THREE.MathUtils.damp(
        bodyRef.current.rotation.z,
        idleSway + talkingSway + walkingSway,
        8,
        delta,
      );
    }

    // Head movement.
    if (headRef.current) {
      const idleHeadTurn = Math.sin(time * 0.65 + position[0]) * 0.12;
      const talkingHeadTurn = isTalking ? Math.sin(time * 4.5) * 0.07 : 0;
      const walkingHeadTurn = moving ? Math.sin(time * 4) * 0.035 : 0;

      headRef.current.rotation.y = THREE.MathUtils.damp(
        headRef.current.rotation.y,
        idleHeadTurn + talkingHeadTurn + walkingHeadTurn,
        6,
        delta,
      );

      headRef.current.rotation.x = THREE.MathUtils.damp(
        headRef.current.rotation.x,
        isTalking
          ? Math.sin(time * 8) * 0.075
          : Math.sin(time * 0.9 + position[2]) * 0.025,
        6,
        delta,
      );
    }

    // Alternate leg swings while walking.
    const leftLegTarget = moving ? walkAmount * 0.65 : 0;
    const rightLegTarget = moving ? -walkAmount * 0.65 : 0;

    if (leftLegRef.current) {
      leftLegRef.current.rotation.x = THREE.MathUtils.damp(
        leftLegRef.current.rotation.x,
        leftLegTarget,
        10,
        delta,
      );
    }

    if (rightLegRef.current) {
      rightLegRef.current.rotation.x = THREE.MathUtils.damp(
        rightLegRef.current.rotation.x,
        rightLegTarget,
        10,
        delta,
      );
    }

    if (leftBootRef.current) {
      leftBootRef.current.rotation.x = THREE.MathUtils.damp(
        leftBootRef.current.rotation.x,
        leftLegTarget * 0.6,
        10,
        delta,
      );
    }

    if (rightBootRef.current) {
      rightBootRef.current.rotation.x = THREE.MathUtils.damp(
        rightBootRef.current.rotation.x,
        rightLegTarget * 0.6,
        10,
        delta,
      );
    }

    // Arms swing opposite to the legs.
    const leftArmTarget = moving
      ? -0.18 - walkAmount * 0.55
      : isTalking
        ? -0.18 + Math.sin(time * 7) * 0.22
        : -0.18;

    const rightArmTarget = moving
      ? 0.18 + walkAmount * 0.55
      : isTalking
        ? 0.18 + Math.sin(time * 7 + Math.PI) * 0.22
        : 0.18;

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = THREE.MathUtils.damp(
        leftArmRef.current.rotation.z,
        leftArmTarget,
        8,
        delta,
      );
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = THREE.MathUtils.damp(
        rightArmRef.current.rotation.z,
        rightArmTarget,
        8,
        delta,
      );
    }
  });

  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <group ref={bodyRef}>
        {/* Boots */}
        <mesh
          ref={leftBootRef}
          position={[-0.115, 0.12, -0.015]}
          castShadow
        >
          <boxGeometry args={[0.19, 0.22, 0.3]} />
          <meshStandardMaterial color={COLORS.leather} />
        </mesh>

        <mesh
          ref={rightBootRef}
          position={[0.115, 0.12, -0.015]}
          castShadow
        >
          <boxGeometry args={[0.19, 0.22, 0.3]} />
          <meshStandardMaterial color={COLORS.leather} />
        </mesh>

        {/* Legs */}
        <mesh
          ref={leftLegRef}
          position={[-0.115, 0.38, 0]}
          castShadow
        >
          <capsuleGeometry args={[0.095, 0.34, 3, 7]} />
          <meshStandardMaterial color={COLORS.darkGreen} />
        </mesh>

        <mesh
          ref={rightLegRef}
          position={[0.115, 0.38, 0]}
          castShadow
        >
          <capsuleGeometry args={[0.095, 0.34, 3, 7]} />
          <meshStandardMaterial color={COLORS.darkGreen} />
        </mesh>

        {/* Tunic */}
        <mesh position={[0, 0.91, 0]} castShadow>
          <capsuleGeometry args={[0.23, 0.45, 4, 8]} />
          <meshStandardMaterial color={outfit} roughness={1} />
        </mesh>

        {/* Lower tunic */}
        <mesh position={[0, 0.67, 0]} castShadow>
          <cylinderGeometry args={[0.23, isFemale ? 0.34 : 0.25, 0.3, 7]} />
          <meshStandardMaterial color={outfit} roughness={1} />
        </mesh>

        {/* Cloak */}
        <mesh position={[0, 0.89, 0.17]} rotation={[0.08, 0, 0]} castShadow>
          <coneGeometry args={[0.28, 0.83, 5]} />
          <meshStandardMaterial
            color={cloak}
            roughness={1}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Belt */}
        <mesh position={[0, 0.78, -0.012]} castShadow>
          <boxGeometry args={[0.42, 0.075, 0.34]} />
          <meshStandardMaterial color={COLORS.leather} />
        </mesh>

        <mesh position={[0, 0.78, -0.19]}>
          <boxGeometry args={[0.085, 0.09, 0.035]} />
          <meshStandardMaterial
            color={COLORS.gold}
            metalness={0.45}
            roughness={0.5}
          />
        </mesh>

        {/* Animated arms */}
        <mesh
          ref={leftArmRef}
          position={[-0.29, 0.94, 0]}
          rotation={[0, 0, -0.18]}
          castShadow
        >
          <capsuleGeometry args={[0.085, 0.3, 3, 7]} />
          <meshStandardMaterial color={outfit} />
        </mesh>

        <mesh
          ref={rightArmRef}
          position={[0.29, 0.94, 0]}
          rotation={[0, 0, 0.18]}
          castShadow
        >
          <capsuleGeometry args={[0.085, 0.3, 3, 7]} />
          <meshStandardMaterial color={outfit} />
        </mesh>

        {/* Hands */}
        <Sphere
          position={[-0.32, 0.72, 0]}
          scale={[0.085, 0.09, 0.085]}
          color={COLORS.skin}
        />

        <Sphere
          position={[0.32, 0.72, 0]}
          scale={[0.085, 0.09, 0.085]}
          color={COLORS.skin}
        />

        {/* Neck */}
        <mesh position={[0, 1.24, 0]} castShadow>
          <cylinderGeometry args={[0.085, 0.1, 0.17, 8]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>
      </group>

      {/* Head */}
      <group ref={headRef} position={[0, 1.47, 0]}>
        <Sphere
          position={[0, 0, 0]}
          scale={[0.22, 0.26, 0.2]}
          color={COLORS.skin}
        />

        {/* Ears */}
        <mesh position={[-0.215, 0.015, 0]} rotation={[0, 0, 0.5]} castShadow>
          <coneGeometry args={[0.065, 0.19, 5]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>

        <mesh position={[0.215, 0.015, 0]} rotation={[0, 0, -0.5]} castShadow>
          <coneGeometry args={[0.065, 0.19, 5]} />
          <meshStandardMaterial color={COLORS.skin} />
        </mesh>

        {/* Hair cap */}
        <Sphere
          position={[0, 0.15, 0.005]}
          scale={[isFemale ? 0.235 : 0.225, 0.19, 0.215]}
          color={hair}
        />

        {isFemale && (
          <>
            <Sphere
              position={[-0.19, -0.055, 0.015]}
              scale={[0.075, 0.22, 0.095]}
              color={hair}
            />
            <Sphere
              position={[0.19, -0.055, 0.015]}
              scale={[0.075, 0.22, 0.095]}
              color={hair}
            />
            <Sphere
              position={[0, 0.085, -0.13]}
              scale={[0.16, 0.19, 0.1]}
              color={hair}
            />
          </>
        )}

        {!isFemale && (
          <Sphere
            position={[0, -0.015, 0.15]}
            scale={[0.17, 0.11, 0.09]}
            color={hair}
          />
        )}

        {/* Eyes */}
        <Sphere
          position={[-0.078, 0.015, -0.177]}
          scale={[0.025, 0.03, 0.018]}
          color={COLORS.eye}
        />
        <Sphere
          position={[0.078, 0.015, -0.177]}
          scale={[0.025, 0.03, 0.018]}
          color={COLORS.eye}
        />

        {/* Nose */}
        <Sphere
          position={[0, -0.045, -0.202]}
          scale={[0.035, 0.04, 0.035]}
          color={COLORS.skinShadow}
        />

        {/* Mage circlet */}
        {isMage && (
          <>
            <mesh position={[0, 0.19, -0.01]}>
              <torusGeometry args={[0.17, 0.018, 5, 12]} />
              <meshStandardMaterial
                color={COLORS.gold}
                metalness={0.6}
                roughness={0.35}
              />
            </mesh>

            <Sphere
              position={[0, 0.215, -0.18]}
              scale={[0.045, 0.055, 0.025]}
              color={COLORS.purpleLight}
            />
          </>
        )}
      </group>

      {/* Ranger shoulder strap */}
      {isRanger && (
        <mesh position={[0, 0.94, -0.205]} rotation={[0, 0, -0.55]}>
          <boxGeometry args={[0.07, 0.48, 0.035]} />
          <meshStandardMaterial color={COLORS.leather} />
        </mesh>
      )}

      {/* Mage staff */}
      {isMage && (
        <group position={[0.43, 0.5, 0]}>
          <mesh position={[0, 0.42, 0]} castShadow>
            <cylinderGeometry args={[0.025, 0.035, 1.05, 6]} />
            <meshStandardMaterial color="#68452b" />
          </mesh>

          <Sphere
            position={[0, 0.99, 0]}
            scale={[0.095, 0.095, 0.095]}
            color={COLORS.purpleLight}
          />

          <pointLight
            position={[0, 0.99, 0]}
            color="#a78bfa"
            intensity={0.5}
            distance={1.2}
          />
        </group>
      )}

      {/* Ranger sword */}
      {isRanger && (
        <group position={[-0.39, 0.6, 0.12]} rotation={[0, 0, 0.2]}>
          <mesh position={[0, 0.23, 0]} castShadow>
            <boxGeometry args={[0.055, 0.55, 0.035]} />
            <meshStandardMaterial
              color="#bfc9c2"
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>

          <mesh position={[0, -0.07, 0]}>
            <boxGeometry args={[0.14, 0.045, 0.06]} />
            <meshStandardMaterial color={COLORS.gold} />
          </mesh>
        </group>
      )}

      {/* Ground shadow */}
      <mesh
        position={[0, 0.025, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <circleGeometry args={[0.4, 12]} />
        <meshBasicMaterial
          color="#071a0e"
          transparent
          opacity={0.5}
          depthWrite={false}
        />
      </mesh>

      <NPCDialogue
        name={conversation?.name ?? NPC_NAMES[type]}
        message={conversation?.message ?? ""}
        visible={isTalking}
      />
    </group>
  );
}

export function FantasyNPC(props: FantasyNPCProps) {
  return <FantasyCharacter {...props} />;
}

export default FantasyNPC;
