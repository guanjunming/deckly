"use client";

import { Separator } from "@/components/ui/separator";
import DeckActionButton from "./DeckActionButton";

interface DeckCardProps {
  id: number;
  name: string;
  newCount: number;
  learnCount: number;
  dueCount: number;
}

const DeckCard = ({
  id,
  name,
  newCount,
  learnCount,
  dueCount,
}: DeckCardProps) => {
  const handleOnClick = () => {
    console.log("start learn deck: " + id);
  };

  return (
    <div>
      <div className="flex items-center gap-5 rounded-md py-1 hover:bg-accent">
        <div
          className="ml-2 flex-1 cursor-pointer truncate hover:underline"
          onClick={handleOnClick}
        >
          {name}
        </div>
        <div className="mr-2 flex items-center gap-2">
          <div className="flex items-center gap-4 text-center">
            <div
              className={`w-14 ${newCount > 0 ? "text-blue-500" : "text-zinc-300"}`}
            >
              {newCount}
            </div>
            <div
              className={`w-14 ${learnCount > 0 ? "text-red-500" : "text-zinc-300"}`}
            >
              {learnCount}
            </div>
            <div
              className={`w-14 ${dueCount > 0 ? "text-green-500" : "text-zinc-300"}`}
            >
              {dueCount}
            </div>
          </div>
          <DeckActionButton id={id} name={name} />
        </div>
      </div>
      <Separator className="mt-1" />
    </div>
  );
};

export default DeckCard;
