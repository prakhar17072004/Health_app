CREATE TABLE "children" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"dob" date NOT NULL,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "vaccine_status" (
	"id" serial PRIMARY KEY NOT NULL,
	"vaccine_id" integer NOT NULL,
	"name" text NOT NULL,
	"status" varchar(20) DEFAULT 'pending',
	"due_date" date,
	"child_id" integer
);
--> statement-breakpoint
ALTER TABLE "children" ADD CONSTRAINT "children_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccine_status" ADD CONSTRAINT "vaccine_status_child_id_children_id_fk" FOREIGN KEY ("child_id") REFERENCES "public"."children"("id") ON DELETE no action ON UPDATE no action;