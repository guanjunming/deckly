import PricingCard from "@/components/premium/PricingCard";
import SubscriptionCard from "@/components/premium/SubscriptionCard";
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
    <div className="mx-auto w-full max-w-screen-lg py-6 md:py-24 lg:py-32">
      <div className="px-6">
        {currentTier === "FREE" ? (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <h1 className="text-6xl font-bold tracking-tighter">
              Upgrade to Premium
            </h1>
            <p className="mx-auto max-w-[700px] text-xl text-muted-foreground">
              Select the plan that best fits your needs. Upgrade, downgrade, or
              cancel anytime.
            </p>
          </div>
        ) : (
          <>
            <h1 className="mb-5 text-4xl font-bold">My Subscription</h1>
            <SubscriptionCard currentTier={currentTier} />
          </>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-3">
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
