import { Card } from "@/types/types";
import { DataTable } from "../cards-table/DataTable";
import { columns } from "../data-table/columns";

const CardsTable = ({ cards }: { cards: Card[] }) => {
  //   console.log(JSON.stringify(cards));

  return <DataTable columns={columns} data={cards} />;
};

export default CardsTable;
