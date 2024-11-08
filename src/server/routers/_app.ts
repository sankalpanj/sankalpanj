import { db } from "@/db";
import { visitorTable } from "@/db/schema";
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
        phone: z
          .string()
          .min(1, "Phone number is required")
          .max(10, "Can't be more than 10 digits")
          .regex(/^\d+$/, "Phone number must contain only digits")
          .refine((val) => !val.startsWith("0"), {
            message: "Phone number cannot start with 0",
          }),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const result = await db.insert(visitorTable).values({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          message: input.message ?? null,
          isdCode: "1",
        });

        return {
          success: true,
          message: "Contact details added successfully",
          data: result,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to add contact details");
      }
    }),
});

export type AppRouter = typeof appRouter;
