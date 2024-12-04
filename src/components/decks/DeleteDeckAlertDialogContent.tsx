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
import { deleteDeck } from "@/server/actions/decks";
import { useTransition } from "react";
import { toast } from "sonner";

const DeleteDeckAlertDialogContent = ({ id }: { id: number }) => {
  const [isDeletePending, startDeleteTransition] = useTransition();

  return (
    <AlertDialogContent className="sm:max-w-[425px]">
      <AlertDialogHeader>
        <AlertDialogTitle className="text-xl">
          Delete this deck?
        </AlertDialogTitle>
        <AlertDialogDescription className="text-base">
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="rounded-full">Cancel</AlertDialogCancel>
        <AlertDialogAction
          className="rounded-full"
          onClick={() => {
            startDeleteTransition(async () => {
              const response = await deleteDeck(id);
              if (response.ok) {
                toast.success(response.message);
              } else {
                toast.error(response.message);
              }
            });
          }}
          disabled={isDeletePending}
        >
          Delete
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteDeckAlertDialogContent;
