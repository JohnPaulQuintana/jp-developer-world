
import type {
  PortfolioLocation,
  LocationId,
} from '../../data/locations'
import WorldScene from './WorldScene'

export type WorldProps = {
  selectedId: LocationId
  onSelect: (location: PortfolioLocation) => void
  onMascotClick: () => void
  onReady: () => void
}

export default function World(props: WorldProps) {
  return <WorldScene {...props} />
}
