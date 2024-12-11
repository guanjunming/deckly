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
import { Card } from "@/types/types";

const DeckBrowser = ({
  deckNames,
  currentDeckId,
  cardLimit,
}: {
  deckNames: DeckNameOption[];
  currentDeckId: number;
  cardLimit: number;
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState(currentDeckId);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);

  const { data: cards = [] } = useGetDeckCards(selectedDeckId);

  const onSelectDeck = (deckId: number) => {
    if (selectedDeckId !== deckId) {
      setSelectedDeckId(deckId);
      setSelectedCard(null);
    }
  };

  const onUpdateCard = () => {
    setSelectedCard(null);
  };

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
                onSelect={onSelectDeck}
              />
            </div>
            <div className="py-3">
              <CardsTable cards={cards} setSelectedCard={setSelectedCard} />
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={50}>
          <div className="h-full w-full p-3">
            <CardEditor
              deckId={selectedDeckId}
              selectedCard={selectedCard}
              onUpdate={onUpdateCard}
              canAddCard={cardLimit === -1 || cards.length < cardLimit}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DeckBrowser;
