import { Card } from "@/types/types";
import { DataTable } from "../data-table/data-table";
import { columns } from "../data-table/columns";

const CardsTable = ({ cards }: { cards: Card[] }) => {
  return <DataTable columns={columns} data={cards} />;
};

export default CardsTable;
