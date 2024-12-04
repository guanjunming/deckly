"use client";

import { deckSchema } from "@/schemas/decks";
import { renameDeck } from "@/server/actions/decks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
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
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

interface RenameDeckDialogContentProps {
  id: number;
  name: string;
  setDialogOpen: (open: boolean) => void;
}

const RenameDeckDialogContent = ({
  id,
  name,
  setDialogOpen,
}: RenameDeckDialogContentProps) => {
  const form = useForm<z.infer<typeof deckSchema>>({
    resolver: zodResolver(deckSchema),
    defaultValues: {
      name,
    },
  });

  const onSubmit = async (values: z.infer<typeof deckSchema>) => {
    const response = await renameDeck(id, values);

    if (response.ok) {
      toast.success(response.message);
      setDialogOpen(false);
    } else {
      toast.error(response.message);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
      <DialogHeader>
        <DialogTitle className="text-xl">Rename deck</DialogTitle>
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
                className="w-[68px] rounded-full"
              >
                {form.formState.isSubmitting ? (
                  <Spinner size="small" className="text-primary-foreground" />
                ) : (
                  "Save"
                )}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
};

export default RenameDeckDialogContent;
