"use server";

import { Stripe } from "stripe";
import { redirect } from "next/navigation";
import { getCurrentUserId } from "../queries/users";
import { getUserSubscription } from "../queries/subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckoutSession = async (priceId: string) => {
  const userId = await getCurrentUserId();
  if (!userId) {
    // return { ok: false, message: "Unauthorized! Please sign in again." };
    return;
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
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/premium`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/premium`,
  });

  redirect(session.url!);
};

export const createCustomerPortalSession = async () => {
  const userId = await getCurrentUserId();
  if (!userId) {
    // return { ok: false, message: "Unauthorized! Please sign in again." };
    return;
  }

  const subscription = await getUserSubscription(userId);

  if (subscription?.stripeCustomerId == null) {
    return;
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: subscription.stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/premium`,
  });

  redirect(portalSession.url);
};
