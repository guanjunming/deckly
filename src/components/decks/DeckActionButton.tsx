"use client";

import { Ellipsis, SquarePen, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import DeleteDeckAlertDialogContent from "./DeleteDeckAlertDialogContent";
import RenameDeckDialogContent from "./RenameDeckDialogContent";
import { useState } from "react";

const DeckActionButton = ({ id, name }: { id: number; name: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="cursor-pointer rounded-full p-2 hover:bg-zinc-200">
              <Ellipsis className="h-4 w-4" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={-5}
            className="rounded-xl"
          >
            <DialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <SquarePen /> Rename
              </DropdownMenuItem>
            </DialogTrigger>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                <Trash2 /> Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <DeleteDeckAlertDialogContent id={id} />
      </AlertDialog>
      <RenameDeckDialogContent id={id} name={name} setDialogOpen={setOpen} />
    </Dialog>
  );
};

export default DeckActionButton;
