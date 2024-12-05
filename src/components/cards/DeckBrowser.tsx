"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SelectDeckCombobox, { DeckNameOption } from "./SelectDeckCombobox";
import { useState } from "react";
import CardEditor from "./CardEditor";

const DeckBrowser = ({ decks }: { decks: DeckNameOption[] }) => {
  const [selectedDeckId, setSelectedDeckId] = useState<number | undefined>(
    decks[0]?.id,
  );

  const handleSelectDeck = (deckId: number) => {
    if (selectedDeckId != deckId) {
      setSelectedDeckId(deckId);
    }
  };

  return (
    <ResizablePanelGroup
      direction="horizontal"
      autoSaveId="browser-layout"
      className="h-full w-full"
    >
      <ResizablePanel defaultSize={50}>
        <div className="h-full p-3">
          <div className="flex items-center gap-3">
            <span>Deck</span>
            <SelectDeckCombobox
              decks={decks}
              deckId={selectedDeckId}
              onSelect={handleSelectDeck}
            />
          </div>
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={50}>
        <div className="h-full p-3">
          <CardEditor deckId={selectedDeckId} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default DeckBrowser;
