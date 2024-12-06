import { Card } from "@/types/types";
import { useQuery } from "@tanstack/react-query";

const fetchCards = async (deckId: number): Promise<Card[]> => {
  const res = await fetch(`/api/cards?deckId=${deckId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch cards");
  }
  return res.json();
};

export const useGetDeckCards = (deckId: number) => {
  const query = useQuery({
    queryKey: ["cards", deckId],
    queryFn: () => fetchCards(deckId),
    enabled: !!deckId,
  });

  return query;
};
