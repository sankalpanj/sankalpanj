import { db } from "@/db";
import { children, contacts, members, payments } from "@/db/schema";
import { childrenSchema, childSchema, contactSchema, memberSchema, paymentSchema } from "@/lib/zod-types";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { procedure, router } from "../trpc";

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
          const { success, data } = memberSchema.safeParse(records);

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
        const {rowsAffected} = await db
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
    .input(
      z.array(childSchema)
    )
    .mutation(async ({ input }) => {
      try {
        const { rowsAffected } = await db.insert(children).values(
          [...input]
        );

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
            data: []
          } as const;
        }

        return {
          code: "SUCCESS",
          data: data
        } as const;
      } catch (err) {
        console.log("GET_PAYMENTS_ERROR: ", err);
        return {
          code: "FAILED",
          data: []
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
});

export type AppRouter = typeof appRouter;
