import { pgTable, serial, text, varchar, integer, timestamp, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const children = pgTable("children", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  dob: date("dob").notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const vaccineStatus = pgTable("vaccine_status", {
  id: serial("id").primaryKey(),
  vaccineId: integer("vaccine_id").notNull(),
  name: text("name").notNull(),
  status: varchar("status", { length: 20 }).default("pending"),
  dueDate: date("due_date"),
  childId: integer("child_id").references(() => children.id),
});
