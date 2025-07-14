import {
    date,
    integer,
    pgEnum,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
    varchar,
  } from "drizzle-orm/pg-core";
  
  /*─────────────────────────
    ENUMS
    ─────────────────────────*/
  export const vaccineStatusEnum = pgEnum("vaccine_status", [
    "pending",
    "done",
    "missed",
  ]);
  
  /*─────────────────────────
    users
    ─────────────────────────*/
  export const usersTable = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    email: varchar("email", { length: 255 }).notNull().unique(),
  
    password: varchar("password", { length: 255 }).notNull(), // hashed
  
    createdAt: timestamp("created_at").defaultNow().notNull(),
  });
  
  /*─────────────────────────
    children
    ─────────────────────────*/
  export const childrenTable = pgTable("children", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    userId: uuid("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
  
    name: varchar("name", { length: 255 }).notNull(),
  
    dob: date("dob").notNull(),
  
    gender: varchar("gender", { length: 20 }).notNull(),
  
    bloodGroup: varchar("blood_group", { length: 3 }), // optional
  });
  
  /*─────────────────────────
    vaccines
    ─────────────────────────*/
  export const vaccinesTable = pgTable("vaccines", {
    id: uuid("id").defaultRandom().primaryKey(),
  
    name: varchar("name", { length: 255 }).notNull(),
  
    description: text("description").notNull(),
  
    dueAgeInWeeks: integer("due_age_in_weeks").notNull(),
  
    infoUrl: varchar("info_url", { length: 255 }),
  });
  
  /*─────────────────────────
    child_vaccine_status
    ─────────────────────────*/
  export const childVaccineStatusTable = pgTable("child_vaccine_status",
    {
      id: uuid("id").defaultRandom().primaryKey(),
  
      childId: uuid("child_id")
        .notNull()
        .references(() => childrenTable.id, { onDelete: "cascade" }),
  
      vaccineId: uuid("vaccine_id")
        .notNull()
        .references(() => vaccinesTable.id, { onDelete: "cascade" }),
  
      scheduledDate: date("scheduled_date").notNull(),
  
      status: vaccineStatusEnum("status").default("pending").notNull(),
  
      givenDate: date("given_date"), // nullable
    },
    (t) => ({
      /** Ensure one row per child‑vaccine pair */
      uniqChildVaccine: unique("uniq_child_vaccine").on(t.childId, t.vaccineId),
    }),
  );
  