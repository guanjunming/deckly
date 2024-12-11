"use server";

import { Stripe } from "stripe";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "../queries/users";
import { getUserSubscription } from "../queries/subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const returnUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/premium`;

export const createCheckoutSession = async (priceId: string) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "Unauthorized! Please sign in again." };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    subscription_data: {
      metadata: {
        userId,
      },
    },
    success_url: returnUrl,
    cancel_url: returnUrl,
  });

  redirect(session.url!);
};

export const createCustomerPortalSession = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "Unauthorized! Please sign in again." };
  }

  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return { error: "No existing subscription." };
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: returnUrl,
  });

  redirect(portalSession.url);
};

export const createCancelSession = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "Unauthorized! Please sign in again." };
  }

  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return { error: "No existing subscription." };
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: returnUrl,
    flow_data: {
      type: "subscription_cancel",
      subscription_cancel: {
        subscription: subscription.stripeSubscriptionId,
      },
    },
  });

  redirect(portalSession.url);
};

export const createUpdateSession = async (priceId: string) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    return { error: "Unauthorized! Please sign in again." };
  }

  const subscription = await getUserSubscription(userId);

  if (!subscription) {
    return { error: "No existing subscription." };
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: returnUrl,
    flow_data: {
      type: "subscription_update_confirm",
      subscription_update_confirm: {
        subscription: subscription.stripeSubscriptionId,
        items: [
          {
            id: subscription.stripeSubscriptionItemId,
            price: priceId,
            quantity: 1,
          },
        ],
      },
    },
  });

  redirect(portalSession.url);
};
