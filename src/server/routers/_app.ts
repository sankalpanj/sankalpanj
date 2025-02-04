import { db } from "@/db";
import { children, contacts, members, payments } from "@/db/schema";
import {
  childrenSchema,
  childSchema,
  contactSchema,
  memberSchema,
  paymentSchema,
  StripePaymentIntentListSchema,
} from "@/lib/zod-types";
import { desc, eq } from "drizzle-orm";
import Stripe from "stripe";
import { z } from "zod";
import { procedure, router } from "../trpc";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const appRouter = router({
  addMember: procedure
    .input(z.object({ payload: memberSchema }))
    .mutation(async ({ input: { payload } }) => {
      try {
        const records = await db
          .insert(members)
          .values({
            ...payload,
          })
          .returning();

        if (records.length > 0) {
          return {
            code: "SUCCESS",
            memberId: records[0].id,
          };
        }
        return { code: "FAILED", memberId: null };
      } catch (err) {
        console.log("MEMBER_ADD_ERROR: ", err);
        return { code: "FAILED", memberId: null };
      }
    }),
  addChildren: procedure
    .input(
      z.object({
        payload: childrenSchema,
      })
    )
    .mutation(async ({ input: { payload } }) => {
      try {
        const { rowsAffected } = await db.insert(children).values([...payload]);

        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          };
        }
        return {
          code: "FAILED",
        };
      } catch (err) {
        console.log("ADD_CHILDREN_ERROR: ", err);
        return {
          code: "FAILED",
        };
      }
    }),
  getProfileDetails: procedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .mutation(async ({ input: { userId } }) => {
      try {
        const records = await db
          .select()
          .from(members)
          .where(eq(members.id, userId));

        if (records.length > 0) {
          const { success, data, error } = memberSchema.safeParse(records[0]);

          console.log(error);

          if (success) {
            return {
              code: "SUCCESS",
              data,
            };
          } else {
            return {
              code: "VALIDATION_ERROR",
              data: null,
            };
          }
        }
        return {
          code: "NOT_FOUND",
          data: null,
        };
      } catch (err) {
        console.log("getProfile error: ", err);
        throw err;
      }
    }),
  updateMemberDetails: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zip: z.string(),
        telephone: z.string(),
        email: z.string(),
        dateOfBirth: z.string(),
        anniversary: z.string().nullable(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { rowsAffected } = await db
          .update(members)
          .set({
            name: input.name,
            address: input.address,
            city: input.city,
            state: input.state,
            zip: input.zip,
            telephone: input.telephone,
            email: input.email,
            dateOfBirth: input.dateOfBirth,
            anniversary: input.anniversary,
          })
          .where(eq(members.id, input.id));

        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          };
        }
        return {
          code: "FAILED",
        };
      } catch (err) {
        console.log("UPDATE_MEMBER_ERROR: ", err);
        return {
          code: "FAILED",
        };
      }
    }),

  addChild: procedure
    .input(z.array(childSchema))
    .mutation(async ({ input }) => {
      try {
        const { rowsAffected } = await db.insert(children).values([...input]);

        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          } as const;
        }
        return {
          code: "FAILED",
        } as const;
      } catch (err) {
        console.log("ADD_CHILD_ERROR: ", err);
        return {
          code: "FAILED",
        } as const;
      }
    }),

  updateChild: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        age: z.string(),
        dateOfBirth: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { rowsAffected } = await db
          .update(children)
          .set({
            name: input.name,
            age: input.age,
            dateOfBirth: input.dateOfBirth,
          })
          .where(eq(children.id, input.id));

        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          };
        }
        return {
          code: "FAILED",
        };
      } catch (err) {
        console.log("UPDATE_CHILD_ERROR: ", err);
        return {
          code: "FAILED",
        };
      }
    }),
  updateSpouse: procedure
    .input(
      z.object({
        memberId: z.string(),
        spouseName: z.string(),
        spouseEmail: z.string(),
        spouseTelephone: z.string(),
        spouseDateOfBirth: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { rowsAffected } = await db
          .update(members)
          .set({
            spouseName: input.spouseName,
            spouseEmail: input.spouseEmail,
            spouseTelephone: input.spouseTelephone,
            spouseDateOfBirth: input.spouseDateOfBirth,
          })
          .where(eq(members.id, input.memberId));

        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          } as const;
        }
        return {
          code: "FAILED",
        } as const;
      } catch (err) {
        console.log("UPDATE_SPOUSE_ERROR: ", err);
        return {
          code: "FAILED",
        } as const;
      }
    }),
  getPaymentsByMemberId: procedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const memberPayments = await db
          .select({
            id: payments.id,
            memberId: payments.memberId,
            paypalTransactionId: payments.paypalTransactionId,
            amount: payments.amount,
            status: payments.status,
            paymentDate: payments.paymentDate,
            membershipStartDate: payments.membershipStartDate,
            membershipEndDate: payments.membershipEndDate,
            createdAt: payments.createdAt,
            updatedAt: payments.updatedAt,
          })
          .from(payments)
          .where(eq(payments.memberId, input))
          .orderBy(desc(payments.paymentDate));

        const { data, error } = paymentSchema.array().safeParse(memberPayments);
        if (error) {
          console.log("PAYMENT_VALIDATION_ERROR: ", error);
          return {
            code: "FAILED",
            data: [],
          } as const;
        }

        return {
          code: "SUCCESS",
          data: data,
        } as const;
      } catch (err) {
        console.log("GET_PAYMENTS_ERROR: ", err);
        return {
          code: "FAILED",
          data: [],
        } as const;
      }
    }),
  addContact: procedure
    .input(z.object({ payload: contactSchema }))
    .mutation(async ({ input: { payload } }) => {
      try {
        const { rowsAffected } = await db.insert(contacts).values(payload);
        if (rowsAffected > 0) {
          return {
            code: "SUCCESS",
          } as const;
        }
        return {
          code: "FAILED",
        } as const;
      } catch (err) {
        console.log("ADD_CONTACT_ERROR: ", err);
        return {
          code: "FAILED",
        } as const;
      }
    }),
  generatePlanChangeSessionUrl: procedure
    .input(z.object({ customerId: z.string() }))
    .mutation(async ({ input }) => {
      const { customerId } = input;
      try {
        const session = await stripe.billingPortal.sessions.create({
          customer: customerId,
          return_url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/subscriptions`,
        });
        return {
          code: "SUCCESS",
          data: session.url,
        } as const;
      } catch (err) {
        console.log("GENERATE_PLAN_CHANGE_SESSION_URL_ERROR: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
  generateOneTimeDonationSessionUrl: procedure
    .input(z.object({ amount: z.number() }))
    .mutation(async ({ input }) => {
      const { amount } = input;
      try {
        const { url } = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "One-Time Donation",
                },
                unit_amount: amount * 100,
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/donation`,
          mode: "payment",
        });
        return {
          code: "SUCCESS",
          data: url,
        } as const;
      } catch (err) {
        console.log("GENERATE_ONE_TIME_DONATION_SESSION_URL_ERROR: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
  getPaymentHistoryByCustomerId: procedure
    .input(z.string())
    .query(async ({ input }) => {
      try {
        const transactions = await stripe.paymentIntents.list({
          customer: input,
          limit: 10,
        });

        console.log(transactions)

        const { error, data } =
          StripePaymentIntentListSchema.safeParse(transactions);

        if (error) {
          console.error("payment history parse error: ", error);
          return {
            code: "FAILED",
            data: null,
          } as const;
        }

        return {
          code: "SUCCESS",
          data: data,
        } as const;
      } catch (err) {
        console.log("payment history get error: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
  updateSubscription: procedure
    .input(
      z.object({
        subscriptionId: z.string(),
        items: z.array(z.object({
          id: z.string(),
          quantity: z.number().min(1),
        })),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const subscription = await stripe.subscriptions.update(input.subscriptionId, {
          items: input.items,
          cancel_at_period_end: true,
          proration_behavior: "none"
        });

        return {
          code: "SUCCESS",
          data: subscription,
        } as const;
      } catch (err) {
        console.log("UPDATE_SUBSCRIPTION_ERROR: ", err);
        return {
          code: "FAILED",
          data: null,
        } as const;
      }
    }),
});

export type AppRouter = typeof appRouter;
