import { auth } from "@/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IoCheckmark } from "react-icons/io5";

const PremiumPage = async () => {
  const session = await auth();
  if (!session) return <div>Not authenticated</div>;

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
        <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-12 lg:mx-auto lg:max-w-5xl">
          <Card className="flex flex-col gap-4 p-6">
            <div className="text-2xl font-semibold">Basic</div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-baseline">
                <div className="text-4xl font-bold">Free</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Up to 5 decks</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>50 cards per deck</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Limited access to Statistics</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full rounded-full">Get started</Button>
            </div>
          </Card>
          <Card className="flex flex-col gap-4 p-6">
            <div className="text-2xl font-semibold">Standard</div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-baseline">
                <div className="text-4xl font-bold">SGD 4.99</div>
                <div>/ month</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Up to 10 decks</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>100 cards per deck</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Full access to Statistics</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full rounded-full">Current Plan</Button>
            </div>
          </Card>
          <Card className="flex flex-col gap-4 p-6">
            <div className="text-2xl font-semibold">Premium</div>
            <div className="flex-grow">
              <div className="flex flex-wrap items-baseline">
                <div className="text-4xl font-bold">SGD 9.99</div>
                <div>/ month</div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Unlimited decks</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Unlimited cards per deck</span>
                </div>
                <div className="flex items-center gap-1">
                  <IoCheckmark className="h-5 w-5" />
                  <span>Full access to Statistics</span>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <Button className="w-full rounded-full">Subscribe</Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PremiumPage;
