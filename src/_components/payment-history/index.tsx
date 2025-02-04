"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { trpc } from "@/lib/trpc/client";
import { MemberAndChildren } from "@/lib/zod-types";

interface Props {
  userProfile: MemberAndChildren;
}

function PaymentHistory({ userProfile }: Props) {
  const { data } = trpc.getPaymentHistoryByCustomerId.useQuery(
    userProfile.stripeCustomerId
  );

  console.log("payment history: ", data);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <Alert variant={"default"} className="w-full max-w-2xl">
        <AlertTitle>Coming Soon!</AlertTitle>
        <AlertDescription>
          This page is currently under construction. Check back soon to view
          your payment history and transaction details.
        </AlertDescription>
      </Alert>
    </div>
  );
}

export { PaymentHistory };
