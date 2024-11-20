import { db } from "@/db";
import { ChildrenSchema, InsertChildrenSchema, InsertMemberSchema, Members } from "@/db/member-schema";
import { User } from "@/db/schema";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  hello: procedure.query(() => {
    return "hello";
  }),
  addContactDetails: procedure
    .input(
      z.object({
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        email: z
          .string()
          .min(1, "Email is required")
          .email("Invalid email address"),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { firstName, lastName, email, message } = input;
        const res = await db.insert(User).values({
          email: email,
          firstName: firstName,
          lastName: lastName,
          message: message,
        });
        return res;
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add contact details");
      }
    }),
  addMember: procedure.input(InsertMemberSchema).mutation(async ({ input }) => {
    try {
      const res = await db
        .insert(Members)
        .values({
          ...input,
        })
        .returning({
          id: Members.id,
        });
      return res[0];
    } catch (err) {
      console.error(err);
      throw new Error("ADD_MEMBER_FAILED");
    }
  }),
  addChildrenDetails: procedure.input(InsertChildrenSchema).mutation(async({input}) => {
    try {
      await db.insert(ChildrenSchema).values({...input})
      return {status: true}
    } catch (err) {
      console.error(err);
      throw new Error("ADD_CHILDREN_FAILED");
    }
  })
});

export type AppRouter = typeof appRouter;
