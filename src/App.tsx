
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import World from "./components/world/World";
import Header from "./components/ui/Header";
import Sidebar from "./components/ui/Sidebar";
import DetailPopup from "./components/ui/DetailPopup";
import DialoguePopup from "./components/ui/DialoguePopup";
import Footer from "./components/ui/Footer";
import MapHeading from "./components/ui/MapHeading";
import CameraTools from "./components/ui/CameraTools";
import FantasyLoader from "./components/ui/FantasyLoader";
import DevelopmentNote from "./components/ui/DevelopmentNote";

import {
  locations,
  storyMessages,
  type LocationId,
} from "./data/locations";

import type { CityLocation } from "./components/world/extended/FloatingProjectCity/types";

export default function App() {
  const [selected, setSelected] =
    useState<CityLocation>(locations[0]);

  const [dialogueOpen, setDialogueOpen] = useState(true);
  const [showDetails, setShowDetails] = useState(true);

  const [isWorldLoading, setIsWorldLoading] = useState(true);
  const [showDevelopmentNote, setShowDevelopmentNote] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const handleWorldReady = () => {
    setIsWorldLoading(false);
    setShowDevelopmentNote(true);
  };

  const handleContinue = () => {
    setShowDevelopmentNote(false);
    setHasEntered(true);
  };

  const chooseLocation = (location: CityLocation) => {
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

      {/* Keep the 3D world mounted during loading and the intro note */}
      <div className="scene">
        <World
          selectedId={selected.id as LocationId}
          onSelect={chooseLocation}
          onMascotClick={toggleDialogue}
          onReady={handleWorldReady}
        />
      </div>

      {/* Reveal portfolio controls after the introduction */}
      {hasEntered && (
        <>
          <Header onHome={resetStory} />

          <Sidebar
            locations={locations}
            selectedId={selected.id as LocationId}
            onSelect={chooseLocation}
          />

          <MapHeading />

          <CameraTools onReset={resetStory} />

          <DetailPopup
            location={selected}
            locations={locations}
            visible={showDetails}
            onClose={() => setShowDetails(false)}
            onAskJP={() => setDialogueOpen(true)}
          />

          <DialoguePopup
            selectedId={selected.id as LocationId}
            message={
              selected.id in storyMessages
                ? storyMessages[selected.id as LocationId]
                : "Welcome to my projects! Explore the islands to discover what I've built."
            }
            visible={dialogueOpen}
            onClose={() => setDialogueOpen(false)}
            locations={locations}
            onSelect={chooseLocation}
          />

          <Footer location={selected} />
        </>
      )}

      {/* Initial loading screen */}
      <AnimatePresence>
        {isWorldLoading && (
          <FantasyLoader label="Preparing your portfolio" />
        )}
      </AnimatePresence>

      {/* AI-assisted development disclosure */}
      <AnimatePresence>
        {showDevelopmentNote && !isWorldLoading && (
          <DevelopmentNote onContinue={handleContinue} />
        )}
      </AnimatePresence>
    </main>
  );
}
