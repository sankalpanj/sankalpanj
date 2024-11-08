import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const visitorTable = pgTable("visitor-table", {
  id: serial("id").notNull().primaryKey(),
  firstName: text("firsName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").notNull().unique(),
  phone: varchar("phone", { length: 10 }).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  message: text("message"),
  isdCode: varchar("isdCode", { length: 2 }).notNull(),
});

export type InsertVisitorDetail = typeof visitorTable.$inferInsert;
export type GetVisitorDetail = typeof visitorTable.$inferSelect;
