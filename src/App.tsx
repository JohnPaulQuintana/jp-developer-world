import { useState } from "react";

import World from "./components/world/World";
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import DetailPopup from "./components/ui/DetailPopup";
import DialoguePopup from "./components/ui/DialoguePopup";
import Footer from "./components/ui/Footer";
import MapHeading from "./components/ui/MapHeading";
import CameraTools from "./components/ui/CameraTools";
import FantasyLoader from "./components/ui/FantasyLoader";

import {
  locations,
  storyMessages,
  type LocationId,
  type PortfolioLocation,
} from "./data/locations";

export default function App() {
  const [selected, setSelected] =
    useState<PortfolioLocation>(locations[0]);

  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(true);
  const [isWorldLoading, setIsWorldLoading] = useState(true);

  const chooseLocation = (location: PortfolioLocation) => {
    setSelected(location);
    setShowDetails(true);
    setDialogueOpen(false);
  };

  const resetStory = () => {
    setSelected(locations[0]);
    setDialogueOpen(true);
    setShowDetails(true);
  };

  const toggleDialogue = () => {
    setDialogueOpen(true);
  };

  return (
    <main className="app-shell">
      <div className="world-background" />

      {/* 3D world */}
      <div className="scene">
        <World
          selectedId={selected.id as LocationId}
          onSelect={chooseLocation}
          onMascotClick={toggleDialogue}
          onReady={() => setIsWorldLoading(false)}
        />
      </div>

      {/* Main navigation */}
      <Header onHome={resetStory} />

      <Sidebar
        locations={locations}
        selectedId={selected.id as LocationId}
        onSelect={chooseLocation}
      />

      {/* Map interface */}
      <MapHeading />
      <CameraTools onReset={resetStory} />

      {/* Selected location details */}
      <DetailPopup
        location={selected}
        locations={locations}
        visible={showDetails && !isWorldLoading}
        onClose={() => setShowDetails(false)}
        onAskJP={() => setDialogueOpen(true)}
      />

      {/* JP guide dialogue */}
      <DialoguePopup
        selectedId={selected.id as LocationId}
        message={storyMessages[selected.id]}
        visible={dialogueOpen && !isWorldLoading}
        onClose={() => setDialogueOpen(false)}
        locations={locations}
        onSelect={chooseLocation}
      />

      {/* Bottom controls and status */}
      <Footer location={selected} />

      {/* Fantasy loading screen */}
      {isWorldLoading && (
        <FantasyLoader label="Summoning the world" />
      )}
    </main>
  );
}