"use client";

import { Label } from "@radix-ui/react-label";
import { AutosizeTextarea } from "../ui/autosize-textarea";
import { Button } from "../ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { addCard } from "@/server/actions/cards";

const CardEditor = ({ deckId }: { deckId: number | undefined }) => {
  const [frontField, setFrontField] = useState("");
  const [backField, setBackField] = useState<string | undefined>("");

  const handleAddClicked = async () => {
    console.log(frontField);
    console.log(backField);

    if (!deckId) return;

    const data = {
      deckId,
      front: frontField,
      back: backField,
    };

    const response = await addCard(data);
    if (response.ok) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Label htmlFor="front">Front</Label>
          <AutosizeTextarea
            id="front"
            onChange={(e) => setFrontField(e.target.value)}
            className="text-base"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="back">Back</Label>
          <AutosizeTextarea
            id="back"
            onChange={(e) => setBackField(e.target.value)}
            className="text-base"
          />
        </div>
      </div>

      <div className="">
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
