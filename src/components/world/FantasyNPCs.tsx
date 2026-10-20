
import FantasyNPC from "./FantasyNPC";
import WanderingNPC from "./WanderingNPC";
import {
  villageBounds,
  villageObstacles,
} from "./villageNavigation";

export default function FantasyNPCs() {
  return (
    <group name="fantasy-npcs">
      <WanderingNPC
        startPosition={[-2.4, 0, -1.4]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.3}
      >
        <FantasyNPC
          type="female"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[2.2, 0, -1.4]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.35}
      >
        <FantasyNPC
          type="male"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[2.2, 0, 3.0]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.25}
      >
        <FantasyNPC
          type="mage"
          position={[0, 0, 0]}
          rotation={0}
          scale={0.2}
        />
      </WanderingNPC>

      <WanderingNPC
        startPosition={[-2.3, 0, 3.0]}
        bounds={villageBounds}
        obstacles={villageObstacles}
        speed={0.3}
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
