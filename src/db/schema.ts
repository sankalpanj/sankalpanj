import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const User = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  email: text("email").unique().notNull(),
  message: text("message"),
});

export type InsertUserDetail = typeof User.$inferInsert;
export type GetUserrDetail = typeof User.$inferSelect;
