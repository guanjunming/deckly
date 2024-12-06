"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SelectDeckCombobox, { type DeckNameOption } from "./SelectDeckCombobox";
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
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" autoSaveId="browser-layout">
        <ResizablePanel defaultSize={50}>
          <div className="h-full p-3">
            <div className="mt-2 flex items-center gap-3">
              <span className="font-medium">Deck</span>
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
    </div>
  );
};

export default DeckBrowser;
