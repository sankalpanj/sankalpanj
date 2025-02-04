import { db } from "@/db";
import { members } from "@/db/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function updateUserWithCustomerAndSubscriptionId(
  customerId: string,
  subscriptionId: string,
  userId: string
) {
  try {
    const { rowsAffected } = await db
      .update(members)
      .set({
        stripeCustomerId: customerId,
        stripeSubscriptionId: subscriptionId,
      })
      .where(eq(members.id, userId));

    if (rowsAffected === 0) {
      console.error(`User with ID ${userId} not found`);
    }
  } catch (err) {
    console.error(err);
  }
}

async function updateUserWithPlanDetails(
  userEmail: string,
  amount: number,
  status: string
) {
  const today = dayjs();
  try {
    const { rowsAffected } = await db
      .update(members)
      .set({
        amount: amount,
        status: status,
        membershipStartDate: today.toISOString(),
        membershipEndDate: today.add(1, "year").toISOString(),
        paymentDate: today.toISOString(),
      })
      .where(eq(members.email, userEmail));

    if (rowsAffected === 0) {
      console.error(`User with email ${userEmail} not found`);
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleUserSubscriptionUpdated(subscriptionUpdated: any) {
  const {
    status,
    customer,
    plan: { id, product },
  } = subscriptionUpdated;
  try {
    if (typeof customer === "string") {
      const { rowsAffected } = await db
        .update(members)
        .set({ status: status, stripePlanId: id, stripeProductId: product })
        .where(eq(members.stripeCustomerId, customer));

      if (rowsAffected === 0) {
        console.error(`User with customer ID ${customer} not found`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function handleUserSubscriptionDeleted(
  subscriptionDeleted: Stripe.Subscription
) {
  const { customer, status } = subscriptionDeleted;
  try {
    if (typeof customer === "string") {
      const { rowsAffected } = await db
        .update(members)
        .set({ status: status })
        .where(eq(members.stripeCustomerId, customer));

      if (rowsAffected === 0) {
        console.error(`User with customer ID ${customer} not found`);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

export async function POST(request: NextRequest) {
  const sig = request.headers.get("stripe-signature");
  const body = await request.text();

  let event;

  try {
    if (!sig) {
      throw new Error("Missing stripe signature");
    }
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    console.error(
      `Webhook signature verification failed: ${
        err instanceof Error ? err.message : "Unknown error"
      }`
    );
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const checkoutSessionCompleted = event.data.object;
      console.log("Checkout session completed:", checkoutSessionCompleted);
      const { customer, subscription, metadata } = checkoutSessionCompleted;
      if (
        typeof customer === "string" &&
        typeof subscription === "string" &&
        metadata &&
        !metadata.customerId
      ) {
        await updateUserWithCustomerAndSubscriptionId(
          customer,
          subscription,
          metadata.userId
        );
      }
      break;
    }
    case "customer.subscription.updated": {
      const subscriptionUpdated = event.data.object as any;
      console.log("Subscription updated:", subscriptionUpdated);
      await handleUserSubscriptionUpdated(subscriptionUpdated);
      break;
    }
    case "customer.subscription.deleted":
      const subscriptionDeleted = event.data.object;
      console.log("Subscription deleted:", subscriptionDeleted);
      await handleUserSubscriptionDeleted(subscriptionDeleted);
      break;
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object;
      console.log("Invoice payment succeeded:", invoicePaymentSucceeded);
      const { customer_email, amount_paid, status } = invoicePaymentSucceeded;
      if (customer_email && status) {
        await updateUserWithPlanDetails(customer_email, amount_paid, status);
      }
      break;
    }
    case "invoice.payment_failed":
      const invoicePaymentFailed = event.data.object;
      console.log("Invoice payment failed:", invoicePaymentFailed);
      const { customer_email, status } = invoicePaymentFailed;
      if (customer_email && status) {
        await updateUserWithPlanDetails(customer_email, 0, status);
      }
      break;
    // case "customer.subscription.trial_will_end":
    //   const trialWillEnd = event.data.object;
    //   console.log("Trial will end:", trialWillEnd);
    //   break;
    // case "customer.subscription.paused":
    //   const subscriptionPaused = event.data.object;
    //   console.log("Subscription paused:", subscriptionPaused);
    //   break;
    // case "customer.subscription.resumed":
    //   const subscriptionResumed = event.data.object;
    //   console.log("Subscription resumed:", subscriptionResumed);
    //   break;
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
