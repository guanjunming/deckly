import { Ellipsis } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertDialog, AlertDialogTrigger } from "../ui/alert-dialog";
import { DeleteDeckAlertDialogContent } from "./DeleteDeckAlertDialogContent";

interface DeckCardProps {
  id: number;
  name: string;
}

const DeckCard = ({ id, name }: DeckCardProps) => {
  return (
    <div className="">
      <div className="flex cursor-pointer gap-10 rounded-md py-2 hover:bg-accent">
        <div className="ml-2 flex-1 hover:underline">{name}</div>
        <div className="mr-3 flex gap-2">
          <div className="flex gap-4 text-center">
            <div className="w-14">20</div>
            <div className="w-14">0</div>
            <div className="w-14">691</div>
          </div>

          <Dialog>
            <AlertDialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button>
                    <Ellipsis className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  alignOffset={0}
                  className="rounded-xl p-1.5"
                >
                  <DialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      Rename
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <AlertDialogTrigger asChild>
                    <DropdownMenuItem className="cursor-pointer">
                      Delete
                    </DropdownMenuItem>
                  </AlertDialogTrigger>
                </DropdownMenuContent>
              </DropdownMenu>
              <DeleteDeckAlertDialogContent id={id} />
            </AlertDialog>

            <DialogContent className="max-w-max">
              <DialogHeader>
                <DialogTitle className="text-2xl">
                  Start Earning PPP Sales!
                </DialogTitle>
              </DialogHeader>

              <div className="flex gap-2">
                <Button>Button</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <Separator className="mt-1" />
    </div>
  );
};

export default DeckCard;
