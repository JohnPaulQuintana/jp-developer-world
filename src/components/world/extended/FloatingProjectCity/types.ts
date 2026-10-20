
import type {
  LocationId,
  PortfolioLocation,
  AdditionalProjectLocation,
} from "../../../../data/locations";

export type Point3 = [number, number, number];

export type CityLocation =
  | PortfolioLocation
  | AdditionalProjectLocation;

export type FloatingProjectCityProps = {
  selectedId: LocationId | AdditionalProjectLocation["id"];
  onSelect: (location: CityLocation) => void;
};

export type MiniCityProps = {
  location: CityLocation;
  index: number;
  position: Point3;
  selected: boolean;
  onSelect: (location: CityLocation) => void;
};

export type BridgeProps = {
  start: Point3;
  end: Point3;
};
