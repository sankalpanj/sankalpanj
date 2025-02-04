import { RenderUserProfileSettings } from "@/_components/profile-details";
import { db } from "@/db";
import { children, members } from "@/db/schema";
import { memberAndChildrenSchema } from "@/lib/zod-types";
import { eq } from "drizzle-orm";

interface Props {
  params: { id: string[] };
  searchParams: {};
}

export default async function UserProfile(props: Props) {
  const userId = props.params.id[0];
  const memberQuery = await db
    .select({
      id: members.id,
      name: members.name,
      spouseName: members.spouseName,
      address: members.address,
      city: members.city,
      state: members.state,
      zip: members.zip,
      telephone: members.telephone,
      spouseTelephone: members.spouseTelephone,
      email: members.email,
      spouseEmail: members.spouseEmail,
      dateOfBirth: members.dateOfBirth,
      spouseDateOfBirth: members.spouseDateOfBirth,
      anniversary: members.anniversary,
      createdAt: members.createdAt,
      membershipStartDate: members.membershipStartDate,
      membershipEndDate: members.membershipEndDate,
      amount: members.amount,
      status: members.status,
      paymentDate: members.paymentDate,
      stripeCustomerId: members.stripeCustomerId,
      stripeSubscriptionId: members.stripeSubscriptionId,
      stripePlanId: members.stripePlanId,
      stripeProductId: members.stripeProductId
    })
    .from(members)
    .where(eq(members.id, userId));

  const childrenQuery = await db
    .select({
      id: children.id,
      memberId: children.memberId,
      name: children.name,
      age: children.age,
      dateOfBirth: children.dateOfBirth,
    })
    .from(children)
    .where(eq(children.memberId, userId));

  const records = memberQuery.map((member) => ({
    ...member,
    children: childrenQuery,
  }));

  if (records.length === 0) {
    return null;
  }

  const record = {
    ...records[0],
  };

  console.log(record);

  const { data, error } = memberAndChildrenSchema.safeParse(record);
  console.log(data);
  console.log(error);

  if (error) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen w-full items-center">
      <div className="h-full w-full bg-white">
        <div className="h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%)]">
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex flex-col w-full md:w-3/4 h-full md:border-2 md:border-y-0 items-center py-24">
              <RenderUserProfileSettings userProfile={data} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
