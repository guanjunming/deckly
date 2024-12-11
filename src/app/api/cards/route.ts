import { NextRequest, NextResponse } from "next/server";
import { getCardsByDeckId } from "@/server/queries/cards";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const deckId = searchParams.get("deckId");

  if (!deckId) {
    return NextResponse.json({ error: "Deck ID is required" }, { status: 400 });
  }

  try {
    const cards = await getCardsByDeckId(+deckId);
    return NextResponse.json(cards);
  } catch (error: any) {
    console.error("Error fetching cards: " + error.message);
    return NextResponse.json(
      { error: "Error fetching cards" },
      { status: 500 },
    );
  }
};
