import {
  Compass,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react'

type CameraToolsProps = {
  onReset: () => void
}

export default function CameraTools({
  onReset,
}: CameraToolsProps) {
  return (
    <div className="camera-tools">
      <div className="compass">
        <Compass size={27} strokeWidth={1.3} />
        <span>N</span>
      </div>

      <button title="Reset view" onClick={onReset}>
        <RotateCcw size={16} />
      </button>

      <div className="zoom-hint">
        <ZoomIn size={14} />
        <span>Scroll to zoom</span>
        <ZoomOut size={14} />
      </div>
    </div>
  )
}