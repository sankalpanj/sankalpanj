import { subscriptionPlanSchema } from '@/lib/zod-types';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET() {
  try {
    const { data } = await stripe.prices.list({
      expand: ['data.product'],
      active: true,
      type: 'recurring',
    });

    const { data: subscriptionPlans, error } =  subscriptionPlanSchema.array().safeParse(data);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Error fetching subscription plans" }, { status: 500 });
    }

    return NextResponse.json(subscriptionPlans);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching subscription plans" },
      { status: 500 }
    );
  }
}
