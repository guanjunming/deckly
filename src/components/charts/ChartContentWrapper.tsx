import { AllTierType } from "@/data/subscriptionTiers";
import { ReactNode } from "react";

const ChartContentWrapper = ({
  subscriptionTier,
  hasData,
  children,
}: {
  subscriptionTier: AllTierType;
  hasData: boolean;
  children: ReactNode;
}) => {
  return (
    <div className="min-h-[300px] flex-grow">
      {subscriptionTier !== "FREE" ? (
        hasData ? (
          children
        ) : (
          <div className="grid h-full place-content-center uppercase text-muted-foreground">
            No Data
          </div>
        )
      ) : (
        <div className="grid h-full place-content-center text-muted-foreground">
          Upgrade to Premium to get full access
        </div>
      )}
    </div>
  );
};

export default ChartContentWrapper;
