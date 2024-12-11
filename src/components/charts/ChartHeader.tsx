import { ReactNode } from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";

const ChartHeader = ({ children }: { children: ReactNode }) => {
  return (
    <CardHeader className="items-center border-b pb-2 pt-3">
      <CardTitle className="text-3xl">{children}</CardTitle>
    </CardHeader>
  );
};

export default ChartHeader;
