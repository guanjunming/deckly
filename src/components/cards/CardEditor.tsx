"use client";

import { Label } from "@/components/ui/label";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { addCard } from "@/server/actions/cards";
import { ScrollArea } from "@/components/ui/scroll-area";

const CardEditor = ({ deckId }: { deckId: number | undefined }) => {
  const [frontField, setFrontField] = useState("");
  const [backField, setBackField] = useState<string | undefined>("");

  const handleAddClicked = async () => {
    if (!deckId) return;

    const data = {
      deckId,
      front: frontField,
      back: backField,
    };

    const response = await addCard(data);
    if (response.ok) {
      toast.success(response.message);

      setFrontField("");
      setBackField("");
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
              className="resize-none text-base"
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
              className="resize-none text-base"
            />
          </div>
        </div>
      </ScrollArea>

      <div className="mt-2 p-3">
        <Button
          size="lg"
          className="w-full rounded-full"
          onClick={handleAddClicked}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default CardEditor;
