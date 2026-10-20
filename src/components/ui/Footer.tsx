import {
  LockKeyhole,
  Mouse,
} from 'lucide-react'

// import type { PortfolioLocation } from '../../data/locations'
import type { CityLocation } from '../world/extended/FloatingProjectCity/types'

type FooterProps = {
  location: CityLocation
}

export default function Footer({ location }: FooterProps) {
  return (
    <footer className="bottom-hud">
      <div className="hud-instructions">
        <Mouse size={18} />

        <span><b>DRAG</b> Rotate</span>
        <span><b>SCROLL</b> Zoom</span>
        <span><b>CLICK</b> Explore</span>
      </div>

      <div className="hud-location">
        <span className="status-dot" />

        {location.shortTitle.toUpperCase()}

        <span className="hud-divider" />

        <LockKeyhole size={13} />
        0 LOCKED QUESTS
      </div>
    </footer>
  )
}