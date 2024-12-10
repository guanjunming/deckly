import PricingCard from "@/components/premium/PricingCard";
import { FREE, subscriptionTiers } from "@/data/subscriptionTiers";
import { getUserSubscription } from "@/server/queries/subscription";
import { getCurrentUserId } from "@/server/queries/users";
import { redirect } from "next/navigation";

const PremiumPage = async () => {
  const userId = await getCurrentUserId();
  if (!userId) return redirect("/login");

  const subscription = await getUserSubscription(userId);
  const currentTier = subscription?.tier || "FREE";

  return (
    <div className="w-full py-12 md:py-24 lg:py-32">
      <div className="px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-6xl font-bold tracking-tighter">
            Upgrade to Premium
          </h1>
          <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
            Select the plan that best fits your needs. Upgrade, downgrade, or
            cancel anytime.
          </p>
        </div>
        <div className="mx-auto mt-10 grid gap-8 md:grid-cols-3 lg:max-w-5xl">
          <PricingCard tierInfo={FREE} currentTier={currentTier} />
          <PricingCard
            tierInfo={subscriptionTiers.STANDARD}
            currentTier={currentTier}
          />
          <PricingCard
            tierInfo={subscriptionTiers.PREMIUM}
            currentTier={currentTier}
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
