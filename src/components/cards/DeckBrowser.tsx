"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import SelectDeckCombobox, { type DeckNameOption } from "./SelectDeckCombobox";
import { useState } from "react";
import CardEditor from "./CardEditor";
import CardsTable from "./CardsTable";
import { useGetDeckCards } from "@/hooks/use-get-deck-cards";

const DeckBrowser = ({
  deckNames,
  currentDeckId,
}: {
  deckNames: DeckNameOption[];
  currentDeckId: number;
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState(currentDeckId);

  const { data: cards = [] } = useGetDeckCards(selectedDeckId);

  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="horizontal" autoSaveId="browser-layout">
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full flex-col p-3">
            <div className="mt-2 flex items-center gap-3">
              <span className="font-medium">Deck</span>
              <SelectDeckCombobox
                decks={deckNames}
                deckId={selectedDeckId}
                onSelect={(deckId) => {
                  if (selectedDeckId !== deckId) {
                    setSelectedDeckId(deckId);
                  }
                }}
              />
            </div>
            <div className="py-3">
              <CardsTable cards={cards} />
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
