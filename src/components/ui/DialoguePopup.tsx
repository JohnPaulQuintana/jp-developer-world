import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  House,
  Mail,
  UserRound,
  Wrench,
  X,
} from 'lucide-react'

import type {
  LocationId,
  PortfolioLocation,
} from '../../data/locations'

import mascot from '../../assets/me.JPG'

const iconMap = {
  home: House,
  projects: Code2,
  about: UserRound,
  skills: Wrench,
  experience: BriefcaseBusiness,
  contact: Mail,
} satisfies Record<LocationId, typeof House>

type DialoguePopupProps = {
  selectedId: LocationId
  message: string
  visible: boolean
  onClose: () => void
  locations: PortfolioLocation[]
  onSelect: (location: PortfolioLocation) => void
}

export default function DialoguePopup({
  selectedId,
  message,
  visible,
  onClose,
  locations,
  onSelect,
}: DialoguePopupProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          key={selectedId}
          className="dialogue-card"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.24 }}
        >
          {/* Avatar and dialogue */}
          <div className="dialogue-main">
            <div className="mascot-avatar">
              <img src={mascot} alt="JP" />
              <i />
            </div>

            <div className="dialogue-content">
              <div className="dialogue-top">
                <strong>
                  JP <span>QUINTANA</span>
                </strong>

                <button
                  type="button"
                  aria-label="Close dialogue"
                  onClick={onClose}
                >
                  <X size={15} />
                </button>
              </div>

              <p>{message}</p>

              {/* <button
                type="button"
                className="text-button"
                onClick={onClose}
              >
                Let's explore
                <ArrowRight size={15} />
              </button> */}
            </div>
          </div>

{/* Mobile-only scrollable sidebar navigation */}
<nav
  aria-label="Portfolio locations"
  className="w-full min-w-0 border-t border-[rgba(109,165,135,0.2)] pt-2 sm:hidden"
>
  <div className="flex w-full min-w-0 gap-2 overflow-x-auto overflow-y-hidden pb-2 touch-pan-x [scrollbar-width:thin] [scrollbar-color:rgba(109,165,135,0.5)_transparent]">
    {locations.map((location) => {
      const NavIcon = iconMap[location.id]
      const isActive = selectedId === location.id

      return (
        <button
          key={location.id}
          type="button"
          aria-current={isActive ? 'page' : undefined}
          onClick={() => onSelect(location)}
          className={`flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-xs font-semibold transition-colors ${
            isActive
              ? 'border-green-500/40 bg-green-500/15 text-green-400'
              : 'border-transparent bg-white/[0.03] text-white/60 hover:border-green-500/20 hover:bg-green-500/10 hover:text-green-400'
          }`}
        >
          <NavIcon size={16} strokeWidth={1.8} />
          <span>{location.shortTitle}</span>
        </button>
      )
    })}
  </div>

  <div className="mt-1 flex items-center gap-2 px-1 py-1 text-[9px] font-bold tracking-[0.16em] text-white/40">
    <span className="size-1.5 rounded-full bg-green-500" />
    MAP ONLINE
  </div>
</nav>
        </motion.section>
      )}
    </AnimatePresence>
  )
}