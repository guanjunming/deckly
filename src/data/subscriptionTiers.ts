export type TierType = keyof typeof subscriptionTiers;

export type AllTierType = TierType | "FREE";

export type TierInfo = {
  tier: string;
  name: string;
  price: number;
  maxDecks: number;
  maxCardsPerDeck: number;
  canAccessStatistics: boolean;
  priceId?: string;
};

export const FREE = {
  tier: "FREE",
  name: "Basic",
  price: 0,
  maxDecks: 5,
  maxCardsPerDeck: 50,
  canAccessStatistics: false,
};

export const subscriptionTiers = {
  STANDARD: {
    tier: "STANDARD",
    name: "Standard",
    price: 4.99,
    maxDecks: 20,
    maxCardsPerDeck: 200,
    canAccessStatistics: true,
    priceId: process.env.STRIPE_STANDARD_PLAN_PRICE_ID,
  },
  PREMIUM: {
    tier: "PREMIUM",
    name: "Premium",
    price: 9.99,
    maxDecks: -1,
    maxCardsPerDeck: -1,
    canAccessStatistics: true,
    priceId: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
  },
};

export const getTierByPriceId = (priceId: string): TierType | undefined => {
  const tier = Object.values(subscriptionTiers).find(
    (value) => value.priceId === priceId,
  );

  return tier?.tier as TierType;
};
