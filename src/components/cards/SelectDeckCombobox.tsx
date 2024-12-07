"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

export type DeckNameOption = {
  id: number;
  name: string;
};

const SelectDeckCombobox = ({
  decks,
  deckId,
  onSelect,
}: {
  decks: DeckNameOption[];
  deckId: number;
  onSelect: (id: number) => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between text-base font-normal"
        >
          {deckId
            ? decks.find((deck) => deck.id === deckId)?.name
            : "Select deck..."}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        style={{ width: "var(--radix-popover-trigger-width)" }}
      >
        <Command
          filter={(value, search, keywords = []) => {
            const extendValue = keywords.join(" ");
            if (extendValue.toLowerCase().includes(search.toLowerCase())) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No decks found</CommandEmpty>
            <CommandGroup>
              {decks.map((deck) => (
                <CommandItem
                  key={deck.id}
                  value={deck.id.toString()}
                  keywords={[deck.name]}
                  onSelect={(currentValue) => {
                    onSelect(+currentValue);
                    setOpen(false);
                  }}
                >
                  {deck.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectDeckCombobox;
