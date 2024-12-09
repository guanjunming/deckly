"use client";

import { Label } from "@/components/ui/label";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { addCard, updateCard } from "@/server/actions/cards";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQueryClient } from "@tanstack/react-query";
import { Card } from "@/types/types";
import DOMPurify from "isomorphic-dompurify";

const CardEditor = ({
  deckId,
  selectedCard,
  onUpdate,
}: {
  deckId: number | undefined;
  selectedCard: Card | null;
  onUpdate: () => void;
}) => {
  const [frontField, setFrontField] = useState("");
  const [backField, setBackField] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    if (selectedCard) {
      setFrontField(selectedCard.front);
      setBackField(selectedCard.back);
    } else {
      setFrontField("");
      setBackField("");
    }
  }, [selectedCard]);

  const handleAddClicked = async () => {
    if (!deckId) return;

    if (frontField === "") {
      toast.error("The front field is empty.");
      return;
    }

    const data = {
      deckId,
      front: DOMPurify.sanitize(frontField),
      back: DOMPurify.sanitize(backField),
    };

    const response = await addCard(data);
    if (response.ok) {
      toast.success(response.message);
      setFrontField("");
      setBackField("");
      queryClient.invalidateQueries({ queryKey: ["cards", deckId] });
    } else {
      toast.error(response.message);
    }
  };

  const handleUpdateClicked = async () => {
    if (!selectedCard) return;

    if (frontField === "") {
      toast.error("The front field is empty.");
      return;
    }

    const data = {
      front: frontField,
      back: backField,
    };

    const response = await updateCard(selectedCard.id, data);
    if (response.ok) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["cards", deckId] });
      onUpdate();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <ScrollArea className="flex-grow">
        <div className="flex flex-col gap-3 p-3">
          <div className="space-y-1">
            <Label htmlFor="front" className="text-base">
              Front
            </Label>
            <AutosizeTextarea
              id="front"
              value={frontField}
              onChange={(e) => setFrontField(e.target.value)}
              className="resize-none text-xl"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="back" className="text-base">
              Back
            </Label>
            <AutosizeTextarea
              id="back"
              value={backField}
              onChange={(e) => setBackField(e.target.value)}
              className="resize-none text-xl"
            />
          </div>
        </div>
      </ScrollArea>

      <div className="mt-2 flex justify-center gap-3 p-3">
        <Button
          size="lg"
          className="w-[120px] rounded-full"
          onClick={handleAddClicked}
        >
          Add
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="w-[120px] rounded-full"
          onClick={handleUpdateClicked}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default CardEditor;
