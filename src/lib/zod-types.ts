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
  stripeCustomerId: z.string(),
  stripeSubscriptionId: z.string(),
  stripePlanId: z.string(),
  stripeProductId: z.string(),
});

// Schema for child table
const childSchema = z.object({
  id: z.string(),
  memberId: z.string(),
  name: z.string().min(1, "Name cannot be empty"),
  age: z
    .string()
    .min(1, "Age cannot be empty")
    .regex(/^\d+$/, "Age must be a number"), // Age stored as a string for consistency
  dateOfBirth: z.string().min(1, "Date of birth cannot be empty"), // Includes timezone
});

// Schema for children table

const childrenSchema = z.array(childSchema);

const memberAndChildrenSchema = memberSchema.extend({
  children: z.array(childSchema),
});

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
  updatedAt: z.string(),
});

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  message: z.string(),
  createdAt: z.string(),
});

const productSchema = z.object({
  id: z.string(),
  object: z.literal("product"),
  active: z.boolean(),
  attributes: z.array(z.string()),
  created: z.number(),
  default_price: z.string(),
  description: z.string(),
  images: z.array(z.string()),
  livemode: z.boolean(),
  marketing_features: z.array(z.string()),
  metadata: z.record(z.string()),
  name: z.string(),
  package_dimensions: z.null(),
  shippable: z.null(),
  statement_descriptor: z.null(),
  tax_code: z.null(),
  type: z.string(),
  unit_label: z.null(),
  updated: z.number(),
  url: z.null(),
});

const recurringSchema = z.object({
  aggregate_usage: z.null(),
  interval: z.enum(["year", "month", "week", "day"]),
  interval_count: z.number(),
  meter: z.null(),
  trial_period_days: z.null(),
  usage_type: z.string(),
});

const subscriptionPlanSchema = z.object({
  id: z.string(),
  object: z.literal("price"),
  active: z.boolean(),
  billing_scheme: z.string(),
  created: z.number(),
  currency: z.string(),
  custom_unit_amount: z.null(),
  livemode: z.boolean(),
  lookup_key: z.null(),
  metadata: z.record(z.string()),
  nickname: z.null(),
  product: productSchema,
  recurring: recurringSchema,
  tax_behavior: z.string(),
  tiers_mode: z.null(),
  transform_quantity: z.null(),
  type: z.string(),
  unit_amount: z.number(),
  unit_amount_decimal: z.string(),
});

const StripePaymentIntentSchema = z.object({
  id: z.string(),
  object: z.literal("payment_intent"),
  amount: z.number(),
  amount_capturable: z.number(),
  amount_details: z.record(z.unknown()), // Assuming it's an object with dynamic keys
  amount_received: z.number(),
  application: z.string().nullable(),
  application_fee_amount: z.number().nullable(),
  automatic_payment_methods: z.unknown().nullable(),
  canceled_at: z.number().nullable(),
  cancellation_reason: z.string().nullable(),
  capture_method: z.string(),
  client_secret: z.string(),
  confirmation_method: z.string(),
  created: z.number(), // Unix timestamp
  currency: z.string(),
  customer: z.string().nullable(),
  description: z.string().nullable(),
  invoice: z.string().nullable(),
  last_payment_error: z.unknown().nullable(),
  latest_charge: z.string().nullable(),
  livemode: z.boolean(),
  metadata: z.record(z.string()),
  next_action: z.unknown().nullable(),
  on_behalf_of: z.string().nullable(),
  payment_method: z.string().nullable(),
  payment_method_configuration_details: z.unknown().nullable(),
  payment_method_options: z.record(z.unknown()), // Assuming it's an object with dynamic keys
  payment_method_types: z.array(z.string()),
  processing: z.unknown().nullable(),
  receipt_email: z.string().nullable(),
  review: z.unknown().nullable(),
  setup_future_usage: z.string().nullable(),
  shipping: z.unknown().nullable(),
  source: z.unknown().nullable(),
  statement_descriptor: z.string().nullable(),
  statement_descriptor_suffix: z.string().nullable(),
  status: z.string(), // e.g., "succeeded", "requires_payment_method"
  transfer_data: z.unknown().nullable(),
  transfer_group: z.string().nullable(),
});

const StripePaymentIntentListSchema = z.object({
  object: z.literal("list"),
  data: z.array(StripePaymentIntentSchema),
  has_more: z.boolean(),
  url: z.string(),
});

// Combine schemas into a union type
type Member = z.infer<typeof memberSchema>;
type Child = z.infer<typeof childSchema>;
type Children = z.infer<typeof childrenSchema>;
type MemberAndChildren = z.infer<typeof memberAndChildrenSchema>;
type Payment = z.infer<typeof paymentSchema>;
type Contact = z.infer<typeof contactSchema>;
type SubscriptionPlan = z.infer<typeof subscriptionPlanSchema>;
type PaymentRecurringSchema = z.infer<typeof recurringSchema>;
type ProductSchema = z.infer<typeof productSchema>;

export {
  childrenSchema,
  childSchema,
  contactSchema,
  memberAndChildrenSchema,
  memberSchema,
  paymentSchema,
  productSchema,
  recurringSchema,
  subscriptionPlanSchema,
  StripePaymentIntentListSchema,
  StripePaymentIntentSchema
};

export type {
  Child,
  Children,
  Contact,
  Member,
  MemberAndChildren,
  Payment,
  PaymentRecurringSchema,
  ProductSchema,
  SubscriptionPlan,
};
