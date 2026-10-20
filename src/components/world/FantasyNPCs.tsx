import FantasyNPC from "./FantasyNPC";
import WanderingNPC from "./WanderingNPC";

export default function FantasyNPCs() {
  return (
    <group name="fantasy-npcs">
      {/* Female forest villager */}
      <WanderingNPC
        startPosition={[-2.5, 0, -1.5]}
        radius={0.8}
        speed={0.3}
        facingOffset={0}
      >
        <FantasyNPC
          type="female"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Male village guard */}
      <WanderingNPC
        startPosition={[2.5, 0, -2]}
        radius={0.8}
        speed={0.35}
        facingOffset={0}
      >
        <FantasyNPC
          type="male"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Female mage with staff */}
      <WanderingNPC
        startPosition={[4, 0, 2]}
        radius={0.8}
        speed={0.25}
        facingOffset={0}
      >
        <FantasyNPC
          type="mage"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Male forest ranger */}
      <WanderingNPC
        startPosition={[-4, 0, 2.5]}
        radius={0.8}
        speed={0.3}
        facingOffset={0}
      >
        <FantasyNPC
          type="ranger"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>
    </group>
  );
}