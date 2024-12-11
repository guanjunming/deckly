import { useQuery } from "@tanstack/react-query";

const fetchCards = async (deckId: number) => {
  const response = await fetch(`/api/cards?deckId=${deckId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch cards");
  }

  return await response.json();
};

export const useGetDeckCards = (deckId: number) => {
  const query = useQuery({
    queryKey: ["cards", deckId],
    queryFn: () => fetchCards(deckId),
    enabled: !!deckId,
  });

  return query;
};
