"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionTiers, TierType } from "@/data/subscriptionTiers";
import { createCustomerPortalSession } from "@/server/actions/stripe";
import { toast } from "sonner";

const SubscriptionCard = ({ currentTier }: { currentTier: TierType }) => {
  const handleOnClick = async () => {
    const result = await createCustomerPortalSession();
    if (result) {
      toast.error(result.error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">
          You are currently on the {subscriptionTiers[currentTier].name} plan
        </CardTitle>
        <CardDescription className="text-base">
          If you would like to upgrade, cancel, or change your payment method,
          use the button below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleOnClick} className="rounded-full" size="lg">
          Manage Subscription
        </Button>
      </CardContent>
    </Card>
  );
};

export default SubscriptionCard;
