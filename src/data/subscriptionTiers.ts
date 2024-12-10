export type TierNames = keyof typeof subscriptionTiers;

export const subscriptionTiers = {
  STANDARD: {
    name: "Standard",
    price: 4.99,
    maxDecks: 5,
    maxCardsPerDeck: 20,
    canAccessStatistics: true,
    priceId: process.env.STRIPE_STANDARD_PLAN_PRICE_ID,
  },
  PREMIUM: {
    name: "Premium",
    price: 9.99,
    maxDecks: -1,
    maxCardsPerDeck: -1,
    canAccessAnalytics: true,
    priceId: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
  },
};

export const getTierByPriceId = (priceId: string) => {
  const tierKey = (Object.keys(subscriptionTiers) as TierNames[]).find(
    (key) => subscriptionTiers[key].priceId === priceId,
  );

  return tierKey || null;
};
