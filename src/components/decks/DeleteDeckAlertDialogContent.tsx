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

export function DeleteDeckAlertDialogContent({ id }: { id: number }) {
  const [isDeletePending, startDeleteTransition] = useTransition();

  return (
    <>
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
                const data = await deleteDeck(id);
              });
            }}
            disabled={isDeletePending}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </>
  );
}
