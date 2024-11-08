CREATE TABLE IF NOT EXISTS "visitor-table" (
	"id" serial PRIMARY KEY NOT NULL,
	"firsName" text NOT NULL,
	"lastName" text NOT NULL,
	"email" text NOT NULL,
	"phone" varchar(10) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"message" text,
	CONSTRAINT "visitor-table_email_unique" UNIQUE("email")
);
