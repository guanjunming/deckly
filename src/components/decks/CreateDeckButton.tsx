"use client";

import { deckSchema } from "@/schemas/decks";
import { addDeck } from "@/server/actions/decks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

const CreateDeckButton = () => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof deckSchema>) => {
    const response = await addDeck(values);

    if (response.ok) {
      toast.success(response.message);
      setOpen(false);
      form.reset();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full">
          New Deck
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle className="text-xl">Create new deck</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">Deck name</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Deck name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-full"
                  >
                    Close
                  </Button>
                </DialogClose>
                <Button
                  disabled={form.formState.isSubmitting}
                  type="submit"
                  className="w-20 rounded-full"
                >
                  {form.formState.isSubmitting ? (
                    <Spinner size="small" className="text-primary-foreground" />
                  ) : (
                    "Create"
                  )}
                </Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDeckButton;
