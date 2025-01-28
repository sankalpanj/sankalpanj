import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
const members = sqliteTable("members", {
  id: text("id").primaryKey().notNull(), // UUID or unique identifier
  name: text("name").notNull(),
  spouseName: text("spouse_name"), // Nullable for no spouse
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(),
  telephone: text("telephone").notNull(),
  spouseTelephone: text("spouse_telephone"), // Nullable for no spouse
  email: text("email").notNull(),
  spouseEmail: text("spouse_email"), // Nullable for no spouse
  dateOfBirth: text("date_of_birth").notNull(), // Includes timezone
  spouseDateOfBirth: text("spouse_date_of_birth"), // Nullable, includes timezone
  anniversary: text("anniversary"), // Nullable, includes timezone
  createdAt: text("created_at").default(new Date().toISOString()).notNull(), // Timestamp with timezone
  membershipStartDate: text("membership_start_date").default(''), // When membership period starts
  membershipEndDate: text("membership_end_date").default(''), // When membership period ends
  amount: integer("amount").default(0), // Amount in cents stored as number
  status: text("status").default('pending'), // 'completed', 'pending', 'failed', etc
  paymentDate: text("payment_date").default(''), // When payment was made/attempted
});

const children = sqliteTable("children", {
  id: text("id").primaryKey().notNull(), // UUID or unique identifier
  memberId: text("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }), // Foreign key
  name: text("name").notNull(),
  age: text("age").notNull(), // Age stored as a string for consistency
  dateOfBirth: text("date_of_birth").notNull(), // Includes timezone
});

const payments = sqliteTable("payments", {
  id: text("id").primaryKey().notNull(), // UUID or unique identifier
  memberId: text("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }), // Foreign key
  paypalTransactionId: text("paypal_transaction_id").notNull(),
  amount: text("amount").notNull(), // Amount in cents stored as string
  status: text("status").notNull(), // 'completed', 'pending', 'failed', etc
  paymentDate: text("payment_date").notNull(), // When payment was made/attempted
  membershipStartDate: text("membership_start_date").notNull(), // When membership period starts
  membershipEndDate: text("membership_end_date").notNull(), // When membership period ends
  createdAt: text("created_at").default(new Date().toISOString()).notNull(),
  updatedAt: text("updated_at").default(new Date().toISOString()).notNull(),
});

const events = sqliteTable("events", {
  id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()), // Auto-generated UUID
  memberId: text("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }), // Foreign key
  title: text("title").notNull(),
  description: text("description").notNull(),
  startDate: text("start_date").notNull(), // Includes timezone
  endDate: text("end_date").notNull(), // Includes timezone
  location: text("location").notNull(),
  status: text("status").default("upcoming").notNull(), // 'upcoming', 'ongoing', 'completed', 'cancelled'
  createdAt: text("created_at").default(new Date().toISOString()).notNull(),
  updatedAt: text("updated_at").default(new Date().toISOString()).notNull(),
});

const contacts = sqliteTable("contacts", {
  id: text("id").primaryKey().notNull().$defaultFn(() => crypto.randomUUID()),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(), 
  email: text("email").notNull(),
  message: text("message").default(""),
  createdAt: text("created_at").default(new Date().toISOString()).notNull(),
});

type ContactsSchema = typeof contacts.$inferSelect;
type ContactsSchemaInsert = typeof contacts.$inferInsert;


type EventsSchema = typeof events.$inferSelect;
type EventsSchemaInsert = typeof events.$inferInsert;


type PaymentsSchema = typeof payments.$inferSelect;
type PaymentsSchemaInsert = typeof payments.$inferInsert;

type MembersSchema = typeof members.$inferSelect;
type MembersSchemaInsert = typeof members.$inferInsert;

export type {
  MembersSchema,
  MembersSchemaInsert,
  PaymentsSchema,
  PaymentsSchemaInsert,
  EventsSchema,
  EventsSchemaInsert,
  ContactsSchema,
  ContactsSchemaInsert,
};

export { children, members, payments, contacts };
