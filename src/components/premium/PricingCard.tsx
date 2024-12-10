"use client";

import { TierInfo, TierType } from "@/data/subscriptionTiers";
import { Card } from "@/components/ui/card";
import { ReactNode } from "react";
import { Button } from "../ui/button";
import { IoCheckmark } from "react-icons/io5";
import {
  createCancelSession,
  createCheckoutSession,
  createUpdateSession,
} from "@/server/actions/stripe";
import { toast } from "sonner";

const PricingCard = ({
  tierInfo,
  currentTier,
}: {
  tierInfo: TierInfo;
  currentTier: TierType | "FREE";
}) => {
  const {
    tier,
    name,
    price,
    maxDecks,
    maxCardsPerDeck,
    canAccessStatistics,
    priceId,
  } = tierInfo;

  const handleSubscribe = async () => {
    if (priceId) {
      let result;
      if (currentTier === "FREE") {
        result = await createCheckoutSession(priceId);
      } else {
        result = await createUpdateSession(priceId);
      }
      if (result) {
        toast.error(result.error);
      }
    } else {
      const result = await createCancelSession();
      if (result) {
        toast.error(result.error);
      }
    }
  };

  return (
    <Card className="flex flex-col gap-4 p-6">
      <div className="text-2xl font-semibold">{name}</div>
      <div className="flex-grow">
        <div className="flex flex-wrap items-baseline">
          <div className="text-4xl font-bold">
            {price === 0 ? "Free" : `SGD ${price}`}
          </div>
          {tier !== "FREE" && <div>/ month</div>}
        </div>
        <div className="mt-4 space-y-2">
          <Feature>
            {maxDecks > 0 ? `Up to ${maxDecks} decks` : "Unlimited decks"}
          </Feature>
          <Feature>
            {maxCardsPerDeck > 0 ? `Up to ${maxCardsPerDeck}` : "Unlimited"}{" "}
            cards per deck
          </Feature>
          <Feature>
            {canAccessStatistics ? "Full" : "Limited"} access to Statistics
          </Feature>
        </div>
      </div>
      <div className="mt-4">
        <Button
          onClick={handleSubscribe}
          disabled={tier === currentTier}
          className="w-full rounded-full"
        >
          {tier === currentTier
            ? "Current Plan"
            : tier === "FREE"
              ? "Choose"
              : "Subscribe"}
        </Button>
      </div>
    </Card>
  );
};

const Feature = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center gap-2">
      <IoCheckmark className="h-5 w-5" />
      <span>{children}</span>
    </div>
  );
};

export default PricingCard;
