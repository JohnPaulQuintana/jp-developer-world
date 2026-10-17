
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  House,
  Mail,
  UserRound,
  Wrench,
} from 'lucide-react'

import type {
  LocationId,
  PortfolioLocation,
} from '../../data/locations'

const iconMap = {
  home: House,
  projects: Code2,
  about: UserRound,
  skills: Wrench,
  experience: BriefcaseBusiness,
  contact: Mail,
} satisfies Record<LocationId, typeof House>

type SidebarProps = {
  selectedId: LocationId
  onSelect: (location: PortfolioLocation) => void
  locations: PortfolioLocation[]
}

export default function Sidebar({
  selectedId,
  onSelect,
  locations,
}: SidebarProps) {
  return (
    <nav
      className="side-nav flex h-screen min-h-0 flex-col"
      aria-label="Portfolio locations"
    >
      <div className="flex-1 space-y-2 overflow-y-auto">
        {locations.map((location) => {
          const NavIcon = iconMap[location.id]

          return (
            <button
              key={location.id}
              className={`nav-item ${
                selectedId === location.id
                  ? 'nav-item--active'
                  : ''
              }`}
              onClick={() => onSelect(location)}
            >
              <NavIcon size={18} strokeWidth={1.8} />

              <span>{location.shortTitle}</span>

              <ArrowRight className="nav-arrow" size={15} />
            </button>
          )
        })}
      </div>

      <div className="nav-footer mt-auto shrink-0">
        <span className="status-dot" />
        MAP ONLINE
      </div>
    </nav>
  )
}
