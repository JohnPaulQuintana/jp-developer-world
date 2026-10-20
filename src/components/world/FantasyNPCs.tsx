
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
        facingOffset={Math.PI / 2}
      >
        <FantasyNPC
          type="female"
          position={[0, 0, 0]}
          rotation={Math.PI / 4}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Male village guard */}
      <WanderingNPC
        startPosition={[2.5, 0, -2]}
        radius={0.8}
        speed={0.35}
        facingOffset={Math.PI / 2}
      >
        <FantasyNPC
          type="male"
          position={[0, 0, 0]}
          rotation={-Math.PI / 5}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Female mage with staff */}
      <WanderingNPC
        startPosition={[4, 0, 2]}
        radius={0.8}
        speed={0.25}
        facingOffset={Math.PI / 2}
      >
        <FantasyNPC
          type="mage"
          position={[0, 0, 0]}
          rotation={Math.PI / 2}
          scale={0.2}
        />
      </WanderingNPC>

      {/* Male forest ranger */}
      <WanderingNPC
        startPosition={[-4, 0, 2.5]}
        radius={0.8}
        speed={0.3}
        facingOffset={Math.PI / 2}
      >
        <FantasyNPC
          type="ranger"
          position={[0, 0, 0]}
          rotation={-Math.PI / 3}
          scale={0.2}
        />
      </WanderingNPC>
    </group>
  );
}
