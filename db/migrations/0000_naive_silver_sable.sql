DO $$ BEGIN
 CREATE TYPE "public"."fuel_type" AS ENUM('petrol', 'diesel', 'electric', 'hybrid', 'petrol + lpg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cars" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"brand" varchar(256) NOT NULL,
	"model" varchar(256) NOT NULL,
	"production_date" integer NOT NULL,
	"fuel_type" "fuel_type" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fuelings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price" numeric(15, 2) NOT NULL,
	"volume" numeric(6, 2) NOT NULL,
	"mileage_id" uuid,
	"car_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "maintanances" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item" varchar(256) NOT NULL,
	"price" numeric(15, 2) NOT NULL,
	"number_of_days" integer,
	"number_of_kilometers" integer,
	"car_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mileages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"car_id" uuid,
	"mileage" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "repairs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"item" varchar(256) NOT NULL,
	"description" varchar(512),
	"price" numeric(15, 2) NOT NULL,
	"mileage_id" uuid,
	"car_id" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mail" varchar(320),
	"password" varchar(256) NOT NULL,
	"username" varchar(256) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT null,
	"deleted_at" timestamp DEFAULT null,
	CONSTRAINT "users_mail_unique" UNIQUE("mail")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cars" ADD CONSTRAINT "cars_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_mileage_id_mileages_id_fk" FOREIGN KEY ("mileage_id") REFERENCES "public"."mileages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fuelings" ADD CONSTRAINT "fuelings_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "maintanances" ADD CONSTRAINT "maintanances_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mileages" ADD CONSTRAINT "mileages_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repairs" ADD CONSTRAINT "repairs_mileage_id_mileages_id_fk" FOREIGN KEY ("mileage_id") REFERENCES "public"."mileages"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "repairs" ADD CONSTRAINT "repairs_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
