"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SelectDeckCombobox, { DeckNameOption } from "./SelectDeckCombobox";
import { useState } from "react";

const DeckBrowser = ({ decks }: { decks: DeckNameOption[] }) => {
  const [selectedDeckId, setSelectedDeckId] = useState(decks[0]?.id);

  const handleSelectDeck = (deckId: number) => {
    if (selectedDeckId != deckId) {
      setSelectedDeckId(deckId);
      console.log("selected: " + deckId);
    }
  };

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel defaultSize={50}>
        <div className="h-full p-4">
          <div className="flex items-center gap-3">
            <span>Deck</span>
            <SelectDeckCombobox
              decks={decks}
              currentDeckId={selectedDeckId}
              onSelect={handleSelectDeck}
            />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <div className="flex h-full flex-col">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DeckBrowser;
