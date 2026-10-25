import { Compass, RotateCcw, ZoomIn, ZoomOut, Hand } from "lucide-react";

type CameraToolsProps = {
  onReset: () => void;
};

export default function CameraTools({ onReset }: CameraToolsProps) {
  return (
    <div className="camera-tools">
      <div className="compass">
        <Compass size={27} strokeWidth={1.3} />
        <span>N</span>
      </div>

      <button
        type="button"
        title="Reset view"
        aria-label="Reset camera view"
        onClick={onReset}
      >
        <RotateCcw size={16} />
      </button>

      <div className="zoom-hint">
        {/* Desktop: mouse wheel */}
        <div className="hidden items-center gap-2 sm:flex">
          <ZoomIn size={14} />
          <span>Scroll to zoom</span>
          <ZoomOut size={14} />
        </div>
      </div>
      <div className="zoom-hint-2">
        {/* Mobile: two-finger gesture */}
        <div className="flex items-center gap-2">
          <Hand size={14} />
          <span>Drag with 2 fingers to move</span>
        </div>
      </div>
    </div>
  );
}
