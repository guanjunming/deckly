import { ReactNode } from "react";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const ChartHeader = ({
  description,
  children,
}: {
  description?: string;
  children: ReactNode;
}) => {
  return (
    <CardHeader className="pb-2 pt-3">
      <CardTitle className="text-3xl">{children}</CardTitle>
      {description && (
        <CardDescription className="text-base">
          The lower the ease, the more frequently a card will appear.
        </CardDescription>
      )}
    </CardHeader>
  );
};

export default ChartHeader;
