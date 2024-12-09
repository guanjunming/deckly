"use client";

import { Button } from "@/components/ui/button";
import { studyDeck } from "@/server/actions/decks";
import { toast } from "sonner";

const StudyNowButton = ({
  deckId,
  disabled,
}: {
  deckId: number;
  disabled: boolean;
}) => {
  const handleStart = async () => {
    const response = await studyDeck(deckId);

    if (!response.ok) {
      toast.error(response.message);
    }
  };

  return (
    <Button
      disabled={disabled}
      onClick={handleStart}
      size="lg"
      className="rounded-full bg-blue-500 py-7 text-2xl hover:bg-blue-600/90 disabled:opacity-50"
    >
      Study now
    </Button>
  );
};

export default StudyNowButton;
