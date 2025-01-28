import { z } from "zod";

// Schema for members table
const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  spouseName: z.string().nullable(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zip: z.string(),
  telephone: z.string(),
  spouseTelephone: z.string().nullable(),
  email: z.string(),
  spouseEmail: z.string().nullable(),
  dateOfBirth: z.string(), // Includes timezone
  spouseDateOfBirth: z.string().nullable(), // Includes timezone
  anniversary: z.string().nullable(), // Includes timezone
  createdAt: z.string(), // Timestamp with timezone
  membershipStartDate: z.string(), // When membership period starts
  membershipEndDate: z.string(), // When membership period ends
  amount: z.number(), // Amount in cents stored as string
  status: z.string(), // 'completed', 'pending', 'failed', etc
  paymentDate: z.string(), // When payment was made/attempted
});

// Schema for child table
const childSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  name: z.string().min(1, "Name cannot be empty"),
  age: z.string().min(1, "Age cannot be empty").regex(/^\d+$/, "Age must be a number"), // Age stored as a string for consistency
  dateOfBirth: z.string().min(1, "Date of birth cannot be empty"), // Includes timezone
});

// Schema for children table

const childrenSchema = z.array(childSchema)

const memberAndChildrenSchema = memberSchema.extend({
  children: z.array(childSchema)
})

// Schema for payments table
const paymentSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  paypalTransactionId: z.string(),
  amount: z.string(), // Amount in cents stored as string
  status: z.string(), // 'completed', 'pending', 'failed', etc
  paymentDate: z.string(),
  membershipStartDate: z.string(),
  membershipEndDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string()
});

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

  
// Combine schemas into a union type
type Member = z.infer<typeof memberSchema>;
type Child = z.infer<typeof childSchema>;
type Children = z.infer<typeof childrenSchema>
type MemberAndChildren = z.infer<typeof memberAndChildrenSchema>
type Payment = z.infer<typeof paymentSchema>
type Contact = z.infer<typeof contactSchema>

export { childSchema, memberSchema, childrenSchema, memberAndChildrenSchema, paymentSchema, contactSchema };

export type { Child, Member, Children, MemberAndChildren, Payment, Contact };
