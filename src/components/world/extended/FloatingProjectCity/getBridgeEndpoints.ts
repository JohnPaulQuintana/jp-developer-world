
import type { Point3 } from "./types";

export function getBridgeEndpoints(
  from: Point3,
  to: Point3,
  fromRadius: number,
  toRadius: number,
): { start: Point3; end: Point3 } {
  const dx = to[0] - from[0];
  const dz = to[2] - from[2];

  const distance = Math.sqrt(dx * dx + dz * dz) || 1;

  const ux = dx / distance;
  const uz = dz / distance;

  return {
    start: [
      from[0] + ux * fromRadius,
      from[1] + 0.12,
      from[2] + uz * fromRadius,
    ],
    end: [
      to[0] - ux * toRadius,
      to[1] + 0.12,
      to[2] - uz * toRadius,
    ],
  };
}
