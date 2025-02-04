"use client";

import { AuthForm } from "@/_components/auth-form";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc/client";
import { subscriptionPlanSchema } from "@/lib/zod-types";
import { useUser } from "@clerk/nextjs";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function Subscriptions() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [openAuthForm, setOpenAuthForm] = useState(false);

  const {
    mutateAsync: fetchPlans,
    data: plansData,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      const data = await fetch("/api/subscription-plans");
      const dataJson = await data.json();
      const { data: plans, error } = subscriptionPlanSchema
        .array()
        .safeParse(dataJson);
      if (error) {
        console.error(error);
        return [];
      }
      return plans;
    },
  });

  const {
    mutateAsync: updateSubscription,
    isPending: updatingSubscription,
    isError: subscritptionUpdateError,
    isSuccess: updateSubscriptionSuccess,
  } = trpc.updateSubscription.useMutation();

  const {
    mutateAsync: getProfileDetails,
    data: profileDetails,
    isPending: isProfileDetailsPending,
  } = trpc.getProfileDetails.useMutation();

  const {
    mutateAsync: generatePlanChangeSessionUrl,
    isPending: isPlanChangeSessionUrlPending,
  } = trpc.generatePlanChangeSessionUrl.useMutation();

  const subscribedPlanId = useMemo(() => {
    if (!profileDetails?.data) return "";
    return profileDetails.data.stripePlanId;
  }, [profileDetails]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  useEffect(() => {
    if (user && isLoaded && !profileDetails) {
      getProfileDetails({ userId: user.id });
    }
  }, [user, isLoaded, profileDetails, getProfileDetails]);

  // function handleSubscriptionPlanUpdate(planId: string) {
  //   if (plansData) {
  //     const { unit_amount } = plansData.filter((plan) => plan.id === planId)[0];
  //   }
  // }

  const handleBtnAction = async (priceId: string) => {
    if (!user) {
      setOpenAuthForm(true);
      return;
    }
    if (profileDetails?.data?.stripePlanId) {
      const { code, data } = await generatePlanChangeSessionUrl({
        customerId: "cus_RgLlpU0dFK4qsa",
      });
      if (code === "SUCCESS") {
        router.push(data);
      }
      return;
    }
    const stripe = await stripePromise;
    const { sessionId } = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        priceId,
        metadata: {
          userId: user?.id,
          email: user?.emailAddresses[0].emailAddress,
        },
      }),
    }).then((res) => res.json());
    if (!stripe) return;
    const result = await stripe.redirectToCheckout({
      sessionId,
    });

    if (result.error) {
      console.error(result.error);
    }
  };

  if (isPending || !isLoaded || isProfileDetailsPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen">
      <div className="flex flex-col w-full grow md:w-3/5 lg:w-4/5 border-x pt-28 items-center px-5">
        <h1 className="font-bold mb-4">Choose a Subscription Plan</h1>
        <div className="bg-gradient-to-r from-blue-500 to-green-500 rounded-full p-10 text-center my-10">
          <p className="text-white text-xl">
            Join our community of passionate individuals dedicated to creating
            positive change. As a registered member, you can choose from a
            variety of subscription plans that support our mission and
            initiatives. Your subscription not only grants you access to
            exclusive resources and updates but also empowers us to continue our
            vital work in the community. Together, we can make a lasting impact.
            Select a plan that resonates with you and start your journey with us
            today!
          </p>
        </div>
        <div className="grid grid-cols-3 gap-x-10 gap-y-5">
          {plansData?.map((plan) => (
            <div
              key={plan.id}
              className="bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"
            >
              <div className="flex flex-col w-auto gap-5 border p-4 rounded-md shadow-md">
                <p className="text-teal-700 font-bold text-2xl">
                  {plan.product.name}
                </p>
                <p className="font-semibold">{plan.product.description}</p>
                <p className="font-semibold text-sky-500 text-xl">
                  Price: ${plan.unit_amount / 100} / {plan.recurring.interval}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  loading={isPlanChangeSessionUrlPending}
                  onClick={() => handleBtnAction(plan.id)}
                  disabled={subscribedPlanId === plan.id}
                >
                  {!subscribedPlanId
                    ? "Subscribe"
                    : subscribedPlanId === plan.id
                    ? "Subscribed"
                    : "Upgrade"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AuthForm open={openAuthForm} close={setOpenAuthForm} />
    </div>
  );
}
