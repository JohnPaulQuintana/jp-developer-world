
import { useMemo } from "react";
import type { BridgeProps, Point3 } from "./types";

type FloatingStone = {
  key: number;
  position: Point3;
  rotation: Point3;
  topScale: Point3;
  undersideScale: Point3;
  color: string;
  mossColor: string;
  hasMoss: boolean;
};

type DetailRock = {
  key: string;
  position: Point3;
  scale: Point3;
  rotation: Point3;
  color: string;
};

const STONE_COLORS = [
  "#686b60",
  "#77796a",
  "#858575",
  "#62665c",
  "#8b8978",
  "#727466",
];

const MOSS_COLORS = [
  "#365f35",
  "#477b43",
  "#527d3c",
  "#639452",
];

const DETAIL_ROCK_COLORS = [
  "#55594e",
  "#737568",
  "#858575",
  "#4b4e45",
];

export default function Bridge({ start, end }: BridgeProps) {
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  const dz = end[2] - start[2];

  const length = Math.sqrt(dx * dx + dz * dz);
  const angle = Math.atan2(dx, dz);

  const { stones, detailRocks } = useMemo(() => {
    const spacing = 0.46;
    const count = Math.max(3, Math.ceil(length / spacing));

    const stones: FloatingStone[] = Array.from(
      { length: count + 1 },
      (_, index) => {
        const t = index / count;
        const isEndpoint = index === 0 || index === count;

        const sideOffset = isEndpoint
          ? 0
          : Math.sin(index * 2.13) * 0.045;

        const verticalOffset = isEndpoint
          ? 0
          : Math.sin(t * Math.PI) * 0.09 +
            Math.sin(index * 1.8) * 0.025;

        const topWidth = 0.36 + (index % 3) * 0.045;
        const topLength = 0.36 + (index % 4) * 0.035;
        const topHeight = 0.12 + (index % 2) * 0.035;

        return {
          key: index,
          position: [
            start[0] + dx * t + Math.cos(angle) * sideOffset,
            start[1] + dy * t + verticalOffset,
            start[2] + dz * t - Math.sin(angle) * sideOffset,
          ],
          rotation: [
            ((index % 3) - 1) * 0.075,
            angle + ((index % 3) - 1) * 0.09,
            ((index % 4) - 1.5) * 0.055,
          ],
          topScale: [topWidth, topHeight, topLength],
          undersideScale: [
            topWidth * 0.78,
            topHeight * 1.8,
            topLength * 0.78,
          ],
          color: STONE_COLORS[index % STONE_COLORS.length],
          mossColor: MOSS_COLORS[index % MOSS_COLORS.length],
          hasMoss: index % 3 !== 0,
        };
      },
    );

    // Tiny fragments float beside and below the main stepping stones.
    const detailRocks: DetailRock[] = [];

    stones.forEach((stone, index) => {
      if (index % 2 !== 0) return;

      [-1, 1].forEach((side, sideIndex) => {
        const distance = 0.34 + ((index + sideIndex) % 3) * 0.1;
        const height = 0.2 + ((index + sideIndex) % 3) * 0.11;

        detailRocks.push({
          key: `side-${index}-${side}`,
          position: [
            stone.position[0] + Math.cos(angle) * distance * side,
            stone.position[1] - height,
            stone.position[2] - Math.sin(angle) * distance * side,
          ],
          scale: [
            0.07 + ((index + sideIndex) % 3) * 0.035,
            0.08 + ((index + sideIndex) % 2) * 0.04,
            0.07 + ((index + 1) % 3) * 0.025,
          ],
          rotation: [
            index * 0.3,
            angle + index * 0.5,
            side * 0.25,
          ],
          color:
            DETAIL_ROCK_COLORS[
              (index + sideIndex) % DETAIL_ROCK_COLORS.length
            ],
        });
      });
    });

    return { stones, detailRocks };
  }, [
    length,
    start[0],
    start[1],
    start[2],
    end[0],
    end[1],
    end[2],
    dx,
    dy,
    dz,
    angle,
  ]);

  return (
    <group>
      {/* Main ancient stepping stones */}
      {stones.map((stone) => (
        <group
          key={stone.key}
          position={stone.position}
          rotation={stone.rotation}
        >
          {/* Jagged underside */}
          <mesh
            position={[0, -stone.topScale[1] * 0.85, 0]}
            scale={stone.undersideScale}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#41463d"
              roughness={1}
              flatShading
            />
          </mesh>

          {/* Weathered stone surface */}
          <mesh
            scale={stone.topScale}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={stone.color}
              roughness={1}
              flatShading
            />
          </mesh>

          {stone.hasMoss && (
            <>
              {/* Large moss patch */}
              <mesh
                position={[
                  -stone.topScale[0] * 0.18,
                  stone.topScale[1] * 0.76,
                  -stone.topScale[2] * 0.12,
                ]}
                rotation={[0.02, 0.25, -0.03]}
                scale={[
                  stone.topScale[0] * 0.48,
                  0.014,
                  stone.topScale[2] * 0.35,
                ]}
              >
                <sphereGeometry args={[1, 6, 3]} />
                <meshStandardMaterial
                  color={stone.mossColor}
                  roughness={1}
                  flatShading
                />
              </mesh>

              {/* Smaller patch of deep green moss */}
              <mesh
                position={[
                  stone.topScale[0] * 0.22,
                  stone.topScale[1] * 0.72,
                  stone.topScale[2] * 0.18,
                ]}
                scale={[
                  stone.topScale[0] * 0.2,
                  0.012,
                  stone.topScale[2] * 0.19,
                ]}
              >
                <sphereGeometry args={[1, 5, 3]} />
                <meshStandardMaterial
                  color="#294c2d"
                  roughness={1}
                  flatShading
                />
              </mesh>

              {/* Tiny grass blades growing from the moss */}
              {[0, 1, 2].map((blade) => (
                <mesh
                  key={blade}
                  position={[
                    -stone.topScale[0] * 0.2 +
                      blade * 0.035,
                    stone.topScale[1] * 0.95,
                    -stone.topScale[2] * 0.12 +
                      blade * 0.018,
                  ]}
                  rotation={[
                    0,
                    blade * 0.7,
                    blade % 2 === 0 ? -0.3 : 0.25,
                  ]}
                >
                  <coneGeometry args={[0.018, 0.09, 4]} />
                  <meshStandardMaterial
                    color={MOSS_COLORS[blade % MOSS_COLORS.length]}
                    roughness={1}
                    flatShading
                  />
                </mesh>
              ))}
            </>
          )}
        </group>
      ))}

      {/* Small floating ancient rock fragments */}
      {detailRocks.map((rock) => (
        <mesh
          key={rock.key}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
          castShadow
          receiveShadow
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={rock.color}
            roughness={1}
            flatShading
          />
        </mesh>
      ))}

      {/* Subtle magical green crystals beneath the bridge */}
      {stones
        .filter((_, index) => index % 4 === 2)
        .map((stone) => (
          <mesh
            key={`crystal-${stone.key}`}
            position={[
              stone.position[0],
              stone.position[1] - 0.24,
              stone.position[2],
            ]}
            rotation={[
              0.15,
              angle + stone.key,
              0.2,
            ]}
          >
            <octahedronGeometry args={[0.055, 0]} />
            <meshStandardMaterial
              color="#19f58a"
              emissive="#19f58a"
              emissiveIntensity={0.45}
              roughness={0.5}
              flatShading
            />
          </mesh>
        ))}
    </group>
  );
}
