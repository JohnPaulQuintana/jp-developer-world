import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

import type {
  LocationId,
} from '../../data/locations'

type DialoguePopupProps = {
  selectedId: LocationId
  message: string
  visible: boolean
  onClose: () => void
}

export default function DialoguePopup({
  selectedId,
  message,
  visible,
  onClose,
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
          <div className="mascot-avatar">
            <span>JP</span>
            <i />
          </div>

          <div className="dialogue-content">
            <div className="dialogue-top">
              <strong>
                JP <span>YOUR GUIDE</span>
              </strong>

              <button
                aria-label="Close dialogue"
                onClick={onClose}
              >
                <X size={15} />
              </button>
            </div>

            <p>{message}</p>

            <button className="text-button" onClick={onClose}>
              Let's explore
              <ArrowRight size={15} />
            </button>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}