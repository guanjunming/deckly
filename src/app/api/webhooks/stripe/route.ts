import { getTierByPriceId } from "@/data/subscriptionTiers";
import {
  createUserSubscription,
  deleteUserSubscription,
  updateUserSubscription,
} from "@/server/queries/subscription";
import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature") as string;

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );

    switch (event.type) {
      case "customer.subscription.created":
        await handleCreateSubscription(event.data.object);
        break;
      case "customer.subscription.updated":
        await handleUpdateSubscription(event.data.object);
        break;
      case "customer.subscription.deleted":
        await handleDeleteSubscription(event.data.object);
        break;
    }
  } catch (error: any) {
    console.error("Error processing webhook: " + error.message);
    return new Response("Error processing webhook", { status: 400 });
  }

  return new Response(null, { status: 200 });
};

const handleCreateSubscription = async (subscription: Stripe.Subscription) => {
  const tier = getTierByPriceId(subscription.items.data[0].price.id);
  const userId = subscription.metadata.userId;

  if (!userId || !tier) {
    throw new Error("Invalid subscription tier");
  }

  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  return await createUserSubscription({
    userId: userId,
    tier: tier,
    stripeCustomerId: customerId,
    stripeSubscriptionId: subscription.id,
    stripeSubscriptionItemId: subscription.items.data[0].id,
  });
};

const handleUpdateSubscription = async (subscription: Stripe.Subscription) => {
  const tier = getTierByPriceId(subscription.items.data[0].price.id);
  if (!tier) {
    throw new Error("Invalid subscription tier");
  }
  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  return await updateUserSubscription(customerId, { tier: tier });
};

const handleDeleteSubscription = async (subscription: Stripe.Subscription) => {
  const customer = subscription.customer;
  const customerId = typeof customer === "string" ? customer : customer.id;

  return await deleteUserSubscription(customerId);
};
