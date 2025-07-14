CREATE TYPE "public"."vaccine_status" AS ENUM('pending', 'done', 'missed');--> statement-breakpoint
CREATE TABLE "child_vaccine_status" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"child_id" uuid NOT NULL,
	"vaccine_id" uuid NOT NULL,
	"scheduled_date" date NOT NULL,
	"status" "vaccine_status" DEFAULT 'pending' NOT NULL,
	"given_date" date,
	CONSTRAINT "uniq_child_vaccine" UNIQUE("child_id","vaccine_id")
);
--> statement-breakpoint
CREATE TABLE "children" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"dob" date NOT NULL,
	"gender" varchar(20) NOT NULL,
	"blood_group" varchar(3)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vaccines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"due_age_in_weeks" integer NOT NULL,
	"info_url" varchar(255)
);
--> statement-breakpoint
ALTER TABLE "child_vaccine_status" ADD CONSTRAINT "child_vaccine_status_child_id_children_id_fk" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "child_vaccine_status" ADD CONSTRAINT "child_vaccine_status_vaccine_id_vaccines_id_fk" FOREIGN KEY ("vaccine_id") REFERENCES "public"."vaccines"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "children" ADD CONSTRAINT "children_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;