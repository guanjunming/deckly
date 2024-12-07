"use client";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteCards } from "@/server/actions/cards";
import { Card } from "@/types/types";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const DeleteCardAlertDialogContent = ({
  cards,
  onDelete,
}: {
  cards: Card[];
  onDelete: () => void;
}) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    if (cards.length === 0) return;

    const cardIds = cards.map((card) => card.id);
    const response = await deleteCards(cardIds);

    if (response.ok) {
      toast.success(response.message);
      queryClient.invalidateQueries({ queryKey: ["cards", cards[0].deckId] });
      onDelete();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <AlertDialogContent className="sm:max-w-[425px]">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-xl">
          Delete this card?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-base">
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
        <AlertDialogAction className="rounded-full" onClick={handleDelete}>
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteCardAlertDialogContent;
