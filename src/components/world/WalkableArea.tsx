
import { Shape } from "three";

type WalkableAreaProps = {
  position?: [number, number, number];
  rotation?: number;
  y?: number;
  length?: number;
  width?: number;
  color?: string;
};

function createDirtTile(length: number, width: number) {
  const shape = new Shape();

  const halfLength = length / 2;
  const halfWidth = width / 2;

  // Irregular edges for a natural dirt path tile.
  shape.moveTo(-halfLength, -halfWidth * 0.85);
  shape.lineTo(-halfLength * 0.72, -halfWidth);
  shape.lineTo(-halfLength * 0.15, -halfWidth * 0.9);
  shape.lineTo(halfLength * 0.4, -halfWidth);
  shape.lineTo(halfLength * 0.9, -halfWidth * 0.82);
  shape.lineTo(halfLength, -halfWidth * 0.3);
  shape.lineTo(halfLength * 0.94, halfWidth * 0.45);
  shape.lineTo(halfLength * 0.65, halfWidth * 0.9);
  shape.lineTo(halfLength * 0.1, halfWidth);
  shape.lineTo(-halfLength * 0.45, halfWidth * 0.88);
  shape.lineTo(-halfLength, halfWidth);
  shape.closePath();

  return shape;
}

export default function WalkableArea({
  position = [0, 0.055, 0],
  rotation = 0,
  length = 1,
  width = 0.65,
  color = "#9b7047",
}: WalkableAreaProps) {
  const shape = createDirtTile(length, width);

  return (
    <mesh
      position={position}
      rotation={[-Math.PI / 2, 0, rotation]}
      userData={{ walkable: true }}
      receiveShadow
    >
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial
        color={color}
        roughness={1}
        polygonOffset
        polygonOffsetFactor={-1}
        side={2}
      />
    </mesh>
  );
}
