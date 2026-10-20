
import type {
  LocationId,
  PortfolioLocation,
} from "../../../../data/locations";

export type Point3 = [number, number, number];

export type FloatingProjectCityProps = {
  selectedId: LocationId;
  onSelect: (location: PortfolioLocation) => void;
};

export type MiniCityProps = {
  location: PortfolioLocation;
  index: number;
  position: Point3;
  selected: boolean;
  onSelect: (location: PortfolioLocation) => void;
};

export type BridgeProps = {
  start: Point3;
  end: Point3;
};
