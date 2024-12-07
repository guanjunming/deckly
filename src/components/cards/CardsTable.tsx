import { Card } from "@/types/types";
import { DataTable } from "../data-table/data-table";
import { columns } from "../data-table/columns";

const CardsTable = ({
  cards,
  setSelectedCard,
}: {
  cards: Card[];
  setSelectedCard: (card: Card) => void;
}) => {
  return (
    <DataTable
      columns={columns}
      data={cards}
      setSelectedCard={setSelectedCard}
    />
  );
};

export default CardsTable;
