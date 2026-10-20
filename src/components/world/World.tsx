
import type {
  // PortfolioLocation,
  LocationId,
} from '../../data/locations'
import type { CityLocation } from './extended/FloatingProjectCity/types'
import WorldScene from './WorldScene'

export type WorldProps = {
  selectedId: LocationId
  onSelect: (location: CityLocation) => void
  onMascotClick: () => void
  onReady: () => void
}

export default function World(props: WorldProps) {
  return <WorldScene {...props} />
}
