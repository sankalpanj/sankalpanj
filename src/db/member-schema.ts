import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const Members = sqliteTable("Members", {
  id: text("id").primaryKey().notNull(), // Primary key for the form
  name: text("name").notNull(),
  spouseName: text("spouse_name"), // Nullable by default in SQLite
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zip: text("zip").notNull(), // ZIP stored as a string
  telephoneNo: text("telephone_no").notNull(), // Stored as string to handle formatting
  spouseTelephoneNo: text("spouse_telephone_no"), // Optional field
  email: text("email").notNull(),
  spouseEmail: text("spouse_email"), // Optional field
  dateOfBirth: text("date_of_birth").notNull(), // ISO format recommended
  spouseDateOfBirth: text("spouse_date_of_birth"), // Optional field
  anniversary: text("anniversary"), // Optional field
});

export const ChildrenSchema = sqliteTable("children", {
  id: text("id").primaryKey().notNull(), // Unique ID for each child
  memberId: text("memberId") // Foreign key linking to the parent form
    .notNull()
    .references(() => Members.id),
  children: text("childrenData").notNull(),
});

// Relations
export const formRelations = relations(Members, ({ one, many }) => ({
  children: many(ChildrenSchema), // One form can have many children
}));

export const childrenRelations = relations(ChildrenSchema, ({ one }) => ({
  member: one(Members, {
    fields: [ChildrenSchema.memberId],
    references: [Members.id],
  }),
}));

const InsertMemberSchema = createInsertSchema(Members);
const InsertChildrenSchema = createInsertSchema(ChildrenSchema);
const SelectMemeberSchema = createSelectSchema(Members);
const SelectChildrenSchema = createSelectSchema(ChildrenSchema);

export {
  InsertChildrenSchema,
  InsertMemberSchema,
  SelectChildrenSchema,
  SelectMemeberSchema,
};
